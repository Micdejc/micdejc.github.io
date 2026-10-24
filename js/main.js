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

    initialiseTerminalMode();

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

    const toggle = document.getElementById("themeToggle");

    if (!toggle) return;

    const body = document.body;
    const label = toggle.querySelector("span");

    const validThemes = ["light", "dark-light", "dark"];

    let currentTheme = localStorage.getItem("theme");

    if (!validThemes.includes(currentTheme)) {
        currentTheme = "light";
    }

    // ==========================================
    // APPLY THEME
    // ==========================================

    function applyTheme(theme) {

        if (!validThemes.includes(theme)) {
            theme = "light";
        }

        currentTheme = theme;

        body.classList.remove("dark", "dark-light");

        if (theme === "dark") {
            body.classList.add("dark");
        } else if (theme === "dark-light") {
            body.classList.add("dark-light");
        }

        localStorage.setItem("theme", theme);
    }

    // ==========================================
    // DARK ICON: CRESCENT MOON
    // ==========================================

    const darkIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
    `;

    // ==========================================
    // LIGHT ICON: SUN
    // ==========================================

    const lightIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
    `;

    // ==========================================
    // DARK-LIGHT ICON: HALF-FILLED CIRCLE
    // ==========================================

    const darkLightIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="9"></circle>
            <path
                d="M12 3a9 9 0 0 0 0 18Z"
                fill="currentColor"
                stroke="none"
            ></path>
            <path d="M12 3v18"></path>
        </svg>
    `;

    // ==========================================
    // UPDATE THEME TOGGLE
    // ==========================================

    function updateThemeToggle() {

        // The icon represents the NEXT theme.
        const nextTheme = {
            light: "dark-light",
            "dark-light": "dark",
            dark: "light"
        }[currentTheme];

        const icons = {
            light: darkLightIcon,
            "dark-light": darkIcon,
            dark: lightIcon
        };

        const labels = {
            light: "Dark-Light mode",
            "dark-light": "Dark mode",
            dark: "Light mode"
        };

        const descriptions = {
            light: "Switch to Dark-Light mode",
            "dark-light": "Switch to Dark mode",
            dark: "Switch to Light mode"
        };

        // Replace or insert the SVG safely.
        const existingIcon = toggle.querySelector(
            "svg.utility-icon"
        );

        if (existingIcon) {
            existingIcon.outerHTML = icons[currentTheme];
        } else {
            toggle.insertAdjacentHTML(
                "afterbegin",
                icons[currentTheme]
            );
        }

        if (label) {
            label.textContent = labels[currentTheme];
        }

        toggle.title = descriptions[currentTheme];
        toggle.setAttribute(
            "aria-label",
            descriptions[currentTheme]
        );

        toggle.setAttribute(
            "aria-pressed",
            String(currentTheme !== "light")
        );

        // Keep the toggle marked as unavailable in Terminal Mode.
        toggle.setAttribute(
            "aria-disabled",
            String(body.classList.contains("terminal-mode"))
        );
    }

    // ==========================================
    // INITIALISE
    // ==========================================

    // Terminal Mode always takes priority and requires Dark Mode.
    if (body.classList.contains("terminal-mode")) {
        applyTheme("dark");
    } else {
        applyTheme(currentTheme);
    }

    updateThemeToggle();

    // ==========================================
    // CYCLE THROUGH THE THREE THEMES
    // ==========================================

    toggle.addEventListener("click", () => {

        // Do not change themes while Terminal Mode is active.
        if (body.classList.contains("terminal-mode")) return;

        const nextTheme = {
            light: "dark-light",
            "dark-light": "dark",
            dark: "light"
        }[currentTheme];

        applyTheme(nextTheme);
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

    const THEME_KEY = "theme";
    const TERMINAL_KEY = "terminalMode";
    const PREVIOUS_THEME_KEY = "terminalPreviousTheme";

    const VALID_THEMES = ["light", "dark-light", "dark"];

    // ==========================================
    // TERMINAL ENTER ICON
    // ==========================================

    const terminalEnterIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="m4 17 6-5-6-5"></path>
            <path d="M12 19h8"></path>
        </svg>
    `;

    // ==========================================
    // TERMINAL EXIT ICON
    // ==========================================

    const terminalExitIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="m10 17-6-5 6-5"></path>
            <path d="M4 12h11"></path>
            <path d="M15 5h5v14h-5"></path>
        </svg>
    `;

    // ==========================================
    // THEME ICONS
    // ==========================================

    const darkIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
    `;

    const lightIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
    `;

    const darkLightIcon = `
        <svg
            class="utility-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="9"></circle>
            <path
                d="M12 3a9 9 0 0 0 0 18Z"
                fill="currentColor"
                stroke="none"
            ></path>
            <path d="M12 3v18"></path>
        </svg>
    `;

    // ==========================================
    // THEME HELPERS
    // ==========================================

    function getCurrentTheme() {

        // Terminal Mode always uses Dark Mode.
        if (body.classList.contains("terminal-mode")) {
            return "dark";
        }

        // Read the active class first.
        if (body.classList.contains("dark")) {
            return "dark";
        }

        if (body.classList.contains("dark-light")) {
            return "dark-light";
        }

        // Otherwise use the saved preference.
        const savedTheme = localStorage.getItem(THEME_KEY);

        return VALID_THEMES.includes(savedTheme)
            ? savedTheme
            : "light";
    }

    function applyTheme(theme) {

        if (!VALID_THEMES.includes(theme)) {
            theme = "light";
        }

        // Terminal Mode cannot use a non-dark theme.
        if (body.classList.contains("terminal-mode")) {
            theme = "dark";
        }

        body.classList.remove("dark", "dark-light");

        if (theme === "dark") {
            body.classList.add("dark");
        } else if (theme === "dark-light") {
            body.classList.add("dark-light");
        }

        localStorage.setItem(THEME_KEY, theme);

        updateThemeToggle();
    }

    // ==========================================
    // UPDATE THEME TOGGLE
    // Consistent with initialiseTheme()
    // ==========================================

    function updateThemeToggle() {

        const themeToggle =
            document.getElementById("themeToggle");

        if (!themeToggle) return;

        const themeLabel = themeToggle.querySelector("span");
        const currentTheme = getCurrentTheme();

        const icons = {
            light: darkLightIcon,
            "dark-light": darkIcon,
            dark: lightIcon
        };

        const labels = {
            light: "Dark-Light mode",
            "dark-light": "Dark mode",
            dark: "Light mode"
        };

        const descriptions = {
            light: "Switch to Dark-Light mode",
            "dark-light": "Switch to Dark mode",
            dark: "Switch to Light mode"
        };

        // The icon and label represent the next theme.
        const existingIcon = themeToggle.querySelector(
            "svg.utility-icon"
        );

        if (existingIcon) {
            existingIcon.outerHTML = icons[currentTheme];
        } else {
            themeToggle.insertAdjacentHTML(
                "afterbegin",
                icons[currentTheme]
            );
        }

        if (themeLabel) {
            themeLabel.textContent = labels[currentTheme];
        }

        themeToggle.title = descriptions[currentTheme];

        themeToggle.setAttribute(
            "aria-label",
            descriptions[currentTheme]
        );

        themeToggle.setAttribute(
            "aria-pressed",
            String(currentTheme !== "light")
        );

        themeToggle.setAttribute(
            "aria-disabled",
            String(body.classList.contains("terminal-mode"))
        );
    }

    // ==========================================
    // UPDATE TERMINAL TOGGLE
    // ==========================================

    function updateTerminalToggle() {

        const isTerminal =
            body.classList.contains("terminal-mode");

        const iconHTML = isTerminal
            ? terminalExitIcon
            : terminalEnterIcon;

        const existingIcon = toggle.querySelector(
            "svg.utility-icon"
        );

        if (existingIcon) {
            existingIcon.outerHTML = iconHTML;
        } else {
            toggle.insertAdjacentHTML(
                "afterbegin",
                iconHTML
            );
        }

        if (label) {
            label.textContent = isTerminal
                ? "Exit Terminal"
                : "Terminal mode";
        }

        const description = isTerminal
            ? "Exit Linux terminal mode"
            : "Enable Linux terminal mode";

        toggle.title = description;

        toggle.setAttribute(
            "aria-label",
            description
        );

        toggle.setAttribute(
            "aria-pressed",
            String(isTerminal)
        );
    }

    // ==========================================
    // RESTORE SAVED TERMINAL MODE
    // ==========================================

    const savedMode = localStorage.getItem(TERMINAL_KEY);

    if (savedMode === "on") {

        body.classList.add("terminal-mode");

        // Terminal Mode requires Dark Mode.
        body.classList.remove("dark-light");
        body.classList.add("dark");

        localStorage.setItem(THEME_KEY, "dark");

        // Start the console animation after hero.html loads.
        setTimeout(startConsoleAnimation, 150);

    } else {

        body.classList.remove("terminal-mode");

        // Restore the saved three-state theme.
        const savedTheme = localStorage.getItem(THEME_KEY);

        const restoredTheme = VALID_THEMES.includes(savedTheme)
            ? savedTheme
            : "light";

        applyTheme(restoredTheme);
    }

    updateTerminalToggle();
    updateThemeToggle();

    // ==========================================
    // TERMINAL MODE CLICK HANDLER
    // ==========================================

    toggle.addEventListener("click", () => {

        const enableTerminal =
            !body.classList.contains("terminal-mode");

        if (enableTerminal) {

            // Save the selected theme before entering Terminal Mode.
            const currentTheme = getCurrentTheme();

            localStorage.setItem(
                PREVIOUS_THEME_KEY,
                currentTheme
            );

            body.classList.add("terminal-mode");

            localStorage.setItem(TERMINAL_KEY, "on");

            // Force Dark Mode.
            applyTheme("dark");

            // Start the console animation.
            setTimeout(startConsoleAnimation, 150);

        } else {

            body.classList.remove("terminal-mode");

            localStorage.setItem(TERMINAL_KEY, "off");

            // Restore the theme selected before entering Terminal Mode.
            const previousTheme =
                localStorage.getItem(PREVIOUS_THEME_KEY);

            const restoredTheme = VALID_THEMES.includes(previousTheme)
                ? previousTheme
                : "light";

            applyTheme(restoredTheme);

            localStorage.removeItem(PREVIOUS_THEME_KEY);

            // Stop the animation and restore the original text.
            stopConsoleAnimation();
        }

        updateTerminalToggle();
        updateThemeToggle();
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
