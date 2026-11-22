
/* ========================================
   CYBERQUIZZY – DAILY CYBER TIPS
======================================== */

(() => {

    'use strict';

    const tips = [
        {
            title: "Start with the fundamentals.",
            description: "Build a solid foundation before progressing to more advanced topics."
        },
        {
            title: "Complete your missions.",
            description: "Work through questions at each rank and accumulate XP towards your next milestone."
        },
        {
            title: "Don't rush through questions.",
            description: "Take time to understand each scenario and consider why an answer is correct."
        },
        {
            title: "Use your hints wisely.",
            description: "Save your hint credits for questions where you genuinely need a little guidance."
        },
        {
            title: "Keep your streak alive.",
            description: "Challenge yourself to maintain consecutive correct answers and earn additional hints."
        },
        {
            title: "Take the Daily Challenge.",
            description: "Return every day for ten additional questions and an opportunity to earn more XP."
        },
        {
            title: "Read the explanations.",
            description: "Even when you get an answer right, the explanation can reinforce your understanding."
        },
        {
            title: "Learn from mistakes.",
            description: "Every incorrect answer is an opportunity to identify a knowledge gap and improve."
        }
    ];

    function displayDailyTip() {

        console.log('[CyberQuizzy] Initialising Daily Cyber Tip...');

        const tipTitle = document.getElementById('cq-tip-text');
        const tipDescription = document.getElementById('cq-tip-description');

        if (!tipTitle || !tipDescription) {
            console.error('[CyberQuizzy] Daily Tip elements not found.', {
                tipTitleFound: !!tipTitle,
                tipDescriptionFound: !!tipDescription
            });
            return;
        }

        const randomIndex = Math.floor(Math.random() * tips.length);
        const tip = tips[randomIndex];

        tipTitle.textContent = tip.title;
        tipDescription.textContent = tip.description;

        console.log('[CyberQuizzy] Daily Tip displayed:', tip.title);
    }

    // Expose the function to the main CyberQuizzy script.
    window.displayDailyTip = displayDailyTip;

})();
