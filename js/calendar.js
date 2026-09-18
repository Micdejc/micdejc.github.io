/* =========================================================
   CALENDAR
========================================================= */

let calendarEvents = [];

let calendarDataLoaded =
    false;

/* =========================================================
   LOAD UK HOLIDAYS
========================================================= */

async function loadCalendarEvents() {


   /* =====================================================
       TEMPORARY TEST
       Remove this block after testing
    ===================================================== */
  
  /*  calendarEvents = [

        {
            id: "test-my-day",
            title: "MY Day",
            start: new Date(),
            end: new Date()
        }

    ];

    calendarDataLoaded = true;

    displayNextEvent();
    displayCalendarEvents();
    handleTodayHoliday();

    return calendarEvents; */

    if (calendarDataLoaded) {

        return calendarEvents;

    }


    const cachedEvents =
        getCachedCalendarEvents();


    if (cachedEvents) {

        calendarEvents =
            cachedEvents;

        calendarDataLoaded =
            true;

        displayNextEvent();

        displayCalendarEvents();

        handleTodayHoliday();

        return calendarEvents;

    }


    if (
        typeof GOOGLE_CALENDAR_CONFIG ===
        "undefined"
    ) {

        console.error(
            "GOOGLE_CALENDAR_CONFIG is not available."
        );

        return [];

    }


    if (
        !GOOGLE_CALENDAR_CONFIG.apiKey ||
        GOOGLE_CALENDAR_CONFIG.apiKey ===
        "YOUR_GOOGLE_CALENDAR_API_KEY"
    ) {

        console.error(
            "Google Calendar API key has not been configured."
        );

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
                GOOGLE_CALENDAR_CONFIG.maxResults,

            fields:
                "items(id,summary,start,end)"

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

                        return (
                            event.start !== null
                        );

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


        calendarDataLoaded =
            true;


        cacheCalendarEvents(
            calendarEvents
        );


        displayNextEvent();

        displayCalendarEvents();

        handleTodayHoliday();


        return calendarEvents;

    } catch (error) {

        console.error(
            "Unable to load UK holidays:",
            error
        );


        const container =
            document.getElementById(
                "calendarEvents"
            );


        if (container) {

            container.innerHTML =
                `
                    <p class="calendar-error">
                        Unable to load UK holidays.
                    </p>
                `;

        }


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
   GET NEXT HOLIDAY
========================================================= */

function getNextEvent() {

    const now =
        new Date();


    return calendarEvents.find(
        function (event) {

            return (
                event.start >= now
            );

        }
    );

}


/* =========================================================
   CHECK TODAY'S HOLIDAY
========================================================= */

function handleTodayHoliday() {

    const today =
        new Date();


    const todayYear =
        today.getFullYear();


    const todayMonth =
        today.getMonth();


    const todayDate =
        today.getDate();


    const todayEvent =
        calendarEvents.find(
            function (event) {

                if (!event.start) {

                    return false;

                }


                return (
                    event.start.getFullYear() ===
                        todayYear &&

                    event.start.getMonth() ===
                        todayMonth &&

                    event.start.getDate() ===
                        todayDate
                );

            }
        );


    if (todayEvent) {

        showHolidayNotification(
            todayEvent
        );

    }

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

    const today =
        new Date();


    const notificationKey =
        "ukHoliday_" +
        today.getFullYear() +
        "-" +
        String(
            today.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            today.getDate()
        ).padStart(2, "0");


/* Uncomment below if you want the notification to show only once per session */
/*
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
*/


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


    /*
       Clear any previous ringing interval.
       This prevents multiple intervals from running
       if the notification is triggered again.
    */

    if (
        notification._ringInterval
    ) {

        clearInterval(
            notification._ringInterval
        );

    }


    if (
        notification._hideTimeout
    ) {

        clearTimeout(
            notification._hideTimeout
        );

    }


    /*
       Show the notification.
    */

    notification.classList.add(
        "show"
    );


    /*
       Ring immediately when the notification appears.
    */

    notification.classList.add(
        "ringing"
    );


    /*
       Ring again every 5 seconds.
    */

    notification._ringInterval =
        setInterval(
            function () {

                notification.classList.remove(
                    "ringing"
                );


                /*
                   Force the browser to restart
                   the CSS animation.
                */

                void notification.offsetWidth;


                notification.classList.add(
                    "ringing"
                );

            },
            5000
        );


    /*
       Close button.
    */

    const close =
        notification.querySelector(
            ".holiday-notification-close"
        );


    if (close) {

        close.addEventListener(
            "click",
            function () {

                /*
                   Stop the ringing.
                */

                if (
                    notification._ringInterval
                ) {

                    clearInterval(
                        notification._ringInterval
                    );

                    notification._ringInterval =
                        null;

                }


                /*
                   Hide the notification.
                */

                notification.classList.remove(
                    "show"
                );

            }
        );

    }


    /*
       Automatically hide after 30 seconds.
    */

    notification._hideTimeout =
        setTimeout(
            function () {

                /*
                   Stop the ringing interval.
                */

                if (
                    notification._ringInterval
                ) {

                    clearInterval(
                        notification._ringInterval
                    );

                    notification._ringInterval =
                        null;

                }


                /*
                   Hide the notification.
                */

                notification.classList.remove(
                    "show"
                );

            },
            30000
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
   DISPLAY HOLIDAYS
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
   DISPLAY TODAY
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
   CACHE EVENTS
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

                        id:
                            event.id,

                        title:
                            event.title,

                        start:
                            event.start
                                ? event.start.toISOString()
                                : null,

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
            typeof GOOGLE_CALENDAR_CONFIG ===
            "undefined"
        ) {

            return null;

        }


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


        return (
            data.events || []
        ).map(
            function (event) {

                return {

                    ...event,

                    start:
                        event.start
                            ? new Date(
                                event.start
                            )
                            : null,

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
   INITIALISE CALENDAR
========================================================= */

function initialiseCalendar() {

    const toggle =
        document.getElementById(
            "calendarToggle"
        );


    const calendar =
        document.getElementById(
            "calendarModal"
        );


    const close =
        document.getElementById(
            "calendarClose"
        );


    const overlay =
        document.getElementById(
            "calendarOverlay"
        );


    if (!toggle) {

        console.error(
            "calendarToggle was not found."
        );

        return;

    }


    if (!calendar) {

        console.error(
            "calendarModal was not found."
        );

        return;

    }


    /* -----------------------------------------------------
       TODAY
    ----------------------------------------------------- */

    displayCalendarToday();


    /* -----------------------------------------------------
       OPEN
    ----------------------------------------------------- */

    toggle.addEventListener(
        "click",
        function () {

            calendar.classList.add(
                "open"
            );

            calendar.setAttribute(
                "aria-hidden",
                "false"
            );


            /* Display whatever is
               already available */

            displayNextEvent();

            displayCalendarEvents();

        }
    );


    /* -----------------------------------------------------
       CLOSE
    ----------------------------------------------------- */

    function closeCalendar() {

        calendar.classList.remove(
            "open"
        );

        calendar.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (close) {

        close.addEventListener(
            "click",
            closeCalendar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCalendar
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                calendar.classList.contains(
                    "open"
                )
            ) {

                closeCalendar();

            }

        }
    );


    /* -----------------------------------------------------
       LOAD DATA IN BACKGROUND
    ----------------------------------------------------- */

    loadCalendarEvents();

}
