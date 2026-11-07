"use strict";


/**
 * Parse comma-separated values.
 */
function parseList(value) {

    if (!value) {
        return [];
    }

    return value
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

}


/**
 * Clean a metadata string.
 */
function clean(value) {

    return value
        ? value.trim()
        : "";

}


/**
 * Extract all blog posts from the source container.
 */
/*

function getBlogPosts() {

    const source =
        document.getElementById("blog-source");


    if (!source) {

        console.warn(
            "Blog source container was not found."
        );

        return [];

    }


    const entries =
        Array.from(
            source.querySelectorAll(
                ".blog-entry"
            )
        );


    const posts = [];


    entries.forEach(
        (entry, index) => {

            const title =
                clean(entry.dataset.title);

            const date =
                clean(entry.dataset.date);

            const category =
                clean(entry.dataset.category);

            const type =
                clean(entry.dataset.type)
                    .toLowerCase();

            const url =
                clean(entry.dataset.url);

            const slug =
                clean(entry.dataset.slug);

            const description =
                clean(
                    entry.dataset.description
                );

            const tags =
                parseList(
                    entry.dataset.tags
                );


            if (
                !title ||
                !date ||
                !category ||
                !type ||
                !url ||
                (type === "internal" && !slug)
            ) {

                console.warn(
                    `Blog post ${index + 1} was skipped because required metadata is missing.`,
                    entry
                );

                return;

            }


            if (
                type !== "internal" &&
                type !== "external"
            ) {

                console.warn(
                    `Blog post "${title}" was skipped because its type must be "internal" or "external".`
                );

                return;

            }


            const parsedDate =
                new Date(date);


            if (
                Number.isNaN(
                    parsedDate.getTime()
                )
            ) {

                console.warn(
                    `Blog post "${title}" was skipped because its date is invalid.`
                );

                return;

            }


            posts.push({

                title,
                slug,
                date,
                category,
                type,
                url,
                description,
                tags

            });

        }
    );


    return posts;

}
*/


/**
 * Extract all blog posts from blog-data.txt.
 */
async function getBlogPosts() {

    try {

        const response = await fetch(
            "./blog-data.txt"
        );

        if (!response.ok) {

            throw new Error(
                `Failed to fetch blog data: ${response.status}`
            );

        }

        const data = await response.json();

        // Only active posts are rendered.
        // Templates remain stored in the TXT file.
        const entries = Array.isArray(data.posts)
            ? data.posts
            : [];

        const posts = [];

        entries.forEach((entry, index) => {

            const title =
                clean(entry.title);

            const date =
                clean(entry.date);

            const category =
                clean(entry.category);

            const type =
                clean(entry.type).toLowerCase();

            const url =
                clean(entry.url);

            const slug =
                clean(entry.slug);

            const description =
                clean(entry.description);

            const tags =
                Array.isArray(entry.tags)
                    ? entry.tags.map(clean).filter(Boolean)
                    : parseList(entry.tags);


            if (
                !title ||
                !date ||
                !category ||
                !type ||
                !url ||
                (type === "internal" && !slug)
            ) {

                console.warn(
                    `Blog post ${index + 1} was skipped because required metadata is missing.`,
                    entry
                );

                return;

            }


            if (
                type !== "internal" &&
                type !== "external"
            ) {

                console.warn(
                    `Blog post "${title}" was skipped because its type must be "internal" or "external".`
                );

                return;

            }


            const parsedDate =
                new Date(date);

            if (
                Number.isNaN(
                    parsedDate.getTime()
                )
            ) {

                console.warn(
                    `Blog post "${title}" was skipped because its date is invalid.`
                );

                return;

            }


            posts.push({

                title,
                slug,
                date,
                category,
                type,
                url,
                description,
                tags

            });

        });


        return posts;

    } catch (error) {

        console.error(
            "Unable to load blog posts:",
            error
        );

        return [];

    }

}

/*
 * Export for blog.js
 */
export {
    getBlogPosts
};
