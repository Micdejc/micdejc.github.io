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
       LOAD ALL MENTORSHIP CARDS
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
       LOAD MORE
    ========================================================= */

    const mentorshipCards =
        Array.from(
            container.querySelectorAll(
                ".research-card"
            )
        );


    const initialMentorship = 2;

    const mentorshipPerClick = 2;

    let visibleMentorship =
        initialMentorship;


    function updateMentorship() {

        mentorshipCards.forEach(
            (card, index) => {

                card.hidden =
                    index >= visibleMentorship;

            }
        );


        /* ---------------------------------------------
           UPDATE LOAD MORE BUTTON
        --------------------------------------------- */

        const remaining =
            mentorshipCards.length -
            visibleMentorship;


        if (
            remaining <= 0
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
       LOAD MORE BUTTON
    ========================================================= */

    if (loadMoreButton) {

        loadMoreButton.addEventListener(
            "click",
            () => {

                visibleMentorship +=
                    mentorshipPerClick;


                /*
                 * Never allow the visible count
                 * to exceed the actual number of cards.
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
