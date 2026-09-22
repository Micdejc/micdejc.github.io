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

    if (!container) {
        return;
    }


    for (const file of mentorshipFiles) {

        try {

            const response =
                await fetch(
                    `content/mentorship/${file}`
                );


            if (!response.ok) {

                console.error(
                    `Could not load mentorship item: ${file}`
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
                `Error loading mentorship item ${file}:`,
                error
            );

        }

    }


    initialiseMentorshipPagination();

}


function initialiseMentorshipPagination() {

    const mentorshipCards =
        document.querySelectorAll(
            "#mentorship-list .research-card"
        );


    const loadMoreButton =
        document.getElementById(
            "loadMoreMentorship"
        );


    if (
        !mentorshipCards.length ||
        !loadMoreButton
    ) {
        return;
    }


    const initialMentorship = 2;

    const mentorshipPerClick = 2;

    let visibleMentorship =
        initialMentorship;


    function updateMentorship() {

        mentorshipCards.forEach(
            (card, index) => {

                if (
                    index < visibleMentorship
                ) {

                    card.classList.remove(
                        "hidden-mentorship"
                    );

                } else {

                    card.classList.add(
                        "hidden-mentorship"
                    );

                }

            }
        );


        if (
            visibleMentorship >=
            mentorshipCards.length
        ) {

            loadMoreButton.style.display =
                "none";

        } else {

            loadMoreButton.style.display =
                "";

        }

    }


    loadMoreButton.addEventListener(
        "click",
        function () {

            visibleMentorship +=
                mentorshipPerClick;


            updateMentorship();

        }
    );


    updateMentorship();

}
