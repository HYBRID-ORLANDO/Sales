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
    $(".calendar a").addClass("screenshot");
	$(".calendar a").each(function(){
		this.rel=$(this).find("img").attr("src");
	});
    $("a.screenshot").hover(function(e){
            this.t = this.title;
            this.title = "";
            var image_url = this.rel.replace("I.jpg","L.jpg") ;
            var c = (this.t != "") ? "<br/>" + this.t : "";
            $("#screenshot").remove();
            $("body").append("<p id='screenshot'><a src='" + $(this).attr('href')+"'><img style='width:400px;' src='"+ image_url +"' alt='url preview' /></a>"+ c +"</p>");
            var screenshot  = $("#screenshot");
            screenshot.css("top",($(this).offset().top -93 ) + "px");
            screenshot.css("left",($(this).offset().left -410) + "px");
            screenshot.stop(true,true).fadeIn("slow");
            $(this).find(".quickview").show();
        },
        function(){
            this.title = this.t;
            $("#screenshot").stop(true,true).remove();
            $(this).find(".quickview").hide();
        });
    $("a.screenshot").css('cursor','default');

};


// starting the script on page load
$(document).ready(function(){
    //init previews
    screenshotPreview();

    //init modal, and configs
    $("#quickview").dialog({
        autoOpen: false,
        height: 400,
        width: 1600,
		resizable:false,
        draggable:false,
        modal: true,
        buttons: {
            "Add To Cart": function() {
                //submit for add to card here+validation
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {

        }
    })   ;
    //after modal box is setup we bind quickview clicks to open it
    $( ".quickview" ).each(function(){
        var CS =$(this);
        var tsTimeStamp= new Date().getTime();
        $(this).click(function(){
            //use ajax to replace contents? then open
            var loading = $(this).attr('href');
            //loading is the href of the A tag, using ajaxadd for now to demo, href should be the quick add
            $('#quickview').load("./hybrid.Wholesale.dl?T=AjaxAdd"+"&ts="+tsTimeStamp, function(){
                var tsTimeStamp= new Date().getTime();
                $("#quickview").dialog( "open" );
            });
            return false;
        })
    });


});