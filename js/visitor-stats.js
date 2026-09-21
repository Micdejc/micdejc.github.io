/**
 * Visitor Statistics
 * -------------------
 * Displays:
 * 1. Total Visitors
 * 2. Visitors This Month
 *
 * Uses GoatCounter public SVG counters.
 * No API calls or fetch() required.
 */
export async function loadVisitorStats() {

    const totalCounter =
        document.getElementById("total-visitors");

    const monthlyCounter =
        document.getElementById("monthly-visitors");

    if (!totalCounter || !monthlyCounter) {
        console.warn(
            "Visitor statistics elements were not found."
        );
        return;
    }

    const goatCounterBase =
        "https://micdejc.goatcounter.com/counter/";

    // Total visitors
    totalCounter.src =
        `${goatCounterBase}TOTAL.svg`;

    // Current month
    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    const startDate =
        `${year}-${month}-01`;

    const endDate =
        `${year}-${month}-${day}`;

    monthlyCounter.src =
        `${goatCounterBase}//.svg` +
        `?start=${startDate}` +
        `&end=${endDate}`;

    console.group(
        "📊 Website Visitor Statistics"
    );

    console.log(
        "Total Visitors:",
        totalCounter.src
    );

    console.log(
        "This Month:",
        monthlyCounter.src
    );

    console.log(
        "Period:",
        `${startDate} → ${endDate}`
    );

    console.groupEnd();
}
