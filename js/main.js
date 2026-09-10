import { loadPublications } from "../content/publications/index.js";
import { loadNews } from "../content/news/index.js";


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


    /*
     * Initialise interface controls only after
     * navigation and hero have been inserted.
     */

    initialiseTheme();

    initialiseTerminalMode();

    /* initialiseConsoleAnimation(); */

    initialiseYear();

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


    if (savedMode === "on") {

        document.body.classList.add(
            "terminal-mode"
        );

        toggle.textContent = "$_";

        toggle.title =
            "Exit Linux terminal mode";

    }


    toggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "terminal-mode"
            );


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


                setTimeout(
                    startConsoleAnimation,
                    150
                );

            } else {

                toggle.textContent = ">_";

                toggle.title =
                    "Linux terminal mode";

                localStorage.setItem(
                    "terminalMode",
                    "off"
                );


                clearTimeout(
                    typingTimer
                );


                const textElement1 =
                    document.getElementById(
                        "consoleText1"
                    );

                const textElement2 =
                    document.getElementById(
                        "consoleText2"
                    );


                if (textElement1) {

                    textElement1.textContent =
                        consoleText1;

                }


                if (textElement2) {

                    textElement2.textContent =
                        consoleText2;

                }

            }

        }
    );

}


/* =========================================================
   CONSOLE TYPING ANIMATION
========================================================= */

const consoleText1 =
    "Cybersecurity thought leader & researcher working at the intersection of AI security, LLM security, adversarial AI and cybersecurity.";

const consoleText2 =
    "My research explores how adversarial interactions can manipulate AI systems and how we can build more reliable, interpretable and scalable defences.";

let typingTimer = null;


function typeText(
    element,
    text,
    speed,
    callback
) {

    element.textContent = "";

    element.classList.add(
        "typing-cursor"
    );


    let index = 0;


    function typeCharacter() {

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


function startConsoleAnimation() {

    clearTimeout(
        typingTimer
    );


    const textElement1 =
        document.getElementById(
            "consoleText1"
        );

    const textElement2 =
        document.getElementById(
            "consoleText2"
        );


    if (!textElement1 || !textElement2) {
        return;
    }


    textElement1.textContent = "";

    textElement2.textContent = "";


    typeText(
        textElement1,
        consoleText1,
        25,
        function () {

            setTimeout(
                function () {

                    typeText(
                        textElement2,
                        consoleText2,
                        25
                    );

                },
                600
            );

        }
    );

}

/* =========================================================
   MENTORSHIP
========================================================= */

async function loadMentorship() {

    const container =
        document.getElementById(
            "mentorship-list"
        );


    if (!container) {
        return;
    }


    const files = [

        "chris-mayo.html",

        "mohammed-almasabi.html"

    ];


    for (const file of files) {

        try {

            const response =
                await fetch(
                    `content/mentorship/${file}`
                );


            if (!response.ok) {
                continue;
            }


            const html =
                await response.text();


            container.insertAdjacentHTML(
                "beforeend",
                html
            );


        } catch (error) {

            console.error(
                `Could not load mentorship item ${file}`,
                error
            );

        }

    }

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
   START APPLICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    loadPage
);
