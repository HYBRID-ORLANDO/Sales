/*
 * Url preview script
 * powered by jQuery (http://www.jquery.com)
 *
 * written by Alen Grakalic (http://cssglobe.com)
 *
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */

this.screenshotPreview = function(){
    $("div.screenshot").hover(function(e){
            this.t = this.title;
            this.title = "";
            var image_url = $(this).attr("rel").replace("I.jpg","L.jpg") ;
            var c = (this.t != "") ? "<br/>" + this.t : "";
            $("#screenshot").remove();
            $("body").append("<p id='screenshot'><a src='" + $(this).attr('href')+"'><img style='width:400px;' src='"+ image_url +"' alt='url preview' /></a>"+ c +"</p>");
            var screenshot  = $("#screenshot");
            screenshot.css("top",($(this).offset().top -93 ) + "px");
            screenshot.css("left",($(this).offset().left -410) + "px");
            screenshot.stop(true,true).fadeIn("fast");
            $(this).parent().find(".quickview").fadeIn("fast");
        },
        function(){
            this.title = this.t;
            $("#screenshot").stop(true,true).fadeOut("fast");
            $(this).parent().find(".quickview").fadeOut("fast");
        });


};
function ProcessRegistrationForm()
{
    /*
     Our job is to try to prevalidate the form where possible
     Then ajax in a response to see if there was an error
     */
    var NotReady;
    NotReady = false;
    $("#registration-form input").each(function(){
        if($("#registration-form select.payment").val()==2)
        {
            if (!$(this).hasClass('optional') )
                {
                    if (!validateNotEmpty(this.id) )
                    {
                        NotReady = true;
                    }
                }
        }else{
            $("#info input").each(function(){
                if ( !$(this).hasClass('optional'))
                {
                    if (!validateNotEmpty(this.id) )
                    {
                        NotReady = true;
                    }
                }
            });
            $("#profile input").each(function(){
                if ( !$(this).hasClass('optional'))
                {
                    if (!validateNotEmpty(this.id) )
                    {
                        NotReady = true;
                    }
                }
            });
        }
    });
    //states changed
    $("#registration-form select.state").each(function(){

            if($("#registration-form select.payment").val()==2)
            {
                if (!validateNotEmpty(this.id) )
                {
                    NotReady = true;
                }
            }else{
            $("#info select.state").each(function(){
                if ( !$(this).hasClass('optional'))
                {
                    if (!validateNotEmpty(this.id) )
                    {
                        NotReady = true;
                    }
                }
            });
            $("#profile select.state").each(function(){
                if ( !$(this).hasClass('optional'))
                {
                    if (!validateNotEmpty(this.id) )
                    {
                        NotReady = true;
                    }
                }
            });
        }
    });
    $("#registration-form select.payment").each(function(){
            if (!validateNotEmpty(this.id) )
           {
               NotReady = true;
           }
    });


    if(NotReady)
    {
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct all fields in red<BR>';
        scroll(0,0);
        return false;
    }

    // if we got here, basic validation worked for everything
    var querystring;
    querystring = $("#registration-header").serialize();
    getAjaxResponse(0,'sales.register.dl?t=ajax&action=validate&' + querystring, null,1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if(response.indexOf('OK') == 0)
    {
        window.location.href =  '/<' + SessionID + '>/sales.register.dl?t=confirmation';
    }
    else
    {
        scroll(0,0);
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' +  response;
        //reload form

    }
    return false;

}
function SaveRegistrationForm()
{
    /*
     Our job is to try to prevalidate the form where possible
     Then ajax in a response to see if there was an error
     */
    var NotReady;
    NotReady = false;

    if(NotReady)
    {
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct all fields in red<BR>';
        scroll(0,0);
        return false;
    }

    // if we got here, basic validation worked for everything
    var querystring;
    querystring = $("#registration-header").serialize();
    getAjaxResponse(0,'sales.profile.dl?t=ajaxregistration&action=prepost&' + querystring, null,1);
    // check the response in the hidden vaue
    var response;
    response = getFormElementValue('ajaxresponse');
    if(response.indexOf('OK') == 0)
    {
        window.location.href =  '/<' + SessionID + '>/sales.Profile.dl?t=view';
    }
    else
    {
        scroll(0,0);
        document.getElementById('AjaxError').innerHTML = '<font color=Red size=3>Please correct the following errors:<BR>' +  response;
        //reload form
        $("#registration-form").load( "/sales.Profile.dl?t=view"+ " #registration-form");
    }
    return false;

}
function checkRegexp( o, regexp  ) {
    if ( !( regexp.test( $(o).val() ) ) ) {
        document.getElementById(o.id).style.backgroundColor = '#ff0000';

    } else {
        document.getElementById(o.id).style.backgroundColor ='#ffffff';

    }
}
function checkPass(type,msg)
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById(type);
    var pass2 = document.getElementById(type+'conf');
    //Store the Confimation Message Object ...
    var message = document.getElementById(type+'-confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match.
        //Set the color to the good color and inform
        //the user that they have entered the correct password
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = ""
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = msg
    }
}
function validateAndUpdateRegistration(FormElement) {
    if ( !$(FormElement).hasClass('optional'))
    {
        validateNotEmpty(FormElement.id);
        if ($(FormElement).hasClass('numerical'))
        {
            validateNumber(FormElement.id)
        }
        if ($(FormElement).hasClass('email'))
        {
            checkRegexp( FormElement, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
        }
        if ($(FormElement).hasClass('email-conf'))
        {
            checkPass("custemail","Emails Do Not Match");
            return;
        }
        if ($(FormElement).hasClass('pw-conf'))
        {
            checkPass("password","Passwords Do Not Match");
            return;
        }
    }
    UpdateRegistrationHeader(FormElement);
}
function validateAndUpdateProfile(FormElement) {
    if ( !$(FormElement).hasClass('optional'))
    {
        validateNotEmpty(FormElement.id);
        if ($(FormElement).hasClass('numerical'))
        {
            validateNumber(FormElement.id)
        }
        if ($(FormElement).hasClass('email'))
        {
            checkRegexp( FormElement, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
        }
        if ($(FormElement).hasClass('email-conf'))
        {
            checkPass("custemail","Emails Do Not Match");
            return;
        }
        if ($(FormElement).hasClass('pw-conf'))
        {
            checkPass("password","Passwords Do Not Match");
            return;
        }
    }
    UpdateProfileHeader(FormElement);
}
function UpdateRegistrationHeader(FormElement) {
    var newValue = $(FormElement).val();
    var querrystring = 'sales.register.dl?t=AjaxRegistration&action=update&field=' + FormElement.id+ '&Value=' + newValue;
    // this one is sent async, as long as the value is valid, we don't care much
    asyncAjaxContent(0, querrystring, 'lineitemsajax', 1);
}
function UpdateProfileHeader(FormElement) {
    var newValue = $(FormElement).val();
    var querrystring = 'sales.Profile.dl?t=AjaxRegistration&action=update&field=' + FormElement.id+ '&Value=' + newValue;
    // this one is sent async, as long as the value is valid, we don't care much
    asyncAjaxContent(0, querrystring, 'lineitemsajax', 1);
}
//hides or shows the form
function TogglePayment(){
    if ($("#PaymentMethod").val()==2)
    {
        $("#bank-optional").fadeIn();
    }
    else
    {
        $("#bank-optional").fadeOut();
    }
}
// starting the script on page load
$(document).ready(function(){
    //load cart
    var tsTimeStamp= new Date().getTime();
    $("#quickview").dialog({
        autoOpen: false,
        height: 600,
        width: 800,
		resizable:false,
        draggable:false,
        modal: true,
        close: function() {
        }
    })   ;
    //after modal box is setup we bind quickview clicks to open it
    $( ".quickview" ).each(function(){
        var CS =$(this);
        var tsTimeStamp= new Date().getTime();
        $(this).click(function(){
            $("#screenshot").hide();
            //use ajax to replace contents? then open
            var loading = $(this).attr('href');
            //loading is the href of the A tag, using ajaxadd for now to demo, href should be the quick add
            $('#quickview').load(loading+"#QuickOrder" +"&ts="+tsTimeStamp+ " #quickview-content", function(){
                var tsTimeStamp= new Date().getTime();
                $("#quickview").dialog( "open" );
            });
            return false;
        })
    });
//REGISTRATION
    $('input.email-conf').blur(
    function(){
            checkPass("custemail","Emails Do Not Match");
            return;
       });
        $('input.pw-conf').blur(function(){

            checkPass("password","Passwords Do Not Match");
            return;
        });

    // $("#registration-form ").on("blur","input",function(){
    //     validateAndUpdateRegistration(this)  ;
    // });
    // //states changed
    // $("#registration-form").on("change","select.state",function(){
    //     validateAndUpdateRegistration(this)  ;
    // });
    //payment changed
    TogglePayment();
    $("#registration-form").on("change","select.payment",function(){
        TogglePayment();
        UpdateRegistrationHeader(this);
    });
//PROFILE
    $("#profile-form ").on("blur","input",function(){
        validateAndUpdateProfile(this)  ;
    });
    //states changed
    $("#profile-form").on("change","select.state",function(){
        validateAndUpdateProfile(this)  ;
    });
    //payment changed
    TogglePayment();
    $("#profile-form").on("change","select.payment",function(){
        TogglePayment();
        UpdateProfileHeader(this);
    });

});