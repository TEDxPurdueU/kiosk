// App namespace
var Kiosk = {
    models: {},
    collections: {},
    views: {},
    objects: {},
    utils: {} // utility functions defined in utils.js
};

Kiosk.models.Base = Backbone.Model.extend({

});

Kiosk.collections.Base = Backbone.Collection.extend({

    fetch: function(options) {
        Backbone.Collection.prototype.fetch.apply(this, _.extend(options, {
            processData: true
        }));
    }

});

Kiosk.views.Base = Backbone.View.extend({

});

