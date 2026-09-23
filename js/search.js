(function () {
    "use strict";


    /* =========================================
       SEARCHABLE WEBSITE SECTIONS
       ========================================= */

    const searchableSections = [
        {
            id: "hero",
            name: "Home"
        },
        {
            id: "about",
            name: "About"
        },
        {
            id: "research-statement",
            name: "Research Statement"
        },
        {
            id: "research",
            name: "Research"
        },
        {
            id: "flagships",
            name: "Flagships"
        },
        {
            id: "publications",
            name: "Publications"
        },
        {
            id: "news",
            name: "Latest News & Activity"
        },
        {
            id: "projects",
            name: "Projects"
        },
        {
            id: "profiles",
            name: "Profiles"
        },
        {
            id: "experience",
            name: "Experience"
        },
        {
            id: "achievements",
            name: "Achievements"
        },
        {
            id: "service",
            name: "Professional Service"
        },
        {
            id: "mentorship",
            name: "Mentorship"
        },
        {
            id: "features",
            name: "Features & Media"
        },
        {
            id: "blogs",
            name: "Blogs"
        },
        {
            id: "testimonials",
            name: "Testimonials"
        },
        {
            id: "contact",
            name: "Contact"
        }
    ];


    let searchOverlay = null;
    let searchInput = null;
    let searchResults = null;
    let searchStatus = null;
    let searchClear = null;


    /* =========================================
       CREATE SEARCH INTERFACE
       ========================================= */

    function createSearchInterface() {

        if (
            document.getElementById(
                "siteSearchOverlay"
            )
        ) {
            return;
        }


        const overlay =
            document.createElement("div");


        overlay.id =
            "siteSearchOverlay";

        overlay.className =
            "site-search-overlay";


        overlay.innerHTML = `

            <div
                class="site-search-backdrop"
                id="siteSearchBackdrop"
            ></div>


            <div
                class="site-search-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="siteSearchTitle"
            >

                <div class="site-search-header">

                    <h2 id="siteSearchTitle">
                        Search
                    </h2>


                    <button
                        type="button"
                        id="siteSearchClose"
                        class="site-search-close"
                        aria-label="Close search"
                        title="Close search"
                    >
                        ×
                    </button>

                </div>


                <div
                    class="site-search-input-wrapper"
                >

                    <span
                        class="site-search-icon"
                        aria-hidden="true"
                    >
                        🔍
                    </span>


                    <input
                        type="search"
                        id="siteSearchInput"
                        class="site-search-input"
                        placeholder="Search my website..."
                        autocomplete="off"
                        spellcheck="false"
                        aria-label="Search website"
                    />


                    <button
                        type="button"
                        id="siteSearchClear"
                        class="site-search-clear"
                        aria-label="Clear search"
                        title="Clear search"
                        hidden
                    >
                        ×
                    </button>

                </div>


                <div
                    id="siteSearchStatus"
                    class="site-search-status"
                    aria-live="polite"
                >
                    Search research, publications, projects, news and more.
                </div>


                <div
                    id="siteSearchResults"
                    class="site-search-results"
                ></div>

            </div>
        `;


        document.body.appendChild(
            overlay
        );


        searchOverlay =
            overlay;

        searchInput =
            document.getElementById(
                "siteSearchInput"
            );

        searchResults =
            document.getElementById(
                "siteSearchResults"
            );

        searchStatus =
            document.getElementById(
                "siteSearchStatus"
            );

        searchClear =
            document.getElementById(
                "siteSearchClear"
            );


        setupSearchEvents();
    }


    /* =========================================
       SEARCH EVENTS
       ========================================= */

    function setupSearchEvents() {

        const closeButton =
            document.getElementById(
                "siteSearchClose"
            );


        const backdrop =
            document.getElementById(
                "siteSearchBackdrop"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeSearch
            );

        }


        if (backdrop) {

            backdrop.addEventListener(
                "click",
                closeSearch
            );

        }


        if (searchClear) {

            searchClear.addEventListener(
                "click",
                clearSearch
            );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    const query =
                        searchInput.value.trim();


                    searchClear.hidden =
                        query.length === 0;


                    performSearch(query);
                }
            );

        }


        /*
         * Escape closes the search.
         *
         * Ctrl + K / Cmd + K opens the search.
         */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    searchOverlay &&
                    searchOverlay.classList.contains(
                        "active"
                    )
                ) {

                    closeSearch();

                    return;
                }


                if (
                    (event.ctrlKey ||
                        event.metaKey) &&
                    event.key.toLowerCase() === "k"
                ) {

                    event.preventDefault();

                    openSearch();

                }

            }
        );
    }


    /* =========================================
       SEARCH BUTTON
       ========================================= */

    function setupSearchButton() {

        const searchButton =
            document.getElementById(
                "searchToggle"
            );


        if (!searchButton) {

            /*
             * Navigation may be loaded
             * dynamically by main.js.
             */

            return false;
        }


        searchButton.addEventListener(
            "click",
            openSearch
        );


        return true;
    }


    /* =========================================
       OPEN SEARCH
       ========================================= */

    function openSearch() {

        if (!searchOverlay) {

            createSearchInterface();

        }


        searchOverlay.classList.add(
            "active"
        );


        document.body.classList.add(
            "search-open"
        );


        /*
         * Wait briefly so the overlay
         * is fully visible before focus.
         */

        setTimeout(function () {

            if (searchInput) {

                searchInput.focus();

            }

        }, 50);
    }


    /* =========================================
       CLOSE SEARCH
       ========================================= */

    function closeSearch() {

        if (!searchOverlay) {

            return;
        }


        searchOverlay.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "search-open"
        );
    }


    /* =========================================
       CLEAR SEARCH
       ========================================= */

    function clearSearch() {

        if (!searchInput) {

            return;
        }


        searchInput.value = "";


        if (searchClear) {

            searchClear.hidden = true;

        }


        showSearchMessage(
            "Search research, publications, projects, news and more."
        );


        searchInput.focus();
    }


    /* =========================================
       PERFORM SEARCH
       ========================================= */

    function performSearch(query) {

        if (!query) {

            showSearchMessage(
                "Search research, publications, projects, news and more."
            );

            return;
        }


        const normalizedQuery =
            normalizeText(query);


        if (
            normalizedQuery.length < 3
        ) {

            showSearchMessage(
                "Please enter at least 3 characters."
            );

            return;
        }


        const queryWords =
            normalizedQuery
                .split(/\s+/)
                .filter(Boolean);


        const results = [];


        searchableSections.forEach(
            function (section) {

                const element =
                    document.getElementById(
                        section.id
                    );


                /*
                 * Ignore sections that do not
                 * exist or have not loaded yet.
                 */

                if (!element) {

                    return;
                }


                const text =
                    normalizeText(
                        element.innerText || ""
                    );


                if (!text) {

                    return;
                }


                let score = 0;


                /*
                 * Exact phrase match
                 * receives a higher score.
                 */

                if (
                    text.includes(
                        normalizedQuery
                    )
                ) {

                    score += 20;

                }


                /*
                 * Score individual words.
                 */

                queryWords.forEach(
                    function (word) {

                        if (
                            text.includes(word)
                        ) {

                            score += 5;

                        }

                    }
                );


                if (score > 0) {

                    results.push({

                        id: section.id,

                        name: section.name,

                        text: element.innerText || "",

                        score: score

                    });

                }

            }
        );


        /*
         * Highest relevance first.
         */

        results.sort(
            function (a, b) {

                return b.score - a.score;

            }
        );


        displaySearchResults(
            results,
            query
        );
    }


    /* =========================================
       DISPLAY SEARCH RESULTS
       ========================================= */

    function displaySearchResults(
        results,
        query
    ) {

        if (!searchResults) {

            return;
        }


        if (
            results.length === 0
        ) {

            if (searchStatus) {

                searchStatus.textContent =
                    `No results found for "${query}".`;

            }


            searchResults.innerHTML = `

                <div
                    class="site-search-no-results"
                >

                    <div
                        class="site-search-no-results-icon"
                    >
                        🔎
                    </div>


                    <h3>
                        No results found
                    </h3>


                    <p>
                        Try another keyword or phrase.
                    </p>

                </div>
            `;


            return;
        }


        if (searchStatus) {

            searchStatus.textContent =
                `${results.length} ${
                    results.length === 1
                        ? "section"
                        : "sections"
                } found`;

        }


        searchResults.innerHTML =
            results
                .map(
                    function (result) {

                        const snippet =
                            createSnippet(
                                result.text,
                                query
                            );


                        return `

                            <button
                                type="button"
                                class="site-search-result"
                                data-section="${escapeHTML(
                                    result.id
                                )}"
                            >

                                <span
                                    class="site-search-result-section"
                                >
                                    ${escapeHTML(
                                        result.name
                                    )}
                                </span>


                                <span
                                    class="site-search-result-snippet"
                                >
                                    ${highlightMatch(
                                        escapeHTML(
                                            snippet
                                        ),
                                        query
                                    )}
                                </span>


                                <span
                                    class="site-search-result-arrow"
                                    aria-hidden="true"
                                >
                                    →
                                </span>

                            </button>

                        `;

                    }
                )
                .join("");


        /*
         * Make every result clickable.
         */

        searchResults
            .querySelectorAll(
                ".site-search-result"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const sectionId =
                                button.dataset.section;


                            closeSearch();


                            scrollToSection(
                                sectionId
                            );

                        }
                    );

                }
            );
    }


    /* =========================================
       CREATE SEARCH SNIPPET
       ========================================= */

    function createSnippet(
        text,
        query
    ) {

        const cleanText =
            text
                .replace(/\s+/g, " ")
                .trim();


        if (!cleanText) {

            return "";

        }


        const lowerText =
            cleanText.toLowerCase();


        const lowerQuery =
            query.toLowerCase();


        const position =
            lowerText.indexOf(
                lowerQuery
            );


        /*
         * If the complete phrase is not found,
         * find the first individual keyword.
         */

        let matchPosition =
            position;


        if (
            matchPosition === -1
        ) {

            const words =
                lowerQuery
                    .split(/\s+/)
                    .filter(Boolean);


            for (
                let i = 0;
                i < words.length;
                i++
            ) {

                const wordPosition =
                    lowerText.indexOf(
                        words[i]
                    );


                if (
                    wordPosition !== -1
                ) {

                    matchPosition =
                        wordPosition;

                    break;

                }

            }

        }


        /*
         * No exact keyword position.
         * Return the beginning of the section.
         */

        if (
            matchPosition === -1
        ) {

            return (
                cleanText.substring(
                    0,
                    180
                ) +
                (
                    cleanText.length > 180
                        ? "..."
                        : ""
                )
            );

        }


        const start =
            Math.max(
                0,
                matchPosition - 80
            );


        const end =
            Math.min(
                cleanText.length,
                matchPosition +
                query.length +
                100
            );


        let snippet =
            cleanText.substring(
                start,
                end
            );


        if (
            start > 0
        ) {

            snippet =
                "..." +
                snippet;

        }


        if (
            end < cleanText.length
        ) {

            snippet += "...";

        }


        return snippet;
    }


    /* =========================================
       HIGHLIGHT MATCH
       ========================================= */

    function highlightMatch(
        text,
        query
    ) {

        if (!query) {

            return text;

        }


        const escapedQuery =
            query.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );


        return text.replace(
            new RegExp(
                `(${escapedQuery})`,
                "gi"
            ),
            "<mark>$1</mark>"
        );
    }


    /* =========================================
       SCROLL TO CONTENT SECTION
       ========================================= */

    function scrollToSection(
        sectionId
    ) {

        const section =
            document.getElementById(
                sectionId
            );


        if (!section) {

            return;

        }


        /*
         * Give the browser a moment after
         * closing the overlay.
         */

        setTimeout(
            function () {

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                 * Brief visual indication of
                 * the destination section.
                 */

                section.classList.add(
                    "search-highlight-section"
                );


                setTimeout(
                    function () {

                        section.classList.remove(
                            "search-highlight-section"
                        );

                    },
                    1800
                );

            },
            100
        );
    }


    /* =========================================
       NORMALIZE TEXT
       ========================================= */

    function normalizeText(
        text
    ) {

        return text
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();
    }


    /* =========================================
       ESCAPE HTML
       ========================================= */

    function escapeHTML(
        text
    ) {

        return String(text)
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
       SEARCH MESSAGE
       ========================================= */

    function showSearchMessage(
        message
    ) {

        if (searchStatus) {

            searchStatus.textContent =
                message;

        }


        if (searchResults) {

            searchResults.innerHTML =
                "";

        }
    }


    /* =========================================
       INITIALIZE SEARCH
       ========================================= */

    function initializeSearch() {

        createSearchInterface();


        /*
         * Navigation is loaded dynamically.
         * Try to find the search button now.
         */

        if (
            setupSearchButton()
        ) {

            return;

        }


        /*
         * If navigation is not available yet,
         * watch for it to be inserted.
         */

        const observer =
            new MutationObserver(
                function () {

                    if (
                        setupSearchButton()
                    ) {

                        observer.disconnect();

                    }

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


    /* =========================================
       START
       ========================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeSearch,
            {
                once: true
            }
        );

    } else {

        initializeSearch();

    }

})();
