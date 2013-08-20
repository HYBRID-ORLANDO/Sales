
/*
Hold the totals while they are being calculated
*/
var TotalDamages;
var TotalShipped;
 
/*
-------------------------------------
Function specific to the portal
-------------------------------------
*/
/*
Handles updating a line item, we track the original value so that  we don't
do updates when the user is just tabbing through the interface
*/
function PerformDamLineItemUpdate(SKUID, ColumnID, RowID, FormElementName, OriginalValue) {
    // before we do something, make sure this is editable
    var sz = document.getElementById('CSZ' + SKUID + ColumnID).value;
    if (sz.length == 0) {

        document.getElementById(FormElementName).value = "";
        return;
    }
    // grab the current value
    var newValue = document.getElementById(FormElementName).value;
    var oldValue = document.getElementById(OriginalValue).value;
    // do basic number validation
    var isNumber = parseInt(newValue);
    if (isNaN(isNumber) || isNumber < 0) {
        alert('Please enter a valid quantity!');
        // set the value back to what it was
        document.getElementById(FormElementName).value = document.getElementById(OriginalValue).value;
        // get out
        return;
    }
    // check if the value has changed (if not we don't want to perform an update)
    if (newValue == oldValue) {        
        return;
    }
    else {
        // update the hidden text value so we don't update everytime the user tabs through
        document.getElementById(OriginalValue).value = newValue;
    }
    var querrystring = 'hybrid.order.dl?t=ReceiveAjaxLineItems&action=updateDam&RowID=' + RowID + '&Value=' + newValue + '&ColumnID=' + ColumnID;
    // this one is sent async, as long as the value is valid, we don't care much
    asyncAjaxContent(0, querrystring, 'lineitemsajax', 1);
    RefreshQuantities();
}

/*
Handles updating a line item, we track the original value so that  we don't
do updates when the user is just tabbing through the interface
*/
function PerformLineItemUpdate(SKUID, ColumnID, RowID, FormElementName, OriginalValue) {
    // before we do something, make sure this is editable
    var sz = document.getElementById('CSZ' + SKUID + ColumnID).value;    
    if (sz.length == 0) {        
        document.getElementById(FormElementName).value = "";
        return;
    }
    // grab the current value
    var newValue = document.getElementById(FormElementName).value;
    var oldValue = document.getElementById(OriginalValue).value;
    // do basic number validation    
    var isNumber = parseInt(newValue);
    if (isNaN(isNumber) || isNumber < 0) {
        alert('Please enter a valid quantity!');
        // set the value back to what it was
        document.getElementById(FormElementName).value = document.getElementById(OriginalValue).value;
        // get out
        return;
    }
    // check if the value has changed (if not we don't want to perform an update)
    if (newValue == oldValue) {        
        return;
    }
    else {
        // update the hidden text value so we don't update everytime the user tabs through
        document.getElementById(OriginalValue).value = newValue;
    }
    var querrystring = 'hybrid.order.dl?t=ReceiveAjaxLineItems&action=update&RowID=' + RowID + '&Value=' + newValue + '&ColumnID=' + ColumnID;
    // this one is sent async, as long as the value is valid, we don't care much
    asyncAjaxContent(0, querrystring, 'lineitemsajax', 1);
    RefreshQuantities();
}


/*
This functions refreshes the line items and add line item box, as well
as recalculating the cost box
*/
function RefreshAjaxBoxes()
{
   // load the two boxes we are using to control the UI
    getAjaxContent(0, 'hybrid.order.dl?T=ReceiveAjaxLineItems', 'lineitemsajax', 1)
    getAjaxContent(0, 'hybrid.order.dl?T=ReceiveAjaxAdd', 'additemajax', 1)
    RefreshQuantities();
}


/*
Calculates the item quantity
*/
function GetLineItemQuantity(RowID) {
    //stores the total that we calculate
    var Total = 0;
    // stores the total difference
    var DTotal = 0;
    var DamTotal = 0;
    var OQty = 0;
    var RQTY = 0;
    var DQTY = 0;
   var Max =17;
   var StartAt = 1;
   for(var itt=StartAt;itt<Max;itt++)
   {
        // reset 
        OQty = 0;
        RQTY = 0;
        DQTY = 0;

        // grab the hidden field that stores the received qty
        var item = document.getElementById("HRQTY" + RowID + itt);
        // make sure the item exists
        if (item != null) {
           // grab the received qty
           RQTY = parseInt(item.value, 10);
           // add it to the total
           Total += RQTY;           
        }
       // grab the offer qty
       item = document.getElementById("HOQTY" + RowID + itt);
       if (item != null) {
           OQty = parseInt(item.value, 10);
           TotalShipped += OQty;
       }
       // grab the dam qty
       item = document.getElementById("HDAMQTY" + RowID + itt);
       if (item != null) {
           DQTY = parseInt(item.value, 10);           
       }
     

      // calculate the difference qty
      item = document.getElementById("DQTY" + RowID + itt);
      if (item != null) {
          item.innerHTML = (RQTY - OQty).toFixed(0);
          DTotal += (RQTY - OQty);
          DamTotal += DQTY;
          TotalDamages += DQTY;
      }
     

  }
  document.getElementById("RTTLDISP" + RowID).innerHTML = Total.toFixed(0);
  document.getElementById("DTTLDISP" + RowID).innerHTML = DTotal.toFixed(0);
  document.getElementById("DAMTTLDISP" + RowID).innerHTML = DamTotal.toFixed(0);  
  return Total;
}

/*
Refreshes the individual line item costs
And also updates the total cost for the order
*/
function RefreshQuantities() {
    TotalDamages = 0;
    TotalShipped = 0;
    
    var TotalQuantity = 0;
    var Total = 0;
    var ThisItemTotal = 0;
    // get the list of all input elements
    var LineCostItterator = document.getElementsByTagName("input");
    var LastSKUID = "";
    var LastSKUQTY = 0;    
    for (var itt = 0; itt < LineCostItterator.length; itt++) {
        
        // find an item that begins with OTTL
        if (LineCostItterator[itt].id.indexOf('RTTL') == 0) {

            // now calculate the total for this line item
            
            var thisID = LineCostItterator[itt].id.substr(4, LineCostItterator[itt].id.length - 4);
            var LinkSKU = document.getElementById("LINKRTTL" + thisID).value;
            
            // have we already started on this SKU?
            if(LinkSKU != LastSKUID)
            {
                // no, so reset the val
                LastSKUQTY = 0;
                LastSKUID = LinkSKU;
            }
            ThisItemTotal = 0;            
            var ThisQTY = GetLineItemQuantity(thisID);
            LastSKUQTY += ThisQTY;                        
            TotalQuantity += ThisQTY;            
        }
    }
    document.getElementById('EXTDRTTL').innerHTML = TotalQuantity.toFixed(0);
    document.getElementById('EXTDDIFFRTTL').innerHTML = (TotalQuantity - TotalShipped).toFixed(0);
    document.getElementById('EXTDDAMRTTL').innerHTML = TotalDamages.toFixed(0);
    
}


function RefreshLineItems()
{
    getAjaxContent(0, 'hybrid.order.dl?T=ReceiveAjaxLineItems', 'lineitemsajax', 1) 
}

/* 
Cancels the add item dialog
*/
function CancelAddItem()
{
  // simply refresh to show the add interface
    getAjaxContent(0, 'hybrid.order.dl?T=ReceiveAjaxAdd', 'additemajax', 1)
}



function SelectBrand()
{
    var brand = document.getElementById('brand').value;
    if (brand == "") {
        return;
    }
    var querrystring = 'hybrid.order.dl?t=ReceiveAjaxAdd&action=brand&brand=' + brand;
    getAjaxContent(0, querrystring, 'additemajax', 1);
}

function SelectProductGroup() {
    var productgroup = document.getElementById('productgroup').value;
    if (productgroup == "") {
        return;
    }
    var querrystring = 'hybrid.order.dl?t=ReceiveAjaxAdd&action=productgroup&productgroup=' + productgroup;
    getAjaxContent(0, querrystring, 'additemajax', 1);
}


/* Processes a selected style number */
function SelectSKU()
{
      var skuid = document.getElementById('skuid').value;
      if (skuid == "")
      {
        return;
      }
    var querrystring = 'hybrid.order.dl?t=ReceiveAjaxAdd&action=add&skuid=' + skuid;
      getAjaxContent(0, querrystring, 'additemajax', 1);
      RefreshLineItems();
      RefreshQuantities();
  }


  
  function Cancel() {
      window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl?t=View';
  }

  function SaveOrder() {
      /*
      Our job is to try to prevalidate the form where possible
      Then ajax in a response to see if there was an error    
      */
      var NotReady;
      NotReady = false;
      // scroll to the top
      if (NotReady) {
          document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct all fields in red<BR>';
          scroll(0, 0);
          return false;
      }

      // if we got here, basic validation worked for everything
      var querystring;
      getAjaxResponse(0, 'hybrid.order.dl?t=Receiveajaxadd&action=prepost&' + querystring, null, 1);
      // check the response in the hidden vaue
      var response;
      response = getFormElementValue('ajaxresponse');
      if (response.indexOf('OK') == 0) {
          window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl?t=View';
      }
      else {
          document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' + response;
          scroll(0, 0);
          RefreshAjaxBoxes();
      }
      return false;
  }

  function SubmitToHybrid() {
      
      /*
      Our job is to try to prevalidate the form where possible
      Then ajax in a response to see if there was an error    
      */
      var NotReady;
      NotReady = false;
      // scroll to the top
      if (NotReady) {
          document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct all fields in red<BR>';
          scroll(0, 0);
          return false;
      }

      // if we got here, basic validation worked for everything
      var querystring;
      getAjaxResponse(0, 'hybrid.order.dl?t=Receiveajaxadd&action=SubmitToHybrid&' + querystring, null, 1);
      // check the response in the hidden vaue
      var response;
      response = getFormElementValue('ajaxresponse');
      if (response.indexOf('OK') == 0) {
          window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl?t=View';
      }
      else {
          document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' + response;
          scroll(0, 0);
          RefreshAjaxBoxes();
      }
      return false;
  }

function RemoveLineItem(itemid)
{
   getAjaxContent(0,"hybrid.order.dl?t=ReceiveAjaxLineItems&Action=Remove&SKUID=" + itemid, "lineitemsajax", 1);   
   RefreshLineItems();
   RefreshQuantities();
}

function ProcessHeaderForm() {
    /*
    Our job is to try to prevalidate the form where possible
    Then ajax in a response to see if there was an error    
    */
    var NotReady;
    NotReady = false;


    if (!validateNotEmpty('BillToName')) {
        NotReady = true;
    }
    if (!validateNotEmpty('BillToAddress')) {
        NotReady = true;
    }
    if (!validateNotEmpty('BillToCity')) {
        NotReady = true;
    }
    //    if(!validateNotEmpty('BillToZip'))
    //    {
    //        NotReady = true;
    //    }
    if (!validateNotEmpty('CancelDate')) {
        NotReady = true;
    }
    if (!validateNotEmpty('BillToPhone')) {
        NotReady = true;
    }
    if (!validateNotEmpty('ShipToName')) {
        NotReady = true;
    }
    if (!validateNotEmpty('ShipToAddress')) {
        NotReady = true;
    }
    if (!validateNotEmpty('ShipToCity')) {
        NotReady = true;
    }
    if (!validateNotEmpty('ShipToZip')) {
        NotReady = true;
    }
    if (!validateNotEmpty('StartShipDate')) {
        NotReady = true;
    }
    if (!validateNotEmpty('CancelDate')) {
        NotReady = true;
    }
    if (!validateNotEmpty('ShipVia')) {
        NotReady = true;
    }
    // conditional
    if (document.getElementById("terms").value == 'credit') {
        if (!validateNotEmpty('CCV')) {
            NotReady = true;
        }
        if (!validateNotEmpty('CreditCardNumber')) {
            NotReady = true;
        }
        if (!validateNotEmpty('ExpirationMonth')) {
            NotReady = true;
        }
        if (!validateNotEmpty('ExpirationYear')) {
            NotReady = true;
        }
    }
    if (!validateNotEmpty('CustomerPO')) {
        NotReady = true;
    }
    // scroll to the top
    if (NotReady) {
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct all fields in red<BR>';
        scroll(0, 0);
        return false;
    }

    // if we got here, basic validation worked for everything
    var querystring;
    querystring = '';
    querystring += 'CustomerPO=' + escape(getFormElementValue('CustomerPO')) + '&';
    querystring += 'BillToName=' + escape(getFormElementValue('BillToName')) + '&';
    querystring += 'BillToAddress=' + escape(getFormElementValue('BillToAddress')) + '&';
    querystring += 'BillToAddress2=' + escape(getFormElementValue('BillToAddress2')) + '&';
    querystring += 'BillToCity=' + escape(getFormElementValue('BillToCity')) + '&';
    querystring += 'BillToState=' + escape(getFormElementValue('BillToState')) + '&';
    querystring += 'BillToZip=' + escape(getFormElementValue('BillToZip')) + '&';
    querystring += 'CancelDate=' + escape(getFormElementValue('CancelDate')) + '&';
    querystring += 'BillToPhone=' + escape(getFormElementValue('BillToPhone')) + '&';
    querystring += 'ShipToName=' + escape(getFormElementValue('ShipToName')) + '&';
    querystring += 'ShipToAddress=' + escape(getFormElementValue('ShipToAddress')) + '&';
    querystring += 'ShipToAddress2=' + escape(getFormElementValue('ShipToAddress2')) + '&';
    querystring += 'ShipToCity=' + escape(getFormElementValue('ShipToCity')) + '&';
    querystring += 'ShipToState=' + escape(getFormElementValue('ShipToState')) + '&';
    querystring += 'ShipToZip=' + escape(getFormElementValue('ShipToZip')) + '&';
    querystring += 'StartShipDate=' + escape(getFormElementValue('StartShipDate')) + '&';
    querystring += 'CancelDate=' + escape(getFormElementValue('CancelDate')) + '&';
    querystring += 'terms=' + escape(getFormElementValue('terms')) + '&';
    querystring += 'CCV=' + escape(getFormElementValue('CCV')) + '&';
    querystring += 'CreditCardType=' + escape(getFormElementValue('CreditCardType')) + '&';
    querystring += 'CreditCardNumber=' + escape(getFormElementValue('CreditCardNumber')) + '&';
    querystring += 'ExpirationMonth=' + escape(getFormElementValue('ExpirationMonth')) + '&';
    querystring += 'ExpirationYear=' + escape(getFormElementValue('ExpirationYear')) + '&';
    querystring += 'ShipVia=' + escape(getFormElementValue('ShipVia')) + '&';
    querystring += 'Comments=' + escape(getFormElementValue('Comments')) + '&';
    querystring += 'CanShipEarly=' + escape(getFormElementChecked('CanShipEarly')) + '&';
    querystring += 'HoldOrder=' + escape(getFormElementChecked('HoldOrder')) + '&';
    querystring += 'BillToCountry=' + escape(getFormElementValue('BillToCountry')) + '&';
    querystring += 'CustomerDept=' + escape(getFormElementValue('CustomerDept')) + '&';
    querystring += 'CustomerOpt1=' + escape(getFormElementValue('CustomerOpt1')) + '&';
    querystring += 'CustomerOpt2=' + escape(getFormElementValue('CustomerOpt2')) + '&';
    querystring += 'CustomerOpt3=' + escape(getFormElementValue('CustomerOpt3')) + '&';
    querystring += 'LabelType=' + escape(getFormElementValue('LabelType')) + '&';
    getAjaxResponse(0, 'hybrid.order.dl?t=ajaxadd&action=prepost&' + querystring, null, 1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if (response.indexOf('OK') == 0) {
        window.location.href = '/<' + SessionID + '>/hybrid.order.dl?t=preview';
    }
    else {
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' + response;
        scroll(0, 0);
        RefreshAjaxBoxes();
    }
    return false;

}


