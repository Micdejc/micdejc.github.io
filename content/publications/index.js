const publicationFiles = [
    "refusalguard-m.html",
    "human-machine-agreement.html",
    "cutcaptcha.html",
    "grammatical-mirage.html"
];

export async function loadPublications() {

    const container = document.getElementById("publication-list");

    if (!container) {
        return;
    }

    for (const file of publicationFiles) {

        try {

            const response = await fetch(
                `content/publications/${file}`
            );

            if (!response.ok) {
                console.error(`Could not load ${file}`);
                continue;
            }

            const html = await response.text();

            container.insertAdjacentHTML(
                "beforeend",
                html
            );

        } catch (error) {

            console.error(
                `Error loading publication ${file}:`,
                error
            );

        }

    }

}

window.loadPublications = loadPublications;
