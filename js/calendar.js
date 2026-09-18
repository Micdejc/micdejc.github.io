/* =========================================================
   CALENDAR
========================================================= */

let calendarEvents = [];

let todayHolidayChecked =
    false;


/* =========================================================
   CHECK TODAY'S UK HOLIDAY
========================================================= */

async function checkTodayHoliday() {

    if (todayHolidayChecked) {

        return;

    }


    todayHolidayChecked =
        true;


    if (
        typeof GOOGLE_CALENDAR_CONFIG ===
        "undefined"
    ) {

        return;

    }


    if (
        !GOOGLE_CALENDAR_CONFIG.apiKey ||
        GOOGLE_CALENDAR_CONFIG.apiKey ===
        "YOUR_GOOGLE_CALENDAR_API_KEY"
    ) {

        console.warn(
            "Google Calendar API key has not been configured."
        );

        return;

    }


    const today =
        new Date();


    const tomorrow =
        new Date(today);


    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    const params =
        new URLSearchParams({

            key:
                GOOGLE_CALENDAR_CONFIG.apiKey,

            timeMin:
                today.toISOString(),

            timeMax:
                tomorrow.toISOString(),

            singleEvents:
                "true",

            maxResults:
                "5"

        });


    const url =
        "https://www.googleapis.com/calendar/v3/calendars/" +
        encodeURIComponent(
            GOOGLE_CALENDAR_CONFIG.calendarId
        ) +
        "/events?" +
        params.toString();


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Google Calendar API error: " +
                response.status
            );

        }


        const data =
            await response.json();


        const events =
            (data.items || [])
                .map(
                    function (event) {

                        return {

                            id:
                                event.id,

                            title:
                                event.summary ||
                                "UK Holiday",

                            start:
                                getEventDate(
                                    event.start
                                ),

                            end:
                                getEventDate(
                                    event.end
                                )

                        };

                    }
                );


        if (
            events.length > 0
        ) {

            showHolidayNotification(
                events[0]
            );

        }

    } catch (error) {

        console.error(
            "Today's holiday check failed:",
            error
        );

    }

}


/* =========================================================
   LOAD UPCOMING UK HOLIDAYS
========================================================= */

async function loadCalendarEvents() {

    const cachedEvents =
        getCachedCalendarEvents();


    if (cachedEvents) {

        calendarEvents =
            cachedEvents;

        return calendarEvents;

    }


    if (
        typeof GOOGLE_CALENDAR_CONFIG ===
        "undefined"
    ) {

        return [];

    }


    const now =
        new Date();


    const endDate =
        new Date(now);


    endDate.setDate(
        endDate.getDate() +
        GOOGLE_CALENDAR_CONFIG.daysToLoad
    );


    const params =
        new URLSearchParams({

            key:
                GOOGLE_CALENDAR_CONFIG.apiKey,

            timeMin:
                now.toISOString(),

            timeMax:
                endDate.toISOString(),

            singleEvents:
                "true",

            orderBy:
                "startTime",

            maxResults:
                GOOGLE_CALENDAR_CONFIG.maxResults

        });


    const url =
        "https://www.googleapis.com/calendar/v3/calendars/" +
        encodeURIComponent(
            GOOGLE_CALENDAR_CONFIG.calendarId
        ) +
        "/events?" +
        params.toString();


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Google Calendar API error: " +
                response.status
            );

        }


        const data =
            await response.json();


        calendarEvents =
            (data.items || [])
                .map(
                    function (event) {

                        return {

                            id:
                                event.id,

                            title:
                                event.summary ||
                                "UK Holiday",

                            start:
                                getEventDate(
                                    event.start
                                ),

                            end:
                                getEventDate(
                                    event.end
                                )

                        };

                    }
                )
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


        cacheCalendarEvents(
            calendarEvents
        );


        return calendarEvents;

    } catch (error) {

        console.error(
            "Unable to load UK holidays:",
            error
        );

        return [];

    }

}


/* =========================================================
   GET EVENT DATE
========================================================= */

function getEventDate(
    dateObject
) {

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
   GET NEXT UK HOLIDAY
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
   FORMAT DATE
========================================================= */

function formatEventDate(
    date
) {

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
   HOLIDAY GREETING
========================================================= */

function getHolidayGreeting(
    event
) {

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
        title.includes("boxing")
    ) {

        return "🎁 Happy Boxing Day!";

    }


    if (
        title.includes("bank holiday")
    ) {

        return "🇬🇧 Happy Bank Holiday!";

    }


    return (
        "🎉 Happy " +
        event.title +
        "!"
    );

}


/* =========================================================
   HOLIDAY NOTIFICATION
========================================================= */

function showHolidayNotification(
    event
) {

    const notificationKey =
        "ukHoliday_" +
        new Date()
            .toISOString()
            .slice(0, 10);


    if (
        sessionStorage.getItem(
            notificationKey
        )
    ) {

        return;

    }


    sessionStorage.setItem(
        notificationKey,
        "true"
    );


    let notification =
        document.getElementById(
            "holidayNotification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "holidayNotification";

        notification.className =
            "holiday-notification";


        document.body.appendChild(
            notification
        );

    }


    notification.innerHTML =
        `
            <button
                class="holiday-notification-close"
                aria-label="Close notification"
            >
                ×
            </button>

            <div
                class="holiday-notification-icon"
            >
                ✨
            </div>

            <div
                class="holiday-notification-content"
            >

                <strong>
                    ${getHolidayGreeting(event)}
                </strong>

                <span>
                    ${event.title}
                </span>

            </div>
        `;


    notification.classList.add(
        "show"
    );


    const close =
        notification.querySelector(
            ".holiday-notification-close"
        );


    if (close) {

        close.addEventListener(
            "click",
            function () {

                notification.classList.remove(
                    "show"
                );

            }
        );

    }


    setTimeout(
        function () {

            notification.classList.remove(
                "show"
            );

        },
        10000
    );

}


/* =========================================================
   DISPLAY NEXT HOLIDAY
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
                    No upcoming UK holidays
                </strong>
            `;

        return;

    }


    container.innerHTML =
        `
            <strong>
                Next UK holiday
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
   DISPLAY UK HOLIDAYS
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
                    No upcoming UK holidays found.
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

                        </article>
                    `;

                }
            )
            .join("");

}


/* =========================================================
   DISPLAY TODAY'S DATE
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
   CACHE CALENDAR EVENTS
========================================================= */

function cacheCalendarEvents(
    events
) {

    const cache = {

        timestamp:
            Date.now(),

        events:
            events.map(
                function (event) {

                    return {

                        ...event,

                        start:
                            event.start.toISOString(),

                        end:
                            event.end
                                ? event.end.toISOString()
                                : null

                    };

                }
            )

    };


    sessionStorage.setItem(
        "ukCalendarEvents",
        JSON.stringify(cache)
    );

}


/* =========================================================
   GET CACHED EVENTS
========================================================= */

function getCachedCalendarEvents() {

    const cached =
        sessionStorage.getItem(
            "ukCalendarEvents"
        );


    if (!cached) {

        return null;

    }


    try {

        const data =
            JSON.parse(cached);


        if (
            Date.now() -
            data.timestamp >
            GOOGLE_CALENDAR_CONFIG.cacheDuration
        ) {

            sessionStorage.removeItem(
                "ukCalendarEvents"
            );

            return null;

        }


        return data.events.map(
            function (event) {

                return {

                    ...event,

                    start:
                        new Date(
                            event.start
                        ),

                    end:
                        event.end
                            ? new Date(
                                event.end
                            )
                            : null

                };

            }
        );

    } catch (error) {

        sessionStorage.removeItem(
            "ukCalendarEvents"
        );

        return null;

    }

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


    displayCalendarToday();


    container.innerHTML =
        `
            <p class="calendar-loading">
                Loading UK holidays...
            </p>
        `;


    await loadCalendarEvents();


    displayNextEvent();

    displayCalendarEvents();

}


/* =========================================================
   INITIALISE DAILY HOLIDAY CHECK
========================================================= */

function initialiseDailyHolidayCheck() {

    checkTodayHoliday();

}
