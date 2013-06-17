;(function(window, document, $, undefine) {

    var userSettings;

    // Safety net for browsers that don't support Array.isArray()
    if(!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

    var dryslide = {

        create: function( args ) {
            var self = this;
            var newValues;
            var listItems;

            var defaultSettings = {
                enabled: true
            };

            if ( args ) {
                userSettings = $.extend(defaultSettings, args);
            }

            if ( userSettings.name ) {
                userSettings.element = $('[data-dryname="' + userSettings.name + '"]');
                userSettings.element.attr('id', (userSettings.name + '_container') );
                self.collection[ userSettings.name ] = userSettings;
            }

            // Update the selectable values to the new DOM
            listItems = self.newSelectDOM( userSettings.name );

            userSettings.element.append( newValues );
            self.enableSelection( userSettings.name );
        },

        // Store all models in the collection
        collection: {},

        count: function( args ) {
            var dryslideContainer = $('#' + args.name + '_container');
            var selectOptions = dryslideContainer.find('li.selected');
            var count = 0;
            var i = 0;

            for ( i = 0; i < selectOptions.length; i++ ) {
                count++;
            }

            return count;
        },

        // Get the values, both selected and non-selected in an object
        get: function(args) {
            $.extend(true, dryslide.collection[ args.name ], args);
            var currentCollection = dryslide.collection[ args.name ];
            var dryslideContainer = currentCollection.element;

            return items;
        },

        select: function( args ) {

        },

        set: function(args) {
            var self = this;
            //var dryselectContainer = $('#' + args.name + '_container');
            $.extend(true, dryslide.collection[ args.name ], args);
            var currentCollection = dryslide.collection[ args.name ];
            var dryslideContainer = currentCollection.element;
        }
    };

    window.dryslide = dryslide;
})(window, document, jQuery);