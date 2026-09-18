/* =========================================================
   CALENDAR
   Source: Calendarific
   No Calendarific API key
   Scrapes the public holiday page
========================================================= */

let calendarEvents = [];
let calendarDataLoaded = false;

/* =========================================================
   CONFIGURATION
========================================================= */

const CALENDAR_CONFIG = {

    baseUrl:
        "https://calendarific.com/holidays/",

    country:
        "gb",

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
       CHECK CACHE
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
        CALENDAR_CONFIG.baseUrl +
        year +
        "/" +
        CALENDAR_CONFIG.country;


    try {

        console.log(
            "Loading Calendarific:",
            url
        );


        /* -------------------------------------------------
           FETCH PUBLIC CALENDARIFIC PAGE
        ------------------------------------------------- */

        const response =
            await fetch(
                url,
                {
                    method:
                        "GET",

                    headers: {
                        "Accept":
                            "text/html"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Calendarific request failed: " +
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


        const doc =
            parser.parseFromString(
                html,
                "text/html"
            );


        /* -------------------------------------------------
           FIND HOLIDAY TABLE
        ------------------------------------------------- */

        const tables =
            Array.from(
                doc.querySelectorAll(
                    "table"
                )
            );


        if (
            tables.length === 0
        ) {

            throw new Error(
                "Calendarific holiday table was not found."
            );

        }


        /*
           Calendarific's page contains a table with:

           Holiday | Date

           We locate the table whose header contains
           both "Holiday" and "Date".
        */

        const holidayTable =
            tables.find(
                function (table) {

                    const headers =
                        Array.from(
                            table.querySelectorAll(
                                "th"
                            )
                        )
                        .map(
                            function (header) {

                                return header
                                    .textContent
                                    .trim()
                                    .toLowerCase();

                            }
                        );


                    return (
                        headers.includes(
                            "holiday"
                        ) &&
                        headers.includes(
                            "date"
                        )
                    );

                }
            );


        if (!holidayTable) {

            throw new Error(
                "Calendarific holiday table could not be identified."
            );

        }


        /* -------------------------------------------------
           READ HOLIDAY ROWS
        ------------------------------------------------- */

        const rows =
            holidayTable.querySelectorAll(
                "tbody tr"
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


                const title =
                    cells[0]
                        .textContent
                        .replace(
                            /\s+/g,
                            " "
                        )
                        .trim();


                const dateText =
                    cells[1]
                        .textContent
                        .replace(
                            /\s+/g,
                            " "
                        )
                        .trim();


                if (
                    !title ||
                    !dateText
                ) {

                    return;

                }


                /* -------------------------------------------------
                   PARSE DATE

                   Example:

                   Friday, January 1, 2027
                   Sunday, February 14, 2027
                ------------------------------------------------- */

                const parsedDate =
                    parseCalendarificDate(
                        dateText,
                        year
                    );


                if (!parsedDate) {

                    console.warn(
                        "Could not parse Calendarific date:",
                        dateText,
                        title
                    );

                    return;

                }


                events.push({

                    id:
                        createEventId(
                            parsedDate,
                            title
                        ),

                    title:
                        cleanEventTitle(
                            title
                        ),

                    start:
                        parsedDate,

                    end:
                        new Date(
                            parsedDate.getFullYear(),
                            parsedDate.getMonth(),
                            parsedDate.getDate() + 1
                        )

                });

            }
        );


        /* -----------------------------------------------------
           REMOVE DUPLICATES
        ----------------------------------------------------- */

        calendarEvents =
            removeDuplicateEvents(
                events
            );


        /* -----------------------------------------------------
           SORT CHRONOLOGICALLY
        ----------------------------------------------------- */

        calendarEvents.sort(
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
                "No Calendarific events were found."
            );

        }


        /* -----------------------------------------------------
           SAVE
        ----------------------------------------------------- */

        calendarDataLoaded =
            true;


        cacheCalendarEvents(
            calendarEvents
        );


        /* -----------------------------------------------------
           UPDATE UI
        ----------------------------------------------------- */

        displayNextEvent();

        displayCalendarEvents();

        handleTodayHoliday();


        console.log(
            "Calendarific events loaded:",
            calendarEvents.length
        );


        return calendarEvents;

    } catch (error) {

        console.error(
            "Unable to load Calendarific events:",
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
                            View Calendarific UK Calendar
                        </a>
                    </p>
                `;

        }


        return [];

    }

}


/* =========================================================
   PARSE CALENDARIFIC DATE
========================================================= */

function parseCalendarificDate(
    dateText,
    year
) {

    /*
       Calendarific normally provides dates such as:

       Friday, January 1, 2027

       We deliberately remove the weekday because
       Date parsing is more reliable with:

       January 1, 2027
    */

    const cleaned =
        dateText
            .replace(
                /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*/i,
                ""
            )
            .trim();


    /*
       Try native Date parsing first.
    */

    const parsed =
        new Date(
            cleaned
        );


    if (
        !isNaN(
            parsed.getTime()
        )
    ) {

        return new Date(
            parsed.getFullYear(),
            parsed.getMonth(),
            parsed.getDate()
        );

    }


    /*
       Fallback parser.
    */

    const match =
        cleaned.match(
            /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/
        );


    if (!match) {

        return null;

    }


    const month =
        getMonthNumber(
            match[1]
        );


    if (
        month === null
    ) {

        return null;

    }


    const day =
        parseInt(
            match[2],
            10
        );


    const parsedYear =
        parseInt(
            match[3],
            10
        );


    const date =
        new Date(
            parsedYear,
            month,
            day
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

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
            /\s+\(Provisional\)$/i,
            " (Provisional)"
        )
        .trim();

}


/* =========================================================
   CREATE EVENT ID
========================================================= */

function createEventId(
    date,
    title
) {

    return (

        date.getFullYear() +
        "-" +

        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        ) +

        "-" +

        String(
            date.getDate()
        ).padStart(
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

            if (
                seen.has(
                    event.id
                )
            ) {

                return false;

            }


            seen.add(
                event.id
            );


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
            "st. patrick"
        ) ||
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
            "christmas eve"
        )
    ) {

        return "🎄 Happy Christmas Eve!";

    }


    if (
        title.includes(
            "christmas"
        )
    ) {

        return "🎄 Merry Christmas!";

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
        "🎉 " +
        event.title
    );

}


/* =========================================================
   HOLIDAY NOTIFICATION
========================================================= */

function showHolidayNotification(
    event
) {

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
            JSON.parse(
                cached
            );


        if (
            !data ||
            !data.timestamp
        ) {

            return null;

        }


        if (
            Date.now() -
            data.timestamp >
            CALENDAR_CONFIG.cacheDuration
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


    displayCalendarToday();


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
       LOAD IN BACKGROUND
    ----------------------------------------------------- */

    loadCalendarEvents();

}
