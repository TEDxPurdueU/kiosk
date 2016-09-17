/**
 * Backbone models and collections
 * 
 * - User model
 * - Users collection
 *
 * - Question model
 * - Questions collection
 *
 * - Choice model
 * - Choices collection
 *
 */

Kiosk.models.User = Kiosk.models.Base.extend({
  
    urlRoot: "/api/users",

    initialize: function() {
        this.set("eventId", Kiosk.configs.eventId);
        this.set("timestamp", new Date().getTime() / 1000);
        this.set("choices", []);
    },

    addChoices: function(choiceArray) {
        choiceArray.forEach(function(choice) {
            this.get("choices").push(choice.id);
        });

        return this;
    }

});

Kiosk.collections.Users = Kiosk.collections.Base.extend({

    url: "/api/users",

    new: function() {
        var user = new Kiosk.models.User();
        this.add(user);

        return user;
    }

});

Kiosk.models.Question = Kiosk.models.Base.extend({
  
    urlRoot: "/api/questions",

    getChoices: function() {
        var choices = Kiosk.objects.choices.where({questionId: this.id});
        return choices;
    }

});

Kiosk.collections.Questions = Kiosk.collections.Base.extend({
    
    url: "/api/questions"

});

Kiosk.models.Choice = Kiosk.models.Base.extend({

    url: "/api/choices"

});

Kiosk.collections.Choices = Kiosk.collections.Base.extend({
    
    url: "/api/choices"

});


