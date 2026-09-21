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

    /*
     * Make sure the visitor statistics
     * component has been loaded first.
     */
    if (!totalCounter || !monthlyCounter) {

        console.warn(
            "Visitor statistics elements were not found."
        );

        return;
    }

    /*
     * GoatCounter public counter.
     */
    const goatCounterBase =
        "https://micdejc.goatcounter.com/counter/";

    /*
     * --------------------------------------------------
     * TOTAL VISITORS
     * --------------------------------------------------
     *
     * TOTAL.svg provides the overall site counter.
     */

    totalCounter.src =
        `${goatCounterBase}TOTAL.svg`;

    /*
     * --------------------------------------------------
     * THIS MONTH
     * --------------------------------------------------
     *
     * Calculate the first day of the current month
     * and today's date using the visitor's local time.
     */

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

    /*
     * GoatCounter date-range counter.
     */

    monthlyCounter.src =
        `${goatCounterBase}//.svg` +
        `?start=${startDate}` +
        `&end=${endDate}`;

    /*
     * --------------------------------------------------
     * DEBUG INFORMATION
     * --------------------------------------------------
     */

    console.group(
        "📊 Website Visitor Statistics"
    );

    console.log(
        "Total Visitors:",
        `${goatCounterBase}TOTAL.svg`
    );

    console.log(
        "This Month:",
        `${goatCounterBase}//.svg?start=${startDate}&end=${endDate}`
    );

    console.log(
        "Period:",
        `${startDate} → ${endDate}`
    );

    console.groupEnd();
}
