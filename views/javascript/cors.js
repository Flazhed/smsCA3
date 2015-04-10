$.ajax({
    type: "GET",
    url: "http://ca3-team007.rhcloud.com/api/quote/Time",
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
    failure: function (errMsg) {

    }
});