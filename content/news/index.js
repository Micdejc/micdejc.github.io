const newsFiles = [
    "13th-isncc-conference-2026.html",
    "refusalguard-m.html",
    "ieee-csr-2026.html",
    "uwe-engineering-showcase.html",
    "ukci-2025.html",
    "4th-cardiff-nlp-workshop.html"
];

const NEWS_PER_PAGE = 5;

let allNews = [];
let activeCategory = "all";
let searchQuery = "";
let currentPage = 1;

const CATEGORY_LABELS = {
    research: "Research",
    publication: "Publications",
    conference: "Conferences",
    recognition: "Recognition",
    award: "Awards",
    speaking: "Speaking",
    teaching: "Teaching",
    professional: "Professional activities"
};


/* ================= LOAD NEWS ================= */

export async function loadNews() {
    const featured = document.getElementById("news-featured");
    const container = document.getElementById("news-list");

    if (!featured || !container) {
        return;
    }

    featured.replaceChildren();
    container.replaceChildren();

    const results = await Promise.allSettled(
        newsFiles.map(async (file, index) => {
            const response = await fetch(`content/news/${file}`);

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}: ${file}`
                );
            }

            const html = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(
                html,
                "text/html"
            );

            const card = doc.querySelector(".news-card");

            if (!card) {
                throw new Error(
                    `No .news-card found in ${file}`
                );
            }

            // Keep each article's own markup and links.
            card.dataset.sourceFile = file;

            return {
                card,
                index,
                date: card.dataset.date || "",
                category: normalizeCategory(
                    card.dataset.category || "other"
                )
            };
        })
    );

    allNews = [];

    results.forEach((result) => {
        if (result.status === "fulfilled") {
            allNews.push(result.value);
        } else {
            console.error(
                "Could not load a news item:",
                result.reason
            );
        }
    });

    // Newest first. Array order breaks ties for equal dates.
    allNews.sort((a, b) => {
        const dateDifference =
            (Date.parse(b.date) || 0) -
            (Date.parse(a.date) || 0);

        return dateDifference || a.index - b.index;
    });

    createCategoryFilters();
    initialiseNewsControls();
    renderNews();
}


/* ================= CATEGORIES ================= */

function normalizeCategory(category) {
    return category
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function getCategoryLabel(category) {
    return CATEGORY_LABELS[category] ||
        category
            .split("-")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");
}

function createCategoryFilters() {
    const filters = document.getElementById("news-filters");

    if (!filters) {
        return;
    }

    filters.replaceChildren();

    const categories = [
        ...new Set(allNews.map(item => item.category))
    ].sort();

    const availableCategories = [
        ["all", "All news"],
        ...categories.map(category => [
            category,
            getCategoryLabel(category)
        ])
    ];

    availableCategories.forEach(([value, label]) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "news-filter-btn";
        button.textContent = label;
        button.dataset.category = value;
        button.setAttribute(
            "aria-pressed",
            String(value === activeCategory)
        );

        button.addEventListener("click", () => {
            activeCategory = value;
            currentPage = 1;

            updateFilterButtons();
            renderNews();
        });

        filters.appendChild(button);
    });

    // Reset to All news if a previously selected category
    // no longer exists.
    if (
        activeCategory !== "all" &&
        !categories.includes(activeCategory)
    ) {
        activeCategory = "all";
    }

    updateFilterButtons();
}

function updateFilterButtons() {
    document
        .querySelectorAll("#news-filters .news-filter-btn")
        .forEach(button => {
            button.setAttribute(
                "aria-pressed",
                String(
                    button.dataset.category === activeCategory
                )
            );
        });
}


/* ================= CONTROLS ================= */

function initialiseNewsControls() {
    const search = document.getElementById("newsSearch");
    const previous = document.getElementById("newsPrevious");
    const next = document.getElementById("newsNext");

    // Prevent duplicate listeners if loadNews() is called again.
    if (search && search.dataset.initialised !== "true") {
        search.dataset.initialised = "true";

        search.addEventListener("input", () => {
            searchQuery = search.value
                .trim()
                .toLowerCase();

            currentPage = 1;
            renderNews();
        });
    }

    if (previous && previous.dataset.initialised !== "true") {
        previous.dataset.initialised = "true";

        previous.addEventListener("click", () => {
            currentPage--;
            renderNews();
        });
    }

    if (next && next.dataset.initialised !== "true") {
        next.dataset.initialised = "true";

        next.addEventListener("click", () => {
            currentPage++;
            renderNews();
        });
    }
}


/* ================= FILTERING ================= */

function getFilteredNews() {
    return allNews.filter(item => {
        const matchesCategory =
            activeCategory === "all" ||
            item.category === activeCategory;

        const searchableText = [
            item.card.textContent,
            item.category
        ].join(" ").toLowerCase();

        const matchesSearch =
            !searchQuery ||
            searchableText.includes(searchQuery);

        return matchesCategory && matchesSearch;
    });
}


/* ================= RENDERING ================= */

function renderNews() {
    const featured = document.getElementById("news-featured");
    const container = document.getElementById("news-list");
    const empty = document.getElementById("news-empty");
    const count = document.getElementById("news-results-count");
    const pagination = document.getElementById("news-pagination");
    const previous = document.getElementById("newsPrevious");
    const next = document.getElementById("newsNext");
    const pageStatus = document.getElementById("newsPageStatus");

    if (
        !featured ||
        !container ||
        !empty ||
        !count ||
        !pagination ||
        !previous ||
        !next ||
        !pageStatus
    ) {
        return;
    }

    const filteredNews = getFilteredNews();

    // The first matching story is featured.
    // It is removed from the archive to prevent duplication.
    const featuredItem = filteredNews[0] || null;
    const archiveItems = filteredNews.slice(1);

    const totalPages = Math.max(
        1,
        Math.ceil(archiveItems.length / NEWS_PER_PAGE)
    );

    currentPage = Math.min(
        Math.max(currentPage, 1),
        totalPages
    );

    const start = (currentPage - 1) * NEWS_PER_PAGE;
    const pageItems = archiveItems.slice(
        start,
        start + NEWS_PER_PAGE
    );

    featured.replaceChildren();
    container.replaceChildren();

    if (featuredItem) {
        const card = featuredItem.card.cloneNode(true);
        card.classList.add("news-featured-card");
        featured.appendChild(card);
    }

    pageItems.forEach(item => {
        container.appendChild(
            item.card.cloneNode(true)
        );
    });

    const total = filteredNews.length;

    empty.hidden = total !== 0;
    count.hidden = total === 0;
    pagination.hidden = archiveItems.length <= NEWS_PER_PAGE;

    if (total > 0) {
        count.textContent =
            `Showing ${total} news item${total === 1 ? "" : "s"}`;
    } else {
        count.textContent = "";
    }

    previous.disabled = currentPage <= 1;
    next.disabled = currentPage >= totalPages;

    pageStatus.textContent =
        `Page ${currentPage} of ${totalPages}`;
}
