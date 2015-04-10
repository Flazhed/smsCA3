/**
 * Created by MS on 10-04-2015.
 */


$(document).ready(function(){

    $("#message").html("message set PETER jquery")

    $("#1122").click(function(){
        $("#message").html("Skinke")
    })

    $("#submitQuote").click(function(){

        setTimeout(function(){
            delayDeleting(), 500
        });

        $("#subSuccess").show();
        $("#subSuccess").html("<div class='alert alert-success' role='alert' id='succecSubmit'>Your data was saved! </div>")
        $('#subSuccess').delay(2500).fadeOut();



    });

});

function delayDeleting(){
    $("#topic").val("");
    $("#author").val("");
    $("#ref").val("");
    $("#quoteArea").val("");
}
