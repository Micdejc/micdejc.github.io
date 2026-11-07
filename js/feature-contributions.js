"use strict";


/* =========================================
   FEATURE CONTRIBUTIONS DATA
   ========================================= */

const featureContributionsURL = new URL(
    "./feature-contributions.txt",
    import.meta.url
);

const featureContributions = await fetch(
    featureContributionsURL
).then(async response => {

    if (!response.ok) {
        throw new Error(
            `Unable to load feature contributions: HTTP ${response.status} (${response.url})`
        );
    }

    return response.json();

});


/* =========================================
   EXPORT
   ========================================= */

export {
    featureContributions
};
