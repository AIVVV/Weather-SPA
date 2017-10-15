 function headTemplate(feed) {
     var headTemplate = $('#head-template').html(),
         compile = Handlebars.compile(headTemplate),
         render = compile({ templateFeed: feed });
     $('.head-wrapper').html(render);
 }

 function bodyTemplate(feed) {
     var bodyTemplate = $('#body-template').html(),
         compile = Handlebars.compile(bodyTemplate),
         render = compile({ templateFeed: feed.days });
     $('.body-wrapper').html(render);
     $('.body-wrapper div').first().attr('class', 'col-sm-2 col-sm-offset-1 col-xs-10 col-xs-offset-1');
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
         $('.weather').addClass('show-weather');
     }, function(error) {
         errorTemplate({ templateFeed: error });
         $('#error-wrapper').attr('class','show-error-msg');
         $('.weather').removeClass('show-weather');
         headTemplate({});
         bodyTemplate({});
     });
 });

 $('#error-wrapper').click(function() {
        $(this).attr('class','hide-error-msg');
 });
