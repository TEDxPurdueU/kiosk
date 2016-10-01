// Backbone models and collections

Kiosk.models.User = Kiosk.models.Base.extend({

    urlRoot: "/api/users",

    initialize: function() {
        this.set("eventId", Kiosk.configs.eventId);
        this.set("timestamp", parseInt(new Date().getTime() / 1000));
        if (this.isNew()) this.set("choices", []);
    },

    addChoices: function(choiceArray) {
        var userChoicesList = this.get('choices');

        choiceArray.forEach(choice => {
            userChoicesList.push(choice);
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
    },

    model: Kiosk.models.User

});

Kiosk.models.Question = Kiosk.models.Base.extend({

    urlRoot: "/api/questions",

    initialize: function() {
        this.listenTo(Kiosk.objects.choices, 'update', this.setChoices);
    },

    setChoices: function() {
        var choices = Kiosk.objects.choices.where({questionId: this.id});
        this.set('choices', new Kiosk.collections.Choices(choices));
    }

});

Kiosk.collections.Questions = Kiosk.collections.Base.extend({

    url: "/api/questions",

    model: Kiosk.models.Question

});

Kiosk.models.Choice = Kiosk.models.Base.extend({

    url: "/api/choices"

});

Kiosk.collections.Choices = Kiosk.collections.Base.extend({

    url: "/api/choices",

    model: Kiosk.models.Choice

});
