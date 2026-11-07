"use strict";


/* =========================================
   FEATURE CONTRIBUTIONS DATA
   ========================================= */

const featureContributions = await fetch(
    "./feature-contributions.txt"
).then(response => {
    if (!response.ok) {
        throw new Error("Unable to load feature contributions.");
    }

    return response.json();
});


/* =========================================
   EXPORT
   ========================================= */

export {
    featureContributions
};
