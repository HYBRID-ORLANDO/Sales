

function SaveHeader() {
    
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
    querystring += 'CreditCardCCV=' + escape(getFormElementValue('CreditCardCCV')) + '&';
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
    getAjaxResponse(0, 'sales.order.dl?t=ajaxadd&action=saveheader&' + querystring, null, 1);
    saved = true;
}


function ProcessUploadHeaderForm() {
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
        if (!validateNotEmpty('CreditCardCCV')) {
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
    querystring += 'CreditCardCCV=' + escape(getFormElementValue('CreditCardCCV')) + '&';
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
    getAjaxResponse(0, 'sales.order.dl?t=ajaxadd&action=prepost&' + querystring, null, 1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if (response.indexOf('OK') == 0) {
        saved = true;
        window.location.href = '/<' + SessionID + '>/sales.upload.dl?t=EditFinished';
    }
    else {
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' + response;
        scroll(0, 0);
        RefreshAjaxBoxes();
    }
    return false;

}

 function ProcessHeaderForm()
{
    /*
    Our job is to try to prevalidate the form where possible
    Then ajax in a response to see if there was an error    
    */
    var NotReady;
    NotReady = false;
   
    
    if(!validateNotEmpty('BillToName'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('BillToAddress'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('BillToCity'))
    {
        NotReady = true;
    }
//    if(!validateNotEmpty('BillToZip'))
//    {
//        NotReady = true;
//    }
    if(!validateNotEmpty('CancelDate'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('BillToPhone'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('ShipToName'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('ShipToAddress'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('ShipToCity'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('ShipToZip'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('StartShipDate'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('CancelDate'))
    {
        NotReady = true;
    }
    if(!validateNotEmpty('ShipVia'))
    {
        NotReady = true;
    }
    // conditional
    if(document.getElementById("terms").value == 'credit')
    {          
        if(!validateNotEmpty('CreditCardCCV'))
        {
            NotReady = true;
        }
        if(!validateNotEmpty('CreditCardNumber'))
        {
            NotReady = true;
        }
        if(!validateNotEmpty('ExpirationMonth'))
        {
            NotReady = true;
        }
        if(!validateNotEmpty('ExpirationYear'))
        {
            NotReady = true;
        }
    }
    if(!validateNotEmpty('CustomerPO'))
    {
        NotReady = true;
    }
    // scroll to the top
    if(NotReady)
    {    
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct all fields in red<BR>';
        scroll(0,0);
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
    querystring += 'CreditCardCCV=' + escape(getFormElementValue('CreditCardCCV')) + '&';
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
    getAjaxResponse(0,'sales.order.dl?t=ajaxadd&action=prepost&' + querystring, null,1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if(response.indexOf('OK') == 0)
    {
        window.location.href =  '/<' + SessionID + '>/sales.order.dl?t=preview';
    }
    else
    {
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' +  response;
        scroll(0,0);
        RefreshAjaxBoxes();
    }
    return false;
    
}

function CopyBillToShipTo()
{
   document.getElementById('ShipToName').value = document.getElementById('BillToName').value; 
   document.getElementById('ShipToAddress').value = document.getElementById('BillToAddress').value;
   document.getElementById('ShipToAddress2').value = document.getElementById('BillToAddress2').value;
   document.getElementById('ShipToCity').value = document.getElementById('BillToCity').value;
   document.getElementById('ShipToState').value = document.getElementById('BillToState').value;
   document.getElementById('ShipToZip').value = document.getElementById('BillToZip').value;
   
}

function HandleBillToAddressBook()
{
   // grab the value of the selected entry
   var Value = getFormElementValue("BillToAddressBook");
   if(Value == -1)
   {
        // do nothing - or clear
        return; 
   }
   
   document.getElementById('BillToName').value = BillToArray[Value][0];
   document.getElementById('BillToAddress').value = BillToArray[Value][1];
   document.getElementById('BillToAddress2').value = BillToArray[Value][2];
   document.getElementById('BillToCity').value = BillToArray[Value][3];
   document.getElementById('BillToState').value = BillToArray[Value][4];
   document.getElementById('BillToZip').value = BillToArray[Value][5];
   document.getElementById('BillToPhone').value = BillToArray[Value][6];
   document.getElementById('BillToCountry').value = BillToArray[Value][7];
}

function HandleShipToAddressBook()
{
   // grab the value of the selected entry
   var Value = getFormElementValue("ShipToAddressBook");
   if(Value == -1)
   {
        // do nothing - or clear
        return; 
   }
   if(Value == -2)
   {
    CopyBillToShipTo();
    return;
   }
   document.getElementById('ShipToName').value = ShipToArray[Value][0];
   document.getElementById('ShipToAddress').value = ShipToArray[Value][1];
   document.getElementById('ShipToAddress2').value = ShipToArray[Value][2];
   document.getElementById('ShipToCity').value = ShipToArray[Value][3];
   document.getElementById('ShipToState').value = ShipToArray[Value][4];
   document.getElementById('ShipToZip').value = ShipToArray[Value][5];   
}

function getFormElementValue(FormElement)
{
    if(document.getElementById(FormElement) == null)
    {
        alert(FormElement);
    }
    return document.getElementById(FormElement).value;
}

function getFormElementChecked(FormElement)
{
    if(document.getElementById(FormElement) == null)
    {
        return "";
    }
    if(document.getElementById(FormElement).checked)
    {
        return "1";
    }
    else
    {
       return "0";
    }
}


function HandleTerms()
{
   // get the selected option
   var selectBox=document.getElementById("terms");
   switch(selectBox.value)
   {
        case "ssp":
        {
               document.getElementById("creditcardinfo").style.display ="";
               document.getElementById("checkinfo").style.display ="none";
               break;
        }  
        case "wiretr":
        {
              document.getElementById("creditcardinfo").style.display ="none";
              document.getElementById("checkinfo").style.display ="";
              document.getElementById("CreditCardNumber").value="";
              document.getElementById("CreditCardNumbertxt").value="";
              document.getElementById("ExpirationMonth").value="";
              document.getElementById("ExpirationYear").value="";
              document.getElementById("CreditCardCCV").value="";
              break;
        }
        default:
        {
             // hide all suboptions
             document.getElementById("creditcardinfo").style.display ="none";
             document.getElementById("checkinfo").style.display ="none";
             document.getElementById("CreditCardNumber").value="";
             document.getElementById("CreditCardNumbertxt").value="";
             document.getElementById("ExpirationMonth").value="";
             document.getElementById("ExpirationYear").value="";
             document.getElementById("CreditCardCCV").value="";
             break;
        }           
   }
//   if(selectBox.value == "credit")
//   {
//       document.getElementById("creditcardinfo").style.display ="";
//   }
//   else
//   {
//      document.getElementById("creditcardinfo").style.display ="none";
//   }
   // hide/show 
}



function ProcessQuickAddLineItem() {
    // grab all input boxes and only work on ones whose
    // names start with additemX
    var itemstovalidate = document.getElementsByTagName("input");
    var querystring;
    querystring = "";
    for (var i = 0; i < itemstovalidate.length; i++) {
        if (itemstovalidate[i].id.indexOf('additem') == 0) {
            // we don't allow us to go forward if we fail
            // validation
            if (!validateNumber(itemstovalidate[i].id)) {
                // we don't allow us to go forward if we fail
                // validation
                return;
            }
            // if we got here the number is good
            // build the query string, we would like to send
            querystring += itemstovalidate[i].id + '=' + itemstovalidate[i].value + '&';
        }
    }
    getAjaxResponse(0, 'Sales.ShoppingCanvas.dl?t=OrderLineItemPost&' + querystring, null, 1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if (response.indexOf('OK') == 0)
    {
        $("#quickview").dialog("close");
        var tsTimeStamp= new Date().getTime();
        location.reload(); 
    }
    else {
        document.getElementById('ajaxresponse').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' + response;                
    }
    // post the update 
}



/*
Handles validating and finally submitting a request to
add a style to an order
*/
function ProcessAddLineItem()
{  
  // grab all input boxes and only work on ones whose
  // names start with additemX
  var itemstovalidate=document.getElementsByTagName("input");
  var querystring;
  querystring = "";
  for (var i=0; i<itemstovalidate.length; i++) 
  {    
        if(itemstovalidate[i].id.indexOf('additem') == 0)
        {   
            // we don't allow us to go forward if we fail
            // validation
            if(!validateNumber(itemstovalidate[i].id))
            { 
              // we don't allow us to go forward if we fail
              // validation
              return;
            }
            // if we got here the number is good
            // build the query string, we would like to send
            querystring += itemstovalidate[i].id +  '=' + itemstovalidate[i].value + '&';
        }    
  }
  // post the update 
  getAjaxContent(0, 'sales.order.dl?t=AjaxAdd&action=postadd&' + querystring ,'additemajax',1);
  RefreshAjaxBoxes();  
  RefreshCost();
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

function UpdateHeader(FormElementName) {
    var newValue = document.getElementById(FormElementName).value;
    var querrystring = 'sales.order.dl?t=AjaxLineItems&action=updateHeader&field=' + FormElementName + '&Value=' + newValue;
    // this one is sent async, as long as the value is valid, we don't care much
    asyncAjaxContent(0, querrystring, 'lineitemsajax', 1);
}

function validateNotEmptyAndUpdateHeader(FormElementName) {

    // do the gui bit
    validateNotEmpty(FormElementName);
    UpdateHeader(FormElementName);
      

}

function validateNotEmpty(FormElementName)
{      
      if(document.getElementById(FormElementName) == null)
      {
//        alert(FormElementName);
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
Handles updating a line item, we track the original value so that  we don't
do updates when the user is just tabbing through the interface
*/
function PerformLineItemUpdate(ColumnID,RowID,FormElementName,OriginalValue)
{      

      // grab the current value
      var newValue = document.getElementById(FormElementName).value;
      var oldValue = document.getElementById(OriginalValue).value;
      // do basic number validation
      //alert(newValue);
      var isNumber = parseInt(newValue);
      if(isNaN(isNumber) || isNumber < 0)
      {
         alert('Please enter a valid quantity!');
         // set the value back to what it was
         document.getElementById(FormElementName).value = document.getElementById(OriginalValue).value;
         // get out
         return;
      }
      // check if the value has changed (if not we don't want to perform an update)           
      if(newValue == oldValue)
      {      
         //alert('the value has not changed');
         return;
      }
      else
      {
        // update the hidden text value so we don't update everytime the user tabs through
        document.getElementById(OriginalValue).value = newValue;
      }
      var querrystring='sales.order.dl?t=AjaxLineItems&action=update&RowID=' + RowID + '&Value=' + newValue + '&ColumnID=' + ColumnID;
      // this one is sent async, as long as the value is valid, we don't care much
      asyncAjaxContent(0, querrystring ,'lineitemsajax',1);
      RefreshCost();
}

var timer;

function SearchCustomer()
{
    clearTimeout(timer);
    timer = setTimeout("RefreshCustomerAjaxBoxes()",750);
    //RefreshCustomerAjaxBoxes();
}

function SearchStyle() {
    clearTimeout(timer);
    timer = setTimeout("RefreshStyleAjaxBoxes()", 750);
    //RefreshCustomerAjaxBoxes();
}

/*
This functions refreshes the line items and add line item box, as well
as recalculating the cost box
*/
function RefreshAjaxBoxes()
{
   // load the two boxes we are using to control the UI
   getAjaxContent(0, 'sales.order.dl?T=AjaxLineItems' ,'lineitemsajax',1)
   //getAjaxContent(0, 'sales.order.dl?T=AjaxAdd' ,'additemajax',1)
   RefreshCost();
}

function RefreshCustomerAjaxBoxes()
{ 
  clearTimeout(timer)
  var Customer;
  var element = document.getElementById('Customer');
  if(element == null)
  {
    Customer = '';
  }
  else
  {
    Customer = element.value;
  }
  getAjaxContent(0, 'sales.Customer.dl?T=SelectCustomerAjax&Customer=' + Customer ,'selectcustomerajax',1)
}

function RefreshStyleAjaxBoxes() {
    clearTimeout(timer)
    var Style;
    var element = document.getElementById('Style');
    if (element == null) {
        Style = '';
    }
    else {
        Style = element.value;
    }
    getAjaxContent(0, 'sales.Customer.dl?T=SelectStyleAjax&Style=' + Customer, 'selectstyleajax', 1)
}

/*
Returns the UofM of a line item
*/
function GetLineItemUofM(RowID)
{
   var item = document.getElementById("UOFM" + RowID);
   return parseInt(item.value,10);    
}

/*
Calculates the item quantity
*/
function GetLineItemQuantity(RowID)
{    
   
   var Total = 0;
   var Max =12;
   var StartAt = 1;
   for(var itt=StartAt;itt<Max;itt++)
   {
        // go until we hit 
    
      var item = document.getElementById("HQTY" +  itt + RowID);
      if(item == null)
      {
         document.getElementById("LINEQTY" + RowID).innerHTML = Total.toFixed(0);
         return Total;
      }
      Total += parseInt(item.value,10);
  }
  document.getElementById("LINEQTY" + RowID).innerHTML = Total.toFixed(0);
  return Total;
}

/*
Refreshes the individual line item costs
And also updates the total cost for the order
*/
function RefreshCost()
{
  var TotalQuantity = 0;
  var Total = 0;
  var ThisItemTotal = 0;
  var LineCostItterator = document.getElementsByTagName("input");
  for(var itt=0;itt<LineCostItterator.length;itt++)
  {
      // check if the ID starts with LINECOST
     if(LineCostItterator[itt].id.indexOf('LINECOST') == 0)
     {
        ThisItemTotal = 0;
        var thisID = LineCostItterator[itt].id.substr(8,LineCostItterator[itt].id.length-8);
        // now grab the line item cost value
        var ThisCost = LineCostItterator[itt].value;
        var ThisQTY = GetLineItemQuantity(thisID);
        
        var ThisUofM = GetLineItemUofM(thisID);
        TotalQuantity += ThisQTY * ThisUofM;
        Total += ((ThisQTY * ThisUofM )  * ThisCost);
        // now calculate the quantity for line items total
        document.getElementById('LINEEXTDCOST' + thisID).innerHTML = "$" + (ThisQTY  * ThisUofM * ThisCost).toFixed(2);        
     }
  }  
    document.getElementById('EXTDCOST').innerHTML = "$" + Total.toFixed(2);
    if(TotalQuantity<OrderMinimum)
    {
        document.getElementById('ordererror').style.display = '';    
    }
    else
    {
        document.getElementById('ordererror').style.display = 'none';    
    }
}


function RefreshLineItems()
{
   getAjaxContent(0, 'sales.order.dl?T=AjaxLineItems' ,'lineitemsajax',1) 
}

/* 
Cancels the add item dialog
*/
function CancelAddItem()
{
  // simply refresh to show the add interface
  getAjaxContent(0, 'sales.order.dl?T=AjaxAdd' ,'additemajax',1)
}

function SelectDivision()
{
    var division = document.getElementById('division').value;
    if (division == "") {
        return;
    }
    var querrystring = 'sales.order.dl?t=AjaxAdd&action=division&division=' + division;
    getAjaxContent(0, querrystring, 'additemajax', 1);
}

/* Processes a selected style number */
function SelectStyleNumber()
{
      var style = document.getElementById('stylenumber').value;
      if(style == "")
      {
        return;
      }
      var querrystring='sales.order.dl?t=AjaxAdd&action=color&stylenumber=' + style;
      getAjaxContent(0, querrystring ,'additemajax',1);
}

function SelectColor()
{
      var color = document.getElementById('color').value;
      if(color == "")
      {
        return;
      }
      var querrystring='sales.order.dl?t=AjaxAdd&action=add&color=' + color;
      getAjaxContent(0, querrystring ,'additemajax',1);
      /*RefreshAjaxBoxes();*/
}



function getMultiple(obj,value)
{
    var result = "";        
    var opts = obj.options;
  
    for (var i=0; i<opts.length; i++) 
        {
            var selectedOpt;
            if (opts[i].selected) 
            {
                result += "&" + value + "=" + opts[i].value;
            }       
        }
    return result;
} 

function RemoveLineItem(itemid)
{
   getAjaxContent(0,"sales.order.dl?t=AjaxLineItems&Action=Remove&ID=" + itemid, "lineitemsajax", 1);   
   RefreshLineItems();
   RefreshCost();
}

/*
Simply calls an async function, but does not show the result
this is used to handle quantity updates
*/
function asyncAjaxContent(showProgress, contentURI,elementID,length) 
{  
    if(showProgress)
    {
        document.getElementById("ajaxprogress").style.display = "";
    }
    var xObj = newXMLHttpRequest();
    xObj.open('GET', '/<' + SessionID + '>/' + contentURI + '&ms=' + new Date().getTime(),false);    		        		        
	xObj.send(null);	 
 
} 





function getAjaxContent(showProgress, contentURI,elementID,length) 
{  
    if(showProgress)
    {
        document.getElementById("ajaxprogress").style.display = "";
    }
    var xObj = newXMLHttpRequest();
    xObj.open('GET', '/<' + SessionID + '>/' + contentURI + '&ms=' + new Date().getTime(),false);
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
	if ( xObj.readyState==4) 
	 	            {
				if(xObj.status != 200)
				{
				    alert(xObj.responseText);
				}
	 	                if(showProgress)
			            {
    			            document.getElementById("ajaxprogress").style.display ="none";
			            }
			            document.getElementById(elementID).innerHTML = xObj.responseText;						           			        
		            }
		        	 
		
} 

function getAjaxResponse(showProgress, contentURI,elementID,length) 
{  
    if(showProgress)
    {
        document.getElementById("ajaxprogress").style.display = "";
    }
    var xObj = newXMLHttpRequest();
    xObj.open('GET', '/<' + SessionID + '>/' + contentURI + '&ms=' + new Date().getTime(),false);
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
      } catch (e2) {alert('error creating ajax');
        // Unable to create an XMLHttpRequest with ActiveX
      }

  }
 }
  return xmlreq;
}

function SendOrderEmail()
{
    var querystring;
    querystring = 'Email=' + escape(getFormElementValue('EmailOrderTo')) + '&Note=' + escape(getFormElementValue('note')) ;   
    getAjaxResponse(0,'sales.order.dl?t=ajaxEmailOrder&' + querystring, null,1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if(response.indexOf('OK') == 0)
    {       
        document.getElementById('EmailResult').innerHTML = '<font color=Red size=3> Email sent.</font><BR>';
    }
    else
    {
        document.getElementById('EmailResult').innerHTML = '<font color=Red size=3>' +  response + '</font><BR>';
    }
    return false;
}

function SendInvoiceEmail() {
    var querystring;
    querystring = 'Email=' + escape(getFormElementValue('EmailInvoiceTo')) + '&invoiceid=' + escape(getFormElementValue('invoiceid')) + '&Note=' + escape(getFormElementValue('invoicenote')) ;
    
    getAjaxResponse(0, 'sales.order.dl?t=ajaxEmailInvoice&' + querystring, null, 1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if (response.indexOf('OK') == 0) {
        document.getElementById('EmailInvoiceResult').innerHTML = '<font color=Red size=3> Email sent.</font><BR>';
    }
    else {
        document.getElementById('EmailInvoiceResult').innerHTML = '<font color=Red size=3>' + response + '</font><BR>';
    }
    return false;
}


 
function ShowEmailOrderForm()
{
document.getElementById("EmailOrderForm").style.display ="";
}

function HideEmailOrderForm()
{
document.getElementById("EmailOrderForm").style.display ="none";
}


function ShowEmailInvoiceForm() {
    document.getElementById("EmailInvoiceForm").style.display = "";
}

function HideEmailInvoiceForm() {
    document.getElementById("EmailInvoiceForm").style.display = "none";
}

function SaveItem(LinkItem) {
	var inputItems = document.getElementsByTagName("input");
	var selectItems = document.getElementsByTagName("select");
	var querystring = "";
	//Assemble the querystring
	for (var i = 0; i < inputItems.length; i++)
	{
		if ((inputItems[i].type == "checkbox")&&(inputItems[i].checked == 1))
		{
			querystring += '&' + inputItems[i].name + '=checked'
		}		
		else if (inputItems[i].type == "checkbox")
		{
			querystring += '&' + inputItems[i].name + '=false'
		}
		else
		{
			querystring += '&' + inputItems[i].name + '=' + inputItems[i].value;
		}	

	}
	for (var i = 0; i < selectItems.length; i++)
	{
		querystring += '&' + selectItems[i].name + '=' + selectItems[i].value;

	}
	if (querystring == null) {querystring = "";}

	getAjaxResponse(0, 'Sales.Admin.dl?t=EditItem&LinkItem=' + LinkItem + querystring, null, 1);
    	// check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if (response.indexOf('OK') == 0)
    {
        $("#quickview").dialog("close");
        var tsTimeStamp= new Date().getTime();
        location.reload(); 
    }
    else {
        document.getElementById('ajaxresponse').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' + response;                
    }




}

function CheckMultiples(Multiple)
{
	var ElementID = 'test';
	document.getElementById('total').value = 0;
	var inputItems = document.getElementsByTagName("input");
	//Assemble the querystring
	for (var i = 0; i < inputItems.length; i++)
	{	

		if (inputItems[i].id.indexOf('additem') != -1)
		{
			document.getElementById('total').value = parseInt(document.getElementById('total').value) + parseInt(inputItems[i].value);
		}		

	}
	if (parseInt(document.getElementById('total').value) > 0)
	{
		if (parseInt(document.getElementById('total').value) % Multiple > 0)
		{
			document.getElementById('totalmessage').innerHTML = '<span style="font-size:8pt;font-weight:bold;color:red;">X</span>';
		}
		else
		{
			document.getElementById('totalmessage').innerHTML = '<span style="font-size:8pt;font-weight:bold;color:green;">OK</span>';
		}

	}
	else
	{
		document.getElementById('totalmessage').innerHTML = "&nbsp;";
	}	

}
