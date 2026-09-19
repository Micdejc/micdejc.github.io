let calendarEvents = [];
let calendarDataLoaded = false;

const CALENDAR_CONFIG = {
    /* 12 hours update basis for cache  */
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

function addDateEvent(events, date, title, category) {
    if (!date || isNaN(date.getTime())) {
        return;
    }

    events.push({
        id: createEventId(date, title),
        title: title,
        category: category || "Holiday",
        start: dateOnly(date),
        end: addDays(dateOnly(date), 1)
    });
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getNthWeekdayOfMonth(
    year,
    month,
    weekday,
    occurrence
) {
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
   EASTER CALCULATION
   ========================================================= */

function getEasterSunday(year) {
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

    return new Date(
        year,
        month - 1,
        day
    );
}

/* =========================================================
   UK BANK HOLIDAYS
   ENGLAND & WALES
   ========================================================= */

function addUKBankHoliday(
    events,
    occupiedDates,
    date,
    title
) {
    const cleanDate = dateOnly(date);
    const key = dateKey(cleanDate);

    events.push({
        id: createEventId(cleanDate, title),
        title: title,
        category: "UK Bank Holiday",
        start: cleanDate,
        end: addDays(cleanDate, 1)
    });

    occupiedDates.add(key);
}

function getNextAvailableWeekday(
    startDate,
    occupiedDates
) {
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

    const newYear =
        createDate(year, 0, 1);

    const earlyMay =
        getNthWeekdayOfMonth(
            year,
            4,
            1,
            1
        );

    const springBankHoliday =
        getNthWeekdayOfMonth(
            year,
            4,
            1,
            4
        );

    const summerBankHoliday =
        getNthWeekdayOfMonth(
            year,
            7,
            1,
            5
        );

    const christmas =
        createDate(year, 11, 25);

    const boxingDay =
        createDate(year, 11, 26);

    /*
     * New Year's Day
     */
    if (
        newYear.getDay() === 0 ||
        newYear.getDay() === 6
    ) {
        const substitute =
            getNextAvailableWeekday(
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
     * Good Friday
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        addDays(easter, -2),
        "Good Friday"
    );

    /*
     * Easter Monday
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        addDays(easter, 1),
        "Easter Monday"
    );

    /*
     * Early May Bank Holiday
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        earlyMay,
        "Early May Bank Holiday"
    );

    /*
     * Spring Bank Holiday
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        springBankHoliday,
        "Spring Bank Holiday"
    );

    /*
     * Summer Bank Holiday
     */
    addUKBankHoliday(
        events,
        occupiedDates,
        summerBankHoliday,
        "Summer Bank Holiday"
    );

    /*
     * Christmas Day
     */
    if (
        christmas.getDay() !== 0 &&
        christmas.getDay() !== 6
    ) {
        addUKBankHoliday(
            events,
            occupiedDates,
            christmas,
            "Christmas Day"
        );
    }

    /*
     * Boxing Day
     */
    if (
        boxingDay.getDay() !== 0 &&
        boxingDay.getDay() !== 6
    ) {
        addUKBankHoliday(
            events,
            occupiedDates,
            boxingDay,
            "Boxing Day"
        );
    }

    /*
     * Christmas substitute
     */
    if (
        christmas.getDay() === 0 ||
        christmas.getDay() === 6
    ) {
        const substitute =
            getNextAvailableWeekday(
                addDays(christmas, 1),
                occupiedDates
            );

        addUKBankHoliday(
            events,
            occupiedDates,
            substitute,
            "Christmas Day (substitute day)"
        );
    }

    /*
     * Boxing Day substitute
     */
    if (
        boxingDay.getDay() === 0 ||
        boxingDay.getDay() === 6
    ) {
        const substitute =
            getNextAvailableWeekday(
                addDays(boxingDay, 1),
                occupiedDates
            );

        addUKBankHoliday(
            events,
            occupiedDates,
            substitute,
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

    addEvent(
        events,
        year,
        0,
        1,
        "New Year's Day",
        "International"
    );

    addEvent(
        events,
        year,
        1,
        14,
        "Valentine's Day",
        "Cultural"
    );

    addEvent(
        events,
        year,
        2,
        8,
        "International Women's Day",
        "International"
    );

    addEvent(
        events,
        year,
        2,
        17,
        "St Patrick's Day",
        "Cultural"
    );

    addEvent(
        events,
        year,
        3,
        1,
        "April Fools' Day",
        "Cultural"
    );

    addEvent(
        events,
        year,
        4,
        1,
        "International Workers' Day",
        "International"
    );

    /*
     * UK Mother's Day / Mothering Sunday
     * = 21 days before Easter Sunday.
     */
    const easter =
        getEasterSunday(year);

    addDateEvent(
        events,
        addDays(easter, -21),
        "Mother's Day",
        "Cultural"
    );

    /*
     * Father's Day
     * = third Sunday of June.
     */
    const fathersDay =
        getNthWeekdayOfMonth(
            year,
            5,
            0,
            3
        );

    addDateEvent(
        events,
        fathersDay,
        "Father's Day",
        "Cultural"
    );

    addEvent(
        events,
        year,
        9,
        31,
        "Halloween",
        "Cultural"
    );

    addEvent(
        events,
        year,
        10,
        5,
        "Bonfire Night",
        "UK Cultural"
    );

    addEvent(
        events,
        year,
        11,
        24,
        "Christmas Eve",
        "Cultural"
    );

    addEvent(
        events,
        year,
        11,
        25,
        "Christmas Day",
        "International"
    );

    addEvent(
        events,
        year,
        11,
        26,
        "Boxing Day",
        "Cultural"
    );

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
    const easter =
        getEasterSunday(year);

    addDateEvent(
        events,
        addDays(easter, -2),
        "Good Friday",
        "Christian"
    );

    addDateEvent(
        events,
        easter,
        "Easter Sunday",
        "Christian"
    );

    addDateEvent(
        events,
        addDays(easter, 39),
        "Ascension Day",
        "Christian"
    );

    addDateEvent(
        events,
        addDays(easter, 49),
        "Pentecost",
        "Christian"
    );

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

        const gregorianToHijri =
            module.gregorianToHijri;

        if (
            typeof gregorianToHijri !==
            "function"
        ) {
            throw new Error(
                "islamic-date gregorianToHijri() was not found."
            );
        }

        /*
         * The five selected major Muslim observances.
         *
         * Hijri:
         * 1/10  = Ashura
         * 3/12  = Mawlid al-Nabi
         * 9/1   = Ramadan
         * 10/1  = Eid al-Fitr
         * 12/10 = Eid al-Adha
         */
        const targets = [
            {
                month: 1,
                day: 10,
                title: "Ashura"
            },
            {
                month: 3,
                day: 12,
                title: "Mawlid al-Nabi"
            },
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
            }
        ];

        const found = new Set();

        /*
         * Scan every Gregorian date in the year.
         *
         * IMPORTANT:
         * gregorianToHijri expects:
         *
         * gregorianToHijri(
         *     year,
         *     month,
         *     day,
         *     language
         * )
         *
         * Month is 1-12.
         */
        for (
            let month = 0;
            month < 12;
            month++
        ) {
            const daysInMonth =
                new Date(
                    year,
                    month + 1,
                    0
                ).getDate();

            for (
                let day = 1;
                day <= daysInMonth;
                day++
            ) {
                if (
                    found.size ===
                    targets.length
                ) {
                    break;
                }

                const hijri =
                    gregorianToHijri(
                        year,
                        month + 1,
                        day,
                        "en"
                    );

                if (
                    !hijri ||
                    hijri.success === false
                ) {
                    continue;
                }

                const hijriMonth =
                    Number(hijri.month);

                const hijriDay =
                    Number(hijri.day);

                const target =
                    targets.find(function(item) {
                        return (
                            !found.has(
                                item.title
                            ) &&
                            hijriMonth ===
                                item.month &&
                            hijriDay ===
                                item.day
                        );
                    });

                if (!target) {
                    continue;
                }

                addEvent(
                    events,
                    year,
                    month,
                    day,
                    target.title,
                    "Muslim"
                );

                found.add(
                    target.title
                );
            }
        }

        /*
         * Diagnostic output.
         */
        
        /* console.log(
            "Muslim observances loaded:",
            events
        );*/

        /*
         * Warn if any of the five could not
         * be found.
         */
        targets.forEach(function(target) {
            if (
                !found.has(target.title)
            ) {
                console.warn(
                    "Muslim observance not found:",
                    target.title,
                    year
                );
            }
        });

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

        const hebcalEvents =
            calendar({
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
                typeof event.getDesc !==
                    "function" ||
                typeof event.getDate !==
                    "function"
            ) {
                continue;
            }

            const description =
                event.getDesc();

            const target =
                targets.find(function(item) {
                    return (
                        !found.has(
                            item.title
                        ) &&
                        item.test.test(
                            description
                        )
                    );
                });

            if (!target) {
                continue;
            }

            const gregorianDate =
                event.getDate().greg();

            if (
                !gregorianDate ||
                isNaN(
                    gregorianDate.getTime()
                )
            ) {
                continue;
            }

            if (
                gregorianDate.getFullYear() !==
                year
            ) {
                continue;
            }

            addDateEvent(
                events,
                gregorianDate,
                target.title,
                "Jewish"
            );

            found.add(
                target.title
            );
        }

        return events;
    } catch (error) {
        console.error(
            "Unable to load Jewish observances:",
            error
        );

        return [];
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
            typeof getFestivalBySlug !==
            "function"
        ) {
            throw new Error(
                "getFestivalBySlug() was not found."
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
                getFestivalBySlug(
                    target.slug
                );

            if (!festival) {
                console.warn(
                    "Hindu festival not found:",
                    target.slug
                );

                continue;
            }

            const dateString =
                festival.dates &&
                festival.dates[year];

            if (!dateString) {
                console.warn(
                    "No date for " +
                        target.title +
                        " in " +
                        year
                );

                continue;
            }

            const parts =
                dateString
                    .split("-")
                    .map(Number);

            if (parts.length !== 3) {
                continue;
            }

            const date = new Date(
                parts[0],
                parts[1] - 1,
                parts[2]
            );

            if (
                isNaN(date.getTime()) ||
                date.getFullYear() !== year
            ) {
                continue;
            }

            addDateEvent(
                events,
                date,
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

        return [];
    }
}

/* =========================================================
   DUPLICATE REMOVAL
   ========================================================= */

function removeDuplicateEvents(events) {
    const seen = new Set();

    return events.filter(function(event) {
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
   LOAD ALL EVENTS
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

        calendarEvents =
            removeDuplicateEvents([
                ...ukEvents,
                ...internationalEvents,
                ...christianEvents,
                ...muslimEvents,
                ...jewishEvents,
                ...hinduEvents
            ]);

        calendarEvents.sort(
            function(a, b) {
                return (
                    a.start - b.start
                );
            }
        );

        if (
            calendarEvents.length === 0
        ) {
            throw new Error(
                "No calendar events were generated."
            );
        }

        calendarDataLoaded = true;

        cacheCalendarEvents(
            calendarEvents
        );

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
    const today =
        dateOnly(new Date());

    return calendarEvents.find(
        function(event) {
            return (
                dateOnly(event.start) >=
                today
            );
        }
    );
}

/* =========================================================
   TODAY'S HOLIDAY
   ========================================================= */

function handleTodayHoliday() {
    const today =
        dateOnly(new Date());

    const todayEvents =
        calendarEvents.filter(
            function(event) {
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

    if (
        todayEvents.length > 0
    ) {
        showHolidayNotification(
            todayEvents[0]
        );
    }
}

/* =========================================================
   DISPLAY
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

    const today =
        dateOnly(new Date());

    const eventDate =
        dateOnly(date);

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
   GREETINGS
   ========================================================= */

function getHolidayGreeting(event) {
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
        title.includes("bonfire")
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
        title.includes("new year's day")
    ) {
        return "🎆 Happy New Year!";
    }

    if (
        title.includes("new year's eve")
    ) {
        return "🎆 Happy New Year's Eve!";
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
        title.includes("diwali")
    ) {
        return "🪔 Happy Diwali!";
    }

    if (
        title.includes("holi")
    ) {
        return "🌈 Happy Holi!";
    }

    if (
        title.includes("hanukkah")
    ) {
        return "🕎 Happy Hanukkah!";
    }

    if (
        title.includes("passover")
    ) {
        return "🍷 Happy Passover!";
    }

    if (
        title.includes("eid al-fitr")
    ) {
        return "🕋 Eid Mubarak!";
    }

    if (
        title.includes("eid al-adha")
    ) {
        return "🐑 Eid Mubarak!";
    }

    if (
        title.includes("ramadan")
    ) {
        return "🌙 Ramadan Mubarak!";
    }

    if (
        title.includes("ashura")
    ) {
        return "☪️ Ashura Mubarak!";
    }

    if (
        title.includes("mawlid")
    ) {
        return "🌙 Mawlid Mubarak!";
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
   NOTIFICATION
   ========================================================= */

function showHolidayNotification(event) {
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
            function() {
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
        setTimeout(
            function() {
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
   EVENT LIST
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
   SESSION CACHE
   ========================================================= */

function cacheCalendarEvents(events) {
    try {
        sessionStorage.setItem(
            "calendarEvents",
            JSON.stringify({
                timestamp: Date.now(),

                events: events.map(
                    function(event) {
                        return {
                            id: event.id,
                            title: event.title,
                            category:
                                event.category,
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
            !Array.isArray(
                data.events
            )
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
                        ? new Date(
                              event.start
                          )
                        : null,
                    end: event.end
                        ? new Date(
                              event.end
                          )
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
     * Load the data first.
     *
     * This prevents a missing calendarToggle element
     * from stopping the entire calendar system.
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
