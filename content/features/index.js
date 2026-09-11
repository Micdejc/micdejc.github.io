/* =========================================================
   FEATURES
========================================================= */

export async function loadFeatures() {

    const container =
        document.getElementById("features-list");

    if (!container) {
        return;
    }

    const files = [
        "uk-cyber-security-council.html",
        "heads-talk.html",
        "ai-and-partners.html"
    ];

    for (const file of files) {

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
}
