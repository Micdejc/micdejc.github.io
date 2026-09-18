/* =========================================================
   GOOGLE CALENDAR CONFIGURATION
========================================================= */

/* API call example: https://www.googleapis.com/calendar/v3/calendars/en.uk%23holiday%40group.v.calendar.google.com/events?key=AIzaSyCBO1W-jM_XGtZUuNFrQDKD_E0bDy1NtNQ&singleEvents=true&orderBy=startTime&maxResults=10*/

const GOOGLE_CALENDAR_CONFIG = {

    apiKey:
        "AIzaSyCBO1W-jM_XGtZUuNFrQDKD_E0bDy1NtNQ",

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

