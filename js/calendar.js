/* =========================================================
   CALENDAR
   Source: UKCalendar.uk
   No API key / No Google Calendar API
========================================================= */

let calendarEvents = [];
let calendarDataLoaded = false;


/* =========================================================
   CONFIGURATION
========================================================= */

const UK_CALENDAR_CONFIG = {

    baseUrl:
        "https://ukcalendar.uk/",

    cacheDuration:
        6 * 60 * 60 * 1000 // 6 hours

};


/* =========================================================
   LOAD UK HOLIDAYS & OBSERVANCES
========================================================= */

async function loadCalendarEvents() {

    if (calendarDataLoaded) {

        return calendarEvents;

    }


    /* -----------------------------------------------------
       CACHE
    ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       CURRENT YEAR
    ----------------------------------------------------- */

    const year =
        new Date().getFullYear();


    const url =
        UK_CALENDAR_CONFIG.baseUrl +
        year +
        "/";


    try {

        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    headers: {
                        "Accept":
                            "text/html"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "UKCalendar request failed: " +
                response.status
            );

        }


        const html =
            await response.text();


        /* -------------------------------------------------
           PARSE HTML
        ------------------------------------------------- */

        const parser =
            new DOMParser();


        const document =
            parser.parseFromString(
                html,
                "text/html"
            );


        const rows =
            document.querySelectorAll(
                "table tr"
            );


        const events = [];


        rows.forEach(
            function (row) {

                const cells =
                    row.querySelectorAll(
                        "td"
                    );


                if (
                    cells.length < 2
                ) {

                    return;

                }


                const dateText =
                    cells[0]
                        .textContent
                        .trim();


                const title =
                    cells[1]
                        .textContent
                        .trim();


                /*
                   Example:

                   14 Feb
                   Valentine's Day
                */

                const match =
                    dateText.match(
                        /^(\d{1,2})\s+([A-Za-z]+)/
                    );


                if (
                    !match ||
                    !title
                ) {

                    return;

                }


                const day =
                    parseInt(
                        match[1],
                        10
                    );


                const monthName =
                    match[2];


                const month =
                    getMonthNumber(
                        monthName
                    );


                if (
                    month === null
                ) {

                    return;

                }


                const start =
                    new Date(
                        year,
                        month,
                        day
                    );


                if (
                    isNaN(
                        start.getTime()
                    )
                ) {

                    return;

                }


                events.push({

                    id:
                        createEventId(
                            year,
                            month,
                            day,
                            title
                        ),

                    title:
                        cleanEventTitle(
                            title
                        ),

                    start:
                        start,

                    end:
                        new Date(
                            year,
                            month,
                            day + 1
                        )

                });

            }
        );


        /* -------------------------------------------------
           REMOVE DUPLICATES
        ------------------------------------------------- */

        const uniqueEvents =
            removeDuplicateEvents(
                events
            );


        /* -------------------------------------------------
           SORT
        ------------------------------------------------- */

        calendarEvents =
            uniqueEvents.sort(
                function (a, b) {

                    return (
                        a.start -
                        b.start
                    );

                }
            );


        if (
            calendarEvents.length === 0
        ) {

            throw new Error(
                "No UKCalendar events were found."
            );

        }


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
            "Unable to load UKCalendar events:",
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
                        Unable to load UK holidays and observances.
                    </p>

                    <p>
                        <a
                            href="${url}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View UKCalendar
                        </a>
                    </p>
                `;

        }


        return [];

    }

}


/* =========================================================
   GET MONTH NUMBER
========================================================= */

function getMonthNumber(
    monthName
) {

    const months = {

        january: 0,
        february: 1,
        march: 2,
        april: 3,
        may: 4,
        june: 5,
        july: 6,
        august: 7,
        september: 8,
        october: 9,
        november: 10,
        december: 11

    };


    const key =
        monthName
            .toLowerCase();


    if (
        Object.prototype.hasOwnProperty.call(
            months,
            key
        )
    ) {

        return months[key];

    }


    return null;

}


/* =========================================================
   CLEAN EVENT TITLE
========================================================= */

function cleanEventTitle(
    title
) {

    return title
        .replace(
            /\s+/g,
            " "
        )
        .replace(
            /\s+\(.*?\)$/g,
            ""
        )
        .trim();

}


/* =========================================================
   CREATE EVENT ID
========================================================= */

function createEventId(
    year,
    month,
    day,
    title
) {

    return (
        year +
        "-" +
        String(month + 1).padStart(
            2,
            "0"
        ) +
        "-" +
        String(day).padStart(
            2,
            "0"
        ) +
        "-" +
        title
            .toLowerCase()
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-|-$/g,
                ""
            )
    );

}


/* =========================================================
   REMOVE DUPLICATES
========================================================= */

function removeDuplicateEvents(
    events
) {

    const seen =
        new Set();


    return events.filter(
        function (event) {

            const key =
                event.id;


            if (
                seen.has(key)
            ) {

                return false;

            }


            seen.add(key);

            return true;

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
                event.start >= now
            );

        }
    );

}


/* =========================================================
   CHECK TODAY'S EVENT
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

                if (
                    !event.start
                ) {

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
        title.includes(
            "valentine"
        )
    ) {

        return "❤️ Happy Valentine's Day!";

    }


    if (
        title.includes(
            "mother"
        )
    ) {

        return "🌷 Happy Mother's Day!";

    }


    if (
        title.includes(
            "father"
        )
    ) {

        return "👔 Happy Father's Day!";

    }


    if (
        title.includes(
            "st patrick"
        )
    ) {

        return "☘️ Happy St. Patrick's Day!";

    }


    if (
        title.includes(
            "halloween"
        )
    ) {

        return "🎃 Happy Halloween!";

    }


    if (
        title.includes(
            "guy fawkes"
        )
    ) {

        return "🔥 Happy Bonfire Night!";

    }


    if (
        title.includes(
            "christmas"
        ) &&
        !title.includes(
            "eve"
        )
    ) {

        return "🎄 Merry Christmas!";

    }


    if (
        title.includes(
            "christmas eve"
        )
    ) {

        return "🎄 Happy Christmas Eve!";

    }


    if (
        title.includes(
            "new year"
        )
    ) {

        return "🎆 Happy New Year!";

    }


    if (
        title.includes(
            "easter"
        )
    ) {

        return "🐣 Happy Easter!";

    }


    if (
        title.includes(
            "boxing"
        )
    ) {

        return "🎁 Happy Boxing Day!";

    }


    if (
        title.includes(
            "bank holiday"
        )
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
        ).padStart(
            2,
            "0"
        ) +
        "-" +
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
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


    notification.classList.add(
        "show"
    );


    notification.classList.add(
        "ringing"
    );


    notification._ringInterval =
        setInterval(
            function () {

                notification.classList.remove(
                    "ringing"
                );


                void notification.offsetWidth;


                notification.classList.add(
                    "ringing"
                );

            },
            5000
        );


    const close =
        notification.querySelector(
            ".holiday-notification-close"
        );


    if (close) {

        close.addEventListener(
            "click",
            function () {

                if (
                    notification._ringInterval
                ) {

                    clearInterval(
                        notification._ringInterval
                    );

                    notification._ringInterval =
                        null;

                }


                notification.classList.remove(
                    "show"
                );

            }
        );

    }


    notification._hideTimeout =
        setTimeout(
            function () {

                if (
                    notification._ringInterval
                ) {

                    clearInterval(
                        notification._ringInterval
                    );

                    notification._ringInterval =
                        null;

                }


                notification.classList.remove(
                    "show"
                );

            },
            30000
        );

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
                    No upcoming UK events
                </strong>
            `;

        return;

    }


    container.innerHTML =
        `
            <strong>
                Next UK Event
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
   DISPLAY EVENTS
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
                    No upcoming UK events found.
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
            !data ||
            !data.timestamp
        ) {

            return null;

        }


        if (
            Date.now() -
            data.timestamp >
            UK_CALENDAR_CONFIG.cacheDuration
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
       LOAD CALENDAR IN BACKGROUND
    ----------------------------------------------------- */

    loadCalendarEvents();

}
