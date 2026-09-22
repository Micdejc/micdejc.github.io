"use strict";

import { getBlogPosts } from "./blog-posts.js";


/* ================= CONFIGURATION ================= */

const POSTS_PER_PAGE = 5;
const WORDS_PER_MINUTE = 225;


/* ================= STATE ================= */

let allPosts = [];
let currentPage = 1;


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

    const date = new Date(dateString + "T00:00:00");

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

async function calculateInternalReadingTime(url, card) {

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


        const document =
            parser.parseFromString(
                html,
                "text/html"
            );


        const content =
            document.querySelector(
                ".blog-content"
            ) ||
            document.querySelector(
                ".blog-article"
            ) ||
            document.querySelector(
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
                    words / WORDS_PER_MINUTE
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
        document.createElement("article");


    card.className =
        "blog-card";


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
                                `<span class="blog-tag">${escapeHTML(tag)}</span>`
                        )
                        .join("")}
                </div>
            `
            : "";


    card.innerHTML = `

        <a
            class="blog-card-link"
            href="${escapeAttribute(post.url)}"
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
                                ${escapeHTML(post.description)}
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


    /*
     * No pagination needed when
     * all posts fit on one page.
     */

    if (totalPages <= 1) {
        return;
    }


    /* Previous button */

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

            if (currentPage > 1) {

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


    /* Next button */

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

    const postsContainer =
        document.getElementById(
            "blog-posts"
        );


    if (!postsContainer) {
        return;
    }


    postsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

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


    const categoryFilter =
        document.getElementById(
            "blog-category-filter"
        );


    const typeFilter =
        document.getElementById(
            "blog-type-filter"
        );


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const selectedType =
        typeFilter
            ? typeFilter.value
            : "all";


    /* Filter posts */

    const filteredPosts =
        allPosts.filter(
            post => {

                const categoryMatch =
                    selectedCategory === "all" ||
                    post.category === selectedCategory;


                const typeMatch =
                    selectedType === "all" ||
                    post.type === selectedType;


                return (
                    categoryMatch &&
                    typeMatch
                );

            }
        );


    /* Sort newest first */

    filteredPosts.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    /* Calculate pages */

    const totalPosts =
        filteredPosts.length;


    const totalPages =
        Math.ceil(
            totalPosts /
            POSTS_PER_PAGE
        );


    /*
     * Make sure the current page
     * remains valid after filtering.
     */

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


    /* Clear existing posts */

    container.innerHTML = "";


    /* Empty state */

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


    /* Determine visible posts */

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


    /* Render cards */

    visiblePosts.forEach(
        post => {

            const card =
                createPostCard(post);


            container.appendChild(
                card
            );


            /*
             * Reading time is only
             * calculated for internal
             * articles.
             */

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


    /* Render pagination */

    renderPagination(
        totalPosts,
        totalPages
    );

}


/* ================= INITIALISE ================= */

function initialiseBlog() {

    allPosts =
        getBlogPosts();


    populateCategories(
        allPosts
    );


    const categoryFilter =
        document.getElementById(
            "blog-category-filter"
        );


    const typeFilter =
        document.getElementById(
            "blog-type-filter"
        );


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            () => {

                currentPage = 1;

                renderPosts();

            }
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            () => {

                currentPage = 1;

                renderPosts();

            }
        );

    }


    renderPosts();

}


/* ================= EXPORT ================= */

export {
    initialiseBlog
};
