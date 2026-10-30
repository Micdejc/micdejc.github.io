
export function initCyberQuiz() {
    'use strict';

    /* =====================================================
       1. CONFIGURATION
       ===================================================== */

    const root = document.getElementById('cyberquiz-root');

    if (!root) {
        console.warn('CyberQuiz root was not found.');
        return;
    }

    if (root.dataset.initialised === 'true') {
        return;
    }

    root.dataset.initialised = 'true';

    // Find elements belonging to CyberQuiz only.
    const $ = id => root.querySelector(`#${id}`);

    
    // For each rank, we have the most common job titles that the data bank support.
    const RANKS = [
    {
        name: 'Associate',
        min: 0,
        max: 400,
        sub: 'Security fundamentals',
        roles: [
            'IT support technician',
            'Junior security analyst',
            'Junior GRC analyst',
            'Information security compliance assistant'
        ],
        careers:
            'Build safe digital habits and understand core security controls, basic risk concepts and compliance requirements.',
        color: '#38c8ff',
        icon: '⬡'
    },
    {
        name: 'Professional',
        min: 400,
        max: 1200,
        sub: 'Operational security',
        roles: [
            'SOC analyst (Tier 1)',
            'Junior incident responder',
            'Vulnerability analyst',
            'GRC analyst',
            'IT risk analyst'
        ],
        careers:
            'Triage alerts, follow playbooks, assess operational risks and support security compliance activities.',
        color: '#43e5a4',
        icon: '◆'
    },
    {
        name: 'Practitioner',
        min: 1200,
        max: 2900,
        sub: 'Hands-on investigation',
        roles: [
            'SOC analyst (Tier 2)',
            'Penetration tester',
            'Cloud security analyst',
            'Application security engineer',
            'Cyber risk analyst'
        ],
        careers:
            'Investigate incidents and malware, validate weaknesses, assess cyber risks and secure cloud, application and AI systems.',
        color: '#8b9cff',
        icon: '✦'
    },
    {
        name: 'Architect',
        min: 2900,
        max: 6200,
        sub: 'Designing secure systems',
        roles: [
            'Security architect (developing)',
            'Security engineer',
            'Cloud security engineer',
            'DevSecOps engineer',
            'GRC consultant'
        ],
        careers:
            'Connect security architecture and technical controls with organisational risk, governance and regulatory requirements.',
        color: '#ffbf57',
        icon: '⬟'
    },
    {
        name: 'Expert',
        min: 6200,
        max: Infinity,
        sub: 'Strategic security judgement',
        roles: [
            'Security architect',
            'Incident response lead',
            'Security team lead',
            'GRC manager',
            'Chief Information Security Officer (CISO)'
        ],
        careers:
            'Lead security strategy, oversee governance and compliance programmes, manage enterprise risk and guide strategic security decisions.',
        color: '#ff7da9',
        icon: '★'
    }
        
    ];


    /*
     * =====================================================
     * CAREER PROGRESSION AND REWARD CONFIGURATION
     * =====================================================
     *
     * Centralised settings for XP rewards, streak bonuses,
     * mission accuracy thresholds and completion bonuses.
     *
     * Adjust these values to balance difficulty and reward
     * progression without changing the core game logic.
     */
    const PROGRESSION = {
        // Base XP awarded for each correct answer by rank.
        // Index 0 = Associate, 1 = Professional,
        // 2 = Practitioner, 3 = Architect, 4 = Expert.
        correctXP: [20, 25, 30, 35, 40],
    
        // Extra XP awarded for a correct answer when the
        // current correct-answer streak reaches this length.
        streakBonus: 5,
        streakLength: 3,
    
        // Minimum accuracy required for each mission outcome.
        perfectAccuracy: 100,       // Perfect mission score.
        strongMissionAccuracy: 80,  // Strong score and bonus.
        completionAccuracy: 60,     // "Mission complete!" title.
    
        // One-off XP bonuses for reward-eligible missions.
        perfectMissionBonus: 50,    // Awarded at perfect accuracy.
        strongMissionBonus: 25      // Awarded at strong accuracy.
    };

    const STORE = 'cyberQuiz';

/* =====================================================
       2. PLAYER STATE AND PROGRESS STORAGE
   ===================================================== */

    function freshState() {
        return {
            xp: 0,
            credits: 3,
            answered: 0,
            correct: 0,
            streak: 0,
            bestStreak: 0,

            // Track ranks the player has started.
            startedRanks: [],

            // Track question history independently per rank.
            seenByRank: {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
            },

            // Separate history for Daily Challenge.
            seenDaily: [],

            completedMissions: 0,
            theme: 'dark',
            dailyDone: ''
        };
    }

    function loadState() {
        try {
            const saved = JSON.parse(
                localStorage.getItem(STORE) || '{}'
            );

            const defaults = freshState();

            // Preserve existing player progress and migrate
            // legacy question history where possible.
            const loaded = {
                ...defaults,
                ...saved
            };

            // Restore ranks the player has started.
            loaded.startedRanks = Array.isArray(saved.startedRanks)
                ? [...new Set(
                    saved.startedRanks.filter(
                        rank =>
                            Number.isInteger(rank) &&
                            rank >= 0 &&
                            rank < RANKS.length
                    )
                )]
                : [];

            const savedRankHistory =
                saved.seenByRank &&
                typeof saved.seenByRank === 'object'
                    ? saved.seenByRank
                    : {};

            loaded.seenByRank = {};

            for (let rank = 0; rank <= 4; rank++) {
                loaded.seenByRank[rank] = Array.isArray(
                    savedRankHistory[rank]
                )
                    ? savedRankHistory[rank]
                    : [];
            }

            loaded.seenDaily = Array.isArray(saved.seenDaily)
                ? saved.seenDaily
                : [];

            // Legacy state used one shared `seen` array.
            // Do not assign it to every rank, as that would
            // incorrectly mark questions as seen at all ranks.
            delete loaded.seen;

            return loaded;
        } catch {
            return freshState();
        }
    }

    function saveState() {
        try {
            localStorage.setItem(
                STORE,
                JSON.stringify(state)
            );
        } catch {
            // The game can continue if local storage is unavailable.
        }
    }

    let state = loadState();

    // Update the main journey button based on saved progress.
    function updateStartButton() {
        const hasStarted = state.startedRanks?.includes(rankIndex()) ?? false;
    
        $('start').textContent = hasStarted
            ? '▶ Continue level'
            : '🚀 Start level';
    }

    let mission = [];
    let index = 0;
    let selected = null;
    let hintUsed = false;
    let eliminated = false;

    let sessionCorrect = 0;
    let sessionXP = 0;
    let answeredThis = 0;

    let mode = 'rank';
    let toastTimer;
    let missionRank = rankIndex();
    let missionRewardEligible = false;

    /* =====================================================
       3. RANK MANAGEMENT
       ===================================================== */

    function rankIndex(xp = state.xp) {
        let current = 0;

        RANKS.forEach((rank, i) => {
            if (xp >= rank.min) {
                current = i;
            }
        });

        return current;
    }

    function rank() {
        return RANKS[rankIndex()];
    }

    /* =====================================================
       4. NOTIFICATIONS
       ===================================================== */

    function toast(message) {
        const element = $('toast');

        if (!element) return;

        element.textContent = message;
        element.classList.add('show');

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            element.classList.remove('show');
        }, 2500);
    }

    /* =====================================================
       5. UPDATE PLAYER INTERFACE
       ===================================================== */

    function updateUI() {
        const currentRank = rank();
        const currentIndex = rankIndex();
        const nextRank = RANKS[currentIndex + 1];

        $('xp').textContent = state.xp;
        $('credits').textContent = state.credits;
        $('streak').textContent = state.streak;

        $('hero-xp').textContent = state.xp;
        $('hero-done').textContent = state.answered;
        $('hero-correct').textContent = state.correct;
        $('hero-streak').textContent = state.bestStreak;

        $('rank-name').textContent = currentRank.name;

        // The rank symbol is included in index.html.
        $('rank-symbol').textContent = currentRank.icon;

        $('rank-sub').textContent =
            `Level ${currentIndex + 1} · ${currentRank.sub}`;

        $('rank-xp').textContent = `${state.xp} XP`;

        $('rank-next').textContent = nextRank
            ? `${Math.max(0, nextRank.min - state.xp)} XP to next rank`
            : 'Top rank unlocked';

        const progress = nextRank
            ? Math.min(
                100,
                ((state.xp - currentRank.min) /
                    (nextRank.min - currentRank.min)) * 100
            )
            : 100;

        $('rank-fill').style.width = `${progress}%`;

        renderLevels();
        renderBadges();
        updateStartButton();
    }

    /* =====================================================
       6. CAREER PROGRESSION CARDS
       ===================================================== */
    
    function renderLevels() {
        const host = $('levels');
    
        host.className = 'career-levels';
    
        host.innerHTML = RANKS.map((r, i) => {
            const unlocked = state.xp >= r.min;
            const current = rankIndex() === i;
    
            const hasStarted =
                state.startedRanks?.includes(i) ?? false;
    
            const progress = unlocked
                ? (i === 4 ? 'MASTERED' : `${state.xp} XP`)
                : `${r.min} XP required`;
            /*
            const buttonText = !unlocked
                ? '🔒 Keep progressing'
                : !current
                    ? 'Practise this level'
                    : hasStarted
                        ? 'Continue this level'
                        : 'Start current level';
            */
            //Eensures that Expert always displays Practise this level.
            const buttonText = !unlocked
                ? '🔒 Keep progressing'
                : i === 4
                    ? 'Practise this level'
                    : !current
                        ? 'Practise this level'
                        : hasStarted
                            ? 'Continue this level'
                            : 'Start current level';
            
            return `
                <article class="level-card
                    ${unlocked ? 'unlocked' : 'locked'}
                    ${current ? 'current' : ''}">

                    <span class="level-num">
                        RANK 0${i + 1}
                        ${i < rankIndex()
                            ? '· PASSED'
                            : current
                                ? '· CURRENT'
                                : ''}
                    </span>
    
                    <div
                        class="emblem"
                        style="background:linear-gradient(
                            145deg, ${r.color}, #173451
                        )">
                        ${r.icon}
                    </div>
    
                    <h3>${r.name}</h3>
    
                    <div class="threshold">
                        ${progress}
                    </div>
                    <!-- 
                    <div class="career-label">
                        Career directions
                    </div>
    
                    <ul class="career-list">
                        ${r.roles.map(role => `
                            <li>${role}</li>
                        `).join('')}
                    </ul>
                    -->
                    <button
                        data-rank="${i}"
                        ${unlocked ? '' : 'disabled'}>
    
                        ${buttonText}
                    </button>
    
                </article>
            `;
        }).join('');
    
        host.querySelectorAll('button[data-rank]')
            .forEach(button => {
                button.addEventListener('click', () => {
                    startMission(
                        Number(button.dataset.rank)
                    );
                });
            });
    }


    /* =====================================================
       7. EXPERTISE BADGES
       ===================================================== */

    function renderBadges() {
        const host = $('badges-list');

        host.innerHTML = RANKS.map((r) => {
            const earned = state.xp >= r.min;

            return `
                <div class="badge ${earned ? 'earned' : ''}">

                    <div
                        class="badge-icon"
                        style="color:${r.color}">
                        ${r.icon}
                    </div>

                    <b>${r.name}</b>

                    <small>
                        ${earned ? 'EARNED' : `${r.min} XP`}
                    </small>

                </div>
            `;
        }).join('');
    }

    /* =====================================================
       8. QUESTION SELECTION
       ===================================================== */

    function shuffle(items) {
        const result = [...items];

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [result[i], result[j]] =
                [result[j], result[i]];
        }

        return result;
    }


    function pickQuestions(rankNumber, daily = false) {
        const allQuestions = window.CYBERQUIZ_QUESTIONS || [];

        const pool = allQuestions.filter(question =>
            daily
                ? question.rank <= rankNumber
                : question.rank === rankNumber
        );

        if (!pool.length) {
            return [];
        }

        const count = daily
            ? 5
            : Math.min(5, Math.max(3, 3 + rankNumber));

        const seen = daily
            ? state.seenDaily
            : state.seenByRank[rankNumber];

        // Prioritise questions not previously selected
        // for this rank or the Daily Challenge.
        const unseen = pool.filter(question =>
            !seen.includes(question.id)
        );

        const selected = shuffle(unseen).slice(0, count);

        // Repeat questions only if there are not enough unseen ones.
        if (selected.length < count) {
            const selectedIds = selected.map(question => question.id);

            const remaining = shuffle(
                pool.filter(question =>
                    !selectedIds.includes(question.id)
                )
            );

            selected.push(
                ...remaining.slice(0, count - selected.length)
            );
        }

        return selected;
    }


    /* =====================================================
       9. START A MISSION
       ===================================================== */

    function startMission(
        rankNumber = rankIndex(),
        daily = false
    ) {
        // Prevent access to locked ranks.
        if (rankNumber > rankIndex()) {
            toast('Unlock this rank by earning more XP.');
            return;
        }

        // Record that the player has started this career rank.
        // Daily Challenges do not count as career-level starts.
        if (!daily) {
            if (!state.startedRanks.includes(rankNumber)) {
                state.startedRanks.push(rankNumber);
                saveState();
            }
        }

        // Reset the feedback panel when a new mission starts.
        const feedback = $('feedback');
        
        missionRank = rankNumber;

        // Only a mission at the player's current rank can
        // generate progression rewards.
        missionRewardEligible = rankNumber === rankIndex();
        
        mode = daily ? 'daily' : 'rank';

        mission = pickQuestions(rankNumber, daily);

        if (!mission.length) {
            toast('No questions are available yet.');
            return;
        }

        // Record selected questions in the relevant history.
        const seen = daily
            ? state.seenDaily
            : state.seenByRank[rankNumber];

        mission.forEach(question => {
            if (!seen.includes(question.id)) {
                seen.push(question.id);
            }
        });

        if (!state.startedRanks) {
            state.startedRanks = [];
        }
        
        if (!state.startedRanks.includes(rankNumber)) {
            state.startedRanks.push(rankNumber);
        }

        saveState();

        index = 0;
        selected = null;
        hintUsed = false;
        eliminated = false;

        sessionCorrect = 0;
        sessionXP = 0;
        answeredThis = 0;

        $('quiz').classList.remove('hidden');
        $('question-view').classList.remove('hidden');
        $('result').classList.add('hidden');

        $('mission-title').textContent =
            `${daily
                ? 'DAILY CHALLENGE'
                : RANKS[rankNumber].name.toUpperCase()
            } · MISSION`;

        renderQuestion();

        $('quiz').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    /* =====================================================
       10. DISPLAY THE CURRENT QUESTION
       ===================================================== */

    function renderQuestion() {
        const question = mission[index];

        selected = null;
        hintUsed = false;
        eliminated = false;

        $('counter').textContent =
            `${index + 1} / ${mission.length}`;

        $('quiz-fill').style.width =
            `${(index / mission.length) * 100}%`;

        $('topic').textContent = question.topic;
        $('difficulty').textContent = question.difficulty;
        $('question').textContent = question.q;

        /*
         * EXHIBIT SCENARIOS INCLUDING PHISHING EMAILS
         *
         * Questions may include an "exhibit" property.
         * Display the sample output including email when it exists.
         * Otherwise, hide the scenario container.
         */

        const emailBox = $('email-scenario');

        if (emailBox) {
            if (question.exhibit) {
                emailBox.textContent = question.exhibit;
                emailBox.classList.remove('hidden');
            } else {
                emailBox.textContent = '';
                emailBox.classList.add('hidden');
            }
        }

        // Generate the answer options.
        $('answers').innerHTML = question.options
            .map((option, i) => `
                <button
                    class="answer"
                    data-option="${i}">

                    <span class="letter">
                        ${String.fromCharCode(65 + i)}
                    </span>

                    <span>${option}</span>

                </button>
            `)
            .join('');

        $('answers')
            .querySelectorAll('button')
            .forEach(button => {
                button.addEventListener('click', () => {
                    choose(Number(button.dataset.option));
                });
            });
        
        // Display the default informational message.
        $('feedback').textContent =
            'Choose carefully. You can do this.';

        // Remove any previous correct or incorrect answer styling.
        $('feedback').classList.remove('is-correct', 'is-wrong');
        
        // Apply the neutral informational style for the new mission.
        $('feedback').classList.add('is-tip');

        $('next').disabled = true;

        $('next').innerHTML =
            index === mission.length - 1
                ? `Finish mission
                   <svg xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m9 12 2 2 4-4"/>
                   </svg>`
                : 'Next <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>';

        $('hint-button').disabled = state.credits < 1;

        $('hint-button').textContent =
            'Use hint · 1 credit';

        $('hint-message').textContent =
            state.credits > 0
                ? 'Spend 1 credit to reveal a clue or remove two incorrect options.'
                : 'No hint credits left. Earn more by completing missions.';
    }

    /* =====================================================
       11. PROCESS THE PLAYER'S ANSWER
       ===================================================== */

    function choose(optionNumber) {
        if (selected !== null) return;

        const question = mission[index];

        selected = optionNumber;

        $('next').disabled = false;

        const answerButtons = $('answers')
            .querySelectorAll('button');

        answerButtons.forEach(button => {
            button.disabled = true;

            const optionIndex =
                Number(button.dataset.option);

            if (optionIndex === question.correct) {
                button.classList.add('correct');
            }

            if (
                optionIndex === optionNumber &&
                optionIndex !== question.correct
            ) {
                button.classList.add('wrong');
            }
        });


        const correct = optionNumber === question.correct;

        // Animate the selected answer according to its result.
        const selectedButton = $('answers').querySelector(
            `[data-option="${optionNumber}"]`
        );
        
        if (selectedButton) {
            selectedButton.classList.add(
                correct ? 'answer-correct' : 'answer-wrong'
            );
        }

        const feedback = $('feedback');
        // Remove any previous result styles before applying the new one.
        // Remove previous feedback styles before applying the new state.
        feedback.classList.remove(
            'is-correct',
            'is-wrong',
            'is-tip'
        );
        // Apply the appropriate style: correct, incorrect, or informational tip.
        feedback.classList.add(
            correct === true
                ? 'is-correct'
                : correct === false
                    ? 'is-wrong'
                    : 'is-tip'
        );
        
        // Eligibility is locked at mission start.
        // Only questions belonging to that starting rank
        // can generate answer rewards.
        const eligibleForRewards =
            missionRewardEligible &&
            question.rank === missionRank;
        
        if (correct) {
            sessionCorrect++;
            state.correct++;
        
            if (eligibleForRewards) {
                state.streak++;
        
                state.bestStreak = Math.max(
                    state.bestStreak,
                    state.streak
                );
        
                const earned =
                    PROGRESSION.correctXP[missionRank] +
                    (
                        state.streak >= PROGRESSION.streakLength
                            ? PROGRESSION.streakBonus
                            : 0
                    );
        
                state.xp += earned;
                sessionXP += earned;
        
                $('feedback').textContent =
                    `Correct! +${earned} XP · ${question.why}`;
            } else {
                $('feedback').textContent =
                    `Correct! Practice only · No XP or streak rewards. ${question.why}`;
            }
        } else {
            if (eligibleForRewards) {
                state.streak = 0;
            }
        
            $('feedback').textContent =
                `Not quite. ${question.why}`;
        }


        state.answered++;
        answeredThis++;

        // Track the answered question in the appropriate history.
        const seen = mode === 'daily'
            ? state.seenDaily
            : state.seenByRank[question.rank];

        if (!seen.includes(question.id)) {
            seen.push(question.id);
        }

        // Award one hint credit for every third consecutive correct answer.
        if (
            correct &&
            eligibleForRewards &&
            state.streak > 0 &&
            state.streak % PROGRESSION.streakLength === 0
        ) {
            state.credits = Math.min(9, state.credits + 1);
        }

        saveState();
        updateUI();
        
        /*
        if (rankIndex() > question.rank) {
            //toast(`Rank unlocked: ${rank().name}!`);
            toast(`Rank unlocked: ${rank().icon} ${rank().name}!`);
            confettiPop()
        } */
        
    }

    /* =====================================================
       12. HINT SYSTEM
       ===================================================== */


    function useHint() {
        if (selected !== null || hintUsed) return;
    
        if (state.credits < 1) {
            toast('You need a hint credit.');
            return;
        }
    
        const question = mission[index];
        const answerButtons = [
            ...$('answers').querySelectorAll('button')
        ];
    
        const wrongAnswers = answerButtons
            .map((button, i) => ({ button, index: i }))
            .filter(item => item.index !== question.correct);
    
        if (wrongAnswers.length === 0) {
            toast('No options available to eliminate.');
            return;
        }
    
        shuffle(wrongAnswers)
            .slice(0, 2)
            .forEach(({ button }) => {
                button.classList.add('eliminated');
                button.disabled = true;
            });
    
        state.credits--;
        hintUsed = true;
        eliminated = true;
    
        $('hint-button').disabled = true;
        $('hint-button').textContent = 'Hint used';
    
        $('hint-message').textContent =
            `${question.hint} Two options have been eliminated.`;
    
        saveState();
        updateUI();
    }


    /* =====================================================
       13. MOVE TO THE NEXT QUESTION
       ===================================================== */

    function nextQuestion() {
        if (selected === null) return;

        if (index < mission.length - 1) {
            index++;
            renderQuestion();
            return;
        }

        finishMission();
    }

    /* =====================================================
       14. COMPLETE THE MISSION
       ===================================================== */

    function finishMission() {
        const percentage = Math.round(
            (sessionCorrect / mission.length) * 100
        );
    
        const eligibleForRewards =
            missionRewardEligible &&
            mission.every(question =>
                question.rank === missionRank
            );
    
        const isPerfect =
            percentage >= PROGRESSION.perfectAccuracy;
    
        const isStrong =
            percentage >= PROGRESSION.strongMissionAccuracy;
    
        const bonus = eligibleForRewards
            ? isPerfect
                ? PROGRESSION.perfectMissionBonus
                : isStrong
                    ? PROGRESSION.strongMissionBonus
                    : 0
            : 0;
    
        state.xp += bonus;
        sessionXP += bonus;
        state.completedMissions++;
    
        if (mode === 'daily') {
            state.dailyDone =
                new Date().toISOString().slice(0, 10);
        }
    
        saveState();
        updateUI();
    
        $('question-view').classList.add('hidden');
        $('result').classList.remove('hidden');
    
        $('quiz-fill').style.width = '100%';
    
        $('result-title').textContent =
            isPerfect
                ? 'Flawless mission!'
                : percentage >= PROGRESSION.completionAccuracy
                    ? 'Mission complete!'
                    : 'Keep training';
    
        $('result-summary').textContent =
            `${RANKS[missionRank].name} ${
                mode === 'daily'
                    ? 'Daily challenge'
                    : 'Career mission'
            }`;
    
        $('result-score').textContent =
            `${percentage}%`;
    
        $('result-xp').textContent =
            `+${sessionXP}`;
    
        $('result-correct').textContent =
            `${sessionCorrect}/${mission.length}`;
    
        $('result-message').textContent =
            !eligibleForRewards
                ? `Practice completed. No XP, streak rewards or completion bonus awarded. ${
                    RANKS[missionRank].name
                } practice can help reinforce your knowledge.`
                : bonus
                    ? `Completion bonus: +${bonus} XP. ${
                        isPerfect
                            ? 'Perfect accuracy!'
                            : 'Strong work.'
                      } ${
                        rank().name
                      } career directions: ${
                        rank().roles.join(', ')
                      }.`
                    : `No completion bonus this time. Review the feedback and try another mission. Suggested career directions: ${
                        rank().roles.join(', ')
                      }.`;
    
        $('continue').innerHTML =
            rankIndex() > missionRank
                ? 'Explore your new rank <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>'
                : 'Continue journey <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>';
    
        // Update the result icon according to the score.
        const resultIcon = $('result-icon');

        if (resultIcon) {
            resultIcon.textContent = isStrong
                ? (Math.random() < 0.5 ? '🎯' : '✨')
                : '📋';
        }
    
        if (isStrong) {
            confetti();
        }
    
        $('result').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        const currentRankIndex = rankIndex();
        const hasStarted = state.startedRanks?.includes(currentRankIndex) ?? false;
        
        if (currentRankIndex > missionRank && !hasStarted) {
            if (rank().name === 'Expert') {
                toast('★ EXPERT RANK ACHIEVED! You have mastered CyberQuiz!');
                expertCelebration();
            } else {
                toast(`Rank unlocked: ${rank().icon} ${rank().name}!`);
                confettiPop();
            }
        }
    }


    /* =====================================================
       15.1 CONFETTI CELEBRATION
       ===================================================== */

    function confetti() {
        const host = $('confetti');
        
        if (!host) return;
        
        host.innerHTML = '';

        const colours = [
            '#27e6a2',
            '#43d9ff',
            '#ffc857',
            '#ff6fa5',
            '#8b9cff'
        ];

        for (let i = 0; i < 90; i++) {
            const piece = document.createElement('i');

            piece.className = 'confetti-piece';

            piece.style.left =
                `${Math.random() * 100}%`;

            piece.style.animationDelay =
                `${Math.random() * 0.7}s`;

            piece.style.background =
                colours[i % colours.length];

            host.appendChild(piece);
        }

        setTimeout(() => {
            host.innerHTML = '';
        }, 2600);
    }

    /* =====================================================
       15.2 CONFETTI POP CELEBRATION
       ===================================================== */
    function confettiPop() {
        const host = $('confetti');
    
        if (!host) return;
    
        host.innerHTML = '';
    
        const colours = [
            '#27e6a2',
            '#43d9ff',
            '#ffc857',
            '#ff6fa5',
            '#8b9cff'
        ];
    
        for (let i = 0; i < 120; i++) {
            const piece = document.createElement('i');
    
            piece.className = 'confetti-pop-piece';

            // Random horizontal explosion
            //const x = (Math.random() - 0.5) * 500;
            const x = (Math.random() - 0.5) * 800;
            
            // Upward burst
            //const y = -(300 + Math.random() * 500);
            const y = -(500 + Math.random() * 650);
            
            // Starting position
            piece.style.left = '50%';
            //piece.style.top = '75%';
            piece.style.top = '90%';
            
            // Explosion trajectory
            piece.style.setProperty('--burst-x', `${x}px`);
            piece.style.setProperty('--burst-y', `${y}px`);
    
            piece.style.background =
                colours[i % colours.length];
    
            piece.style.animationDuration =
                `${1.4 + Math.random() * 0.7}s`;
    
            piece.style.animationDelay =
                `${Math.random() * 0.2}s`;
    
            host.appendChild(piece);
        }
    
        setTimeout(() => {
            host.innerHTML = '';
        }, 2400);
    }

    /* =====================================================
       15.3 CONFETTI EXPERT CELEBRATION
       ===================================================== */
    function expertCelebration() {
        const host = $('confetti');
        if (!host) return;
    
        const colours = [
            '#FFD700',
            '#FFC857',
            '#FFFFFF',
            '#43D9FF',
            '#8B9CFF',
            '#27E6A2',
            '#FF6FA5'
        ];
    
        const fireworks = 5;
        const particlesPerFirework = 55;
    
        for (let f = 0; f < fireworks; f++) {
            const centreX = 15 + Math.random() * 70;
            const centreY = 15 + Math.random() * 45;
    
            const delay = f * 450;
    
            for (let i = 0; i < particlesPerFirework; i++) {
                const piece = document.createElement('i');
                piece.className = 'confetti-firework-piece';
    
                const angle = (Math.PI * 2 * i) / particlesPerFirework;
                const distance = 100 + Math.random() * 180;
    
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
    
                piece.style.left = `${centreX}%`;
                piece.style.top = `${centreY}%`;
    
                piece.style.backgroundColor =
                    colours[Math.floor(Math.random() * colours.length)];
    
                piece.style.setProperty('--burst-x', `${x}px`);
                piece.style.setProperty('--burst-y', `${y}px`);
    
                piece.style.width = `${4 + Math.random() * 5}px`;
                piece.style.height = `${4 + Math.random() * 5}px`;
                piece.style.borderRadius = '50%';
    
                piece.style.animationDelay = `${delay}ms`;
                piece.style.animationDuration = '1.5s';
    
                host.appendChild(piece);
            }
        }
    
        setTimeout(() => {
            host.innerHTML = '';
        }, 5500);
    }
    /* =====================================================
       16. RESET PLAYER PROGRESS
       ===================================================== */

    function reset() {
        const confirmed = confirm(
            'Reset all CyberQuiz progress, XP and hint credits?'
        );

        if (!confirmed) return;

        // We reset everything for a new journey except the bestStreak for user challenge
        const bestStreak = state.bestStreak || 0;
        
        state = freshState();
        
        state.bestStreak = bestStreak;
        
        saveState();
        updateUI();

        $('quiz').classList.add('hidden');

        toast('Progress reset.');
    }

    /* =====================================================
       17. DAILY CHALLENGE
       ===================================================== */

        function startDailyChallenge() {
            //console.log('[CyberQuiz] Daily Challenge clicked');
        
            const today = new Date().toISOString().slice(0, 10);
        
            if (state.dailyDone === today) {
                //console.log('[CyberQuiz] Already completed today');
                toast('You have already completed today’s challenge.');
                return;
            }
        
            /*console.log('[CyberQuiz] Starting mission', {
                rank: rankIndex(),
                questions: (window.CYBERQUIZ_QUESTIONS || []).length
            });*/
        
            startMission(rankIndex(), true);
        
            //console.log('[CyberQuiz] Mission start function returned');
        }

    /* =====================================================
       18. EVENT LISTENERS
       ===================================================== */

    $('start').addEventListener('click', () => {
        startMission();
    });

    $('daily').addEventListener(
        'click',
        startDailyChallenge
    );

    $('next').addEventListener(
        'click',
        nextQuestion
    );

    $('hint-button').addEventListener(
        'click',
        useHint
    );

    $('exit').addEventListener('click', () => {
        $('quiz').classList.add('hidden');

        $('journey').scrollIntoView({
            behavior: 'smooth'
        });
    });

    $('continue').addEventListener('click', () => {
        $('quiz').classList.add('hidden');

        $('journey').scrollIntoView({
            behavior: 'smooth'
        });
        /*
        if (rankIndex() >= 4) {
            toast(
                '★ Expert rank reached. Keep practising to sharpen your judgement!'
            );
        }*/
    });

    $('reset').addEventListener('click', reset);

    /* =====================================================
       19. INITIALISE CYBERQUIZ
       ===================================================== */

    updateUI();

}


export function initCyberQuizModal() {
    const modal = document.getElementById('cyberquizModal');
    const toggle = document.getElementById('cyberquizToggle');
    const close = document.getElementById('cyberquizClose');
    const backdrop = document.getElementById('cyberquizBackdrop');
    const dialog = modal?.querySelector('.cyberquiz-dialog');

    if (!modal || !toggle || !close || !backdrop || !dialog) {
        console.warn('CyberQuiz modal elements were not found.');
        return;
    }

    // Prevent duplicate event listeners.
    if (modal.dataset.modalInitialised === 'true') return;
    modal.dataset.modalInitialised = 'true';

    let previousFocus = null;

    function openModal() {
        previousFocus = document.activeElement;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('cyberquiz-modal-open');

        dialog.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('cyberquiz-modal-open');

        previousFocus?.focus?.();
    }

    toggle.addEventListener('click', openModal);
    close.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    modal.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

export function initCyberQuizApp() {
    initCyberQuiz();
    initCyberQuizModal();
}

