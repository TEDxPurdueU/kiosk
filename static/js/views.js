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
      <div class="logo">Kiosk <span class="eventName">for ${Kiosk.configs.eventName}</span></div>

      <button class="complete colored">SUBMIT</button>
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

        Kiosk.currentUser = Kiosk.objects.users.new();
        Kiosk.currentChoices = [];
        Kiosk.questionList.render();
    },

    render: function() {
        this.$el.html(this.template);

        return this;
    }

});

Kiosk.views.QuestionList = Kiosk.views.Base.extend({

    className: "question-list",

    template: ``,

    initialize: function() {
        this.listenTo(Kiosk.objects.questions, 'sync', this.render);
    },

    render: function() {
        this.$el.html(this.template);

        Kiosk.objects.questions.each(function(questionModel) {
            this.$el.append(new Kiosk.views.QuestionBlock({ model: questionModel }).render().$el);
        }.bind(this));

        return this;
    }

});

Kiosk.views.QuestionBlock = Kiosk.views.Base.extend({

    className: "question-block",

    template: `
      <div class="question">

      </div>
      <div class="choiceList">

      </div>
    `,

    initialize: function() {

    },

    render: function() {
        this.$el.html(this.template);

        this.$('.question').html(this.model.get("text"));
        this.$('.choiceList').html(new Kiosk.views.Choices({ model: this.model }).render().$el);

        return this;
    }

});

Kiosk.views.Choices = Kiosk.views.Base.extend({

    className: "choices",

    template: ``,

    initialize: function() {
        // this.model instanceof Kiosk.models.Question
        this.listenTo(this.model, 'change:choices', this.render);
    },

    render: function() {
        this.$el.html(this.template);
        if (this.model.get('choices') && this.model.get('choices').length) {
            this.model.get('choices').each(function(choiceModel) {
                this.$el.append(new Kiosk.views.Choice({ model: choiceModel }).render().$el);
            }.bind(this));
        }

        return this;
    }

});

Kiosk.views.Choice = Kiosk.views.Base.extend({

    className: "choice",

    template: `<input type="checkbox"></input>
      <label></label>`,

    events: {
        'click input': 'checkClick'
    },

    initialize: function() {

    },

    checkClick: function(evt) {
        if (evt.target.checked) {
            Kiosk.currentChoices.push(this.model.id);
        } else {
            Kiosk.currentChoices.splice(Kiosk.currentChoices.indexOf(this.model.id), 1);
        }
    },

    render: function() {
        this.$el.html(this.template);
        this.$('input').val(this.model.id);
        this.$('label').html(this.model.get('value'));

        return this;
    }

});
