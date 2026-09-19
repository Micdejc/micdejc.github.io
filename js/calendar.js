let calendarEvents = [];
let calendarDataLoaded = false;

const CALENDAR_CONFIG = {
   /* 6 hours update basis */
    cacheDuration: 6 * 60 * 60 * 1000,  
    dateHolidaysVersion: "3.36.1"
};


/* =========================================================
   MAIN CALENDAR LOADER
   ========================================================= */

async function loadCalendarEvents() {
    if (calendarDataLoaded) {
        return calendarEvents;
    }

    const year = new Date().getFullYear();

    const cachedEvents = getCachedCalendarEvents(year);

    if (cachedEvents) {
        calendarEvents = cachedEvents;
        calendarDataLoaded = true;

        displayNextEvent();
        displayCalendarEvents();
        handleTodayHoliday();

        return calendarEvents;
    }

    try {
        const [
            ukEvents,
            internationalEvents,
            christianEvents,
            muslimEvents
        ] = await Promise.all([
            loadUKHolidays(year),
            loadInternationalHolidays(year),
            loadChristianHolidays(year),
            loadMuslimHolidays(year)
        ]);

        let events = [
            ...ukEvents,
            ...internationalEvents,
            ...christianEvents,
            ...muslimEvents
        ];

        /*
         * Normalize names first so that:
         *
         * Christmas
         * Christmas Day
         * christmas day
         *
         * are treated as the same event.
         */
        events = events.map(function (event) {
            return {
                ...event,
                title: getCanonicalEventTitle(event.title)
            };
        });

        /*
         * Remove duplicate events.
         */
        calendarEvents = removeDuplicateEvents(events);

        /*
         * Sort chronologically.
         */
        calendarEvents.sort(function (a, b) {
            return a.start - b.start;
        });

        if (calendarEvents.length === 0) {
            throw new Error("No calendar events were found.");
        }

        calendarDataLoaded = true;

        cacheCalendarEvents(calendarEvents, year);

        displayNextEvent();
        displayCalendarEvents();
        handleTodayHoliday();

        return calendarEvents;

    } catch (error) {
        console.error("Unable to load calendar events:", error);

        const container = document.getElementById("calendarEvents");

        if (container) {
            container.innerHTML = `
                <p class="calendar-error">
                    Unable to load holidays and observances.
                </p>
            `;
        }

        return [];
    }
}


/* =========================================================
   UK HOLIDAYS
   ========================================================= */

async function loadUKHolidays(year) {
    try {
        const module = await import(
            "https://cdn.jsdelivr.net/npm/date-holidays@" +
            CALENDAR_CONFIG.dateHolidaysVersion +
            "/+esm"
        );

        const Holidays =
            module.default ||
            module.Holidays ||
            module;

        const holidays = new Holidays("GB");

        const results = [];

        const holidaysForYear = holidays.getHolidays(year);

        holidaysForYear.forEach(function (holiday) {
            if (!holiday.date || !holiday.name) return;

            const date = parseHolidayDate(holiday.date, year);

            if (!date) return;

            results.push({
                id: createEventId(
                    date,
                    holiday.name
                ),
                title: holiday.name,
                start: date,
                end: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() + 1
                ),
                type: "UK",
                category: "UK Holiday"
            });
        });

        return results;

    } catch (error) {
        console.error("Unable to load UK holidays:", error);
        return [];
    }
}


/* =========================================================
   POPULAR INTERNATIONAL / CULTURAL HOLIDAYS
   ========================================================= */

function loadInternationalHolidays(year) {
    const events = [];

    function addEvent(month, day, title) {
        const date = new Date(year, month, day);

        events.push({
            id: createEventId(date, title),
            title: title,
            start: date,
            end: new Date(year, month, day + 1),
            type: "International",
            category: "Cultural / International"
        });
    }

    /*
     * Fixed-date holidays
     */

    addEvent(0, 1, "New Year's Day");

    addEvent(1, 14, "Valentine's Day");

    addEvent(2, 8, "International Women's Day");

    addEvent(2, 17, "St Patrick's Day");

    addEvent(3, 1, "April Fools' Day");

    addEvent(4, 1, "International Workers' Day");

    addEvent(9, 31, "Halloween");

    addEvent(10, 5, "Bonfire Night");

    addEvent(11, 24, "Christmas Eve");

    addEvent(11, 25, "Christmas Day");

    addEvent(11, 26, "Boxing Day");

    addEvent(11, 31, "New Year's Eve");


    /*
     * UK Mother's Day
     *
     * Mothering Sunday is three weeks before Easter Sunday.
     */

    const easter = calculateEasterSunday(year);

    const mothersDay = new Date(easter);
    mothersDay.setDate(mothersDay.getDate() - 21);

    events.push({
        id: createEventId(mothersDay, "Mother's Day"),
        title: "Mother's Day",
        start: mothersDay,
        end: new Date(
            mothersDay.getFullYear(),
            mothersDay.getMonth(),
            mothersDay.getDate() + 1
        ),
        type: "International",
        category: "Cultural"
    });


    /*
     * Father's Day
     *
     * Third Sunday of June.
     */

    const fathersDay = getNthWeekdayOfMonth(
        year,
        5,
        0,
        3
    );

    events.push({
        id: createEventId(fathersDay, "Father's Day"),
        title: "Father's Day",
        start: fathersDay,
        end: new Date(
            fathersDay.getFullYear(),
            fathersDay.getMonth(),
            fathersDay.getDate() + 1
        ),
        type: "International",
        category: "Cultural"
    });

    return Promise.resolve(events);
}


/* =========================================================
   MAJOR CHRISTIAN OBSERVANCES
   ========================================================= */

function loadChristianHolidays(year) {
    const events = [];

    const easter = calculateEasterSunday(year);

    function addRelativeEvent(days, title) {
        const date = new Date(easter);
        date.setDate(date.getDate() + days);

        events.push({
            id: createEventId(date, title),
            title: title,
            start: date,
            end: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
            ),
            type: "Christian",
            category: "Christian Observance"
        });
    }

    /*
     * Ash Wednesday
     * 46 days before Easter.
     */
    addRelativeEvent(-46, "Ash Wednesday");

    /*
     * Palm Sunday
     * 7 days before Easter.
     */
    addRelativeEvent(-7, "Palm Sunday");

    /*
     * Good Friday
     * 2 days before Easter.
     */
    addRelativeEvent(-2, "Good Friday");

    /*
     * Easter Sunday
     */
    addRelativeEvent(0, "Easter Sunday");

    /*
     * Ascension Day
     * 39 days after Easter.
     */
    addRelativeEvent(39, "Ascension Day");

    /*
     * Pentecost / Whit Sunday
     * 49 days after Easter.
     */
    addRelativeEvent(49, "Pentecost");

    /*
     * Christmas Day
     *
     * It is intentionally included here because it is a major
     * Christian observance. The duplicate-removal system will
     * ensure it appears only once in the final calendar.
     */
    const christmas = new Date(year, 11, 25);

    events.push({
        id: createEventId(christmas, "Christmas Day"),
        title: "Christmas Day",
        start: christmas,
        end: new Date(year, 11, 26),
        type: "Christian",
        category: "Christian Observance"
    });

    return Promise.resolve(events);
}


/* =========================================================
   MAJOR MUSLIM OBSERVANCES
   ========================================================= */

async function loadMuslimHolidays(year) {
    const events = [];

    try {
        const module = await import(
            "https://cdn.jsdelivr.net/npm/islamic-date/+esm"
        );

        const gregorianToHijri =
            module.gregorianToHijri ||
            (module.default && module.default.gregorianToHijri);

        if (typeof gregorianToHijri !== "function") {
            throw new Error(
                "gregorianToHijri() was not found in islamic-date."
            );
        }

        /*
         * Scan every day of the Gregorian year.
         *
         * This allows us to dynamically identify the Gregorian
         * date corresponding to the major Islamic dates.
         */
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1);

        for (
            let date = new Date(startDate);
            date < endDate;
            date.setDate(date.getDate() + 1)
        ) {
            const current = new Date(date);

            let hijri;

            try {
                hijri = gregorianToHijri(
                    current.getFullYear(),
                    current.getMonth() + 1,
                    current.getDate(),
                    "en"
                );
            } catch (error) {
                continue;
            }

            const hijriMonth = extractHijriMonth(hijri);
            const hijriDay = extractHijriDay(hijri);

            if (
                hijriMonth === null ||
                hijriDay === null
            ) {
                continue;
            }

            let title = null;

            /*
             * 1 Muharram
             */
            if (
                hijriMonth === 1 &&
                hijriDay === 1
            ) {
                title = "Islamic New Year";
            }

            /*
             * 12 Rabi al-Awwal
             */
            else if (
                hijriMonth === 3 &&
                hijriDay === 12
            ) {
                title = "Mawlid al-Nabi";
            }

            /*
             * 1 Ramadan
             */
            else if (
                hijriMonth === 9 &&
                hijriDay === 1
            ) {
                title = "Ramadan";
            }

            /*
             * 27 Ramadan
             *
             * Commonly observed as Laylat al-Qadr.
             */
            else if (
                hijriMonth === 9 &&
                hijriDay === 27
            ) {
                title = "Laylat al-Qadr";
            }

            /*
             * 1 Shawwal
             */
            else if (
                hijriMonth === 10 &&
                hijriDay === 1
            ) {
                title = "Eid al-Fitr";
            }

            /*
             * 9 Dhu al-Hijjah
             */
            else if (
                hijriMonth === 12 &&
                hijriDay === 9
            ) {
                title = "Day of Arafah";
            }

            /*
             * 10 Dhu al-Hijjah
             */
            else if (
                hijriMonth === 12 &&
                hijriDay === 10
            ) {
                title = "Eid al-Adha";
            }

            if (!title) continue;

            events.push({
                id: createEventId(current, title),
                title: title,
                start: new Date(current),
                end: new Date(
                    current.getFullYear(),
                    current.getMonth(),
                    current.getDate() + 1
                ),
                type: "Muslim",
                category: "Islamic Observance"
            });
        }

        return events;

    } catch (error) {
        console.error(
            "Unable to load Muslim observances:",
            error
        );

        return [];
    }
}


/* =========================================================
   HIJRI VALUE EXTRACTION
   ========================================================= */

function extractHijriMonth(hijri) {
    if (!hijri) return null;

    if (typeof hijri.month === "number") {
        return hijri.month;
    }

    if (
        hijri.month &&
        typeof hijri.month.number === "number"
    ) {
        return hijri.month.number;
    }

    if (
        hijri.month &&
        typeof hijri.month.index === "number"
    ) {
        return hijri.month.index;
    }

    if (
        hijri.hijri &&
        typeof hijri.hijri.month === "number"
    ) {
        return hijri.hijri.month;
    }

    return null;
}

function extractHijriDay(hijri) {
    if (!hijri) return null;

    if (typeof hijri.day === "number") {
        return hijri.day;
    }

    if (
        hijri.day &&
        typeof hijri.day.number === "number"
    ) {
        return hijri.day.number;
    }

    if (
        hijri.hijri &&
        typeof hijri.hijri.day === "number"
    ) {
        return hijri.hijri.day;
    }

    return null;
}


/* =========================================================
   CANONICAL EVENT NAMES
   ========================================================= */

function normalizeEventTitle(title) {
    return title
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function getCanonicalEventTitle(title) {
    const normalized = normalizeEventTitle(title);

    const aliases = {
        /*
         * Christmas
         */
        "christmas": "Christmas Day",
        "christmas day": "Christmas Day",

        /*
         * New Year
         */
        "new years day": "New Year's Day",
        "new years eve": "New Year's Eve",

        /*
         * Easter
         */
        "easter": "Easter Sunday",
        "easter sunday": "Easter Sunday",

        /*
         * Mother's Day
         */
        "mothers day": "Mother's Day",
        "mothering sunday": "Mother's Day",

        /*
         * Father's Day
         */
        "fathers day": "Father's Day",

        /*
         * St Patrick's Day
         */
        "st patricks day": "St Patrick's Day",

        /*
         * Workers' Day
         */
        "may day": "International Workers' Day",
        "international workers day":
            "International Workers' Day",
        "labour day":
            "International Workers' Day",
        "labor day":
            "International Workers' Day",

        /*
         * Boxing Day
         */
        "boxing day": "Boxing Day",

        /*
         * Halloween
         */
        "halloween": "Halloween",

        /*
         * April Fools
         */
        "april fools day": "April Fools' Day",

        /*
         * International Women's Day
         */
        "international womens day":
            "International Women's Day"
    };

    return aliases[normalized] || title.trim();
}


/* =========================================================
   DUPLICATE REMOVAL
   ========================================================= */

function removeDuplicateEvents(events) {
    const seen = new Set();

    return events.filter(function (event) {
        if (!event || !event.start || !event.title) {
            return false;
        }

        const date = event.start;

        const dateKey =
            date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0");

        const titleKey =
            normalizeEventTitle(
                getCanonicalEventTitle(event.title)
            );

        /*
         * Same date + same normalized event =
         * duplicate.
         */
        const key = dateKey + "|" + titleKey;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);

        return true;
    });
}


/* =========================================================
   EVENT ID
   ========================================================= */

function createEventId(date, title) {
    return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0") +
        "-" +
        normalizeEventTitle(title)
            .replace(/[^a-z0-9]+/g, "-")
    );
}


/* =========================================================
   EASTER CALCULATION
   ========================================================= */

function calculateEasterSunday(year) {
    /*
     * Anonymous Gregorian algorithm.
     */
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h =
        (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l =
        (32 + 2 * e + 2 * i - h - k) % 7;
    const m =
        Math.floor(
            (a + 11 * h + 22 * l) / 451
        );

    const month =
        Math.floor(
            (h + l - 7 * m + 114) / 31
        );

    const day =
        ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
}


/* =========================================================
   NTH WEEKDAY OF MONTH
   ========================================================= */

function getNthWeekdayOfMonth(
    year,
    month,
    weekday,
    occurrence
) {
    const firstDay = new Date(
        year,
        month,
        1
    );

    const firstWeekday =
        firstDay.getDay();

    const offset =
        (weekday - firstWeekday + 7) % 7;

    const day =
        1 +
        offset +
        (occurrence - 1) * 7;

    return new Date(
        year,
        month,
        day
    );
}


/* =========================================================
   HOLIDAY DATE PARSER
   ========================================================= */

function parseHolidayDate(value, year) {
    if (value instanceof Date) {
        return new Date(value);
    }

    if (typeof value !== "string") {
        return null;
    }

    /*
     * date-holidays may return ISO-style dates.
     */
    const direct = new Date(value);

    if (!isNaN(direct.getTime())) {
        return new Date(
            direct.getFullYear(),
            direct.getMonth(),
            direct.getDate()
        );
    }

    /*
     * Fallback for DD/MM/YYYY.
     */
    const match = value.match(
        /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/
    );

    if (match) {
        return new Date(
            Number(match[3]),
            Number(match[2]) - 1,
            Number(match[1])
        );
    }

    return null;
}


/* =========================================================
   NEXT EVENT
   ========================================================= */

function getNextEvent() {
    const now = new Date();

    return calendarEvents.find(function (event) {
        return event.start >= now;
    });
}


/* =========================================================
   TODAY'S HOLIDAY
   ========================================================= */

function handleTodayHoliday() {
    const today = new Date();

    const todayEvents = calendarEvents.filter(
        function (event) {
            if (!event.start) return false;

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

    if (todayEvents.length > 0) {
        showHolidayNotification(
            todayEvents[0]
        );
    }
}


/* =========================================================
   DATE FORMATTING
   ========================================================= */

function formatEventDate(date) {
    if (!date) return "";

    return new Intl.DateTimeFormat(
        "en-GB",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(date);
}


/* =========================================================
   REMAINING DAYS
   ========================================================= */

function getRemainingDays(date) {
    if (!date) return "";

    const today = new Date();

    const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const eventDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const difference =
        eventDate.getTime() -
        todayDate.getTime();

    const days = Math.ceil(
        difference /
            (1000 * 60 * 60 * 24)
    );

    if (days < 0) {
        return "✓ Passed";
    }

    if (days === 0) {
        return "today";
    }

    if (days === 1) {
        return "in 1 day";
    }

    return "in " + days + " days";
}


/* =========================================================
   HOLIDAY GREETING
   ========================================================= */

function getHolidayGreeting(event) {
    const title =
        event.title.toLowerCase();

    if (title.includes("valentine")) {
        return "❤️ Happy Valentine's Day!";
    }

    if (title.includes("mother")) {
        return "🌷 Happy Mother's Day!";
    }

    if (title.includes("father")) {
        return "👔 Happy Father's Day!";
    }

    if (title.includes("st patrick")) {
        return "☘️ Happy St. Patrick's Day!";
    }

    if (title.includes("halloween")) {
        return "🎃 Happy Halloween!";
    }

    if (title.includes("bonfire")) {
        return "🔥 Happy Bonfire Night!";
    }

    if (title.includes("christmas eve")) {
        return "🎄 Happy Christmas Eve!";
    }

    if (title === "christmas day") {
        return "🎄 Merry Christmas!";
    }

    if (title.includes("new year's eve")) {
        return "🎆 Happy New Year's Eve!";
    }

    if (title === "new year's day") {
        return "🎆 Happy New Year!";
    }

    if (title.includes("easter")) {
        return "🐣 Happy Easter!";
    }

    if (title.includes("boxing")) {
        return "🎁 Happy Boxing Day!";
    }

    if (title.includes("ramadan")) {
        return "🌙 Ramadan Mubarak!";
    }

    if (title.includes("eid al-fitr")) {
        return "🌙 Eid Mubarak!";
    }

    if (title.includes("eid al-adha")) {
        return "🐑 Eid Mubarak!";
    }

    if (title.includes("mawlid")) {
        return "🌙 Mawlid Mubarak!";
    }

    if (title.includes("islamic new year")) {
        return "🌙 Happy Islamic New Year!";
    }

    return "🎉 Happy " + event.title + "!";
}


/* =========================================================
   HOLIDAY NOTIFICATION
   ========================================================= */

function showHolidayNotification(event) {
    let notification =
        document.getElementById(
            "holidayNotification"
        );

    if (!notification) {
        notification =
            document.createElement("div");

        notification.id =
            "holidayNotification";

        notification.className =
            "holiday-notification";

        document.body.appendChild(
            notification
        );
    }

    notification.innerHTML = `
        <button
            class="holiday-notification-close"
            aria-label="Close notification"
        >
            ×
        </button>

        <div class="holiday-notification-icon">
            ✨
        </div>

        <div class="holiday-notification-content">
            <strong>
                ${getHolidayGreeting(event)}
            </strong>

            <span>
                ${event.title}
            </span>
        </div>
    `;

    if (notification._ringInterval) {
        clearInterval(
            notification._ringInterval
        );
    }

    if (notification._hideTimeout) {
        clearTimeout(
            notification._hideTimeout
        );
    }

    notification.classList.add("show");
    notification.classList.add("ringing");

    notification._ringInterval =
        setInterval(function () {
            notification.classList.remove(
                "ringing"
            );

            void notification.offsetWidth;

            notification.classList.add(
                "ringing"
            );
        }, 5000);

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
        setTimeout(function () {
            clearInterval(
                notification._ringInterval
            );

            notification._ringInterval =
                null;

            notification.classList.remove(
                "show"
            );
        }, 30000);
}


/* =========================================================
   NEXT EVENT DISPLAY
   ========================================================= */

function displayNextEvent() {
    const container =
        document.getElementById(
            "calendarNextEvent"
        );

    if (!container) return;

    const nextEvent =
        getNextEvent();

    if (!nextEvent) {
        container.innerHTML = `
            <strong>
                No upcoming events
            </strong>
        `;

        return;
    }

    container.innerHTML = `
        <strong>
            Next Event
        </strong>

        <span>
            ${nextEvent.title}
        </span>

        <small>
            ${formatEventDate(nextEvent.start)}
            - ${getRemainingDays(nextEvent.start)}
        </small>
    `;
}


/* =========================================================
   CALENDAR EVENT DISPLAY
   ========================================================= */

function displayCalendarEvents() {
    const container =
        document.getElementById(
            "calendarEvents"
        );

    if (!container) return;

    if (calendarEvents.length === 0) {
        container.innerHTML = `
            <p>
                No upcoming events found.
            </p>
        `;

        return;
    }

    container.innerHTML =
        calendarEvents.map(function (event) {
            return `
                <article class="calendar-event">
                    <div class="calendar-event-date">
                        ${formatEventDate(event.start)}

                        <strong>
                            - ${getRemainingDays(event.start)}
                        </strong>
                    </div>

                    <div class="calendar-event-name">
                        ${event.title}
                    </div>
                </article>
            `;
        }).join("");
}


/* =========================================================
   TODAY DISPLAY
   ========================================================= */

function displayCalendarToday() {
    const container =
        document.getElementById(
            "calendarToday"
        );

    if (!container) return;

    container.textContent =
        new Intl.DateTimeFormat(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(new Date());
}


/* =========================================================
   SESSION STORAGE CACHE
   ========================================================= */

function cacheCalendarEvents(
    events,
    year
) {
    sessionStorage.setItem(
        "calendarEvents",
        JSON.stringify({
            timestamp: Date.now(),
            year: year,

            events: events.map(
                function (event) {
                    return {
                        id: event.id,
                        title: event.title,
                        start: event.start
                            ? event.start.toISOString()
                            : null,
                        end: event.end
                            ? event.end.toISOString()
                            : null,
                        type: event.type || null,
                        category:
                            event.category || null
                    };
                }
            )
        })
    );
}


function getCachedCalendarEvents(year) {
    const cached =
        sessionStorage.getItem(
            "calendarEvents"
        );

    if (!cached) return null;

    try {
        const data =
            JSON.parse(cached);

        if (!data || !data.timestamp) {
            return null;
        }

        /*
         * Never use a previous year's cache.
         */
        if (data.year !== year) {
            sessionStorage.removeItem(
                "calendarEvents"
            );

            return null;
        }

        /*
         * Cache expiration.
         */
        if (
            Date.now() -
                data.timestamp >
            CALENDAR_CONFIG.cacheDuration
        ) {
            sessionStorage.removeItem(
                "calendarEvents"
            );

            return null;
        }

        return (data.events || [])
            .map(function (event) {
                return {
                    ...event,
                    start: event.start
                        ? new Date(event.start)
                        : null,
                    end: event.end
                        ? new Date(event.end)
                        : null
                };
            })
            .filter(function (event) {
                return event.start;
            });

    } catch (error) {
        sessionStorage.removeItem(
            "calendarEvents"
        );

        return null;
    }
}


/* =========================================================
   CALENDAR INITIALISATION
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


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initialiseCalendar
    );
} else {
    initialiseCalendar();
}
