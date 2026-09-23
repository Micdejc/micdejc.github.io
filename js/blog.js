"use strict";

import { getBlogPosts } from "./blog-posts.js";


/* ================= CONFIGURATION ================= */

const POSTS_PER_PAGE = 5;
const WORDS_PER_MINUTE = 225;


/* ================= STATE ================= */

let allPosts = [];
let currentPage = 1;
let previousBlogState = {
    page: 1,
    search: "",
    category: "all",
    type: "all"
};

/* ================= HELPERS ================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );

    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* ================= READING TIME ================= */

async function calculateInternalReadingTime(
    url,
    card
) {

    try {

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const articleDocument =
            parser.parseFromString(
                html,
                "text/html"
            );


        const content =
            articleDocument.querySelector(
                ".blog-content"
            ) ||
            articleDocument.querySelector(
                ".blog-article"
            ) ||
            articleDocument.querySelector(
                "article"
            );


        if (!content) {
            return;
        }


        const clone =
            content.cloneNode(true);


        clone
            .querySelectorAll(
                "script, style, noscript, nav, footer, header, img, svg, canvas, video, audio, iframe, pre, code"
            )
            .forEach(
                element => element.remove()
            );


        const text =
            clone.textContent
                .replace(/\s+/g, " ")
                .trim();


        if (!text) {
            return;
        }


        const words =
            text.split(/\s+/).length;


        const minutes =
            Math.max(
                1,
                Math.ceil(
                    words /
                    WORDS_PER_MINUTE
                )
            );


        const readingTime =
            card.querySelector(
                ".blog-reading-time"
            );


        if (readingTime) {

            readingTime.textContent =
                `${minutes} min read`;

        }

    } catch (error) {

        console.warn(
            `Could not calculate reading time for "${url}".`,
            error
        );


        const readingTime =
            card.querySelector(
                ".blog-reading-time"
            );


        if (readingTime) {
            readingTime.remove();
        }

    }

}


/* ================= CREATE CARD ================= */

function createPostCard(post) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "blog-card";


    /*
     * Internal links are handled by JavaScript.
     * External links remain normal links and
     * open in a new tab.
     */

    const externalAttributes =
        post.type === "external"
            ? ' target="_blank" rel="noopener noreferrer"'
            : "";


    const sourceLabel =
        post.type === "internal"
            ? "My website"
            : "External";


    const tagsHTML =
        post.tags.length > 0
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


    card.innerHTML = `

        <a
            class="blog-card-link"
            href="${escapeAttribute(post.url)}"
            data-blog-type="${post.type}"
            ${externalAttributes}
        >

            <div class="blog-card-meta">

                <span class="blog-source">
                    ${sourceLabel}
                </span>

                <span class="blog-category">
                    ${escapeHTML(post.category)}
                </span>

                <span class="blog-date">
                    ${formatDate(post.date)}
                </span>

                ${
                    post.type === "internal"
                        ? `
                            <span class="blog-reading-time">
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


                <div class="blog-card-footer">

                    <span class="blog-read-more">
                        ${
                            post.type === "external"
                                ? "Read article ↗"
                                : "Read article →"
                        }
                    </span>

                </div>

            </div>

        </a>

    `;


    /*
     * Intercept only internal articles.
     */

    if (
        post.type === "internal"
    ) {

        const link =
            card.querySelector(
                ".blog-card-link"
            );


        link.addEventListener(
            "click",
            event => {

                /*
                 * Preserve normal browser
                 * behavior for modifier clicks.
                 */

                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                ) {
                    return;
                }


                event.preventDefault();


                openInternalArticle(
                    post,
                    true
                );

            }
        );

    }


    return card;

}


/* ================= CATEGORIES ================= */

function populateCategories(posts) {

    const select =
        document.getElementById(
            "blog-category-filter"
        );


    if (!select) {
        return;
    }


    const categories =
        [
            ...new Set(
                posts.map(
                    post => post.category
                )
            )
        ]
        .sort(
            (a, b) =>
                a.localeCompare(b)
        );


    select.innerHTML = `

        <option value="all">
            All categories
        </option>

    `;


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


            select.appendChild(
                option
            );

        }
    );

}


/* ================= SEARCH & FILTERS ================= */

function getFilteredPosts() {

    const categoryFilter =
        document.getElementById(
            "blog-category-filter"
        );


    const typeFilter =
        document.getElementById(
            "blog-type-filter"
        );


    const searchInput =
        document.getElementById(
            "blog-search"
        );


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const selectedType =
        typeFilter
            ? typeFilter.value
            : "all";


    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    return allPosts.filter(
        post => {

            /*
             * Search across the most useful
             * blog metadata.
             *
             * This includes:
             * - title
             * - description
             * - category
             * - tags
             */

            const searchableText = [

                post.title,

                post.description,

                post.category,

                ...(Array.isArray(post.tags)
                    ? post.tags
                    : [])

            ]
                .join(" ")
                .toLowerCase();


            const searchMatch =
                !searchTerm ||
                searchableText.includes(
                    searchTerm
                );


            const categoryMatch =
                selectedCategory === "all" ||
                post.category === selectedCategory;


            const typeMatch =
                selectedType === "all" ||
                post.type === selectedType;


            return (
                searchMatch &&
                categoryMatch &&
                typeMatch
            );

        }
    );

}


/* ================= SEARCH CLEAR ================= */

function updateSearchClearButton() {

    const searchInput =
        document.getElementById(
            "blog-search"
        );


    const clearButton =
        document.getElementById(
            "blog-search-clear"
        );


    if (
        !searchInput ||
        !clearButton
    ) {
        return;
    }


    clearButton.hidden =
        searchInput.value.length === 0;

}


/* ================= CONNECT FILTERS ================= */

function initialiseBlogFilters() {

    const searchInput =
        document.getElementById(
            "blog-search"
        );


    const clearButton =
        document.getElementById(
            "blog-search-clear"
        );


    const categoryFilter =
        document.getElementById(
            "blog-category-filter"
        );


    const typeFilter =
        document.getElementById(
            "blog-type-filter"
        );


    /*
     * Search
     */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                currentPage = 1;

                updateSearchClearButton();

                renderPosts();

            }
        );

    }


    /*
     * Clear search
     */

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                    currentPage = 1;

                    updateSearchClearButton();

                    renderPosts();

                    searchInput.focus();

                }

            }
        );

    }


    /*
     * Category
     */

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            () => {

                currentPage = 1;

                renderPosts();

            }
        );

    }


    /*
     * Source
     */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            () => {

                currentPage = 1;

                renderPosts();

            }
        );

    }


    updateSearchClearButton();

}


/* ================= PAGINATION ================= */

function renderPagination(
    totalPosts,
    totalPages
) {

    const pagination =
        document.getElementById(
            "blog-pagination"
        );


    if (!pagination) {
        return;
    }


    pagination.innerHTML = "";


    if (totalPages <= 1) {
        return;
    }


    /* Previous */

    const previousButton =
        document.createElement(
            "button"
        );


    previousButton.type =
        "button";


    previousButton.className =
        "blog-pagination-button";


    previousButton.textContent =
        "← Previous";


    previousButton.disabled =
        currentPage === 1;


    previousButton.setAttribute(
        "aria-label",
        "Previous page"
    );


    previousButton.addEventListener(
        "click",
        () => {

            if (
                currentPage > 1
            ) {

                currentPage--;

                renderPosts();

                scrollToBlogPosts();

            }

        }
    );


    pagination.appendChild(
        previousButton
    );


    /* Page numbers */

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const pageButton =
            document.createElement(
                "button"
            );


        pageButton.type =
            "button";


        pageButton.className =
            "blog-pagination-button";


        pageButton.textContent =
            page;


        pageButton.setAttribute(
            "aria-label",
            `Page ${page}`
        );


        if (
            page === currentPage
        ) {

            pageButton.classList.add(
                "active"
            );

            pageButton.setAttribute(
                "aria-current",
                "page"
            );

        }


        pageButton.addEventListener(
            "click",
            () => {

                currentPage =
                    page;

                renderPosts();

                scrollToBlogPosts();

            }
        );


        pagination.appendChild(
            pageButton
        );

    }


    /* Next */

    const nextButton =
        document.createElement(
            "button"
        );


    nextButton.type =
        "button";


    nextButton.className =
        "blog-pagination-button";


    nextButton.textContent =
        "Next →";


    nextButton.disabled =
        currentPage === totalPages;


    nextButton.setAttribute(
        "aria-label",
        "Next page"
    );


    nextButton.addEventListener(
        "click",
        () => {

            if (
                currentPage < totalPages
            ) {

                currentPage++;

                renderPosts();

                scrollToBlogPosts();

            }

        }
    );


    pagination.appendChild(
        nextButton
    );

}


/* ================= SCROLL ================= */

function scrollToBlogPosts() {

    const blogSection =
        document.getElementById(
            "blog"
        );


    if (!blogSection) {
        return;
    }


    blogSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ================= ARTICLE CONTAINER ================= */

function getBlogBox() {

    return document.querySelector(
        "#blog .blog-box"
    );

}


/* ================= OPEN INTERNAL ARTICLE ================= */

async function openInternalArticle(
    post,
    updateHistory = true
) {


    const blogBox =
        getBlogBox();

    /*
     * Preserve the complete Blog state
     * before replacing the list with the article.
     */

    previousBlogState = {
        page: currentPage,

        search:
            document.getElementById(
                "blog-search"
            )?.value || "",

        category:
            document.getElementById(
                "blog-category-filter"
            )?.value || "all",

        type:
            document.getElementById(
                "blog-type-filter"
            )?.value || "all"
    };


    if (!blogBox) {
        return;
    }


    /*
     * Show a temporary loading state.
     */

    blogBox.innerHTML = `

        <div class="blog-loading">

            <p>
                Loading article...
            </p>

        </div>

    `;


    /*
     * Update browser history.
     */

    if (updateHistory) {

        const url =
            new URL(
                window.location.href
            );

        /*
        url.searchParams.set(
            "article",
            post.url
        );


        window.history.pushState(
            {
                blogArticle: post.url
            },
            "",
            url
        );
        */

        url.searchParams.set(
            "blog",
            post.slug
        );

        window.history.pushState(
            {
                blogArticle: post.slug
            },
            "",
            url
        );

    }


    try {

        const response =
            await fetch(post.url);


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const articleDocument =
            parser.parseFromString(
                html,
                "text/html"
            );


        const article =
            articleDocument.querySelector(
                ".blog-article"
            );


        if (!article) {

            throw new Error(
                "The page does not contain a .blog-article element."
            );

        }


        /*
         * Extract only the article.
         */

        const articleClone =
            article.cloneNode(true);


        articleClone
            .querySelectorAll(
                "script, iframe"
            )
            .forEach(
                element => element.remove()
            );


        /*
         * Build the in-page article view.
         */

        blogBox.innerHTML = "";


        const backButton =
            document.createElement(
                "button"
            );


        backButton.type =
            "button";


        backButton.className =
            "blog-back-button";


        backButton.innerHTML =
            "← Back to Blog";


        backButton.addEventListener(
            "click",
            () => {

                window.history.back();

            }
        );


        blogBox.appendChild(
            backButton
        );


        blogBox.appendChild(
            articleClone
        );


        /*
         * Make sure article links behave correctly.
         */

        initialiseArticleLinks(
            blogBox
        );


        scrollToBlogPosts();


    } catch (error) {

        console.error(
            "Could not load blog article:",
            error
        );


        blogBox.innerHTML = `

            <button
                type="button"
                class="blog-back-button"
                id="blog-error-back"
            >
                ← Back to Blog
            </button>

            <div class="blog-empty">

                <p>
                    Sorry, this article could not be loaded.
                </p>

            </div>

        `;


        const backButton =
            document.getElementById(
                "blog-error-back"
            );


        if (backButton) {

            backButton.addEventListener(
                "click",
                () => {

                    window.history.back();

                }
            );

        }

    }

}


/* ================= ARTICLE LINKS ================= */

function initialiseArticleLinks(
    container
) {

    const links =
        container.querySelectorAll(
            ".blog-content a"
        );


    links.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            if (
                href.startsWith(
                    "http://"
                ) ||
                href.startsWith(
                    "https://"
                )
            ) {

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

            }

        }
    );

}


/* ================= RENDER POSTS ================= */

function renderPosts() {

    const container =
        document.getElementById(
            "blog-posts"
        );


    const emptyState =
        document.getElementById(
            "blog-empty"
        );


    if (!container) {
        return;
    }


    /*
     * Apply search + category + source
     * filtering together.
     */

    const filteredPosts =
        getFilteredPosts();


    /*
     * Always sort newest first.
     */

    filteredPosts.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    const totalPosts =
        filteredPosts.length;


    const totalPages =
        Math.ceil(
            totalPosts /
            POSTS_PER_PAGE
        );


    if (
        totalPages === 0
    ) {

        currentPage = 1;

    } else if (
        currentPage > totalPages
    ) {

        currentPage =
            totalPages;

    }


    container.innerHTML = "";


    if (
        totalPosts === 0
    ) {

        if (emptyState) {
            emptyState.hidden = false;
        }


        renderPagination(
            0,
            0
        );


        return;

    }


    if (emptyState) {
        emptyState.hidden = true;
    }


    const startIndex =
        (
            currentPage - 1
        ) *
        POSTS_PER_PAGE;


    const endIndex =
        startIndex +
        POSTS_PER_PAGE;


    const visiblePosts =
        filteredPosts.slice(
            startIndex,
            endIndex
        );


    visiblePosts.forEach(
        post => {

            const card =
                createPostCard(post);


            container.appendChild(
                card
            );


            if (
                post.type === "internal"
            ) {

                calculateInternalReadingTime(
                    post.url,
                    card
                );

            }

        }
    );


    renderPagination(
        totalPosts,
        totalPages
    );

}


/* ================= SHOW BLOG LIST ================= */

function showBlogList(
    updateHistory = false
) {

    const blogBox =
        getBlogBox();


    if (!blogBox) {
        return;
    }


    /*
     * Restore the original Blog
     * section structure.
     */

    blogBox.innerHTML = `

        <div id="blog-list-view">

            <span class="section-number">
                10 / BLOGS
            </span>

            <h2>
                Insights & perspectives
            </h2>

            <p>
                Thoughts, insights, and perspectives on cybersecurity,
                AI security, LLMs, adversarial AI, emerging AI risks,
                and related topics.
            </p>


            <div
                class="blog-source-data"
                id="blog-source"
            ></div>


            <!-- BLOG SEARCH & FILTERS -->

            <div class="blog-controls">

                <div class="blog-filter blog-search">

                    <label for="blog-search">
                        Search
                    </label>

                    <div class="blog-search-input">

                        <span
                            class="blog-search-icon"
                            aria-hidden="true"
                        >
                            ⌕
                        </span>

                        <input
                            type="search"
                            id="blog-search"
                            placeholder="Search insights..."
                            autocomplete="off"
                            aria-label="Search blog posts"
                        >

                        <button
                            type="button"
                            id="blog-search-clear"
                            class="blog-search-clear"
                            aria-label="Clear blog search"
                            hidden
                        >
                            ×
                        </button>

                    </div>

                </div>


                <div class="blog-filter">

                    <label for="blog-category-filter">
                        Category
                    </label>

                    <select
                        id="blog-category-filter"
                    >

                        <option value="all">
                            All categories
                        </option>

                    </select>

                </div>


                <div class="blog-filter">

                    <label for="blog-type-filter">
                        Source
                    </label>

                    <select
                        id="blog-type-filter"
                    >

                        <option value="all">
                            All posts
                        </option>

                        <option value="internal">
                            My website
                        </option>

                        <option value="external">
                            External
                        </option>

                    </select>

                </div>

            </div>


            <div
                class="blog-posts"
                id="blog-posts"
                aria-live="polite"
            ></div>


            <div
                class="blog-pagination"
                id="blog-pagination"
                aria-label="Blog pagination"
            ></div>


            <div
                class="blog-empty"
                id="blog-empty"
                hidden
            >

                <p>
                    No blog posts match your search or selected filters.
                </p>

            </div>

        </div>

    `;


    /*
     * Rebuild the source metadata.
     *
     * This is necessary because the Blog box
     * was temporarily replaced by the article.
     */

    const source =
        document.getElementById(
            "blog-source"
        );


    allPosts.forEach(
        post => {

            const entry =
                document.createElement(
                    "article"
                );


            entry.className =
                "blog-entry";


            entry.dataset.title =
                post.title;

            entry.dataset.slug =
                post.slug;
            
            entry.dataset.date =
                post.date;


            entry.dataset.category =
                post.category;


            entry.dataset.type =
                post.type;


            entry.dataset.url =
                post.url;


            entry.dataset.description =
                post.description;


            entry.dataset.tags =
                post.tags.join(", ");


            source.appendChild(
                entry
            );

        }
    );


    /*
     * Rebuild categories.
     */

    populateCategories(
        allPosts
    );



    /*
     * Restore the Blog filters.
     */
    
    const searchInput =
        document.getElementById(
            "blog-search"
        );
    
    const categoryFilter =
        document.getElementById(
            "blog-category-filter"
        );
    
    const typeFilter =
        document.getElementById(
            "blog-type-filter"
        );
    
    
    if (searchInput) {
    
        searchInput.value =
            previousBlogState.search;
    
    }
    
    
    if (categoryFilter) {
    
        categoryFilter.value =
            previousBlogState.category;
    
    }
    
    
    if (typeFilter) {
    
        typeFilter.value =
            previousBlogState.type;
    
    }


    /*
     * Reconnect all search and filters.
     */

    initialiseBlogFilters();


    /*
     * Render the Blog.
     */

    currentPage =  previousBlogState.page;

    updateSearchClearButton();

    renderPosts();


    /*
     * Restore the clean index.html URL.
     */

    if (updateHistory) {

        const url =
            new URL(
                window.location.href
            );

        /*
        url.searchParams.delete(
            "article"
        );
        */

        url.searchParams.delete(
            "blog"
        );


        window.history.pushState(
            {},
            "",
            url
        );

    }

}


/* ================= RESTORE FROM URL ================= */

function loadArticleFromURL() {

    const url =
        new URL(
            window.location.href
        );


    const blogSlug =
        url.searchParams.get(
            "blog"
        );


    if (!blogSlug) {
        return;
    }


    const post =
        allPosts.find(
            item =>
                item.type === "internal" &&
                item.slug === blogSlug
        );


    if (!post) {
        console.warn(
            `Blog article with slug "${blogSlug}" was not found.`
        );

        return;
    }


    openInternalArticle(
        post,
        false
    );

}


/* ================= BROWSER BACK / FORWARD ================= */

function initialiseHistoryHandling() {

    window.addEventListener(
        "popstate",
        () => {

            const url =
                new URL(
                    window.location.href
                );


            const blogSlug =
                url.searchParams.get(
                    "blog"
                );


            if (blogSlug) {

                const post =
                    allPosts.find(
                        item =>
                            item.type === "internal" &&
                            item.slug === blogSlug
                    );


                if (post) {

                    openInternalArticle(
                        post,
                        false
                    );

                }

            } else {

                showBlogList(
                    false
                );

            }

        }
    );

}


/* ================= INITIALISE ================= */

function initialiseBlog() {

    allPosts =
        getBlogPosts();


    populateCategories(
        allPosts
    );


    /*
     * Connect search, category and
     * source filters.
     */

    initialiseBlogFilters();


    /*
     * Initial Blog rendering.
     */

    renderPosts();


    /*
     * Browser history.
     */

    initialiseHistoryHandling();


    /*
     * Restore article if URL contains
     * ?article=...
     */

    loadArticleFromURL();

}


/* ================= EXPORT ================= */

export {
    initialiseBlog
};
