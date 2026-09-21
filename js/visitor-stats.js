/**
 * Visitor Statistics
 * -------------------
 * Displays:
 * 1. Total Visitors
 * 2. Visitors This Month
 *
 * Uses GoatCounter visit_count()
 * No API key required.
 * No fetch() required.
 * No CORS issues.
 */
export async function loadVisitorStats() {

    const totalElement =
        document.getElementById("total-visitors");

    const monthlyElement =
        document.getElementById("monthly-visitors");


    /*
     * The visitor-stats.html component must
     * already be loaded before this function runs.
     */

    if (!totalElement || !monthlyElement) {

        console.warn(
            "Visitor statistics elements were not found."
        );

        return;
    }


    /*
     * Wait for GoatCounter count.js.
     *
     * count.js is loaded asynchronously, so
     * window.goatcounter may not exist yet.
     */

    const waitForGoatCounter = () => {

        if (
            window.goatcounter &&
            typeof window.goatcounter.visit_count === "function"
        ) {

            initializeVisitorStats();

            return;
        }


        /*
         * Try again after 100 ms.
         */

        setTimeout(
            waitForGoatCounter,
            100
        );
    };


    /*
     * Initialize the counters.
     */

    const initializeVisitorStats = () => {

        /*
         * ----------------------------------------
         * TOTAL VISITORS
         * ----------------------------------------
         *
         * TOTAL is GoatCounter's special path
         * for the entire site.
         */

        window.goatcounter.visit_count({

            append: "#total-visitors",

            path: "TOTAL",

            type: "html",

            no_branding: true,

            attr: {
                class: "goatcounter-value"
            }

        });


        /*
         * ----------------------------------------
         * THIS MONTH
         * ----------------------------------------
         */

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                "0"
            );


        /*
         * First day of current month.
         */

        const startDate =
            `${year}-${month}-01`;


        /*
         * Today's date.
         */

        const endDate =
            `${year}-${month}-${day}`;


        /*
         * GoatCounter date-range counter.
         */

        window.goatcounter.visit_count({

            append: "#monthly-visitors",

            path: "TOTAL",

            type: "html",

            start: startDate,

            end: endDate,

            no_branding: true,

            attr: {
                class: "goatcounter-value"
            }

        });


        /*
         * Debug information.
         */

        console.group(
            "📊 Website Visitor Statistics"
        );

        console.log(
            "GoatCounter:",
            "Ready"
        );

        console.log(
            "Total Visitors:",
            "TOTAL"
        );

        console.log(
            "This Month:",
            `${startDate} → ${endDate}`
        );

        console.groupEnd();
    };


    /*
     * Start waiting for GoatCounter.
     */

    waitForGoatCounter();
}
