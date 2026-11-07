"use strict";


/* =========================================
   FEATURE CONTRIBUTIONS DATA
   ========================================= */

const featureContributions = await fetch(
    new URL("./feature-contributions.txt", import.meta.url)
).then(async response => {

    if (!response.ok) {
        throw new Error(
            `Unable to load feature contributions: HTTP ${response.status}`
        );
    }

    const data = await response.json();

    // Exclude internal template properties
    const {
        _template,
        ...features
    } = data;

    return features;

});


/* =========================================
   EXPORT
   ========================================= */

export {
    featureContributions
};
