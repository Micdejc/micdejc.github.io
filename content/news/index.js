const newsFiles = [

    "refusalguard-m.html",

    "ieee-csr-2026.html",

    "ukci-2025.html",

    "uwe-engineering-showcase.html"

];


export async function loadNews() {

    const container = document.getElementById("news-list");

    if (!container) {
        return;
    }


    for (const file of newsFiles) {

        try {

            const response = await fetch(
                `content/news/${file}`
            );

            if (!response.ok) {

                console.error(
                    `Could not load news item: ${file}`
                );

                continue;

            }


            const html = await response.text();

            /*
             * Because the individual news files are loaded
             * from content/news/, their image paths would normally
             * be resolved relative to index.html.
             */

            container.insertAdjacentHTML(
                "beforeend",
                html
            );

        } catch (error) {

            console.error(
                `Error loading news item ${file}:`,
                error
            );

        }

    }


    initialiseNewsPagination();

}


function initialiseNewsPagination() {

    const newsCards =
        document.querySelectorAll(".news-card");

    const loadMoreButton =
        document.getElementById("loadMoreNews");


    if (!newsCards.length || !loadMoreButton) {
        return;
    }


    const initialNews = 3;

    const newsPerClick = 3;

    let visibleNews = initialNews;


    function updateNews() {

        newsCards.forEach(
            (card, index) => {

                if (index < visibleNews) {

                    card.classList.remove(
                        "hidden-news"
                    );

                } else {

                    card.classList.add(
                        "hidden-news"
                    );

                }

            }
        );


        if (visibleNews >= newsCards.length) {

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

            visibleNews += newsPerClick;

            updateNews();

        }
    );


    updateNews();

}
