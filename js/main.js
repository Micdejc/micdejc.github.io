import { loadPublications } from "../content/publications/index.js";
import { loadNews } from "../content/news/index.js";
import { loadFeatures } from "../content/features/index.js";
import { loadMentorship } from "../content/mentorship/index.js";

/* =========================================================
   HTML COMPONENT LOADER
========================================================= */

async function loadComponent(elementId, file) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }


    try {

        const response =
            await fetch(file);

        if (!response.ok) {

            throw new Error(
                `Could not load ${file}`
            );

        }


        element.innerHTML =
            await response.text();

    } catch (error) {

        console.error(error);

    }

}


/* =========================================================
   LOAD ALL PAGE SECTIONS
========================================================= */

async function loadPage() {

    await Promise.all([

        loadComponent(
            "navigation",
            "components/nav.html"
        ),

        loadComponent(
            "hero",
            "components/hero.html"
        ),

        loadComponent(
            "calendarContainer",
            "components/calendar.html"
        ),

        loadComponent(
            "about",
            "sections/about.html"
        ),

        loadComponent(
            "research-statement",
            "sections/research-statement.html"
        ),

        loadComponent(
            "research",
            "sections/research.html"
        ),

        loadComponent(
            "refusalguard",
            "sections/flagship-refusalguard.html"
        ),

        loadComponent(
            "grammatical-mirage",
            "sections/flagship-grammatical-mirage.html"
        ),

        loadComponent(
            "publications",
            "sections/publications.html"
        ),

        loadComponent(
            "news",
            "sections/news.html"
        ),

        loadComponent(
            "projects",
            "sections/projects.html"
        ),

        loadComponent(
            "profiles",
            "sections/profiles.html"
        ),

        loadComponent(
            "experience",
            "sections/experience.html"
        ),

        loadComponent(
            "achievements",
            "sections/achievements.html"
        ),

        loadComponent(
            "service",
            "sections/service.html"
        ),

        loadComponent(
            "mentorship",
            "sections/mentorship.html"
        ),
       
        loadComponent(
            "features",
            "sections/features.html"
        ),

        loadComponent(
            "contact",
            "sections/contact.html"
        ),

        loadComponent(
            "footer",
            "components/footer.html"
        )

    ]);


    /*
     * Load repeatable content after its
     * parent sections have been loaded.
     */

    await loadPublications();

    await loadNews();

    await loadMentorship();

    await loadFeatures();

    /*
     * Initialise interface controls only after
     * navigation and hero have been inserted.
     */

    initialiseTheme();

    initialiseTerminalMode();

    initialiseMobileMenu();

    initialiseBackToTop();

    /* initialiseConsoleAnimation(); */

    initialiseYear();

    initialiseVisitorCount();
   
    initialiseCalendar();

}


/* =========================================================
   THEME
========================================================= */

function initialiseTheme() {

    const toggle =
        document.getElementById("themeToggle");

    if (!toggle) {
        return;
    }


    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        toggle.textContent = "☀";

    }


    toggle.addEventListener(
        "click",
        function () {
           
            /* The theme toggle to work only when Terminal Mode is OFF */
            if (
               document.body.classList.contains(
                   "terminal-mode"
               )
               ) {
               return;
                 }


           
            document.body.classList.toggle("dark");


            if (
                document.body.classList.contains("dark")
            ) {

                toggle.textContent = "☀";

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            } else {

                toggle.textContent = "☾";

                localStorage.setItem(
                    "theme",
                    "light"
                );

            }

        }
    );

}


/* =========================================================
   CALENDAR
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


    const events =
        document.getElementById(
            "calendarEvents"
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


    /* =====================================================
       INITIAL DATE
    ===================================================== */

    displayCalendarToday();


    /* =====================================================
       INITIAL LOADING MESSAGE
    ===================================================== */

    if (events) {

        events.innerHTML =
            `
                <p class="calendar-loading">
                    Loading UK holidays...
                </p>
            `;

    }


    /* =====================================================
       OPEN CALENDAR
    ===================================================== */

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


            /* Display cached/already loaded
               data immediately */

            displayNextEvent();

            displayCalendarEvents();

        }
    );


    /* =====================================================
       CLOSE CALENDAR
    ===================================================== */

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


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

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


    /* =====================================================
       PRELOAD CALENDAR DATA
    ===================================================== */

    if (
        typeof loadCalendarEvents ===
        "function"
    ) {

        loadCalendarEvents()
            .then(
                function () {

                    /* Render the data after
                       Google Calendar responds */

                    displayNextEvent();

                    displayCalendarEvents();

                }
            )
            .catch(
                function (error) {

                    console.error(
                        "Calendar loading failed:",
                        error
                    );

                }
            );

    } else {

        console.error(
            "loadCalendarEvents() is not available. " +
            "Check that calendar.js is loaded."
        );

    }

}


/* =========================================================
   TERMINAL MODE
========================================================= */

function initialiseTerminalMode() {

    const toggle =
        document.getElementById(
            "terminalToggle"
        );


    if (!toggle) {
        return;
    }


    const savedMode =
        localStorage.getItem(
            "terminalMode"
        );


    /*
     * Restore Terminal Mode if it was enabled
     * during the previous visit.
     */

    if (savedMode === "on") {

        document.body.classList.add(
            "terminal-mode"
        );

        toggle.textContent = "$_";

        toggle.title =
            "Exit Linux terminal mode";


        /*
         * hero.html has already been loaded by
         * loadPage() before this function runs.
         *
         * Therefore consoleText1 and consoleText2
         * now exist in the DOM.
         */

        setTimeout(
            startConsoleAnimation,
            150
        );

    }


    toggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "terminal-mode"
            );


            /*
             * TERMINAL MODE ON
             */

            if (
                document.body.classList.contains(
                    "terminal-mode"
                )
            ) {

                toggle.textContent = "$_";

                toggle.title =
                    "Exit Linux terminal mode";

                localStorage.setItem(
                    "terminalMode",
                    "on"
                );


                /*
                 * Automatically switch to dark mode.
                 */

                document.body.classList.add(
                    "dark"
                );

                localStorage.setItem(
                    "theme",
                    "dark"
                );


                const themeToggle =
                    document.getElementById(
                        "themeToggle"
                    );


                if (themeToggle) {

                    themeToggle.textContent =
                        "☀";

                }


                /*
                 * Start console animation.
                 */

                setTimeout(
                    startConsoleAnimation,
                    150
                );

            }


            /*
             * TERMINAL MODE OFF
             */

            else {

                toggle.textContent = ">_";

                toggle.title =
                    "Linux terminal mode";

                localStorage.setItem(
                    "terminalMode",
                    "off"
                );


                /*
                 * Automatically switch to light mode.
                 */

                document.body.classList.remove(
                    "dark"
                );

                localStorage.setItem(
                    "theme",
                    "light"
                );


                const themeToggle =
                    document.getElementById(
                        "themeToggle"
                    );


                if (themeToggle) {

                    themeToggle.textContent =
                        "☾";

                }


                /*
                 * Completely stop the animation
                 * and restore the original text.
                 */

                stopConsoleAnimation();

            }

        }
    );

}



/* =========================================================
   CONSOLE TYPING ANIMATION
========================================================= */

let typingTimer = null;

let animationDelayTimer = null;


/*
 * Type text character by character.
 */

function typeText(
    element,
    text,
    speed,
    callback
) {

    if (!element) {
        return;
    }


    element.textContent = "";

    element.classList.add(
        "typing-cursor"
    );


    let index = 0;


    function typeCharacter() {

        /*
         * Stop immediately if Terminal Mode
         * has been disabled.
         */

        if (
            !document.body.classList.contains(
                "terminal-mode"
            )
        ) {

            element.classList.remove(
                "typing-cursor"
            );

            return;

        }


        if (index < text.length) {

            element.textContent +=
                text.charAt(index);

            index++;


            typingTimer =
                setTimeout(
                    typeCharacter,
                    speed
                );

        } else {

            element.classList.remove(
                "typing-cursor"
            );


            if (callback) {

                callback();

            }

        }

    }


    typeCharacter();

}


/*
 * Start the console animation.
 */

function startConsoleAnimation() {

    /*
     * Cancel any existing animation.
     */

    clearTimeout(
        typingTimer
    );

    clearTimeout(
        animationDelayTimer
    );


    const textElement1 =
        document.getElementById(
            "consoleText1"
        );

    const textElement2 =
        document.getElementById(
            "consoleText2"
        );


    /*
     * Make sure both elements exist.
     */

    if (!textElement1 || !textElement2) {

        return;

    }


    /*
     * Save the original text once.
     *
     * This is important because the animation
     * clears the text from the elements.
     */

    if (
        !textElement1.dataset.originalText
    ) {

        textElement1.dataset.originalText =
            textElement1.textContent.trim();

    }


    if (
        !textElement2.dataset.originalText
    ) {

        textElement2.dataset.originalText =
            textElement2.textContent.trim();

    }


    /*
     * Get the original text.
     */

    const text1 =
        textElement1.dataset.originalText;

    const text2 =
        textElement2.dataset.originalText;


    /*
     * Clear the existing text.
     */

    textElement1.textContent = "";

    textElement2.textContent = "";


    /*
     * Animate the first text.
     */

    typeText(
        textElement1,
        text1,
        25,
        function () {

            /*
             * Do not continue if Terminal Mode
             * has already been disabled.
             */

            if (
                !document.body.classList.contains(
                    "terminal-mode"
                )
            ) {

                return;

            }


            /*
             * Wait 600 ms before starting
             * the second text.
             */

            animationDelayTimer =
                setTimeout(
                    function () {

                        /*
                         * Check Terminal Mode again
                         * after the delay.
                         */

                        if (
                            !document.body.classList.contains(
                                "terminal-mode"
                            )
                        ) {

                            return;

                        }


                        typeText(
                            textElement2,
                            text2,
                            25
                        );

                    },
                    600
                );

        }
    );

}


/*
 * Stop the console animation completely.
 */

function stopConsoleAnimation() {

    /*
     * Cancel the character typing timer.
     */

    clearTimeout(
        typingTimer
    );


    /*
     * Cancel the 600 ms delay timer.
     */

    clearTimeout(
        animationDelayTimer
    );


    typingTimer = null;

    animationDelayTimer = null;


    const textElement1 =
        document.getElementById(
            "consoleText1"
        );

    const textElement2 =
        document.getElementById(
            "consoleText2"
        );


    /*
     * Restore the original first text.
     */

    if (textElement1) {

        textElement1.textContent =
            textElement1.dataset.originalText ||
            "";

        textElement1.classList.remove(
            "typing-cursor"
        );

    }


    /*
     * Restore the original second text.
     */

    if (textElement2) {

        textElement2.textContent =
            textElement2.dataset.originalText ||
            "";

        textElement2.classList.remove(
            "typing-cursor"
        );

    }

}

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initialiseMobileMenu() {

    const menuButton =
        document.getElementById("mobileMenuToggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (!menuButton || !navLinks) {
        return;
    }


    /*
     * Open / close mobile navigation
     */

    menuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                menuButton.classList.toggle("active");

            navLinks.classList.toggle(
                "mobile-open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        }
    );


    /*
     * Close the menu when a navigation
     * link is selected.
     */

    navLinks
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    menuButton.classList.remove(
                        "active"
                    );

                    navLinks.classList.remove(
                        "mobile-open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        });


    /*
     * Reset mobile menu when returning
     * to desktop width.
     */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 900) {

                menuButton.classList.remove(
                    "active"
                );

                navLinks.classList.remove(
                    "mobile-open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }
    );

}

/* =========================================================
   FOOTER YEAR
========================================================= */

function initialiseYear() {

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}

/* =========================================================
   TOTAL VISITORS
========================================================= */

async function initialiseVisitorCount() {

    const totalVisitors =
        document.getElementById(
            "total-visitors"
        );


    if (!totalVisitors) {
        return;
    }


    try {

        const response =
            await fetch(
                "https://micdejc.goatcounter.com/counter/TOTAL.json"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load visitor count"
            );

        }


        const data =
            await response.json();

       
        console.log(
            "GoatCounter total visitors:",
            data.count
        );


        if (
            typeof data.count === "number"
        ) {

            totalVisitors.textContent =
                `Total visitors: ${data.count}`;

        }

    } catch (error) {

        console.error(
            "GoatCounter visitor count error:",
            error
        );

    }

}

/* =========================================================
   BACK TO TOP
========================================================= */

function initialiseBackToTop() {

    const button =
        document.getElementById("backToTop");


    if (!button) {
        return;
    }


    /*
     * Show button after scrolling down.
     */

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 900) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        },
        {
            passive: true
        }
    );


    /*
     * Smoothly return to the top.
     */

    button.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    loadPage
);
