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

        "mohammed-almasabi.html",
       
        "anas-ashfaq.html",

        "yusuf-adebayo.html",

        "donovan-isom.html"

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
