/* =========================================================
   GOOGLE CALENDAR CONFIGURATION
========================================================= */

const GOOGLE_CALENDAR_CONFIG = {

    apiKey:
        "YOUR_GOOGLE_CALENDAR_API_KEY",

    calendars: [

        {
            id:
                "en.uk#holiday@group.v.calendar.google.com",

            name:
                "UK Holidays",

            type:
                "uk"

        },

        {
            id:
                "en-gb.christian#holiday@group.v.calendar.google.com",

            name:
                "Christian Holidays",

            type:
                "christian"

        },

        {
            id:
                "en.islamic#holiday@group.v.calendar.google.com",

            name:
                "Islamic Holidays",

            type:
                "islamic"

        },

        {
            id:
                "en.hinduism#holiday@group.v.calendar.google.com",

            name:
                "Hindu Holidays",

            type:
                "hindu"

        },

        {
            id:
                "en.judaism#holiday@group.v.calendar.google.com",

            name:
                "Jewish Holidays",

            type:
                "jewish"

        },

        {
            id:
                "en.orthodox_christianity#holiday@group.v.calendar.google.com",

            name:
                "Orthodox Christian Holidays",

            type:
                "orthodox"

        }

    ],

    monthsToLoad:
        12

};
