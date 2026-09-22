/* =========================================================
   FEATURES
========================================================= */

const featureFiles = [

    "uk-cyber-security-council.html",

    "heads-talk.html",

    "ai-and-partners.html",

    "heads-talk.html",

    "ai-and-partners.html"

];


export async function loadFeatures() {

    const container =
        document.getElementById(
            "features-list"
        );

    if (!container) {
        return;
    }


    for (const file of featureFiles) {

        try {

            const response =
                await fetch(
                    `content/features/${file}`
                );


            if (!response.ok) {

                console.error(
                    `Could not load feature ${file}`
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
                `Could not load feature ${file}`,
                error
            );

        }

    }


    initialiseFeaturesPagination();

}


/* =========================================================
   FEATURES PAGINATION
========================================================= */

function initialiseFeaturesPagination() {

    const featureCards =
        document.querySelectorAll(
            ".feature-card"
        );


    const loadMoreButton =
        document.getElementById(
            "loadMoreFeatures"
        );


    if (
        !featureCards.length ||
        !loadMoreButton
    ) {
        return;
    }


    const initialFeatures = 3;

    const featuresPerClick = 3;

    let visibleFeatures =
        initialFeatures;


    function updateFeatures() {

        featureCards.forEach(
            (card, index) => {

                if (
                    index < visibleFeatures
                ) {

                    card.classList.remove(
                        "hidden-feature"
                    );

                } else {

                    card.classList.add(
                        "hidden-feature"
                    );

                }

            }
        );


        if (
            visibleFeatures >=
            featureCards.length
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

            visibleFeatures +=
                featuresPerClick;


            updateFeatures();

        }
    );


    updateFeatures();

}
