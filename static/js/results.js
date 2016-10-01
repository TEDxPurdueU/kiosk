// main script

// define objects
Kiosk.objects.users = new Kiosk.collections.Users();
Kiosk.objects.questions = new Kiosk.collections.Questions();
Kiosk.objects.choices = new Kiosk.collections.Choices();

// load questions and choices
Kiosk.objects.questions.fetch();
Kiosk.objects.choices.fetch();
Kiosk.objects.users.fetch({data: {eventId: Kiosk.configs.eventId}});

// setup app
Kiosk.currentUser = Kiosk.objects.users.new();
Kiosk.currentChoices = [];

// realize views
Kiosk.header = new Kiosk.views.ResultsHeader();
Kiosk.resultList = new Kiosk.views.ResultList();
Kiosk.modal = new Kiosk.views.Modal();

// attach views
$("#content").append(Kiosk.header.render().$el)
             .append(Kiosk.resultList.render().$el)
             .append(Kiosk.modal.render().$el);
