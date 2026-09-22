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
       LOAD MORE BY ROW
       
       Each row contains 2 cards.
    --------------------------------------------------------- */

    const cards =
        Array.from(
            container.children
        );


    const cardsPerRow = 2;

    let visibleCards = cardsPerRow;


    function updateMentorshipCards() {

        cards.forEach(
            (card, index) => {

                card.hidden =
                    index >= visibleCards;

            }
        );


        /*
         * Hide Load More when all cards
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


    /* ---------------------------------------------------------
       LOAD NEXT ROW
    --------------------------------------------------------- */

    if (loadMoreButton) {

        loadMoreButton.addEventListener(
            "click",
            () => {

                /*
                 * Reveal exactly one additional row.
                 */

                visibleCards += cardsPerRow;

                updateMentorshipCards();

            }
        );

    }


    /* ---------------------------------------------------------
       INITIAL STATE
       
       Show exactly one row = 2 cards.
    --------------------------------------------------------- */

    updateMentorshipCards();

}


window.loadMentorship = loadMentorship;
