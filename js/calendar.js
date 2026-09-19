let calendarEvents = [];
let calendarDataLoaded = false;

const CALENDAR_CONFIG = {
   /* 12 hours update basis for cache */
    cacheDuration: 12 * 60 * 60 * 1000,
    hebcalVersion: "6.9.2",
    hinduFestivalVersion: "1.0.1"
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
            muslimEvents,
            jewishEvents,
            hinduEvents
        ] = await Promise.all([
            loadUKHolidays(year),
            loadInternationalHolidays(year),
            loadChristianHolidays(year),
            loadMuslimHolidays(year),
            loadJewishHolidays(year),
            loadHinduHolidays(year)
        ]);

        let events = [
            ...ukEvents,
            ...internationalEvents,
            ...christianEvents,
            ...muslimEvents,
            ...jewishEvents,
            ...hinduEvents
        ];

        /*
         * Canonicalize event names.
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

        cacheCalendarEvents(
            calendarEvents,
            year
        );

        displayNextEvent();
        displayCalendarEvents();
        handleTodayHoliday();

        return calendarEvents;

    } catch (error) {
        console.error(
            "Unable to load calendar events:",
            error
        );

        const container =
            document.getElementById("calendarEvents");

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
   UK BANK HOLIDAYS
   ENGLAND & WALES
   ========================================================= */

function loadUKHolidays(year) {
    const events = [];

    /*
     * Easter Sunday.
     */
    const easter =
        calculateEasterSunday(year);

    /*
     * Collect official England & Wales
     * bank holidays.
     */
    const bankHolidays = [];

    /*
     * New Year's Day.
     */
    bankHolidays.push({
        date: new Date(year, 0, 1),
        title: "New Year's Day"
    });

    /*
     * Good Friday.
     */
    const goodFriday =
        new Date(easter);

    goodFriday.setDate(
        goodFriday.getDate() - 2
    );

    bankHolidays.push({
        date: goodFriday,
        title: "Good Friday"
    });

    /*
     * Easter Monday.
     */
    const easterMonday =
        new Date(easter);

    easterMonday.setDate(
        easterMonday.getDate() + 1
    );

    bankHolidays.push({
        date: easterMonday,
        title: "Easter Monday"
    });

    /*
     * Early May Bank Holiday.
     * First Monday in May.
     */
    bankHolidays.push({
        date: getNthWeekdayOfMonth(
            year,
            4,
            1,
            1
        ),
        title: "Early May Bank Holiday"
    });

    /*
     * Spring Bank Holiday.
     * Last Monday in May.
     */
    bankHolidays.push({
        date: getLastWeekdayOfMonth(
            year,
            4,
            1
        ),
        title: "Spring Bank Holiday"
    });

    /*
     * Summer Bank Holiday.
     * Last Monday in August.
     */
    bankHolidays.push({
        date: getLastWeekdayOfMonth(
            year,
            7,
            1
        ),
        title: "Summer Bank Holiday"
    });

    /*
     * Christmas Day.
     */
    bankHolidays.push({
        date: new Date(year, 11, 25),
        title: "Christmas Day"
    });

    /*
     * Boxing Day.
     */
    bankHolidays.push({
        date: new Date(year, 11, 26),
        title: "Boxing Day"
    });

    /*
     * Allocate substitute days without collisions.
     *
     * This is important for years where Christmas
     * and Boxing Day fall on a weekend.
     */
    const occupiedDates = new Set();

    bankHolidays.forEach(function (holiday) {
        const originalDate =
            new Date(holiday.date);

        let actualDate =
            new Date(originalDate);

        /*
         * If the holiday falls on Saturday/Sunday,
         * move it to the next available weekday.
         */
        if (
            originalDate.getDay() === 6 ||
            originalDate.getDay() === 0
        ) {
            actualDate =
                getNextAvailableWeekday(
                    actualDate,
                    occupiedDates
                );
        }

        const key =
            getDateKey(actualDate);

        occupiedDates.add(key);

        const isSubstitute =
            getDateKey(originalDate) !== key;

        events.push({
            id: createEventId(
                actualDate,
                holiday.title
            ),
            title:
                isSubstitute
                    ? holiday.title +
                      " (substitute day)"
                    : holiday.title,
            start: actualDate,
            end: new Date(
                actualDate.getFullYear(),
                actualDate.getMonth(),
                actualDate.getDate() + 1
            ),
            type: "UK",
            category: "UK Bank Holiday"
        });
    });

    return events;
}


/* =========================================================
   POPULAR INTERNATIONAL / CULTURAL EVENTS
   ========================================================= */

function loadInternationalHolidays(year) {
    const events = [];

    function addFixedEvent(
        month,
        day,
        title
    ) {
        const date =
            new Date(
                year,
                month,
                day
            );

        events.push({
            id: createEventId(
                date,
                title
            ),
            title: title,
            start: date,
            end: new Date(
                year,
                month,
                day + 1
            ),
            type: "International",
            category: "Cultural / International"
        });
    }

    /*
     * Fixed-date events.
     */
    addFixedEvent(
        0,
        1,
        "New Year's Day"
    );

    addFixedEvent(
        1,
        14,
        "Valentine's Day"
    );

    addFixedEvent(
        2,
        8,
        "International Women's Day"
    );

    addFixedEvent(
        2,
        17,
        "St Patrick's Day"
    );

    addFixedEvent(
        3,
        1,
        "April Fools' Day"
    );

    addFixedEvent(
        4,
        1,
        "International Workers' Day"
    );

    addFixedEvent(
        9,
        31,
        "Halloween"
    );

    addFixedEvent(
        10,
        5,
        "Bonfire Night"
    );

    addFixedEvent(
        11,
        24,
        "Christmas Eve"
    );

    addFixedEvent(
        11,
        25,
        "Christmas Day"
    );

    addFixedEvent(
        11,
        26,
        "Boxing Day"
    );

    addFixedEvent(
        11,
        31,
        "New Year's Eve"
    );


    /*
     * UK Mother's Day / Mothering Sunday.
     * Three weeks before Easter.
     */
    const easter =
        calculateEasterSunday(year);

    const mothersDay =
        new Date(easter);

    mothersDay.setDate(
        mothersDay.getDate() - 21
    );

    events.push({
        id: createEventId(
            mothersDay,
            "Mother's Day"
        ),
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
     * Father's Day.
     * Third Sunday of June.
     */
    const fathersDay =
        getNthWeekdayOfMonth(
            year,
            5,
            0,
            3
        );

    events.push({
        id: createEventId(
            fathersDay,
            "Father's Day"
        ),
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

    return events;
}


/* =========================================================
   TOP 5 CHRISTIAN OBSERVANCES
   ========================================================= */

function loadChristianHolidays(year) {
    const events = [];

    const easter =
        calculateEasterSunday(year);

    function addRelativeEvent(
        days,
        title
    ) {
        const date =
            new Date(easter);

        date.setDate(
            date.getDate() + days
        );

        events.push({
            id: createEventId(
                date,
                title
            ),
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
     * 1. Good Friday
     */
    addRelativeEvent(
        -2,
        "Good Friday"
    );

    /*
     * 2. Easter Sunday
     */
    addRelativeEvent(
        0,
        "Easter Sunday"
    );

    /*
     * 3. Ascension Day
     */
    addRelativeEvent(
        39,
        "Ascension Day"
    );

    /*
     * 4. Pentecost
     */
    addRelativeEvent(
        49,
        "Pentecost"
    );

    /*
     * 5. Christmas Day
     */
    const christmas =
        new Date(
            year,
            11,
            25
        );

    events.push({
        id: createEventId(
            christmas,
            "Christmas Day"
        ),
        title: "Christmas Day",
        start: christmas,
        end: new Date(
            year,
            11,
            26
        ),
        type: "Christian",
        category: "Christian Observance"
    });

    return events;
}


/* =========================================================
   TOP 5 MUSLIM OBSERVANCES
   ========================================================= */

async function loadMuslimHolidays(year) {
    const events = [];

    try {
        const module =
            await import(
                "https://cdn.jsdelivr.net/npm/islamic-date/+esm"
            );

        const gregorianToHijri =
            module.gregorianToHijri;

        if (
            typeof gregorianToHijri !==
            "function"
        ) {
            throw new Error(
                "gregorianToHijri() was not found."
            );
        }

        const startDate =
            new Date(year, 0, 1);

        const endDate =
            new Date(year + 1, 0, 1);

        for (
            let date =
                new Date(startDate);

            date < endDate;

            date.setDate(
                date.getDate() + 1
            )
        ) {
            const current =
                new Date(date);

            let result;

            try {
                result =
                    gregorianToHijri(
                        current.getFullYear(),
                        current.getMonth() + 1,
                        current.getDate(),
                        "en"
                    );
            } catch (error) {
                continue;
            }

            /*
             * islamic-date returns:
             * {
             *   success,
             *   day,
             *   month,
             *   year,
             *   monthName,
             *   weekIndex
             * }
             */
            if (
                !result ||
                result.success === false
            ) {
                continue;
            }

            const hijriMonth =
                Number(result.month);

            const hijriDay =
                Number(result.day);

            if (
                !Number.isFinite(
                    hijriMonth
                ) ||
                !Number.isFinite(
                    hijriDay
                )
            ) {
                continue;
            }

            let title = null;

            /*
             * 1. Ramadan
             */
            if (
                hijriMonth === 9 &&
                hijriDay === 1
            ) {
                title = "Ramadan";
            }

            /*
             * 2. Eid al-Fitr
             */
            else if (
                hijriMonth === 10 &&
                hijriDay === 1
            ) {
                title = "Eid al-Fitr";
            }

            /*
             * 3. Eid al-Adha
             */
            else if (
                hijriMonth === 12 &&
                hijriDay === 10
            ) {
                title = "Eid al-Adha";
            }

            /*
             * 4. Ashura
             */
            else if (
                hijriMonth === 1 &&
                hijriDay === 10
            ) {
                title = "Ashura";
            }

            /*
             * 5. Mawlid al-Nabi
             */
            else if (
                hijriMonth === 3 &&
                hijriDay === 12
            ) {
                title = "Mawlid al-Nabi";
            }

            if (!title) {
                continue;
            }

            events.push({
                id: createEventId(
                    current,
                    title
                ),
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
   TOP 5 JEWISH OBSERVANCES
   ========================================================= */

async function loadJewishHolidays(year) {
    const events = [];

    try {
        const module =
            await import(
                "https://cdn.jsdelivr.net/npm/@hebcal/core@" +
                CALENDAR_CONFIG.hebcalVersion +
                "/+esm"
            );

        const calendar =
            module.calendar;

        if (
            typeof calendar !==
            "function"
        ) {
            throw new Error(
                "Hebcal calendar() was not found."
            );
        }

        const hebrewEvents =
            calendar({
                year: year,
                isHebrewYear: false,
                noMinorFast: true,
                noModern: true,
                noRoshChodesh: true
            });

        /*
         * Exactly five major Jewish observances.
         */
        const wanted = [
            {
                pattern: /^Rosh Hashana/i,
                title: "Rosh Hashanah"
            },
            {
                pattern: /^Yom Kippur/i,
                title: "Yom Kippur"
            },
            {
                pattern: /^Pesach/i,
                title: "Passover (Pesach)"
            },
            {
                pattern: /^Sukkot/i,
                title: "Sukkot"
            },
            {
                pattern: /^Chanukah/i,
                title: "Hanukkah"
            }
        ];

        const added =
            new Set();

        hebrewEvents.forEach(
            function (event) {
                const description =
                    event.getDesc();

                if (!description) {
                    return;
                }

                const match =
                    wanted.find(
                        function (item) {
                            return item.pattern.test(
                                description
                            );
                        }
                    );

                if (!match) {
                    return;
                }

                const date =
                    event.getDate().greg();

                /*
                 * Hebcal can return multiple days
                 * for the same festival.
                 *
                 * Keep only the first Gregorian
                 * date for each observance.
                 */
                const key =
                    match.title;

                if (
                    added.has(key)
                ) {
                    return;
                }

                added.add(key);

                events.push({
                    id: createEventId(
                        date,
                        match.title
                    ),
                    title: match.title,
                    start: new Date(date),
                    end: new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate() + 1
                    ),
                    type: "Jewish",
                    category: "Jewish Observance"
                });
            }
        );

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
   TOP 5 HINDU OBSERVANCES
   ========================================================= */

async function loadHinduHolidays(year) {
    const events = [];

    try {
        const module =
            await import(
                "https://cdn.jsdelivr.net/npm/@aryanjsx/indian-festivals@" +
                CALENDAR_CONFIG.hinduFestivalVersion +
                "/+esm"
            );

        /*
         * The package officially exports
         * hinduFestivals.
         */
        const hinduFestivals =
            module.hinduFestivals;

        if (
            !Array.isArray(
                hinduFestivals
            )
        ) {
            throw new Error(
                "hinduFestivals was not found."
            );
        }

        /*
         * Exactly five major Hindu observances.
         */
        const wanted = [
            {
                patterns: [
                    "diwali",
                    "deepavali"
                ],
                title: "Diwali"
            },

            {
                patterns: [
                    "holi"
                ],
                title: "Holi"
            },

            {
                patterns: [
                    "navratri",
                    "navaratri"
                ],
                title: "Navratri"
            },

            {
                patterns: [
                    "krishna janmashtami",
                    "janmashtami"
                ],
                title:
                    "Krishna Janmashtami"
            },

            {
                patterns: [
                    "maha shivaratri",
                    "maha shivratri",
                    "shivaratri"
                ],
                title:
                    "Maha Shivaratri"
            }
        ];

        hinduFestivals.forEach(
            function (festival) {
                const festivalName =
                    String(
                        festival.name || ""
                    ).trim();

                if (!festivalName) {
                    return;
                }

                const normalizedName =
                    festivalName.toLowerCase();

                const match =
                    wanted.find(
                        function (item) {
                            return item.patterns.some(
                                function (pattern) {
                                    return normalizedName.includes(
                                        pattern
                                    );
                                }
                            );
                        }
                    );

                if (!match) {
                    return;
                }

                /*
                 * The package documents dates as:
                 *
                 * dates: {
                 *     2026: "2026-MM-DD",
                 *     2027: "2027-MM-DD"
                 * }
                 */
                const rawDate =
                    festival.dates &&
                    festival.dates[year];

                if (!rawDate) {
                    return;
                }

                const date =
                    parseFestivalDate(
                        rawDate
                    );

                if (!date) {
                    return;
                }

                const key =
                    getDateKey(date) +
                    "|" +
                    match.title;

                if (
                    events.some(
                        function (event) {
                            return (
                                getDateKey(
                                    event.start
                                ) +
                                "|" +
                                event.title ===
                                key
                            );
                        }
                    )
                ) {
                    return;
                }

                events.push({
                    id: createEventId(
                        date,
                        match.title
                    ),
                    title: match.title,
                    start: date,
                    end: new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate() + 1
                    ),
                    type: "Hindu",
                    category: "Hindu Observance"
                });
            }
        );

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
   DATE PARSING
   ========================================================= */

function parseFestivalDate(value) {
    if (
        value instanceof Date
    ) {
        return new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
        );
    }

    if (
        typeof value !== "string"
    ) {
        return null;
    }

    /*
     * Expected format:
     * YYYY-MM-DD
     */
    const match =
        value.match(
            /^(\d{4})-(\d{1,2})-(\d{1,2})$/
        );

    if (!match) {
        return null;
    }

    const year =
        Number(match[1]);

    const month =
        Number(match[2]) - 1;

    const day =
        Number(match[3]);

    const date =
        new Date(
            year,
            month,
            day
        );

    /*
     * Validate the date.
     */
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}


/* =========================================================
   EASTER CALCULATION
   ========================================================= */

function calculateEasterSunday(year) {
    const a =
        year % 19;

    const b =
        Math.floor(year / 100);

    const c =
        year % 100;

    const d =
        Math.floor(b / 4);

    const e =
        b % 4;

    const f =
        Math.floor(
            (b + 8) / 25
        );

    const g =
        Math.floor(
            (b - f + 1) / 3
        );

    const h =
        (
            19 * a +
            b -
            d -
            g +
            15
        ) % 30;

    const i =
        Math.floor(c / 4);

    const k =
        c % 4;

    const l =
        (
            32 +
            2 * e +
            2 * i -
            h -
            k
        ) % 7;

    const m =
        Math.floor(
            (
                a +
                11 * h +
                22 * l
            ) / 451
        );

    const month =
        Math.floor(
            (
                h +
                l -
                7 * m +
                114
            ) / 31
        );

    const day =
        (
            (
                h +
                l -
                7 * m +
                114
            ) % 31
        ) + 1;

    return new Date(
        year,
        month - 1,
        day
    );
}


/* =========================================================
   WEEKDAY HELPERS
   ========================================================= */

function getNthWeekdayOfMonth(
    year,
    month,
    weekday,
    occurrence
) {
    const firstDay =
        new Date(
            year,
            month,
            1
        );

    const firstWeekday =
        firstDay.getDay();

    const offset =
        (
            weekday -
            firstWeekday +
            7
        ) % 7;

    const day =
        1 +
        offset +
        (
            occurrence - 1
        ) * 7;

    return new Date(
        year,
        month,
        day
    );
}


function getLastWeekdayOfMonth(
    year,
    month,
    weekday
) {
    const lastDay =
        new Date(
            year,
            month + 1,
            0
        );

    const difference =
        (
            lastDay.getDay() -
            weekday +
            7
        ) % 7;

    return new Date(
        year,
        month,
        lastDay.getDate() -
        difference
    );
}


/* =========================================================
   SUBSTITUTE BANK HOLIDAY
   ========================================================= */

function getNextAvailableWeekday(
    date,
    occupiedDates
) {
    const result =
        new Date(date);

    while (
        result.getDay() === 0 ||
        result.getDay() === 6 ||
        occupiedDates.has(
            getDateKey(result)
        )
    ) {
        result.setDate(
            result.getDate() + 1
        );
    }

    return result;
}


/* =========================================================
   DATE KEY
   ========================================================= */

function getDateKey(date) {
    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2, "0")
    );
}


/* =========================================================
   EVENT ID
   ========================================================= */

function createEventId(
    date,
    title
) {
    return (
        getDateKey(date) +
        "-" +
        normalizeEventTitle(title)
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
    );
}


/* =========================================================
   EVENT TITLE NORMALIZATION
   ========================================================= */

function normalizeEventTitle(title) {
    return String(title)
        .toLowerCase()
        .replace(/[’']/g, "")
        .replace(/\s+/g, " ")
        .trim();
}


function getCanonicalEventTitle(title) {
    const normalized =
        normalizeEventTitle(title);

    const aliases = {
        "christmas":
            "Christmas Day",

        "christmas day":
            "Christmas Day",

        "new years day":
            "New Year's Day",

        "new years eve":
            "New Year's Eve",

        "easter":
            "Easter Sunday",

        "easter sunday":
            "Easter Sunday",

        "mothers day":
            "Mother's Day",

        "mothering sunday":
            "Mother's Day",

        "fathers day":
            "Father's Day",

        "st patricks day":
            "St Patrick's Day",

        "may day":
            "International Workers' Day",

        "international workers day":
            "International Workers' Day",

        "labour day":
            "International Workers' Day",

        "labor day":
            "International Workers' Day",

        "boxing day":
            "Boxing Day",

        "deepavali":
            "Diwali",

        "janmashtami":
            "Krishna Janmashtami",

        "maha shivratri":
            "Maha Shivaratri"
    };

    return (
        aliases[normalized] ||
        String(title).trim()
    );
}


/* =========================================================
   DUPLICATE REMOVAL
   ========================================================= */

function removeDuplicateEvents(events) {
    const seen =
        new Set();

    return events.filter(
        function (event) {
            if (
                !event ||
                !event.start ||
                !event.title
            ) {
                return false;
            }

            const dateKey =
                getDateKey(
                    event.start
                );

            const title =
                getCanonicalEventTitle(
                    event.title
                );

            const titleKey =
                normalizeEventTitle(
                    title
                );

            /*
             * Same date + same event name
             * = duplicate.
             */
            const key =
                dateKey +
                "|" +
                titleKey;

            if (
                seen.has(key)
            ) {
                return false;
            }

            seen.add(key);

            event.title =
                title;

            return true;
        }
    );
}


/* =========================================================
   NEXT EVENT
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
   TODAY'S HOLIDAY
   ========================================================= */

function handleTodayHoliday() {
    const today =
        new Date();

    const todayEvent =
        calendarEvents.find(
            function (event) {
                if (!event.start) {
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
   DATE FORMATTING
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


/* =========================================================
   REMAINING DAYS
   ========================================================= */

function getRemainingDays(date) {
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
            (
                1000 *
                60 *
                60 *
                24
            )
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

    return (
        "in " +
        days +
        " days"
    );
}


/* =========================================================
   HOLIDAY GREETING
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
        title === "christmas day"
    ) {
        return "🎄 Merry Christmas!";
    }

    if (
        title.includes("new year's eve")
    ) {
        return "🎆 Happy New Year's Eve!";
    }

    if (
        title === "new year's day"
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
        title.includes("ramadan")
    ) {
        return "🌙 Ramadan Mubarak!";
    }

    if (
        title.includes("eid al-fitr")
    ) {
        return "🌙 Eid Mubarak!";
    }

    if (
        title.includes("eid al-adha")
    ) {
        return "🐑 Eid Mubarak!";
    }

    if (
        title.includes("mawlid")
    ) {
        return "🌙 Mawlid Mubarak!";
    }

    if (
        title === "ashura"
    ) {
        return "🌙 Ashura";
    }

    if (
        title.includes("diwali")
    ) {
        return "🪔 Happy Diwali!";
    }

    if (
        title === "holi"
    ) {
        return "🌈 Happy Holi!";
    }

    if (
        title.includes("hanukkah")
    ) {
        return "🕎 Happy Hanukkah!";
    }

    if (
        title.includes("rosh hashana")
    ) {
        return "🍎 Happy Rosh Hashanah!";
    }

    if (
        title.includes("yom kippur")
    ) {
        return "✡️ Yom Kippur";
    }

    if (
        title.includes("passover")
    ) {
        return "✡️ Happy Passover!";
    }

    if (
        title.includes("sukkot")
    ) {
        return "✡️ Happy Sukkot!";
    }

    if (
        title.includes("navratri")
    ) {
        return "🕉️ Happy Navratri!";
    }

    if (
        title.includes("janmashtami")
    ) {
        return "🕉️ Happy Krishna Janmashtami!";
    }

    if (
        title.includes("shivaratri")
    ) {
        return "🕉️ Maha Shivaratri";
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
   CALENDAR EVENTS DISPLAY
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
            .map(
                function (event) {
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
                }
            )
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
        ).format(
            new Date()
        );
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

            events:
                events.map(
                    function (event) {
                        return {
                            id: event.id,
                            title: event.title,

                            start:
                                event.start
                                    ? event.start.toISOString()
                                    : null,

                            end:
                                event.end
                                    ? event.end.toISOString()
                                    : null,

                            type:
                                event.type ||
                                null,

                            category:
                                event.category ||
                                null
                        };
                    }
                )
        })
    );
}


function getCachedCalendarEvents(
    year
) {
    const cached =
        sessionStorage.getItem(
            "calendarEvents"
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

        /*
         * Never use a cache from another year.
         */
        if (
            data.year !== year
        ) {
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

        return (
            data.events || []
        )
            .map(
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
            )
            .filter(
                function (event) {
                    return event.start;
                }
            );

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
   START CALENDAR
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
