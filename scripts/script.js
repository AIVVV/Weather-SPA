 function headTemplate(feed) {
     var headTemplate = $('#head-template').html(),
            compile = Handlebars.compile(headTemplate),
            render = compile({ templateFeed: feed });
     $('#head-wrapper').html(render);
 }

 function bodyTemplate(feed) {
     var bodyTemplate = $('#body-template').html(),
            compile = Handlebars.compile(bodyTemplate),
            render = compile({ templateFeed: feed.days });
     $('#body-wrapper').html(render);
 }

 function errorTemplate(feed) {
     var bodyTemplate = $('#error-template').html(),
            compile = Handlebars.compile(bodyTemplate),
            render = compile(feed);
     $('#error-wrapper').html(render);
 }

 $('#button').click(function() {
     sendRequest($('#city').val(), "GET").then(function(data) {
            headTemplate(data);
            bodyTemplate(data);
            errorTemplate({});
     }, function(error) {
            errorTemplate({ templateFeed: error });
            headTemplate({});
            bodyTemplate({});
     });
 });