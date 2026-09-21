document.addEventListener("DOMContentLoaded", () => {
    loadVisitorStats();
});

async function loadVisitorStats() {

    const totalElement =
        document.getElementById("total-visitors");

    const monthlyElement =
        document.getElementById("monthly-visitors");

    if (!totalElement || !monthlyElement) {
        return;
    }

    try {

        /*
         * Total visitors
         */
        const totalResponse = await fetch(
            "https://micdejc.goatcounter.com/counter//.json"
        );

        const totalData =
            await totalResponse.json();

        totalElement.textContent =
            totalData.count || "0";


        /*
         * Current month
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
            `?start=${start}` +
            `&end=${end}`;

        const monthlyResponse =
            await fetch(monthlyURL);

        const monthlyData =
            await monthlyResponse.json();

        monthlyElement.textContent =
            monthlyData.count || "0";

    } catch (error) {

        console.error(
            "Unable to load visitor statistics:",
            error
        );

        totalElement.textContent = "—";
        monthlyElement.textContent = "—";
    }
}
