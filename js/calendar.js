/* =========================================================
   CALENDAR
   Source: UKCalendar.uk
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
        12 * 60 * 60 * 1000  /* 12 hours */

};


/* =========================================================
   LOAD UK HOLIDAYS & OBSERVANCES
========================================================= */

async function loadCalendarEvents() {

/*  uncomment this for quick test

calendarEvents = [

        {
            id: "test-my-day",
            title: "My day",
            start: new Date(),
            end: new Date()
        }

    ];

    calendarDataLoaded = true;

    displayNextEvent();
    displayCalendarEvents();
    handleTodayHoliday();

    return calendarEvents;  */

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


    const year =
        new Date().getFullYear();


    const url =
        UK_CALENDAR_CONFIG.baseUrl +
        year +
        "/";


    try {

        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "UKCalendar request failed: " +
                response.status
            );

        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const doc =
            parser.parseFromString(
                html,
                "text/html"
            );


        /* -------------------------------------------------
           FIND THE OBSERVANCES SECTION
        ------------------------------------------------- */

        const heading =
            Array.from(
                doc.querySelectorAll(
                    "h2"
                )
            ).find(
                function (element) {

                    return element.textContent
                        .toLowerCase()
                        .includes(
                            "bank holidays and observances"
                        );

                }
            );


        if (!heading) {

            throw new Error(
                "UKCalendar observances section not found."
            );

        }


        /* -------------------------------------------------
           COLLECT TEXT AFTER THE HEADING
        ------------------------------------------------- */

        const events = [];


        let element =
            heading.nextElementSibling;


        while (element) {

            const text =
                element.textContent
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim();


            /*
               Stop when we reach another major section.
            */

            if (
                element.tagName === "H2" ||
                element.tagName === "H3"
            ) {

                break;

            }


            /*
               Search for date patterns such as:

               14 Feb Saturday
               15 Mar Sunday
               17 Mar Tuesday
            */

            const matches =
                text.matchAll(
                    /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*[-—]?\s*(.*?)(?=\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+|$)/gi
                );


            for (
                const match of matches
            ) {

                const day =
                    parseInt(
                        match[1],
                        10
                    );


                const month =
                    getMonthNumber(
                        match[2]
                    );


                const title =
                    match[4]
                        .replace(
                            /\s+/g,
                            " "
                        )
                        .trim();


                if (
                    month === null ||
                    !title
                ) {

                    continue;

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

                    continue;

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


            element =
                element.nextElementSibling;

        }


        /* -------------------------------------------------
           REMOVE DUPLICATES
        ------------------------------------------------- */

        calendarEvents =
            removeDuplicateEvents(
                events
            );


        /* -------------------------------------------------
           SORT EVENTS
        ------------------------------------------------- */

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
   MONTH NUMBER
========================================================= */

function getMonthNumber(
    monthName
) {

    const months = {

        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11

    };


    const month =
        monthName
            .toLowerCase()
            .substring(
                0,
                3
            );


    return Object.prototype.hasOwnProperty.call(
        months,
        month
    )
        ? months[month]
        : null;

}


/* =========================================================
   CLEAN TITLE
========================================================= */

function cleanEventTitle(
    title
) {

    return title
        .replace(
            /\s+/g,
            " "
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
        String(
            month + 1
        ).padStart(
            2,
            "0"
        ) +
        "-" +
        String(
            day
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
                        today.getFullYear() &&

                    event.start.getMonth() ===
                        today.getMonth() &&

                    event.start.getDate() ===
                        today.getDate()

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
   REMAINING DAYS
========================================================= */

function getRemainingDays(
    date
) {

    if (!date) {

        return "";

    }


    const today =
        new Date();


    const todayDate =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );


    const eventDate =
        new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );


    const difference =
        eventDate.getTime() -
        todayDate.getTime();


    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /* -----------------------------------------------------
       EVENT HAS ALREADY PASSED
    ----------------------------------------------------- */

    if (days < 0) {

        return "✓ Passed";

    }


    /* -----------------------------------------------------
       EVENT IS TODAY
    ----------------------------------------------------- */

    if (days === 0) {

        return "today";

    }


    /* -----------------------------------------------------
       EVENT IS TOMORROW
    ----------------------------------------------------- */

    if (days === 1) {

        return "in 1 day";

    }


    /* -----------------------------------------------------
       FUTURE EVENT
    ----------------------------------------------------- */

    return (
        "in " +
        days +
        " days"
    );

}


/* =========================================================
   GREETING
========================================================= */

function getHolidayGreeting(
    event
) {

    const title =
        event.title.toLowerCase();


    if (
        title.includes("valentine")
    ) {

        return "❤️ Happy Valentine's Day!";

    }


    if (
        title.includes("mother")
    ) {

        return "🌷 Happy Mother's Day!";

    }


    if (
        title.includes("father")
    ) {

        return "👔 Happy Father's Day!";

    }


    if (
        title.includes("st patrick")
    ) {

        return "☘️ Happy St. Patrick's Day!";

    }


    if (
        title.includes("halloween")
    ) {

        return "🎃 Happy Halloween!";

    }


    if (
        title.includes("guy fawkes")
    ) {

        return "🔥 Happy Bonfire Night!";

    }


    if (
        title.includes("christmas eve")
    ) {

        return "🎄 Happy Christmas Eve!";

    }


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

   
    if (
       title.includes("eid")
    ) {
       
        return "🌙 Eid Mubarak!";
       
    }

   
    if (
       title.includes("ramadan")
    ) {
       
        return "🌙 Ramadan Mubarak!";
       
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


    return (
        "🎉 Happy " +
        event.title +
        "!"
    );

}


/* =========================================================
   NOTIFICATION
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

                clearInterval(
                    notification._ringInterval
                );


                notification._ringInterval =
                    null;


                notification.classList.remove(
                    "show"
                );

            }
        );

    }


    notification._hideTimeout =
        setTimeout(
            function () {

                clearInterval(
                    notification._ringInterval
                );


                notification._ringInterval =
                    null;


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
                - ${getRemainingDays(
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

                                <strong>
                                    - ${getRemainingDays(
                                        event.start
                                    )}
                                </strong>
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
   CACHE
========================================================= */

function cacheCalendarEvents(
    events
) {

    sessionStorage.setItem(
        "ukCalendarEvents",
        JSON.stringify({

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

        })
    );

}


/* =========================================================
   GET CACHE
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
   INITIALISE
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


    loadCalendarEvents();

}
