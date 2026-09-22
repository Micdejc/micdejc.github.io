/* =========================================================
   FLAGSHIP RESEARCH
========================================================= */

const flagshipFiles = [

    "flagship-grammatical-mirage.html",

    "flagship-refusalguard.html"

];


export async function loadFlagship() {

    const container =
        document.getElementById(
            "flagship-list"
        );


    if (!container) {
        return;
    }


    for (const file of flagshipFiles) {

        try {

            const response =
                await fetch(
                    `content/flagship/${file}`
                );


            if (!response.ok) {

                console.error(
                    `Could not load flagship section: ${file}`
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
                `Error loading flagship section ${file}:`,
                error
            );

        }

    }

}
