


/*

Handle basic AJAX functions

*/
var timer;


function getFormElementValue(FormElement) 
{
    if (document.getElementById(FormElement) == null) {
        alert(FormElement);
    }
    return document.getElementById(FormElement).value;
}

function getFormElementChecked(FormElement) {
    if (document.getElementById(FormElement) == null) {
        return "";
    }
    if (document.getElementById(FormElement).checked) {
        return "1";
    }
    else {
        return "0";
    }
}


function IsEmpty(aTextField)
{
    if (aTextField.value==null)
    {
        return true;
    }        
    if(aTextField.value.length==0)
    {
        return true;
    }
    return false;
}

function validateNotEmpty(FormElementName)
{      
      if(document.getElementById(FormElementName) == null)
      {
        alert(FormElementName);
        return false;
      }
      if(IsEmpty(document.getElementById(FormElementName)))
      {
          document.getElementById(FormElementName).style.backgroundColor = '#ff0000';
          return false;
      }
      else
      {
          document.getElementById(FormElementName).style.backgroundColor = '#ffffff';
          return true;
      }      
}

function validateNumber(FormElementName)
{
      var newValue = document.getElementById(FormElementName).value;
      var isNumber = parseInt(newValue);
      if(isNaN(isNumber) || isNumber < 0)
      {
         // change the form element to red
         document.getElementById(FormElementName).style.backgroundColor = '#ff0000';
         return false;
      }
      else
      {
      document.getElementById(FormElementName).style.backgroundColor = '#ffffff';
      }
      return true;
}


/*
Simply calls an async function, but does not show the result
this is used to handle quantity updates
*/
function asyncAjaxContent(showProgress, contentURI, elementID, length) {
    if (showProgress) {
        document.getElementById("ajaxprogress").style.display = "";
    }
    var xObj = newXMLHttpRequest();
    xObj.open('GET', '/<' + SessionID + '>/' + contentURI + '&ms=' + new Date().getTime(), false);
    xObj.send(null);

}





function getAjaxContent(showProgress, contentURI, elementID, length) {
    if (showProgress) {
        document.getElementById("ajaxprogress").style.display = "";
    }
    var xObj = newXMLHttpRequest();
    xObj.open('GET', '/<' + SessionID + '>/' + contentURI + '&ms=' + new Date().getTime(), false);
    /*
    xObj.onreadystatechange=function() 
    {
    if ( xObj.readyState==4) 
    {
    if(xObj.status != 200)
    {
    alert(xObj.status);
    }
    if(showProgress)
    {
    document.getElementById("ajaxprogress").style.display ="none";
    }
    document.getElementById(elementID).innerHTML = xObj.responseText;						           			        
    }
    }	
    */
    xObj.send(null);
    if (xObj.readyState == 4) {
        if (xObj.status != 200) {
            alert(xObj.responseText);
        }
        if (showProgress) {
            document.getElementById("ajaxprogress").style.display = "none";
        }
        document.getElementById(elementID).innerHTML = xObj.responseText;
    }


}

function getAjaxResponse(showProgress, contentURI, elementID, length) {
    if (showProgress) {
        document.getElementById("ajaxprogress").style.display = "";
    }
    var xObj = newXMLHttpRequest();
    xObj.open('GET', '/<' + SessionID + '>/' + contentURI + '&ms=' + new Date().getTime(), false);
    //    xObj.onreadystatechange=function() 
    //	            {
    //	 	            if ( xObj.readyState==4) 
    //	 	            {
    //				if(xObj.status != 200)
    //				{
    //					alert(xObj.status);
    //				}
    //	 	                if(showProgress)
    //			            {
    //    			            document.getElementById("ajaxprogress").style.display ="none";
    //			            }
    //			            document.getElementById("ajaxresponse").value = xObj.responseText;						           			        
    //		            }
    //		        }	
    xObj.send(null);
    if (xObj.readyState == 4) {
        if (xObj.status != 200) {
            alert(xObj.status);
        }
        if (showProgress) {
            document.getElementById("ajaxprogress").style.display = "none";
        }
        document.getElementById("ajaxresponse").value = xObj.responseText;
    }
}



/* tries to return an xml request object */
function newXMLHttpRequest() {
    var xmlreq = false;
    if (window.XMLHttpRequest) {

        // Create XMLHttpRequest object in non-Microsoft browsers
        xmlreq = new XMLHttpRequest();

    } else if (window.ActiveXObject) {

        // Create XMLHttpRequest via MS ActiveX
        try {
            // Try to create XMLHttpRequest in later versions
            // of Internet Explorer

            xmlreq = new ActiveXObject("Msxml2.XMLHTTP");

        } catch (e1) {

            // Failed to create required ActiveXObject

            try {
                // Try version supported by older versions
                // of Internet Explorer

                xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                alert('error creating ajax');
                // Unable to create an XMLHttpRequest with ActiveX
            }

        }
    }
    return xmlreq;
}


function getMultiple(obj, value) {
    var result = "";
    var opts = obj.options;

    for (var i = 0; i < opts.length; i++) {
        var selectedOpt;
        if (opts[i].selected) {
            result += "&" + value + "=" + opts[i].value;
        }
    }
    return result;
}

function IsNumeric(input) {
    return (input - 0) == input && input.length > 0;
}

/*
-------------------------------------
Function specific to the portal
-------------------------------------
*/


function HandleTerms() {
return;
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
   for(var itt=StartAt;itt<Max;itt++)
   {
             
      var item = document.getElementById("HOQTY" + RowID +  itt );
      if (item != null) {

          Total += parseInt(item.value, 10);

      }      
  }
  document.getElementById("QTTLDISP" + RowID).innerHTML = Total.toFixed(0);  
  return Total;
}

/*
Refreshes the individual line item costs
And also updates the total cost for the order
*/
function RefreshCost() {

    var TotalQuantity = 0;
    var Total = 0;
    var ThisItemTotal = 0;
    // get the list of all input elements
    var LineCostItterator = document.getElementsByTagName("input");
    var LastSKUID = "";
    var LastSKUQTY = 0;
    var TotalCost = 0;
    for (var itt = 0; itt < LineCostItterator.length; itt++) {

        // find an item that begins with OTTL
        if (LineCostItterator[itt].id.indexOf('OTTL') == 0) {

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
    document.getElementById('EXTDOTTL').innerHTML = TotalQuantity.toFixed(0);
    document.getElementById('EXTDCOST').innerHTML = TotalCost.toFixed(2);
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



function SelectBrand()
{
    var brand = document.getElementById('brand').value;
    if (brand == "") {
        return;
    }
    var querrystring = 'hybrid.order.dl?t=AjaxAdd&action=brand&brand=' + brand;
    getAjaxContent(0, querrystring, 'additemajax', 1);
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


