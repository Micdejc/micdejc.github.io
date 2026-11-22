
/* ========================================
   CYBERQUIZZY – DAILY CYBER TIPS
======================================== */

'use strict';

const DAILY_TIPS = [
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


/* ========================================
   DISPLAY DAILY TIP
======================================== */

export function displayDailyTip() {

    //console.log('[CyberQuizzy] Initialising Daily Cyber Tip...');

    const tipTitle = document.getElementById('cq-tip-text');
    const tipDescription = document.getElementById('cq-tip-description');

    // Validate HTML elements.
    if (!tipTitle || !tipDescription) {
       /*
        console.error(
            '[CyberQuizzy] Daily Tip initialisation failed.',
            {
                tipTitleFound: !!tipTitle,
                tipDescriptionFound: !!tipDescription,
                documentReadyState: document.readyState
            }
        );
      */
        return;
    }

    // Select one random tip.
    const randomIndex = Math.floor(Math.random() * DAILY_TIPS.length);
    const tip = DAILY_TIPS[randomIndex];

    // Display the selected tip.
    tipTitle.textContent = tip.title;
    tipDescription.textContent = tip.description;
    /*
    console.log(
        `[CyberQuizzy] Daily Tip ${randomIndex + 1}/${DAILY_TIPS.length} displayed:`,
        tip.title
    );*/
}
