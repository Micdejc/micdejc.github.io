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


    /* =========================================================
       LOAD MENTORSHIP CARDS
    ========================================================= */

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


    /* =========================================================
       LOAD MORE SETTINGS
    ========================================================= */

    const initialMentorship = 2;

    const mentorshipPerClick = 2;


    let visibleMentorship =
        initialMentorship;


    /* =========================================================
       GET MENTORSHIP CARDS
    ========================================================= */

    const mentorshipCards =
        Array.from(
            container.querySelectorAll(
                ".research-card"
            )
        );


    /* =========================================================
       UPDATE DISPLAY
    ========================================================= */

    function updateMentorship() {

        const totalMentorship =
            mentorshipCards.length;


        /*
         * Show only the allowed number
         * of mentorship cards.
         */

        mentorshipCards.forEach(
            (card, index) => {

                card.hidden =
                    index >= visibleMentorship;

            }
        );


        /*
         * Hide the Load More button when
         * every mentorship card is visible.
         */

        if (
            visibleMentorship >=
            totalMentorship
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


    /* =========================================================
       LOAD MORE
    ========================================================= */

    if (loadMoreButton) {

        loadMoreButton.addEventListener(
            "click",
            () => {

                visibleMentorship +=
                    mentorshipPerClick;


                /*
                 * Do not allow the counter to exceed
                 * the actual number of mentorship cards.
                 */

                visibleMentorship =
                    Math.min(
                        visibleMentorship,
                        mentorshipCards.length
                    );


                updateMentorship();

            }
        );

    }


    /* =========================================================
       INITIAL DISPLAY
    ========================================================= */

    updateMentorship();

}


window.loadMentorship = loadMentorship;
