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


    if (!totalElement || !monthlyElement) {

        console.warn(
            "Visitor statistics elements were not found."
        );

        return;
    }


    function initializeVisitorStats() {

        /*
         * ----------------------------------------
         * TOTAL VISITORS
         * ----------------------------------------
         */

        window.goatcounter.visit_count({

            append: "#total-visitors",

            path: "TOTAL",

            type: "svg",

            no_branding: true

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


        const startDate =
            `${year}-${month}-01`;


        const endDate =
            `${year}-${month}-${day}`;


        window.goatcounter.visit_count({

            append: "#monthly-visitors",

            path: "TOTAL",

            type: "svg",

            start: startDate,

            end: endDate,

            no_branding: true

        });


        /*
         * Debug
         */

        console.group(
            "📊 Website Visitor Statistics"
        );

        console.log(
            "GoatCounter:",
            "Ready"
        );

        console.log(
            "Total:",
            "TOTAL"
        );

        console.log(
            "This Month:",
            `${startDate} → ${endDate}`
        );

        console.groupEnd();
    }


    /*
     * GoatCounter is loaded asynchronously.
     * Wait until visit_count() is available.
     */

    function waitForGoatCounter() {

        if (
            window.goatcounter &&
            typeof window.goatcounter.visit_count ===
                "function"
        ) {

            initializeVisitorStats();

            return;
        }


        setTimeout(
            waitForGoatCounter,
            100
        );
    }


    waitForGoatCounter();
}
