;(function ($, window, document, undefined) {

    var pluginName = "timetable",
        defaults = {
            firstHour: 12,
            lastHour: 2,
            hourWidth: 120,
            file: ''
        };

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    var _calcWidth = function (duration, hourWidth) {
        var fiveMinuteWidth = (hourWidth / 60) * 5;
        return ((duration / 5) * fiveMinuteWidth) - 11; // I don't understand why, but the 11 has to be substracted
    };

    var _calcOffset = function (time, hourWidth, firstHour) {
        var fiveMinuteWidth = (hourWidth / 60) * 5;

        var timearray = time.split(':');
        var hours = parseInt(timearray[0], 10),
            minutes = parseInt(timearray[1], 10);

        hours = hours < firstHour ? hours + 24 : hours;
        return (hours * hourWidth + (minutes / 5) * fiveMinuteWidth) - (firstHour * hourWidth);
    };

    Plugin.prototype = {

        init: function () {
            var plugin = this;

            var src = plugin.options.file;
            $.getJSON(src, function (json) {
                var $headline = $('<h1/>').append(json.name);
                var $selections = plugin.createSelection(plugin.element, plugin.options, json);
                var $festival = plugin.createFestival(plugin.element, plugin.options, json);

                $(plugin.element).append($headline).append($selections).append($festival);
            });
        },

        createSelection: function (el, options, festival) {
            var $checkboxes = $('<div/>').addClass('selections');

            var days = festival.days;

            for (var i = 0; i < days.length; i++) {
                var stages = days[i].stages;

                for (var j = 0; j < stages.length; j++) {
                    var artists = stages[j].artists;

                    for (var h = 0; h < artists.length; h++) {
                        var artist = artists[h];

                        var $input = $('<input/>').attr('type', 'checkbox').attr('value', artist.id);
                        $input.change(function (e) {
                            var val = $(this).val();
                            $('#' + val).toggleClass('selected');
                        });

                        var $label = $('<label/>').append($input).append(artist.name);
                        $checkboxes.append($label);
                    }
                }
            }

            return $checkboxes;
        },

        createFestival: function (el, options, festival) {
            var days = festival.days;

            var $div = $('<div/>').addClass('festival');

            for (var i = 0; i < days.length; i++) {
                var day = days[i];
                var $day = this.createDay(el, options, day);

                $div.append($day);
            }

            return $div;
        },

        createDay: function (el, options, day) {
            var stages = day.stages;
            var hourPx = options.hourWidth;
            var $day = $('<fieldset/>').addClass('day').css({
                'background-size': hourPx + 'px',
                'background-image': 'repeating-linear-gradient(-90deg, lightgrey, lightgrey 1px, transparent 1px, transparent ' + hourPx + 'px)'
            });
            var $legend = $('<legend/>').append(day.name);
            $day.append($legend);

            var $times = this.createTimes(el, options);
            $day.append($times);

            for (var i = 0; i < stages.length; i++) {
                var stage = stages[i];
                var $stage = this.createStage(el, options, stage);

                $day.append($stage);
            }

            return $day;
        },

        createTimes: function (el, options) {
            var $times = $('<div/>').addClass('times');

            for (var i = options.firstHour + 1; i < options.lastHour + 24; i++) {
                var time = (i > 24 ? i - 24 : (i == 24 ? '00' : i)) + ':00';
                var offset = _calcOffset(time, options.hourWidth, options.firstHour);

                var $time = $('<div/>').append(time).css({
                    'left': offset + 'px'
                }).addClass('time');

                $times.append($time);
            }

            return $times;
        },

        createStage: function (el, options, stage) {
            var artists = stage.artists;

            var $div = $('<div/>').addClass('stage').addClass(stage.id);
            $div.append(stage.name);

            for (var i = 0; i < artists.length; i++) {
                var artist = artists[i];
                var $artist = this.createArtist(el, options, artist);

                $div.append($artist);
            }

            return $div;
        },

        createArtist: function (el, options, artist) {
            var offset = _calcOffset(artist.time, options.hourWidth, options.firstHour);
            var width = _calcWidth(artist.duration, options.hourWidth);

            var $div = $('<div/>').addClass('artist');
            $div.attr('id', artist.id);
            $div.append(artist.name);
            $div.css({
                'width': width + 'px',
                'left': offset + 'px'
            });

            return $div;
        }

    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);