export async function loadVisitorStats() {

    const totalElement =
        document.getElementById("total-visitors");

    const pageViewsElement =
        document.getElementById("page-views");

    if (!totalElement || !pageViewsElement) {
        console.warn(
            "Visitor statistics elements were not found."
        );
        return;
    }

    const baseURL =
        "https://micdejc.goatcounter.com/counter//.json";


    /*
     * TOTAL VISITORS
     */

    try {

        const response =
            await fetch(baseURL);

        if (!response.ok) {
            throw new Error(
                `Total visitor request failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        console.log(
            "GoatCounter - Total Visitors:",
            data
        );

        totalElement.textContent =
            data.count || "0";

    } catch (error) {

        console.error(
            "Unable to load total visitor statistics:",
            error
        );

        totalElement.textContent = "—";
    }


    /*
     * PAGE VIEWS
     */

    try {

        const pagePath =
            window.location.pathname || "/";

        const pageViewsURL =
            `https://micdejc.goatcounter.com/counter/` +
            `${encodeURIComponent(pagePath)}.json`;

        console.log(
            "GoatCounter - Page Views URL:",
            pageViewsURL
        );

        const response =
            await fetch(pageViewsURL);

        if (!response.ok) {
            throw new Error(
                `Page views request failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        console.log(
            "GoatCounter - Page Views:",
            data
        );

        pageViewsElement.textContent =
            data.count || "0";

    } catch (error) {

        console.error(
            "Unable to load page view statistics:",
            error
        );

        pageViewsElement.textContent = "—";
    }


    /*
     * SUMMARY
     */

    console.group(
        "📊 Website Visitor Statistics"
    );

    console.log(
        "Total visitors:",
        totalElement.textContent
    );

    console.log(
        "Page views:",
        pageViewsElement.textContent
    );

    console.groupEnd();
}
