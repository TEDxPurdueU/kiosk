/**
 * Backbone views
 *
 * - Header view
 *   .header
 *
 * - QuestionList view
 *   .question-list
 *
 * - QuestionBlock view
 *   .question-block
 *
 * - Choices view
 *   .choices
 *
 * - Choice view
 *   .choice
 *
 */

Kiosk.views.Header = Kiosk.views.Base.extend({

    className: "header",

    template: `
      <div class="logo">Kiosk for ${Kiosk.configs.eventName}</div>

      <button class="complete">SUBMIT</button>
      <button class="help">HELP</button>
    `,

    events: {
        "click button.complete": "submitUser",
        "click button.help": "help"
    },

    initialize: function() {

    },

    help: function(evt) {

    },

    submitUser: function(evt) {
        Kiosk.currentUser.addChoices(Kiosk.currentChoices).save();

        Kiosk.currentUser = new Kiosk.objects.users.new();
        Kiosk.currentChoices = [];
    },

    render: function() {
        this.$el.innerHTML = this.template;

        return this;
    }

});

Kiosk.views.QuestionList = Kiosk.views.Base.extend({

    className: "question-list",

    template: `
      <div>

      </div>
    `,

    initialize: function() {

    },

    render: function() {
        this.$el.innerHTML = this.template;

        Kiosk.objects.questions.each(function(questionModel) {
            this.$el.append(new Kiosk.views.QuestionBlock({ model: questionModel }));
        }.bind(this));

        return this;
    }

});

Kiosk.views.QuestionBlock = Kiosk.views.Base.extend({

    className: "question-block",

    template: `
      <div class="question">
        ${this.model.get("text")}
      </div>
      <div class="choiceList">

      </div>
    `,

    initialize: function() {

    },

    render: function() {
        this.$el.innerHTML = this.template;

        return this;
    }

});

Kiosk.views.Choices = Kiosk.views.Base.extend({

    className: "choices",

    template: ``,

    initialize: function() {

    },

    render: function() {
        this.$el.innerHTML = this.template;

        return this;
    }

});

Kiosk.views.Choice = Kiosk.views.Base.extend({

    className: "choice",

    template: `<input type="checkbox" value="${this.model.id}"></input>
      <span>${this.model.get("value")}</span>`,

    applyTemplate: function() {
        this.template
    },

    initialize: function() {

    },

    render: function() {
        this.$el.innerHTML = this.template;

        return this;
    }

});
