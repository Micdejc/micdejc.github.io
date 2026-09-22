(function () {

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
    function getBlogPosts() {

        const source = document.getElementById("blog-source");

        if (!source) {

            console.warn(
                "Blog source container was not found."
            );

            return [];

        }


        const entries = Array.from(
            source.querySelectorAll(".blog-entry")
        );


        const posts = [];


        entries.forEach((entry, index) => {

            const title = clean(
                entry.dataset.title
            );

            const date = clean(
                entry.dataset.date
            );

            const category = clean(
                entry.dataset.category
            );

            const type = clean(
                entry.dataset.type
            ).toLowerCase();

            const url = clean(
                entry.dataset.url
            );

            const description = clean(
                entry.dataset.description
            );

            const tags = parseList(
                entry.dataset.tags
            );


            /*
             * Validate required metadata.
             */

            if (
                !title ||
                !date ||
                !category ||
                !type ||
                !url
            ) {

                console.warn(
                    `Blog post ${index + 1} was skipped because required metadata is missing.`,
                    entry
                );

                return;

            }


            /*
             * Validate post type.
             */

            if (
                type !== "internal" &&
                type !== "external"
            ) {

                console.warn(
                    `Blog post "${title}" was skipped because its type must be "internal" or "external".`
                );

                return;

            }


            /*
             * Validate date.
             */

            const parsedDate = new Date(date);

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

                date,

                category,

                type,

                url,

                description,

                tags

            });

        });


        return posts;

    }


    /*
     * Expose the function globally so blog.js can use it.
     */

    window.getBlogPosts = getBlogPosts;


})();
