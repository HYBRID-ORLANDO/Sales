
/*
-------------------------------------
Function specific to the portal
-------------------------------------
*/


function HandleTerms() {
return;
}

function showMyOverlay()
            {
                document.getElementById('overlay_msg').style.visibility='visible';
            }
            function hideMyOverlay()
            {
                document.getElementById('overlay_msg').style.visibility='hidden';               
            }




function PerformLineItemCostUpdate(SKUID, FormElementName, OriginalValue) {
       
    //console.log(FormElementName);
    //console.log(OriginalValue);
    //console.log(SKUID);   
    var newValue = document.getElementById(FormElementName).value;
    var oldValue = document.getElementById(OriginalValue).value;
    //console.log(newValue);
    //console.log(oldValue);
    // do basic number validation
    //= parseFloat(newValue);
    if(!IsNumeric(newValue) || parseFloat(newValue) < 0)   
    {
        alert('Please enter a valid price!');
        // set the value back to what it was
        document.getElementById(FormElementName).value = document.getElementById(OriginalValue).value;
        // get out
        return;
    }
    else {
        // update the hidden text value so we don't update everytime the user tabs through
        //document.getElementById(OriginalValue).value = newValue;
        document.getElementById(OriginalValue).value = parseFloat(newValue).toFixed(2);
        document.getElementById(FormElementName).value = parseFloat(newValue).toFixed(2);
        
    }
    var querrystring = 'hybrid.order.dl?t=AjaxLineItems&action=updateprice&skuid=' + SKUID + '&Value=' + newValue;
    // this one is sent async, as long as the value is valid, we don't care much
    asyncAjaxContent(0, querrystring, 'lineitemsajax', 1);
    RefreshCost();
}

/*
Handles updating a line item, we track the original value so that  we don't
do updates when the user is just tabbing through the interface
*/
function PerformLineItemUpdate(SKUID, ColumnID, RowID, FormElementName, OriginalValue) {

    //console.log('got here');
    //console.log(ColumnID);
    //console.log(RowID);
    //console.log(FormElementName);
    //console.log(OriginalValue);
    //console.log(SKUID);

    // before we do something, make sure this is editable
    var sz = document.getElementById('CSZ' + SKUID + ColumnID).value;
    //console.log(sz);
    if (sz.length == 0) {
        //console.log('cancel edit');
        document.getElementById(FormElementName).value = "";
        return;
    }

    // grab the current value
    var newValue = document.getElementById(FormElementName).value;
    var oldValue = document.getElementById(OriginalValue).value;
    //console.log(newValue);
    //console.log(oldValue);
    // do basic number validation
    //alert(newValue);
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
        //console.log('value not changed');
        return;
    }
    else {
        // update the hidden text value so we don't update everytime the user tabs through
        document.getElementById(OriginalValue).value = newValue;
    }
    var querrystring = 'hybrid.order.dl?t=AjaxLineItems&action=update&RowID=' + RowID + '&Value=' + newValue + '&ColumnID=' + ColumnID;
    // this one is sent async, as long as the value is valid, we don't care much
    asyncAjaxContent(0, querrystring, 'lineitemsajax', 1);
    RefreshCost();
}


/*
This functions refreshes the line items and add line item box, as well
as recalculating the cost box
*/
function RefreshViewOrder() {
   
    RefreshCost();
}
/*
This functions refreshes the line items and add line item box, as well
as recalculating the cost box
*/
function RefreshAjaxBoxes()
{
   // load the two boxes we are using to control the UI
   getAjaxContent(0, 'hybrid.order.dl?T=AjaxLineItems' ,'lineitemsajax',1)
   getAjaxContent(0, 'hybrid.order.dl?T=AjaxAdd' ,'additemajax',1)
   RefreshCost();
}


/*
Calculates the item quantity
*/
function GetLineItemQuantity(RowID) {    
   var Total = 0;
   var Max =17;
   var StartAt = 1;
   if (RowID == 21) {
       //console.log("Row ID 21 hit");
   }
   for(var itt=StartAt;itt<Max;itt++)
   {
             
      var item = document.getElementById("HOQTY" + RowID +  itt );
      if (item != null) {
          if (RowID == 21) {
              //console.log(parseInt(item.value, 10));
          }
          Total += parseInt(item.value, 10);

      }
      else {
          //console.log(itt);
          //console.log("was null");
      }
  }
  if (RowID == 21) {
      console.log("Row ID 21 done");
      console.log(Total);
  }
  document.getElementById("QTTLDISP" + RowID).innerHTML = Total.toFixed(0);  
  return Total;
}

/*
Refreshes the individual line item costs
And also updates the total cost for the order
*/
function RefreshCost() {

    console.log("starting");
    var TotalQuantity = 0;
    var Total = 0;
    var ThisItemTotal = 0;
    // get the list of all input elements
    var LineCostItterator = document.getElementsByTagName("input");
    var LastSKUID = "";
    var LastSKUQTY = 0;
    var TotalCost = 0;
    for (var itt = 0; itt < LineCostItterator.length; itt++) {
        console.log(LineCostItterator[itt].id);

        // find an item that begins with OTTL
        if (LineCostItterator[itt].id.indexOf('OTTL') == 0) {

            //console.log(LineCostItterator[itt].id);
            // now calculate the total for this line item

            var thisID = LineCostItterator[itt].id.substr(4, LineCostItterator[itt].id.length - 4);
            var LinkSKU = document.getElementById("LINKOTTL" + thisID).value;
            var LinkCOST = document.getElementById("HCOST" + LinkSKU).value;
            // have we already started on this SKU?
            if(LinkSKU != LastSKUID)
            {
                // no, so reset the val
                LastSKUQTY = 0;
                LastSKUID = LinkSKU;
            }
            ThisItemTotal = 0;
            // now grab the line item cost value
            //var ThisCost = LineCostItterator[itt].value;
            var ThisQTY = GetLineItemQuantity(thisID);
            TotalCost += ThisQTY * LinkCOST;
            LastSKUQTY += ThisQTY;
            document.getElementById("LINKOTTLDISP" + LinkSKU).innerHTML = LastSKUQTY.toFixed(0);
            document.getElementById("LINKOTTLCOST" + LinkSKU).innerHTML = (LastSKUQTY * LinkCOST).toFixed(2);
            TotalQuantity += ThisQTY;            
        }
    }
    //document.getElementById('EXTDOTTL').innerHTML = TotalQuantity.toFixed(0);
    //document.getElementById('EXTDCOST').innerHTML = TotalCost.toFixed(2);
    console.log("ending");
}


function RefreshLineItems()
{
   getAjaxContent(0, 'hybrid.order.dl?T=AjaxLineItems' ,'lineitemsajax',1) 
}

/* 
Cancels the add item dialog
*/
function CancelAddItem()
{
  // simply refresh to show the add interface
  getAjaxContent(0, 'hybrid.order.dl?T=AjaxAdd' ,'additemajax',1)
}


//ORLANDO
function SelectOption(FormAction)
{

	showMyOverlay()

    var Details = 50;
    
    var customer = document.getElementById('customer').value;
    if (customer == "") {
        return;
    }
    var printer = document.getElementById('printer').value;
    if (printer == "") {
        return;
    }
  
    var blankstyle = document.getElementById('blankstyle').value;
    if (blankstyle == "") {
        return;
    }

    var color = document.getElementById('color').value;
    if (color == "") {
        return;
    }
   var colordye = "";
   if (document.getElementById('colordye').checked == true) {
       colordye = "1";
   }

   var requestedfor = document.getElementById('requestedfor').value;
   if (requestedfor == "") {
       return;
   }

   //var t14d = document.getElementById('t14d').value;
   //var t15d = document.getElementById('t15d').value;
   //var t16d = document.getElementById('t16d').value;

    //var othertreatment = document.getElementById('othertreatment').value;
    //var printfrontcustomwidth = document.getElementById('printfrontcustomwidth').value;
    //var printfrontcustomtall = document.getElementById('printfrontcustomtall').value;
    //var printbackcustomwidth = document.getElementById('printbackcustomwidth').value;
    //var printbackcustomtall = document.getElementById('printbackcustomtall').value;
    
    var duedate = document.getElementById('duedate').value;
    var comments = document.getElementById('comments').value;
    var permanentcomments = document.getElementById('permanentcomments').value;
    var assignedtoid = document.getElementById('assignedtoid').value;
    if (assignedtoid == "") {
        return;
    }

    var s01 = document.getElementById('s01').value;
    if (s01 == "") {
        return;
    }
    var s02 = document.getElementById('s02').value;
    if (s02 == "") {
        return;
    }
    var s03 = document.getElementById('s03').value;
    if (s03 == "") {
        return;
    }
    var s04 = document.getElementById('s04').value;
    if (s04 == "") {
        return;
    }
    var s05 = document.getElementById('s05').value;
    if (s05 == "") {
        return;
    }
    var s06 = document.getElementById('s06').value;
    if (s06 == "") {
        return;
    }
    var s07 = document.getElementById('s07').value;
    if (s07 == "") {
        return;
    }
    var s08 = document.getElementById('s08').value;
    if (s08 == "") {
        return;
    }
    var s09 = document.getElementById('s09').value;
    if (s09 == "") {
        return;
    }
    var s10 = document.getElementById('s10').value;
    if (s10 == "") {
        return;
    }
    var s11 = document.getElementById('s11').value;
    if (s11 == "") {
        return;
    }
    var s12 = document.getElementById('s12').value;
    if (s12 == "") {
        return;
    }

    var valuename = "";
    var querystring = 'hybrid.order.dl?t=AjaxAdd&action=' + FormAction + '&requestedfor=' + requestedfor + '&printer=' + printer + '&customer=' + customer;
    for (i = 1; i <= Details; i = i + 1) {
        //ADD THE INTEGER NAME TO THE QUERY STRING
        querystring = querystring + '&' + 'D';
        valuename = "";
        if (i < 10) {
            querystring = querystring + '0';
            valuename = "0";   
        }
        querystring = querystring + i + "I=";
        valuename = valuename + i + "I";
        
        //ADD THE INTEGER VALUE TO THE QUERY STRING
        if (document.getElementById('D' + valuename).checked == true) {
            querystring = querystring + "1";
        }
        else {
            querystring = querystring + document.getElementById('D' + valuename).value;
        }

        //ADD THE TEXT NAME TO THE QUERY STRING
        querystring = querystring + '&' + 'D';
        valuename = "";
        if (i < 10) {
            querystring = querystring + '0';
            valuename = "0";
        }
        querystring = querystring + i + "T=";
        valuename = valuename + i + "T";
        
        //ADD THE INTEGER VALUE TO THE QUERY STRING
        querystring = querystring + document.getElementById('D' + valuename).value;

    }
    
    
    
    //'&stylename=' + stylename + '&stylenumber=' + stylenumber + '&artfilenumber=' + artfilenumber + '&printfront=' + printfront + '&printback=' + printback +
    //'&printfrontcustomwidth=' + printfrontcustomwidth + '&printfrontcustomtall=' + printfrontcustomtall + '&printbackcustomwidth=' + printbackcustomwidth +
    //'&printbackcustomtall=' + printbackcustomtall + '&padprint=' + padprint + '&t01=' + t01 + '&t02=' + t02 + '&t03=' + t03 + '&t04=' + t04 + '&t05=' + t05 +
    //'&t06=' + t06 + '&t07=' + t07 + '&t08=' + t08 + '&t09=' + t09 + '&t10=' + t10 + '&t11=' + t11 + '&t12=' + t12 + '&t13=' + t13 + '&t14=' + t14 +
    //'&t15=' + t15 + '&t16=' + t16 + '&t17=' + t17 + '&t18=' + t18 + '&t19=' + t19 + '&t20=' + t20 + '&othertreatment=' + othertreatment +
    //'&t14d=' + t14d + '&t15d=' + t15d + '&t16d=' + t16d + 
    querystring = querystring + '&duedate=' + duedate + '&comments=' + comments + '&blankstyle=' + blankstyle + '&color=' + color +
    '&colordye=' + colordye + '&s01=' + s01 + '&s02=' + s02 + '&s03=' + s03 + '&s04=' + s04 + '&s05=' + s05 + '&s06=' + s06 + '&s07=' + s07 + '&s08=' + s08 + '&s09=' + s09 +
    '&s10=' + s10 + '&s11=' + s11 + '&s12=' + s12 + '&assignedtoid=' + assignedtoid + '&permanentcomments=' + permanentcomments;
    //'&t01=&t02=&t03=&t04=


    getAjaxContent(0, querystring, 'additemajax', 1);

    //getAjaxResponse(0, querystring, 'additemajax', 1);
    // check the response in the hidden vaue
    
    if (FormAction == 'delete') {
        //ON DELETE GO BACK TO THE DASHBOARD
        window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl';
    }
    else if (getFormElementValue('SUBMITSTATUS') == 'OK') {
        window.location.href = '/<' + SessionID + '>/hybrid.order.dl?t=Retreive&OrderID=' + getFormElementValue('ORDERID');    
    }

    //else {
        //document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' + response;
        //scroll(0, 0);
      //  RefreshAjaxBoxes();
    //}  
   // return;
}

function SelectProductGroup() {
    var productgroup = document.getElementById('productgroup').value;
    if (productgroup == "") {
        return;
    }
    var querrystring = 'hybrid.order.dl?t=AjaxAdd&action=productgroup&productgroup=' + productgroup;
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
      var querrystring = 'hybrid.order.dl?t=AjaxAdd&action=add&skuid=' + skuid;
      getAjaxContent(0, querrystring, 'additemajax', 1);
      RefreshLineItems();
      RefreshCost();
  }


  function AcceptOffer() {
      // if we got here, basic validation worked for everything
      var querystring;
      getAjaxResponse(0, 'hybrid.order.dl?t=ajaxadd&action=AcceptOrder&' + querystring, null, 1);
      // check the response in the hidden vaue
      window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl';
      return false;
  }

  function RejectOffer() {
      // if we got here, basic validation worked for everything
      var querystring;
      getAjaxResponse(0, 'hybrid.order.dl?t=ajaxadd&action=RejectOrder&' + querystring, null, 1);
      // check the response in the hidden vaue
      window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl';
      return false;
  }

  function SendBackToFactory() {
      // if we got here, basic validation worked for everything
      var querystring;
      getAjaxResponse(0, 'hybrid.order.dl?t=ajaxadd&action=SendBackToFactory&' + querystring, null, 1);
      window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl';
      return false;
  }

  function MarkInWarehouse() {
      // if we got here, basic validation worked for everything
      var querystring;
      getAjaxResponse(0, 'hybrid.order.dl?t=ajaxadd&action=MarkInWarehouse&' + querystring, null, 1);
      window.location.href = '/<' + SessionID + '>/hybrid.homepage.dl';
      return false;
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
      getAjaxResponse(0, 'hybrid.order.dl?t=ajaxadd&action=prepost&' + querystring, null, 1);
      // check the response in the hidden vaue
      var response;
      response = getFormElementValue('ajaxresponse');
      if (response.indexOf('OK') == 0) {
          window.location.href = '/<' + SessionID + '>/hybrid.order.dl?t=PostOrderConfirmation';
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
      getAjaxResponse(0, 'hybrid.order.dl?t=ajaxadd&action=SubmitToHybrid&' + querystring, null, 1);
      // check the response in the hidden vaue
      var response;
      response = getFormElementValue('ajaxresponse');
      if (response.indexOf('OK') == 0) {
          window.location.href = '/<' + SessionID + '>/hybrid.order.dl?t=PostOrderConfirmation';
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
   getAjaxContent(0,"hybrid.order.dl?t=AjaxLineItems&Action=Remove&SKUID=" + itemid, "lineitemsajax", 1);   
   RefreshLineItems();
   RefreshCost();
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


