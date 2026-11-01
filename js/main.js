import { loadPublications } from "../content/publications/index.js";
import { loadNews } from "../content/news/index.js";
import { loadFeatures } from "../content/features/index.js";
import { loadMentorship } from "../content/mentorship/index.js";
import { loadFlagship } from "../content/flagship/index.js";
import { loadTestimonials } from "../content/testimonials/index.js";
import { initialiseBlog } from "./blog.js";
import { initDLN } from "./game.js";
import { initCyberQuizApp } from "./cyberquiz.js";

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
            "cyberquizContainer",
            "components/cyberquiz.html"
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

    //initialiseTerminalMode();

    initialiseMobileMenu();

    initialiseBackToTop();

    initialiseYear();

    initialiseVisitorCount();

    //initialiseCalendar();
    window.initialiseCalendar();
   
    /*
     * Blog HTML is now in the DOM,
     * so it is safe to initialise it.
     */
    initialiseBlog();

    /* Initialization of the game modal */
    initDLN();

    /* Initialization of the cyberQuiz modal */
    initCyberQuizApp();

}


/* =========================================================
   THEME
========================================================= */

function initialiseTheme() {

    const body = document.body;

    const themeButtons = document.querySelectorAll(".theme-option");

    const terminalToggle = document.getElementById("terminalToggle");

    if (!themeButtons.length || !terminalToggle) return;

    const terminalLabel = terminalToggle.querySelector("span");

    const THEME_KEY = "theme";
    const TERMINAL_KEY = "terminalMode";
    const PREVIOUS_THEME_KEY = "terminalPreviousTheme";

    const VALID_THEMES = ["light", "dark-light", "dark"];

    // ==========================================
    // TERMINAL ICONS
    // ==========================================

    const terminalEnterIcon = `
        <svg class="utility-icon" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="m4 17 6-5-6-5"></path>
            <path d="M12 19h8"></path>
        </svg>
    `;

    const terminalExitIcon = `
        <svg class="utility-icon" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="m10 17-6-5 6-5"></path>
            <path d="M4 12h11"></path>
            <path d="M15 5h5v14h-5"></path>
        </svg>
    `;

    // ==========================================
    // APPLY THEME
    // ==========================================

    function applyTheme(theme, save = true) {

        if (!VALID_THEMES.includes(theme)) {
            theme = "light";
        }

        // Terminal Mode always requires Dark Mode.
        if (body.classList.contains("terminal-mode")) {
            theme = "dark";
        }

        body.classList.remove("dark", "dark-light");

        if (theme === "dark") {
            body.classList.add("dark");
        } else if (theme === "dark-light") {
            body.classList.add("dark-light");
        }

        // Only save normal theme preferences.
        // Do not overwrite them with Dark Mode in Terminal Mode.
        if (save && !body.classList.contains("terminal-mode")) {
            localStorage.setItem(THEME_KEY, theme);
        }

        updateThemeOptions();
    }

    // ==========================================
    // UPDATE THEME OPTIONS
    // ==========================================

    function updateThemeOptions() {

        const isTerminal =
            body.classList.contains("terminal-mode");

        const currentTheme = isTerminal
            ? null
            : localStorage.getItem(THEME_KEY) || "light";

        themeButtons.forEach(button => {

            const theme = button.dataset.theme;

            const isActive = theme === currentTheme;

            // Disable all theme choices in Terminal Mode.
            button.disabled = isTerminal;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                String(isActive)
            );

            button.setAttribute(
                "aria-disabled",
                String(isTerminal)
            );

            if (isTerminal) {
                button.title = "Exit Terminal Mode to change themes";
            } else {
                button.title = `Switch to ${theme === "dark-light"
                    ? "Dark-Light"
                    : theme.charAt(0).toUpperCase() + theme.slice(1)
                } mode`;
            }
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

   function updateTerminalToggle() {

        const isTerminal =
            body.classList.contains("terminal-mode");

        const iconHTML = isTerminal
            ? terminalExitIcon
            : terminalEnterIcon;

        const existingIcon = terminalToggle.querySelector(
            "svg.utility-icon"
        );

        if (existingIcon) {
            existingIcon.outerHTML = iconHTML;
        } else {
            terminalToggle.insertAdjacentHTML(
                "afterbegin",
                iconHTML
            );
        }

        if (terminalLabel) {
            terminalLabel.textContent = isTerminal
                ? "Exit Terminal"
                : "Terminal mode";
        }

        const description = isTerminal
            ? "Exit Linux terminal mode"
            : "Enable Linux terminal mode";

        terminalToggle.title = description;

        terminalToggle.setAttribute(
            "aria-label",
            description
        );

        terminalToggle.setAttribute(
            "aria-pressed",
            String(isTerminal)
        );
    }

    // ==========================================
    // INITIALISE SAVED THEME
    // ==========================================

    const savedTheme = localStorage.getItem(THEME_KEY);

    const initialTheme = VALID_THEMES.includes(savedTheme)
        ? savedTheme
        : "light";

    const savedTerminalMode =
        localStorage.getItem(TERMINAL_KEY) === "on";

    if (savedTerminalMode) {

        // Preserve the theme that was selected before Terminal Mode.
        const previousTheme =
            localStorage.getItem(PREVIOUS_THEME_KEY);

        if (!VALID_THEMES.includes(previousTheme)) {
            localStorage.setItem(
                PREVIOUS_THEME_KEY,
                initialTheme
            );
        }

        body.classList.add("terminal-mode");

        // Apply Dark Mode without overwriting the saved preference.
        applyTheme("dark", false);

        setTimeout(startConsoleAnimation, 150);

    } else {

        body.classList.remove("terminal-mode");

        localStorage.removeItem(PREVIOUS_THEME_KEY);

        applyTheme(initialTheme);
    }

    updateThemeOptions();
    updateTerminalToggle();

    // ==========================================
    // DIRECT THEME SELECTION
    // ==========================================

    themeButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Ignore theme changes during Terminal Mode.
            if (body.classList.contains("terminal-mode")) {
                return;
            }

            const selectedTheme = button.dataset.theme;

            if (!VALID_THEMES.includes(selectedTheme)) {
                return;
            }

            applyTheme(selectedTheme);
        });
    });

    // ==========================================
    // TERMINAL MODE TOGGLE
    // ==========================================

    terminalToggle.addEventListener("click", () => {

        const enableTerminal =
            !body.classList.contains("terminal-mode");

        if (enableTerminal) {

            // Save the currently selected theme before entering.
            const currentTheme =
                localStorage.getItem(THEME_KEY);

            const previousTheme = VALID_THEMES.includes(currentTheme)
                ? currentTheme
                : "light";

            localStorage.setItem(
                PREVIOUS_THEME_KEY,
                previousTheme
            );

            body.classList.add("terminal-mode");

            localStorage.setItem(TERMINAL_KEY, "on");

            // Force Dark Mode without changing the saved preference.
            applyTheme("dark", false);

            // Start terminal animation.
            setTimeout(startConsoleAnimation, 150);

        } else {

            body.classList.remove("terminal-mode");

            localStorage.setItem(TERMINAL_KEY, "off");

            // Restore the previously selected theme.
            const previousTheme =
                localStorage.getItem(PREVIOUS_THEME_KEY);

            const restoredTheme = VALID_THEMES.includes(previousTheme)
                ? previousTheme
                : "light";

            applyTheme(restoredTheme);

            localStorage.removeItem(PREVIOUS_THEME_KEY);

            // Stop animation and restore original text.
            stopConsoleAnimation();
        }

        updateThemeOptions();
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
