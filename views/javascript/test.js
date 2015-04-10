/**
 * Created by MS on 10-04-2015.
 */


$(document).ready(function(){

    $("#qPerformSearch").click(function(){

        console.log($("#qSearch").val());

        $.ajax({
            type: "GET",
            url: "api/quote/random/" + $("#qSearch").val(),
            dataType: "json",
            success: function (data) {
                $("#qView").html('<p> <strong>Quote of the day:</strong> ' + data.quote + '</p>')
                $("#qView").append('<p> <strong>Author:</strong> ' + data.author + '</p>')
            },
            failure: function (errMsg) {

            }
        });


    });

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
