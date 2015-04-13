$.ajax({
    type: "GET",
    url: "http://ca3-team007.rhcloud.com/api/quote/Time",
    dataType: "json",
    success: function (data) {
      console.log('cors data',data[0]);
      data.forEach(function(item){
         $("#corsQuote").append(item.author+' - '+item.quote + '<br>')
      });
    },
    failure: function (errMsg) {

    }
});