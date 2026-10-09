import { loadPublications } from "../content/publications/index.js";
import { loadNews } from "../content/news/index.js";
import { loadFeatures } from "../content/features/index.js";
import { loadMentorship } from "../content/mentorship/index.js";
import { loadFlagship } from "../content/flagship/index.js";
import { loadTestimonials } from "../content/testimonials/index.js";
import { initialiseBlog } from "./blog.js";
import { initDLN } from "./game.js";

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
            "gameContainer",
            "components/game.html"
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
            "flagships",
            "sections/flagship.html"
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
            "blogs",
            "sections/blog.html"
        ),

        loadComponent(
            "testimonials",
            "sections/testimonials.html"
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

    await loadFlagship();

    await loadTestimonials();

    /*
     * Initialise interface controls only after
     * navigation and hero have been inserted.
     */

    initialiseTheme();

    initialiseTerminalMode();

    initialiseMobileMenu();

    initialiseBackToTop();

    initialiseYear();

    initialiseVisitorCount();

    initialiseCalendar();

    /*
     * Blog HTML is now in the DOM,
     * so it is safe to initialise it.
     */
    initialiseBlog();

    /* Initialization of the game modal */
    initDLN();

}


/* =========================================================
   THEME
========================================================= */

function initialiseTheme() {

    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const body = document.body;
    const label = toggle.querySelector("span");
    const savedTheme = localStorage.getItem("theme");

    // Restore the saved theme.
    body.classList.toggle("dark", savedTheme === "dark");

    // Update the icon, label and accessibility attributes.
    function updateThemeToggle() {
        const isDark = body.classList.contains("dark");

        // Update the icon while preserving the existing span.
        if (toggle.firstChild) {
            toggle.firstChild.textContent = isDark ? "☀ " : "☾ ";
        }

        if (label) {
            label.textContent = isDark ? "Light mode" : "Dark mode";
        }

        const description = isDark
            ? "Switch to light mode"
            : "Switch to dark mode";

        toggle.title = description;
        toggle.setAttribute("aria-label", description);
        toggle.setAttribute("aria-pressed", String(isDark));
    }

    // Initialise the button on page load.
    updateThemeToggle();

    toggle.addEventListener("click", () => {
        // Theme switching is disabled while Terminal Mode is active.
        if (body.classList.contains("terminal-mode")) return;

        body.classList.toggle("dark");

        const isDark = body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateThemeToggle();
    });

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

    const toggle = document.getElementById("terminalToggle");

    if (!toggle) return;

    const body = document.body;
    const label = toggle.querySelector("span");

    function updateTerminalToggle() {
        const isTerminal = body.classList.contains("terminal-mode");

        // Update the icon without removing the existing span.
        toggle.firstChild.textContent = isTerminal ? "$_ " : ">_ ";

        if (label) {
            label.textContent = isTerminal
                ? "Exit Terminal mode"
                : "Terminal mode";
        }

        toggle.title = isTerminal
            ? "Exit Linux terminal mode"
            : "Enable Linux terminal mode";

        toggle.setAttribute(
            "aria-label",
            isTerminal
                ? "Exit Linux terminal mode"
                : "Enable Linux terminal mode"
        );

        toggle.setAttribute("aria-pressed", String(isTerminal));
    }

    function updateThemeToggle() {
        const themeToggle = document.getElementById("themeToggle");

        if (!themeToggle) return;

        const themeLabel = themeToggle.querySelector("span");
        const isDark = body.classList.contains("dark");

        // Preserve the existing HTML structure.
        themeToggle.firstChild.textContent = isDark ? "☀ " : "☾ ";

        if (themeLabel) {
            themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
        }

        themeToggle.title = isDark
            ? "Switch to light mode"
            : "Switch to dark mode";

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    function setTheme(isDark) {
        body.classList.toggle("dark", isDark);

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateThemeToggle();
    }

    // Restore the saved Terminal Mode preference.
    const savedMode = localStorage.getItem("terminalMode");

    if (savedMode === "on") {
        body.classList.add("terminal-mode");
        setTheme(true);

        // Start the animation after hero.html has loaded.
        setTimeout(startConsoleAnimation, 150);
    }

    updateTerminalToggle();
    updateThemeToggle();

    toggle.addEventListener("click", () => {
        const enableTerminal =
            !body.classList.contains("terminal-mode");

        body.classList.toggle("terminal-mode", enableTerminal);

        localStorage.setItem(
            "terminalMode",
            enableTerminal ? "on" : "off"
        );

        if (enableTerminal) {
            // Terminal Mode requires Dark Mode.
            setTheme(true);

            setTimeout(startConsoleAnimation, 150);
        } else {
            // Return to Light Mode.
            setTheme(false);

            // Stop the animation and restore the original text.
            stopConsoleAnimation();
        }

        updateTerminalToggle();
    });

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
 *
 * The animation runs continuously:
 *
 * Text 1 types
 *       ↓
 * 600 ms pause
 *       ↓
 * Text 2 types
 *       ↓
 * 1200 ms pause
 *       ↓
 * Animation starts again
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


                        /*
                         * Animate the second text.
                         */

                        typeText(
                            textElement2,
                            text2,
                            25,
                            function () {

                                /*
                                 * Do not restart if
                                 * Terminal Mode is off.
                                 */

                                if (
                                    !document.body.classList.contains(
                                        "terminal-mode"
                                    )
                                ) {

                                    return;

                                }


                                /*
                                 * Wait 1200 ms after
                                 * the second line has
                                 * finished, then start
                                 * the complete animation
                                 * again.
                                 */

                                animationDelayTimer =
                                    setTimeout(
                                        function () {

                                            if (
                                                !document.body.classList.contains(
                                                    "terminal-mode"
                                                )
                                            ) {

                                                return;

                                            }


                                            startConsoleAnimation();

                                        },
                                        1200
                                    );

                            }
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
     * Cancel any animation delay timer.
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

        console.error(
            "total-visitors element was not found."
        );

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

       
        /* Website visitor-count start date */

        const visitorStartDate = "September 21, 2026";

       
        /* Update footer */

        if (
            data.count !== undefined &&
            data.count !== null
        ) {

            totalVisitors.textContent =
                `Total visitors: ${data.count} · Since ${visitorStartDate}`;

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
