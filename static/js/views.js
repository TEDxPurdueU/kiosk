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
 * - Modal view
 *   .modal
 *
 */

Kiosk.views.Header = Kiosk.views.Base.extend({

    className: "header",

    template: `
      <a href="/">
        <div class="logo">Kiosk <span class="eventName">for ${Kiosk.configs.eventName}</span></div>
      </a>

      <button class="complete colored">SUBMIT</button>
      <button class="help">HELP</button>
    `,

    events: {
        "click button.complete": "submitUser",
        "click button.help": "help"
    },

    help: function(evt) {
        Kiosk.modal.open({
            title: 'Kiosk Help',
            body: `
              Kiosk is a simple, lightweight survey web application.
              <br><br>
              For each question, select all the answers that you think apply, and hit "SUBMIT"!
            `
        });
    },

    submitUser: function(evt) {
        if (Kiosk.currentChoices.length === 0) return;

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

        this.$el.append(`
            <div class="footer">Kiosk created by <a href="http://thesephist.com">Linus Lee</a> for <a href="http://tedxpurdueu.com">TEDxPurdueU</a></div>
        `)

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


Kiosk.views.Modal =  Kiosk.views.Base.extend({

    className: 'modal',

    title: null,
    body: null,
    open: null,

    template: `
    <span class="title"></span>
    <span class="body"></span>
    <button class="okButton">OK</button>`,

    events: {
        'click .okButton': 'close'
    },

    initialize: function() {
        // this is done in initialize() so as to preserve DOM elements between states
        this.$el.html(this.template);
    },

    open: function(options) {
        this.title = options.title || null;
        this.body = options.body || null;

        this.render({ open: true });
    },

    close: function(evt) {
        this.render({ open: false });
    },

    render: function(options) {
        if (options === undefined) options = { open: false };

        this.$('.title').html(this.title || 'Kiosk');
        this.$('.body').html(this.body || '');

        options.open ? this.$el.addClass('open') : this.$el.removeClass('open');

        if (options.open) {
            this.$el.addClass('open');
            this.$('.okButton').attr('tabindex', 1);
            this.$('.okButton').focus();
        } else {
            this.$el.removeClass('open');
            this.$('.okButton').attr('tabindex', -1);
        }

        return this;
    }

});
