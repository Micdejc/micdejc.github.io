let calendarEvents = [];
let calendarDataLoaded = false;

const CALENDAR_CONFIG = {
    /*  12 hours update basis for cache  */
    cacheDuration: 12 * 60 * 60 * 1000,
    hebcalVersion: "6.9.2",
    hinduFestivalVersion: "1.0.1"
};

/* =========================================================
   DATE HELPERS
   ========================================================= */

function createDate(year, month, day) {
    return new Date(year, month, day);
}

function dateOnly(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}

function dateKey(date) {
    return (
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0")
    );
}

function createEventId(date, title) {
    return (
        dateKey(date) +
        "-" +
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
    );
}

function addEvent(events, year, month, day, title, category) {
    const date = createDate(year, month, day);

    if (isNaN(date.getTime())) {
        return;
    }

    events.push({
        id: createEventId(date, title),
        title: title,
        category: category || "Holiday",
        start: date,
        end: new Date(year, month, day + 1)
    });
}

function parseISODate(dateString) {
    if (!dateString || typeof dateString !== "string") {
        return null;
    }

    const parts = dateString.split("-").map(Number);

    if (parts.length !== 3) {
        return null;
    }

    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    return isNaN(date.getTime()) ? null : date;
}

function getEasterSunday(year) {
    /*
     * Anonymous Gregorian algorithm.
     * Returns Easter Sunday for the Gregorian calendar.
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
        Math.floor((a + 11 * h + 22 * l) / 451);

    const month =
        Math.floor((h + l - 7 * m + 114) / 31);

    const day =
        ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getNthWeekdayOfMonth(year, month, weekday, occurrence) {
    const first = new Date(year, month, 1);

    const offset =
        (weekday - first.getDay() + 7) % 7;

    return new Date(
        year,
        month,
        1 + offset + (occurrence - 1) * 7
    );
}

/* =========================================================
   UK BANK HOLIDAYS
   ENGLAND & WALES
   ========================================================= */

function addUKBankHoliday(events, occupiedDates, date, title) {
    const key = dateKey(date);

    events.push({
        id: createEventId(date, title),
        title: title,
        category: "UK Bank Holiday",
        start: dateOnly(date),
        end: addDays(dateOnly(date), 1)
    });

    occupiedDates.add(key);
}

function getNextAvailableWeekday(startDate, occupiedDates) {
    let date = dateOnly(startDate);

    while (
        date.getDay() === 0 ||
        date.getDay() === 6 ||
        occupiedDates.has(dateKey(date))
    ) {
        date = addDays(date, 1);
    }

    return date;
}

function loadUKHolidays(year) {
    const events = [];
    const occupiedDates = new Set();

    const easter = getEasterSunday(year);

    /*
     * England & Wales bank holidays.
     */

    const newYear = createDate(year, 0, 1);

    const earlyMay = getNthWeekdayOfMonth(
        year,
        4,
        1,
        1
    );

    const springBankHoliday = getNthWeekdayOfMonth(
        year,
        4,
        1,
        4
    );

    const summerBankHoliday = getNthWeekdayOfMonth(
        year,
        7,
        1,
        5
    );

    const christmas = createDate(year, 11, 25);
    const boxingDay = createDate(year, 11, 26);

    /*
     * New Year's Day.
     */
    if (newYear.getDay() === 6 || newYear.getDay() === 0) {
        const substitute = getNextAvailableWeekday(
            addDays(newYear, 1),
            occupiedDates
        );

        addUKBankHoliday(
            events,
            occupiedDates,
            substitute,
            "New Year's Day (substitute day)"
        );
    } else {
        addUKBankHoliday(
            events,
            occupiedDates,
            newYear,
            "New Year's Day"
        );
    }

    /*
     * Good Friday.
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        addDays(easter, -2),
        "Good Friday"
    );

    /*
     * Easter Monday.
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        addDays(easter, 1),
        "Easter Monday"
    );

    /*
     * Early May bank holiday.
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        earlyMay,
        "Early May Bank Holiday"
    );

    /*
     * Spring bank holiday.
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        springBankHoliday,
        "Spring Bank Holiday"
    );

    /*
     * Summer bank holiday.
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        summerBankHoliday,
        "Summer Bank Holiday"
    );

    /*
     * Christmas and Boxing Day.
     *
     * Handle substitute days sequentially so that
     * Christmas/Boxing Day weekend combinations never
     * produce duplicate substitute dates.
     */

    if (
        christmas.getDay() !== 6 &&
        christmas.getDay() !== 0
    ) {
        addUKBankHoliday(
            events,
            occupiedDates,
            christmas,
            "Christmas Day"
        );
    }

    if (
        boxingDay.getDay() !== 6 &&
        boxingDay.getDay() !== 0
    ) {
        addUKBankHoliday(
            events,
            occupiedDates,
            boxingDay,
            "Boxing Day"
        );
    }

    if (
        christmas.getDay() === 6 ||
        christmas.getDay() === 0
    ) {
        const christmasSubstitute =
            getNextAvailableWeekday(
                addDays(christmas, 1),
                occupiedDates
            );

        addUKBankHoliday(
            events,
            occupiedDates,
            christmasSubstitute,
            "Christmas Day (substitute day)"
        );
    }

    if (
        boxingDay.getDay() === 6 ||
        boxingDay.getDay() === 0
    ) {
        const boxingSubstitute =
            getNextAvailableWeekday(
                addDays(boxingDay, 1),
                occupiedDates
            );

        addUKBankHoliday(
            events,
            occupiedDates,
            boxingSubstitute,
            "Boxing Day (substitute day)"
        );
    }

    return events;
}

/* =========================================================
   INTERNATIONAL / CULTURAL HOLIDAYS
   ========================================================= */

function loadInternationalHolidays(year) {
    const events = [];

    /*
     * New Year's Day
     */
    addEvent(
        events,
        year,
        0,
        1,
        "New Year's Day",
        "International"
    );

    /*
     * Valentine's Day
     */
    addEvent(
        events,
        year,
        1,
        14,
        "Valentine's Day",
        "Cultural"
    );

    /*
     * International Women's Day
     */
    addEvent(
        events,
        year,
        2,
        8,
        "International Women's Day",
        "International"
    );

    /*
     * St Patrick's Day
     */
    addEvent(
        events,
        year,
        2,
        17,
        "St Patrick's Day",
        "Cultural"
    );

    /*
     * April Fools' Day
     */
    addEvent(
        events,
        year,
        3,
        1,
        "April Fools' Day",
        "Cultural"
    );

    /*
     * International Workers' Day
     */
    addEvent(
        events,
        year,
        4,
        1,
        "International Workers' Day",
        "International"
    );

    /*
     * UK Mother's Day / Mothering Sunday.
     *
     * Three weeks before Easter Sunday.
     */
    const easter = getEasterSunday(year);

    addEvent(
        events,
        year,
        easter.getMonth(),
        easter.getDate() - 21,
        "Mother's Day",
        "Cultural"
    );

    /*
     * Father's Day.
     */
    const fathersDay = getNthWeekdayOfMonth(
        year,
        5,
        0,
        3
    );

    addEvent(
        events,
        year,
        fathersDay.getMonth(),
        fathersDay.getDate(),
        "Father's Day",
        "Cultural"
    );

    /*
     * Halloween
     */
    addEvent(
        events,
        year,
        9,
        31,
        "Halloween",
        "Cultural"
    );

    /*
     * Bonfire Night
     */
    addEvent(
        events,
        year,
        10,
        5,
        "Bonfire Night",
        "UK Cultural"
    );

    /*
     * Christmas Eve
     */
    addEvent(
        events,
        year,
        11,
        24,
        "Christmas Eve",
        "Cultural"
    );

    /*
     * Christmas Day
     */
    addEvent(
        events,
        year,
        11,
        25,
        "Christmas Day",
        "International"
    );

    /*
     * Boxing Day
     */
    addEvent(
        events,
        year,
        11,
        26,
        "Boxing Day",
        "Cultural"
    );

    /*
     * New Year's Eve
     */
    addEvent(
        events,
        year,
        11,
        31,
        "New Year's Eve",
        "International"
    );

    return events;
}

/* =========================================================
   CHRISTIAN OBSERVANCES
   EXACTLY 5
   ========================================================= */

function loadChristianHolidays(year) {
    const events = [];
    const easter = getEasterSunday(year);

    /*
     * Good Friday
     */
    addEvent(
        events,
        year,
        easter.getMonth(),
        easter.getDate() - 2,
        "Good Friday",
        "Christian"
    );

    /*
     * Easter Sunday
     */
    addEvent(
        events,
        year,
        easter.getMonth(),
        easter.getDate(),
        "Easter Sunday",
        "Christian"
    );

    /*
     * Ascension Day
     */
    addEvent(
        events,
        year,
        easter.getMonth(),
        easter.getDate() + 39,
        "Ascension Day",
        "Christian"
    );

    /*
     * Pentecost
     */
    addEvent(
        events,
        year,
        easter.getMonth(),
        easter.getDate() + 49,
        "Pentecost",
        "Christian"
    );

    /*
     * Christmas Day
     */
    addEvent(
        events,
        year,
        11,
        25,
        "Christmas Day",
        "Christian"
    );

    return events;
}

/* =========================================================
   MUSLIM OBSERVANCES
   EXACTLY 5
   ========================================================= */

async function loadMuslimHolidays(year) {
    const events = [];

    try {
        const module = await import(
            "https://cdn.jsdelivr.net/npm/islamic-date/+esm"
        );

        /*
         * The package exposes gregorianToHijri().
         *
         * We scan the Gregorian year and identify the
         * corresponding Hijri dates for the five selected
         * observances.
         */

        const converter =
            module.gregorianToHijri ||
            module.default?.gregorianToHijri;

        if (typeof converter !== "function") {
            throw new Error(
                "islamic-date gregorianToHijri() was not found."
            );
        }

        const targets = [
            {
                month: 9,
                day: 1,
                title: "Ramadan"
            },
            {
                month: 10,
                day: 1,
                title: "Eid al-Fitr"
            },
            {
                month: 12,
                day: 10,
                title: "Eid al-Adha"
            },
            {
                month: 1,
                day: 10,
                title: "Ashura"
            },
            {
                month: 3,
                day: 12,
                title: "Mawlid al-Nabi"
            }
        ];

        const found = new Set();

        /*
         * Search the Gregorian year.
         *
         * This deliberately scans dates rather than assuming
         * a fixed Gregorian date because Islamic observances
         * move approximately 10-11 days each Gregorian year.
         */
        for (
            let month = 0;
            month < 12 && found.size < targets.length;
            month++
        ) {
            const daysInMonth = new Date(
                year,
                month + 1,
                0
            ).getDate();

            for (
                let day = 1;
                day <= daysInMonth &&
                found.size < targets.length;
                day++
            ) {
                const date = createDate(year, month, day);

                let hijri;

                try {
                    hijri = converter(date);
                } catch (error) {
                    /*
                     * Some versions may expect numeric
                     * Gregorian arguments.
                     */
                    try {
                        hijri = converter(
                            year,
                            month + 1,
                            day
                        );
                    } catch (secondError) {
                        continue;
                    }
                }

                if (!hijri) {
                    continue;
                }

                const hijriMonth = Number(
                    hijri.month ??
                    hijri.hMonth ??
                    hijri.hm
                );

                const hijriDay = Number(
                    hijri.day ??
                    hijri.hDay ??
                    hijri.hd
                );

                if (!hijriMonth || !hijriDay) {
                    continue;
                }

                for (const target of targets) {
                    if (
                        !found.has(target.title) &&
                        hijriMonth === target.month &&
                        hijriDay === target.day
                    ) {
                        addEvent(
                            events,
                            year,
                            month,
                            day,
                            target.title,
                            "Muslim"
                        );

                        found.add(target.title);
                    }
                }
            }
        }

        return events;
    } catch (error) {
        console.error(
            "Unable to load Muslim observances:",
            error
        );

        return events;
    }
}

/* =========================================================
   JEWISH OBSERVANCES
   EXACTLY 5
   ========================================================= */

async function loadJewishHolidays(year) {
    const events = [];

    try {
        const {
            calendar
        } = await import(
            "https://cdn.jsdelivr.net/npm/@hebcal/core@" +
            CALENDAR_CONFIG.hebcalVersion +
            "/+esm"
        );

        const hebcalEvents = calendar({
            year: year,
            isHebrewYear: false,
            noMinorFast: true,
            noModern: true,
            noRoshChodesh: true
        });

        const targets = [
            {
                test: /rosh hashana/i,
                title: "Rosh Hashanah"
            },
            {
                test: /yom kippur/i,
                title: "Yom Kippur"
            },
            {
                test: /pesach|passover/i,
                title: "Passover"
            },
            {
                test: /sukkot/i,
                title: "Sukkot"
            },
            {
                test: /chanukah|hanukkah/i,
                title: "Hanukkah"
            }
        ];

        const found = new Set();

        for (const event of hebcalEvents) {
            if (
                !event ||
                typeof event.getDesc !== "function" ||
                typeof event.getDate !== "function"
            ) {
                continue;
            }

            const description =
                event.getDesc();

            const target = targets.find(function(item) {
                return (
                    !found.has(item.title) &&
                    item.test.test(description)
                );
            });

            if (!target) {
                continue;
            }

            const gregorianDate =
                event.getDate().greg();

            if (
                !gregorianDate ||
                isNaN(gregorianDate.getTime())
            ) {
                continue;
            }

            /*
             * Some Jewish observances can begin in the
             * previous Gregorian year. Only include the
             * occurrence belonging to the requested year.
             */
            if (
                gregorianDate.getFullYear() !== year
            ) {
                continue;
            }

            addEvent(
                events,
                year,
                gregorianDate.getMonth(),
                gregorianDate.getDate(),
                target.title,
                "Jewish"
            );

            found.add(target.title);
        }

        return events;
    } catch (error) {
        console.error(
            "Unable to load Jewish observances:",
            error
        );

        return events;
    }
}

/* =========================================================
   HINDU OBSERVANCES
   EXACTLY 5
   ========================================================= */

async function loadHinduHolidays(year) {
    const events = [];

    try {
        const module = await import(
            "https://cdn.jsdelivr.net/npm/@aryanjsx/indian-festivals@" +
            CALENDAR_CONFIG.hinduFestivalVersion +
            "/+esm"
        );

        const getFestivalBySlug =
            module.getFestivalBySlug;

        if (
            typeof getFestivalBySlug !== "function"
        ) {
            throw new Error(
                "Indian festival package API was not found."
            );
        }

        const targets = [
            {
                slug: "diwali",
                title: "Diwali"
            },
            {
                slug: "holi",
                title: "Holi"
            },
            {
                slug: "navratri",
                title: "Navratri"
            },
            {
                slug: "janmashtami",
                title: "Krishna Janmashtami"
            },
            {
                slug: "maha-shivaratri",
                title: "Maha Shivaratri"
            }
        ];

        for (const target of targets) {
            const festival =
                getFestivalBySlug(target.slug);

            if (!festival) {
                console.warn(
                    "Hindu festival not found:",
                    target.slug
                );
                continue;
            }

            const dateString =
                festival.dates?.[year];

            const date =
                parseISODate(dateString);

            if (!date) {
                console.warn(
                    "No Hindu festival date available for:",
                    target.slug,
                    year
                );
                continue;
            }

            /*
             * Only include dates belonging to the
             * requested Gregorian year.
             */
            if (date.getFullYear() !== year) {
                continue;
            }

            addEvent(
                events,
                year,
                date.getMonth(),
                date.getDate(),
                target.title,
                "Hindu"
            );
        }

        return events;
    } catch (error) {
        console.error(
            "Unable to load Hindu observances:",
            error
        );

        return events;
    }
}

/* =========================================================
   DUPLICATE REMOVAL
   ========================================================= */

function removeDuplicateEvents(events) {
    const seen = new Set();

    return events.filter(function(event) {
        /*
         * Use date + title rather than only title.
         *
         * This allows the same holiday to appear under
         * different categories while preventing visually
         * identical duplicate entries.
         */
        const key =
            dateKey(event.start) +
            "|" +
            event.title
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}

/* =========================================================
   LOAD ALL CALENDAR DATA
   ========================================================= */

async function loadCalendarEvents() {
    if (calendarDataLoaded) {
        return calendarEvents;
    }

    const cachedEvents =
        getCachedCalendarEvents();

    if (cachedEvents) {
        calendarEvents = cachedEvents;
        calendarDataLoaded = true;

        displayNextEvent();
        displayCalendarEvents();
        handleTodayHoliday();

        return calendarEvents;
    }

    const year =
        new Date().getFullYear();

    try {
        /*
         * Load the independent data sources.
         *
         * UK + international + Christian are local
         * calculations.
         *
         * Muslim + Jewish + Hindu use jsDelivr-hosted
         * packages.
         */
        const [
            ukEvents,
            internationalEvents,
            christianEvents,
            muslimEvents,
            jewishEvents,
            hinduEvents
        ] = await Promise.all([
            Promise.resolve(
                loadUKHolidays(year)
            ),
            Promise.resolve(
                loadInternationalHolidays(year)
            ),
            Promise.resolve(
                loadChristianHolidays(year)
            ),
            loadMuslimHolidays(year),
            loadJewishHolidays(year),
            loadHinduHolidays(year)
        ]);

        calendarEvents = removeDuplicateEvents([
            ...ukEvents,
            ...internationalEvents,
            ...christianEvents,
            ...muslimEvents,
            ...jewishEvents,
            ...hinduEvents
        ]);

        calendarEvents.sort(function(a, b) {
            return a.start - b.start;
        });

        /*
         * Do not cache an empty calendar.
         *
         * This is particularly useful if a remote
         * religious-calendar package temporarily fails.
         */
        if (calendarEvents.length === 0) {
            throw new Error(
                "No calendar events were generated."
            );
        }

        calendarDataLoaded = true;

        cacheCalendarEvents(calendarEvents);

        displayNextEvent();
        displayCalendarEvents();
        handleTodayHoliday();

        console.log(
            "Calendar loaded:",
            calendarEvents.length,
            "events for",
            year
        );

        return calendarEvents;
    } catch (error) {
        console.error(
            "Unable to load calendar events:",
            error
        );

        const container =
            document.getElementById(
                "calendarEvents"
            );

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
   NEXT EVENT
   ========================================================= */

function getNextEvent() {
    const today = dateOnly(new Date());

    return calendarEvents.find(function(event) {
        return dateOnly(event.start) >= today;
    });
}

/* =========================================================
   TODAY'S HOLIDAY
   ========================================================= */

function handleTodayHoliday() {
    const today = dateOnly(new Date());

    const todayEvents =
        calendarEvents.filter(function(event) {
            return (
                event.start.getFullYear() ===
                    today.getFullYear() &&
                event.start.getMonth() ===
                    today.getMonth() &&
                event.start.getDate() ===
                    today.getDate()
            );
        });

    if (todayEvents.length > 0) {
        showHolidayNotification(
            todayEvents[0]
        );
    }
}

/* =========================================================
   DISPLAY HELPERS
   ========================================================= */

function formatEventDate(date) {
    if (!date) {
        return "";
    }

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

function getRemainingDays(date) {
    if (!date) {
        return "";
    }

    const today = dateOnly(new Date());
    const eventDate = dateOnly(date);

    const difference =
        eventDate.getTime() -
        today.getTime();

    const days = Math.round(
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
   HOLIDAY GREETINGS
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

    if (title.includes("christmas")) {
        return "🎄 Merry Christmas!";
    }

    if (title.includes("new year's day")) {
        return "🎆 Happy New Year!";
    }

    if (title.includes("new year's eve")) {
        return "🎆 Happy New Year's Eve!";
    }

    if (title.includes("easter")) {
        return "🐣 Happy Easter!";
    }

    if (title.includes("boxing")) {
        return "🎁 Happy Boxing Day!";
    }

    if (title.includes("diwali")) {
        return "🪔 Happy Diwali!";
    }

    if (title.includes("holi")) {
        return "🌈 Happy Holi!";
    }

    if (title.includes("hanukkah")) {
        return "🕎 Happy Hanukkah!";
    }

    if (title.includes("passover")) {
        return "🍷 Happy Passover!";
    }

    if (title.includes("eid al-fitr")) {
        return "🌙 Eid Mubarak!";
    }

    if (title.includes("eid al-adha")) {
        return "🌙 Eid Mubarak!";
    }

    if (title.includes("ramadan")) {
        return "🌙 Ramadan Mubarak!";
    }

    if (title.includes("bank holiday")) {
        return "🇬🇧 Happy Bank Holiday!";
    }

    return "🎉 Happy " + event.title + "!";
}

/* =========================================================
   NOTIFICATION
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
        setInterval(function() {
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
            function() {
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
        setTimeout(function() {
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

    if (!container) {
        return;
    }

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
   FULL EVENT LIST
   ========================================================= */

function displayCalendarEvents() {
    const container =
        document.getElementById(
            "calendarEvents"
        );

    if (!container) {
        return;
    }

    if (calendarEvents.length === 0) {
        container.innerHTML = `
            <p>
                No upcoming events found.
            </p>
        `;

        return;
    }

    container.innerHTML =
        calendarEvents
            .map(function(event) {
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
            })
            .join("");
}

/* =========================================================
   TODAY DISPLAY
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
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(new Date());
}

/* =========================================================
   CACHE
   ========================================================= */

function cacheCalendarEvents(events) {
    try {
        sessionStorage.setItem(
            "calendarEvents",
            JSON.stringify({
                timestamp: Date.now(),

                events: events.map(function(event) {
                    return {
                        id: event.id,
                        title: event.title,
                        category: event.category,
                        start: event.start
                            ? event.start.toISOString()
                            : null,
                        end: event.end
                            ? event.end.toISOString()
                            : null
                    };
                })
            })
        );
    } catch (error) {
        console.warn(
            "Unable to cache calendar events:",
            error
        );
    }
}

function getCachedCalendarEvents() {
    try {
        const cached =
            sessionStorage.getItem(
                "calendarEvents"
            );

        if (!cached) {
            return null;
        }

        const data =
            JSON.parse(cached);

        if (
            !data ||
            !data.timestamp ||
            !Array.isArray(data.events)
        ) {
            return null;
        }

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

        return data.events
            .map(function(event) {
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
            .filter(function(event) {
                return (
                    event.start &&
                    !isNaN(
                        event.start.getTime()
                    )
                );
            });
    } catch (error) {
        sessionStorage.removeItem(
            "calendarEvents"
        );

        return null;
    }
}

/* =========================================================
   CALENDAR UI
   ========================================================= */

function initialiseCalendar() {
    /*
     * IMPORTANT:
     *
     * Load the data FIRST.
     *
     * Previously, the function returned immediately when
     * #calendarToggle was missing, which prevented the
     * calendar data from loading at all.
     */
    loadCalendarEvents();

    displayCalendarToday();

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

    /*
     * The calendar data can still load even if the
     * calendar UI elements are missing.
     */
    if (!toggle) {
        console.warn(
            "Calendar UI: #calendarToggle was not found. " +
            "Calendar data loading will continue."
        );

        return;
    }

    if (!calendar) {
        console.warn(
            "Calendar UI: #calendarModal was not found."
        );

        return;
    }

    toggle.addEventListener(
        "click",
        function() {
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
        function(event) {
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
}

/* =========================================================
   SAFE STARTUP
   ========================================================= */

function startCalendar() {
    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            initialiseCalendar,
            {
                once: true
            }
        );
    } else {
        initialiseCalendar();
    }
}

startCalendar();
