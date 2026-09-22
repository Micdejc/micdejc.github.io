(function () {

    "use strict";


    /*
     * Average reading speed.
     *
     * 225 words per minute is used as the default.
     */
    const WORDS_PER_MINUTE = 225;


    /**
     * Escape HTML.
     */
    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /**
     * Escape an HTML attribute.
     */
    function escapeAttribute(value) {

        return escapeHTML(value);

    }


    /**
     * Format a blog date.
     */
    function formatDate(dateString) {

        const date = new Date(dateString);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return dateString;

        }


        return new Intl.DateTimeFormat(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(date);

    }


    /**
     * Calculate reading time from an internal HTML article.
     *
     * The article is fetched and parsed locally.
     *
     * Only the actual article content is counted.
     */
    async function calculateInternalReadingTime(
        url,
        card
    ) {

        const readingElement =
            card.querySelector(
                "[data-reading-time]"
            );


        if (!readingElement) {
            return;
        }


        try {

            const response =
                await fetch(url, {
                    cache: "no-cache"
                });


            if (!response.ok) {

                throw new Error(
                    `HTTP ${response.status}`
                );

            }


            const html =
                await response.text();


            const parser =
                new DOMParser();


            const document =
                parser.parseFromString(
                    html,
                    "text/html"
                );


            /*
             * Find the main article content.
             *
             * .blog-content is preferred.
             */
            const article =
                document.querySelector(
                    ".blog-content"
                ) ||
                document.querySelector(
                    ".blog-article"
                ) ||
                document.querySelector(
                    "article"
                );


            if (!article) {

                throw new Error(
                    "Article content could not be found."
                );

            }


            /*
             * Clone the content so the original parsed
             * document remains untouched.
             */
            const content =
                article.cloneNode(true);


            /*
             * Remove elements that should not count
             * toward reading time.
             */
            content
                .querySelectorAll(
                    [
                        "script",
                        "style",
                        "noscript",
                        "nav",
                        "footer",
                        "header",
                        "img",
                        "svg",
                        "canvas",
                        "video",
                        "audio",
                        "iframe",
                        "pre",
                        "code"
                    ].join(",")
                )
                .forEach(
                    element => element.remove()
                );


            /*
             * Extract visible text.
             */
            const text =
                content.textContent
                    .replace(/\s+/g, " ")
                    .trim();


            if (!text) {

                throw new Error(
                    "Article contains no readable text."
                );

            }


            /*
             * Count words.
             */
            const words =
                text
                    .split(/\s+/)
                    .filter(Boolean)
                    .length;


            /*
             * Calculate reading time.
             *
             * Minimum = 1 minute.
             */
            const minutes =
                Math.max(
                    1,
                    Math.ceil(
                        words /
                        WORDS_PER_MINUTE
                    )
                );


            readingElement.textContent =
                `${minutes} min read`;

            readingElement.hidden = false;


        } catch (error) {

            console.warn(
                `Could not calculate reading time for "${url}".`,
                error
            );


            /*
             * Hide reading time if the article cannot
             * be fetched or parsed.
             */
            readingElement.remove();

        }

    }


    /**
     * External articles do not have their reading time
     * calculated because cross-origin requests may be
     * blocked by CORS.
     */
    function calculateExternalReadingTime(card) {

        const readingElement =
            card.querySelector(
                "[data-reading-time]"
            );


        if (readingElement) {

            readingElement.remove();

        }

    }


    /**
     * Create a blog post card.
     *
     * The entire card is clickable.
     */
    function createPostCard(post) {

        const article =
            document.createElement("article");


        article.className =
            "blog-card";


        article.dataset.type =
            post.type;


        article.dataset.category =
            post.category;


        /*
         * External links:
         *
         * Open in a new tab.
         */
        const externalAttributes =
            post.type === "external"
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";


        /*
         * Source label.
         */
        const sourceLabel =
            post.type === "internal"
                ? "Website"
                : "External";


        /*
         * Arrow.
         */
        const arrow =
            post.type === "external"
                ? "↗"
                : "→";


        /*
         * Tags.
         */
        const tagsHTML =
            post.tags.length
                ? `
                    <div class="blog-tags">
                        ${post.tags
                            .map(
                                tag =>
                                    `<span class="blog-tag">
                                        ${escapeHTML(tag)}
                                    </span>`
                            )
                            .join("")}
                    </div>
                `
                : "";


        /*
         * Complete clickable card.
         *
         * Using a genuine <a> element means:
         *
         * - mouse users can click anywhere
         * - keyboard users can focus it
         * - Ctrl/Cmd + click works
         * - middle-click works
         * - browser link menus work
         */
        article.innerHTML = `

            <a
                class="blog-card-link"
                href="${escapeAttribute(post.url)}"
                ${externalAttributes}
                aria-label="Read ${escapeAttribute(post.title)}"
            >

                <div class="blog-card-meta">

                    <span class="blog-source">
                        ${escapeHTML(sourceLabel)}
                    </span>

                    <span class="blog-category">
                        ${escapeHTML(post.category)}
                    </span>

                    <span class="blog-date">
                        ${escapeHTML(
                            formatDate(post.date)
                        )}
                    </span>

                    ${
                        post.type === "internal"
                            ? `
                                <span
                                    class="blog-reading-time"
                                    data-reading-time
                                >
                                    Calculating...
                                </span>
                            `
                            : ""
                    }

                </div>


                <div class="blog-card-content">

                    <h3 class="blog-title">
                        ${escapeHTML(post.title)}
                    </h3>


                    ${
                        post.description
                            ? `
                                <p class="blog-description">
                                    ${escapeHTML(
                                        post.description
                                    )}
                                </p>
                            `
                            : ""
                    }


                    ${tagsHTML}

                </div>


                <div class="blog-card-footer">

                    <span class="blog-read-more">
                        Read article
                        <span class="blog-read-more-arrow">
                            ${arrow}
                        </span>
                    </span>

                </div>

            </a>

        `;


        /*
         * Calculate reading time only for internal
         * HTML articles.
         */
        if (post.type === "internal") {

            calculateInternalReadingTime(
                post.url,
                article
            );

        }


        return article;

    }


    /**
     * Populate category filter.
     */
    function populateCategories(
        posts,
        categoryFilter
    ) {

        const categories =
            [
                ...new Set(
                    posts
                        .map(
                            post =>
                                post.category
                        )
                        .filter(Boolean)
                )
            ]
            .sort(
                (a, b) =>
                    a.localeCompare(b)
            );


        /*
         * Keep the All categories option.
         */
        categoryFilter.innerHTML =
            `<option value="all">
                All categories
            </option>`;


        categories.forEach(
            category => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    category;


                option.textContent =
                    category;


                categoryFilter.appendChild(
                    option
                );

            }
        );

    }


    /**
     * Render filtered posts.
     */
    function renderPosts(
        posts,
        category,
        type,
        container,
        emptyState
    ) {

        /*
         * Filter.
         */
        let filtered =
            posts.filter(post => {

                const matchesCategory =
                    category === "all" ||
                    post.category === category;


                const matchesType =
                    type === "all" ||
                    post.type === type;


                return (
                    matchesCategory &&
                    matchesType
                );

            });


        /*
         * Newest first.
         */
        filtered.sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );


        /*
         * Clear existing content.
         */
        container.innerHTML = "";


        /*
         * Empty state.
         */
        if (!filtered.length) {

            emptyState.hidden = false;

            return;

        }


        emptyState.hidden = true;


        /*
         * Render cards.
         */
        filtered.forEach(post => {

            const card =
                createPostCard(post);


            container.appendChild(card);

        });

    }


    /**
     * Initialise the blog.
     */
    function initialiseBlog() {

        const container =
            document.getElementById(
                "blog-posts"
            );


        /*
         * This is important for your modular
         * website architecture.
         *
         * blog.js may load before section/blog.html
         * has been inserted into the page.
         */
        if (!container) {

            return;

        }


        /*
         * Make sure blog-posts.js has loaded.
         */
        if (
            typeof window.getBlogPosts !==
            "function"
        ) {

            console.error(
                "getBlogPosts() is not available. Make sure blog-posts.js loads before blog.js."
            );

            return;

        }


        const posts =
            window.getBlogPosts();


        const categoryFilter =
            document.getElementById(
                "blog-category-filter"
            );


        const typeFilter =
            document.getElementById(
                "blog-type-filter"
            );


        const emptyState =
            document.getElementById(
                "blog-empty"
            );


        if (
            !categoryFilter ||
            !typeFilter ||
            !emptyState
        ) {

            console.error(
                "Blog controls are missing."
            );

            return;

        }


        /*
         * Populate categories.
         */
        populateCategories(
            posts,
            categoryFilter
        );


        /*
         * Rendering function.
         */
        function updateBlog() {

            renderPosts(
                posts,
                categoryFilter.value,
                typeFilter.value,
                container,
                emptyState
            );

        }


        /*
         * Filters.
         */
        categoryFilter.addEventListener(
            "change",
            updateBlog
        );


        typeFilter.addEventListener(
            "change",
            updateBlog
        );


        /*
         * Initial render.
         */
        updateBlog();

    }


    /*
     * Expose the initialisation function.
     *
     * This allows your main loadPage() function
     * to initialise the blog after dynamically
     * loading section/blog.html.
     */
    window.initialiseBlog =
        initialiseBlog;


    /*
     * Normal page load.
     */
    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseBlog
        );

    } else {

        initialiseBlog();

    }


})();
