$.getJSON("/news", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link)
    }
});

$(document).click("p", function () {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/news/" + thisId
    }).then(function (data) {
        console.log(data);
        
    })
})