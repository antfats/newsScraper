//Getting all the news from the news api link. Large json of the news
$.getJSON("/news", function (data) {
    for (var i = 0; i < data.length; i++) {


        $("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

//When you click an article, create an input and allow user to create a note. 
$(document).click("p", function () {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/news/" + thisId
    }).then(function (data) {
        console.log(data);

        $("#notes").append("<h1>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + "data._id" + "' id='savenote'>Save Note</button>");

        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.title);
        }
    });
});

//Save the note 
$(document).click("#savenote", function () {
    const thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/news/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            console.log(data);
            $("#notes").empty();
        });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
