export async function loadVisitorStats() {

    const totalElement =
        document.getElementById("total-visitors");

    const monthlyElement =
        document.getElementById("monthly-visitors");

    if (!totalElement || !monthlyElement) {
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
                `Total stats request failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        console.log(
            "GoatCounter - Total:",
            data
        );

        totalElement.textContent =
            Number(data.count || 0)
                .toLocaleString("en-GB");

    } catch (error) {

        console.error(
            "Unable to load total visitor statistics:",
            error
        );

        totalElement.textContent = "—";
    }


    /*
     * CURRENT MONTH
     */

    try {

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(now.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(now.getDate())
                .padStart(2, "0");

        const start =
            `${year}-${month}-01`;

        const end =
            `${year}-${month}-${day}`;

        const monthlyURL =
            `${baseURL}?start=${start}&end=${end}`;

        console.log(
            "GoatCounter - Monthly URL:",
            monthlyURL
        );

        const response =
            await fetch(monthlyURL);

        if (!response.ok) {
            throw new Error(
                `Monthly stats request failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        console.log(
            "GoatCounter - This Month:",
            data
        );

        monthlyElement.textContent =
            Number(data.count || 0)
                .toLocaleString("en-GB");

    } catch (error) {

        console.error(
            "Unable to load monthly visitor statistics:",
            error
        );

        monthlyElement.textContent = "—";
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
        "This month:",
        monthlyElement.textContent
    );

    console.groupEnd();
}
