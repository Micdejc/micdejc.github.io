document.addEventListener("DOMContentLoaded", () => {
    loadVisitorStats();
});

async function loadVisitorStats() {

    const totalElement =
        document.getElementById("total-visitors");

    const monthlyElement =
        document.getElementById("monthly-visitors");

    const locationsElement =
        document.getElementById("top-locations");

    if (!totalElement || !monthlyElement) {
        console.warn(
            "Visitor statistics elements were not found."
        );
        return;
    }

    try {

        /*
         * =====================================================
         * 1. TOTAL VISITS
         * =====================================================
         */

        const totalURL =
            "https://micdejc.goatcounter.com/counter//.json";

        const totalResponse =
            await fetch(totalURL);

        if (!totalResponse.ok) {
            throw new Error(
                `Total stats request failed: ${totalResponse.status}`
            );
        }

        const totalData =
            await totalResponse.json();

        console.log(
            "GoatCounter - Total stats:",
            totalData
        );

        totalElement.textContent =
            totalData.count || "0";


        /*
         * =====================================================
         * 2. CURRENT MONTH
         * =====================================================
         */

        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(now.getMonth() + 1)
                .padStart(2, "0");

        const start =
            `${year}-${month}-01`;

        const end =
            `${year}-${month}-${String(
                now.getDate()
            ).padStart(2, "0")}`;

        const monthlyURL =
            `https://micdejc.goatcounter.com/counter//.json` +
            `?start=${encodeURIComponent(start)}` +
            `&end=${encodeURIComponent(end)}`;

        const monthlyResponse =
            await fetch(monthlyURL);

        if (!monthlyResponse.ok) {
            throw new Error(
                `Monthly stats request failed: ${monthlyResponse.status}`
            );
        }

        const monthlyData =
            await monthlyResponse.json();

        console.log(
            "GoatCounter - Monthly stats:",
            {
                start,
                end,
                data: monthlyData
            }
        );

        monthlyElement.textContent =
            monthlyData.count || "0";


        /*
         * =====================================================
         * 3. TOP LOCATIONS
         * =====================================================
         *
         * GoatCounter's location statistics are available
         * through the authenticated API, not the public
         * /counter/*.json endpoint.
         *
         * We therefore test the endpoint separately so that
         * the console shows the exact response.
         * =====================================================
         */

        const locationsURL =
            "https://micdejc.goatcounter.com/api/v0/stats/locations" +
            `?start=${encodeURIComponent(start + "T00:00:00Z")}` +
            `&end=${encodeURIComponent(end + "T23:59:59Z")}` +
            "&limit=3";

        console.log(
            "GoatCounter - Locations URL:",
            locationsURL
        );

        const locationsResponse =
            await fetch(locationsURL);

        console.log(
            "GoatCounter - Locations status:",
            locationsResponse.status
        );

        const locationsText =
            await locationsResponse.text();

        console.log(
            "GoatCounter - Locations response:",
            locationsText
        );

        /*
         * Try to parse the response if it is JSON.
         */

        if (locationsResponse.ok) {

            try {

                const locationsData =
                    JSON.parse(locationsText);

                console.log(
                    "GoatCounter - Locations data:",
                    locationsData
                );

                if (locationsElement) {
                    renderLocations(
                        locationsElement,
                        locationsData
                    );
                }

            } catch (error) {

                console.warn(
                    "Locations response was not valid JSON:",
                    error
                );
            }

        } else {

            console.warn(
                "Location statistics are not publicly accessible. " +
                "GoatCounter returned:",
                locationsResponse.status
            );

            if (locationsElement) {
                locationsElement.innerHTML =
                    `<span>Location data unavailable</span>`;
            }
        }


        /*
         * =====================================================
         * 4. SUMMARY
         * =====================================================
         */

        console.group(
            "📊 Website Visitor Statistics"
        );

        console.log(
            "Total visits:",
            totalData.count
        );

        console.log(
            "This month:",
            monthlyData.count
        );

        console.log(
            "Period:",
            `${start} → ${end}`
        );

        console.groupEnd();


    } catch (error) {

        console.error(
            "Unable to load visitor statistics:",
            error
        );

        totalElement.textContent = "—";
        monthlyElement.textContent = "—";

        if (locationsElement) {
            locationsElement.innerHTML =
                `<span>Statistics unavailable</span>`;
        }
    }
}


/*
 * =========================================================
 * Render Locations
 * =========================================================
 */

function renderLocations(
    container,
    data
) {

    if (
        !data ||
        !Array.isArray(data.stats) ||
        data.stats.length === 0
    ) {
        container.innerHTML =
            `<span>No location data available</span>`;

        return;
    }

    const locations =
        data.stats.slice(0, 3);

    container.innerHTML =
        locations
            .map(location => {

                const country =
                    location.name ||
                    location.id ||
                    "Unknown";

                const count =
                    location.count || 0;

                return `
                    <div class="visitor-location">
                        <span>${country}</span>
                        <strong>${count}</strong>
                    </div>
                `;
            })
            .join("");
}
