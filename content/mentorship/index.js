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
                console.error(`Could not load ${file}`);
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

window.loadMentorship = loadMentorship;
