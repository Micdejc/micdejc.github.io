/* =========================================================
   GOOGLE CALENDAR CONFIGURATION
========================================================= */

/* API call example: https://www.googleapis.com/calendar/v3/calendars/en.uk%23holiday%40group.v.calendar.google.com/events?key=API_KEY&singleEvents=true&orderBy=startTime&maxResults=10*/

const GOOGLE_CALENDAR_CONFIG = {

    apiKey:
        "API_KEY",

    calendarId:
        "en.uk#holiday@group.v.calendar.google.com",

    calendarName:
        "UK Holidays",

    daysToLoad:
        90,

    maxResults:
        10,

    cacheDuration:
        15 * 60 * 1000

};

