/* =========================================================
   CALENDAR
========================================================= */


/* =========================================================
   CALENDAR STATE
========================================================= */

let calendarEvents = [];


/* =========================================================
   LOAD CALENDAR EVENTS
========================================================= */

async function loadCalendarEvents() {

    if (
        typeof GOOGLE_CALENDAR_CONFIG ===
        "undefined"
    ) {

        console.error(
            "Google Calendar configuration was not loaded."
        );

        return [];

    }

    if (
        !GOOGLE_CALENDAR_CONFIG.apiKey ||
        GOOGLE_CALENDAR_CONFIG.apiKey ===
        "YOUR_GOOGLE_CALENDAR_API_KEY"
    ) {

        console.warn(
            "Google Calendar API key has not been configured."
        );

        return [];

    }

    const now =
        new Date();

    const endDate =
        new Date(now);

    endDate.setMonth(
        endDate.getMonth() +
        GOOGLE_CALENDAR_CONFIG.monthsToLoad
    );

    const timeMin =
        now.toISOString();

    const timeMax =
        endDate.toISOString();


    const requests =
        GOOGLE_CALENDAR_CONFIG.calendars.map(
            function (calendar) {

                const url =
                    "https://www.googleapis.com/calendar/v3/calendars/" +
                    encodeURIComponent(
                        calendar.id
                    ) +
                    "/events?" +
                    new URLSearchParams({

                        key:
                            GOOGLE_CALENDAR_CONFIG.apiKey,

                        timeMin:
                            timeMin,

                        timeMax:
                            timeMax,

                        singleEvents:
                            "true",

                        orderBy:
                            "startTime",

                        maxResults:
                            "250"

                    });


                return fetch(url)

                    .then(
                        function (response) {

                            if (!response.ok) {

                                throw new Error(
                                    "Google Calendar API error: " +
                                    response.status
                                );

                            }

                            return response.json();

                        }
                    )

                    .then(
                        function (data) {

                            return (
                                data.items || []
                            ).map(
                                function (event) {

                                    return {

                                        id:
                                            event.id,

                                        title:
                                            event.summary ||
                                            "Untitled event",

                                        description:
                                            event.description ||
                                            "",

                                        start:
                                            getEventDate(
                                                event.start
                                            ),

                                        end:
                                            getEventDate(
                                                event.end
                                            ),

                                        calendar:
                                            calendar.name,

                                        type:
                                            calendar.type

                                    };

                                }
                            );

                        }
                    )

                    .catch(
                        function (error) {

                            console.error(
                                "Unable to load " +
                                calendar.name +
                                ":",
                                error
                            );

                            return [];

                        }
                    );

            }
        );


    const results =
        await Promise.all(
            requests
        );


    calendarEvents =
        results
            .flat()
            .filter(
                function (event) {

                    return event.start !== null;

                }
            )
            .sort(
                function (a, b) {

                    return (
                        a.start -
                        b.start
                    );

                }
            );


    return calendarEvents;

}


/* =========================================================
   GET EVENT DATE
========================================================= */

function getEventDate(dateObject) {

    if (!dateObject) {

        return null;

    }


    if (dateObject.dateTime) {

        return new Date(
            dateObject.dateTime
        );

    }


    if (dateObject.date) {

        return new Date(
            dateObject.date +
            "T00:00:00"
        );

    }


    return null;

}


/* =========================================================
   FORMAT EVENT DATE
========================================================= */

function formatEventDate(date) {

    if (!date) {

        return "";

    }


    return new Intl.DateTimeFormat(
        "en-GB",
        {

            weekday:
                "long",

            day:
                "numeric",

            month:
                "long",

            year:
                "numeric"

        }
    ).format(date);

}


/* =========================================================
   GET TODAY'S EVENTS
========================================================= */

function getTodayEvents() {

    const today =
        new Date();


    return calendarEvents.filter(
        function (event) {

            return (

                event.start.getFullYear() ===
                today.getFullYear()

                &&

                event.start.getMonth() ===
                today.getMonth()

                &&

                event.start.getDate() ===
                today.getDate()

            );

        }
    );

}


/* =========================================================
   GET NEXT EVENT
========================================================= */

function getNextEvent() {

    const now =
        new Date();


    return calendarEvents.find(
        function (event) {

            return (
                event.start > now
            );

        }
    );

}


/* =========================================================
   HOLIDAY GREETING
========================================================= */

function getHolidayGreeting(event) {

    const title =
        event.title.toLowerCase();


    if (
        title.includes("christmas")
    ) {

        return "🎄 Merry Christmas!";

    }


    if (
        title.includes("new year")
    ) {

        return "🎆 Happy New Year!";

    }


    if (
        title.includes("easter")
    ) {

        return "🐣 Happy Easter!";

    }


    if (
        title.includes("eid")
    ) {

        return "🌙 Eid Mubarak!";

    }


    if (
        title.includes("diwali")
    ) {

        return "🪔 Happy Diwali!";

    }


    if (
        title.includes("hanukkah") ||
        title.includes("chanukah")
    ) {

        return "🕎 Happy Hanukkah!";

    }


    if (
        title.includes("holi")
    ) {

        return "🌈 Happy Holi!";

    }


    if (
        title.includes("ramadan")
    ) {

        return "🌙 Ramadan Mubarak!";

    }


    return (
        "✨ Happy " +
        event.title +
        "!"
    );

}


/* =========================================================
   DISPLAY TODAY'S HOLIDAY
========================================================= */

function displayTodayHoliday() {

    const greeting =
        document.getElementById(
            "calendarGreeting"
        );


    if (!greeting) {

        return;

    }


    const todayEvents =
        getTodayEvents();


    if (
        todayEvents.length === 0
    ) {

        greeting.hidden =
            true;

        greeting.innerHTML =
            "";

        return;

    }


    const event =
        todayEvents[0];


    greeting.hidden =
        false;


    greeting.innerHTML =
        `
            <strong>
                ${getHolidayGreeting(event)}
            </strong>

            <span>
                ${event.title}
            </span>
        `;

}


/* =========================================================
   DISPLAY NEXT EVENT
========================================================= */

function displayNextEvent() {

    const container =
        document.getElementById(
            "calendarNextEvent"
        );


    if (!container) {

        return;

    }


    const nextEvent =
        getNextEvent();


    if (!nextEvent) {

        container.innerHTML =
            `
                <strong>
                    No upcoming events
                </strong>
            `;

        return;

    }


    container.innerHTML =
        `
            <strong>
                Next event
            </strong>

            <span>
                ${nextEvent.title}
            </span>

            <small>
                ${formatEventDate(
                    nextEvent.start
                )}
            </small>
        `;

}


/* =========================================================
   DISPLAY CALENDAR EVENTS
========================================================= */

function displayCalendarEvents() {

    const container =
        document.getElementById(
            "calendarEvents"
        );


    if (!container) {

        return;

    }


    if (
        calendarEvents.length === 0
    ) {

        container.innerHTML =
            `
                <p>
                    No upcoming events found.
                </p>
            `;

        return;

    }


    container.innerHTML =
        calendarEvents
            .map(
                function (event) {

                    return `
                        <article
                            class="calendar-event"
                        >

                            <div
                                class="calendar-event-date"
                            >
                                ${formatEventDate(
                                    event.start
                                )}
                            </div>

                            <div
                                class="calendar-event-name"
                            >
                                ${event.title}
                            </div>

                            <small>
                                ${event.calendar}
                            </small>

                        </article>
                    `;

                }
            )
            .join("");

}


/* =========================================================
   UPDATE TODAY'S DATE
========================================================= */

function displayCalendarToday() {

    const container =
        document.getElementById(
            "calendarToday"
        );


    if (!container) {

        return;

    }


    container.textContent =
        new Intl.DateTimeFormat(
            "en-GB",
            {

                day:
                    "numeric",

                month:
                    "long",

                year:
                    "numeric"

            }
        ).format(
            new Date()
        );

}


/* =========================================================
   INITIALISE CALENDAR DATA
========================================================= */

async function initialiseCalendarData() {

    const container =
        document.getElementById(
            "calendarEvents"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        `
            <p class="calendar-loading">
                Loading holidays and events...
            </p>
        `;


    displayCalendarToday();


    await loadCalendarEvents();


    displayTodayHoliday();

    displayNextEvent();

    displayCalendarEvents();

}
