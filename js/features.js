(function () {
    "use strict";


    /* =========================================
       FEATURE CONTRIBUTIONS
       ========================================= */

    const featureContributions = {

        "heads-talk": {

            title: "Heads Talk",

            type: "Featured Analysis",

            description:
                "Expert analysis and commentary contributed to Heads Talk.",

            contributions: [

                {
                    title:
                        "The Analysis: Michael Tchuindjang",

                    description:
                        "Expert analysis on artificial intelligence and cybersecurity.",

                    url:
                        "https://podcasts.apple.com/gb/podcast/005-heads-talk-the-analysis-michael-tchuindjangs/id1896624173?i=1000772246065",

                    type:
                        "Podcast Analysis"
                }

                /*
                 * Add more contributions here.
                 *
                 * Example:
                 *
                 * {
                 *     title: "Another Heads Talk Contribution",
                 *     description: "Short description.",
                 *     url: "https://example.com",
                 *     type: "Expert Analysis"
                 * }
                 */

            ]
        },


        "ai-partners": {

            title: "AI & Partners",

            type: "Report Contributor",

            description:
                "Expert insights and analysis contributed to AI & Partners reports.",

            contributions: [

                {
                    title:
                        "AI & Partners Report Contribution",

                    description:
                        "EU AI Act: AI Literacy – A Deep Dive",

                    url:
                        "https://www.linkedin.com/posts/ai-%26-partners_ail-ab-activity-7392818177413517312-9cxA/",

                    type:
                        "Report"
                },


                {
                    title:
                        "AI & Partners Report Contribution",

                    description:
                        "Digital Markets Act vs EU AI Act: A Mapping Exercise",

                    url:
                        "https://www.linkedin.com/posts/ai-%26-partners_euaia-dma-activity-7342068761484529664-Ia8_/",

                    type:
                        "Report"
                },

                {
                    title:
                        "AI & Partners Report Contribution",

                    description:
                        "EU AI Act: Managing AI risks",

                    url:
                        "https://www.linkedin.com/posts/edps-airms-ugcPost-7448499763974467584-UtRz/",

                    type:
                        "Report"
                }

                /*
                 * Add additional reports here.
                 */

            ]
        },


        "uk-cyber-security-council": {

            title:
                "UK Cyber Security Council",

            type:
                "Expert Contributor",

            description:
                "Expert perspectives, blogs, and contributions to the UK cybersecurity community.",

            contributions: [

                {
                    title:
                        "Humans as the Main Social Engineering Target",

                    description:
                        "A cybersecurity perspective on why humans remain a central target for social engineering attacks.",

                    url:
                        "https://www.ukcybersecuritycouncil.org.uk/blogs/humans-as-the-main-social-engineering-target",

                    type:
                        "Blog"
                }

                /*
                 * Add additional UKCSC contributions here.
                 */

            ]
        }

    };


    /* =========================================
       MODAL ELEMENTS
       ========================================= */

    let modal = null;


    /* =========================================
       CREATE MODAL
       ========================================= */

    function createFeatureModal() {

        if (
            document.getElementById(
                "featureContributionsModal"
            )
        ) {

            modal =
                document.getElementById(
                    "featureContributionsModal"
                );

            return;
        }


        modal =
            document.createElement("div");


        modal.id =
            "featureContributionsModal";

        modal.className =
            "feature-contributions-modal";


        modal.innerHTML = `

            <div
                class="feature-modal-backdrop"
                data-feature-modal-close
            ></div>


            <div
                class="feature-modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="featureModalTitle"
            >

                <div
                    class="feature-modal-header"
                >

                    <div>

                        <span
                            class="feature-modal-type"
                            id="featureModalType"
                        ></span>

                        <h2
                            id="featureModalTitle"
                        ></h2>

                    </div>


                    <button
                        type="button"
                        class="feature-modal-close"
                        id="featureModalClose"
                        aria-label="Close contributions"
                        title="Close"
                    >
                        ×
                    </button>

                </div>


                <p
                    class="feature-modal-description"
                    id="featureModalDescription"
                ></p>


                <div
                    class="feature-modal-divider"
                ></div>


                <div
                    class="feature-modal-content"
                    id="featureModalContent"
                ></div>

            </div>
        `;


        document.body.appendChild(
            modal
        );


        setupModalEvents();
    }


    /* =========================================
       MODAL EVENTS
       ========================================= */

    function setupModalEvents() {

        const closeButton =
            document.getElementById(
                "featureModalClose"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeFeatureModal
            );

        }


        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.hasAttribute(
                        "data-feature-modal-close"
                    )
                ) {

                    closeFeatureModal();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    closeFeatureModal();

                }

            }
        );
    }


    /* =========================================
       OPEN MODAL
       ========================================= */

    function openFeatureModal(
        featureId
    ) {

        const feature =
            featureContributions[
                featureId
            ];


        if (!feature) {

            console.warn(
                "Feature not found:",
                featureId
            );

            return;
        }


        if (!modal) {

            createFeatureModal();

        }


        const title =
            document.getElementById(
                "featureModalTitle"
            );


        const type =
            document.getElementById(
                "featureModalType"
            );


        const description =
            document.getElementById(
                "featureModalDescription"
            );


        const content =
            document.getElementById(
                "featureModalContent"
            );


        title.textContent =
            feature.title;


        type.textContent =
            feature.type;


        description.textContent =
            feature.description;


        /*
         * Generate contribution links.
         */

        if (
            !feature.contributions ||
            feature.contributions.length === 0
        ) {

            content.innerHTML = `

                <div
                    class="feature-no-contributions"
                >
                    No contributions available yet.
                </div>

            `;

        } else {

            content.innerHTML =
                feature.contributions
                    .map(
                        function (contribution) {

                            return `

                                <a
                                    href="${escapeHTML(
                                        contribution.url
                                    )}"
                                    class="feature-contribution-item"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    <div
                                        class="feature-contribution-main"
                                    >

                                        <span
                                            class="feature-contribution-type"
                                        >
                                            ${escapeHTML(
                                                contribution.type
                                            )}
                                        </span>


                                        <h3>
                                            ${escapeHTML(
                                                contribution.title
                                            )}
                                        </h3>


                                        <p>
                                            ${escapeHTML(
                                                contribution.description
                                            )}
                                        </p>

                                    </div>


                                    <span
                                        class="feature-contribution-arrow"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>

                                </a>

                            `;

                        }
                    )
                    .join("");
        }


        modal.classList.add(
            "active"
        );


        document.body.classList.add(
            "feature-modal-open"
        );
    }


    /* =========================================
       CLOSE MODAL
       ========================================= */

    function closeFeatureModal() {

        if (!modal) {

            return;

        }


        modal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "feature-modal-open"
        );
    }


    /* =========================================
       ESCAPE HTML
       ========================================= */

    function escapeHTML(
        value
    ) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }


    /* =========================================
       FEATURE BUTTONS
       ========================================= */

    function setupFeatureButtons() {

        const buttons =
            document.querySelectorAll(
                ".feature-contributions-button"
            );


        buttons.forEach(
            function (button) {

                /*
                 * Prevent duplicate listeners.
                 */

                if (
                    button.dataset.featureBound ===
                    "true"
                ) {

                    return;
                }


                button.dataset.featureBound =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        const featureId =
                            button.dataset.feature;


                        openFeatureModal(
                            featureId
                        );

                    }
                );

            }
        );
    }


    /* =========================================
       INITIALIZE
       ========================================= */

    function initializeFeatures() {

        createFeatureModal();

        setupFeatureButtons();


        /*
         * Your features section may be
         * loaded dynamically by main.js.
         *
         * Observe the page until the cards
         * become available.
         */

        const observer =
            new MutationObserver(
                function () {

                    setupFeatureButtons();

                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeFeatures,
            {
                once: true
            }
        );

    } else {

        initializeFeatures();

    }

})();
