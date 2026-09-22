/* =========================================================
   MENTORSHIP
========================================================= */

const mentorshipFiles = [

    "chris-mayo.html",

    "mohammed-almasabi.html",

    "anas-ashfaq.html",

    "yusuf-adebayo.html",

    "donovan-isom.html"

];


export async function loadMentorship() {

    const container =
        document.getElementById(
            "mentorship-list"
        );


    const loadMoreButton =
        document.getElementById(
            "mentorship-load-more"
        );


    const loadMoreContainer =
        document.getElementById(
            "mentorship-load-more-container"
        );


    if (!container) {
        return;
    }


    /* ---------------------------------------------------------
       LOAD ALL MENTORSHIP CARDS
    --------------------------------------------------------- */

    for (const file of mentorshipFiles) {

        try {

            const response =
                await fetch(
                    `content/mentorship/${file}`
                );


            if (!response.ok) {

                console.error(
                    `Could not load ${file}`
                );

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


    /* ---------------------------------------------------------
       LOAD MORE
    --------------------------------------------------------- */

    const cards =
        Array.from(
            container.children
        );


    const cardsPerLoad = 2;

    let visibleCards = cardsPerLoad;


    function updateMentorshipCards() {

        cards.forEach(
            (card, index) => {

                card.hidden =
                    index >= visibleCards;

            }
        );


        /*
         * Hide the button when all cards
         * are already visible.
         */

        if (
            visibleCards >= cards.length
        ) {

            if (loadMoreContainer) {
                loadMoreContainer.hidden = true;
            }

        } else {

            if (loadMoreContainer) {
                loadMoreContainer.hidden = false;
            }

        }

    }


    /*
     * Load two more mentorship cards
     * each time the button is clicked.
     */

    if (loadMoreButton) {

        loadMoreButton.addEventListener(
            "click",
            () => {

                visibleCards += cardsPerLoad;

                updateMentorshipCards();

            }
        );

    }


    /*
     * Initially show only the first two cards.
     */

    updateMentorshipCards();

}


window.loadMentorship = loadMentorship;
