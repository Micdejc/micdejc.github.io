
export function initCyberQuiz() {
    'use strict';

    /* =====================================================
       1. CONFIGURATION
       ===================================================== */

    const root = document.getElementById('cyberquiz-root');

    if (!root) {
        console.warn('CyberQuizzy root was not found.');
        return;
    }

    if (root.dataset.initialised === 'true') {
        return;
    }

    root.dataset.initialised = 'true';

    // Find elements belonging to CyberQuizzy only.
    const $ = id => root.querySelector(`#${id}`);

    
    // For each rank, we have the most common job titles that the data bank support.
    const RANKS = [
    {
        name: 'Associate',
        //min: 0,
        //max: 600,
        min: 0,
        max: 1000,
        sub: 'Security fundamentals',
        roles: [
            'IT support technician',
            'Junior security analyst',
            'Junior GRC analyst',
            'Information security compliance assistant'
        ],
        careers:
            'Build safe digital habits and understand core security controls, basic risk concepts and compliance requirements.',
        skill: 'learned the foundations and demonstrated basic security awareness.',
        color: '#38c8ff',
        icon: '◈',
        svg: 
        `
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id="associateBadge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#37d5ff"/>
                    <stop offset="48%" stop-color="#0876df"/>
                    <stop offset="100%" stop-color="#102e70"/>
                </linearGradient>
            </defs>
            <path d="M40 3 L72 21 L72 59 L40 77 L8 59 L8 21 Z"
                fill="#082d68" stroke="#0755a7" stroke-width="2"/>
            <path d="M40 6 L69 23 L69 57 L40 74 L11 57 L11 23 Z"
                fill="url(#associateBadge)" stroke="#70dfff" stroke-width="2.5"/>
            <path d="M40 12 L63 26 L63 54 L40 68 L17 54 L17 26 Z"
                fill="none" stroke="#b5efff" stroke-width="1.5" opacity=".85"/>
            <path d="M40 22 L57 40 L40 58 L23 40 Z"
                fill="none" stroke="#fff" stroke-width="4"/>
            <path d="M40 31 L49 40 L40 49 L31 40 Z"
                fill="none" stroke="#fff" stroke-width="3"/>
        </svg>`
    },
    {
        name: 'Professional',
        //min: 600,
        //max: 1800,
        min: 1000,
        max: 2500,
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
        skill: 'developed operational knowledge and demonstrated the ability to handle routine security tasks.',
        color: '#43e5a4',
        icon: '⬢',
        svg:
        `
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id="professionalBadge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#36f0b0"/>
                    <stop offset="48%" stop-color="#009b72"/>
                    <stop offset="100%" stop-color="#073d3b"/>
                </linearGradient>
            </defs>
            <path d="M40 3 L72 21 L72 59 L40 77 L8 59 L8 21 Z"
                fill="#06443e" stroke="#087e69" stroke-width="2"/>
            <path d="M40 6 L69 23 L69 57 L40 74 L11 57 L11 23 Z"
                fill="url(#professionalBadge)" stroke="#75ffd0" stroke-width="2.5"/>
            <path d="M40 12 L63 26 L63 54 L40 68 L17 54 L17 26 Z"
                fill="none" stroke="#b4ffe4" stroke-width="1.5" opacity=".8"/>
            <path d="M40 23 L56 31.5 L56 48.5 L40 57 L24 48.5 L24 31.5 Z"
                fill="#fff"/>
        </svg>`
    },
    {
        name: 'Practitioner',
        //min: 1800,
        //max: 4000,
        min: 2500,
        max: 4500,
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
        skill: 'demonstrated practical investigation, technical assessment and problem-solving skills.',
        color: '#8b9cff',
        icon: '✥',
        svg:
        `
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id="practitionerBadge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#a9a5ff"/>
                    <stop offset="48%" stop-color="#5145db"/>
                    <stop offset="100%" stop-color="#211b78"/>
                </linearGradient>
            </defs>
            <path d="M40 3 L72 21 L72 59 L40 77 L8 59 L8 21 Z"
                fill="#29216e" stroke="#5145c5" stroke-width="2"/>
            <path d="M40 6 L69 23 L69 57 L40 74 L11 57 L11 23 Z"
                fill="url(#practitionerBadge)" stroke="#bcb8ff" stroke-width="2.5"/>
            <path d="M40 12 L63 26 L63 54 L40 68 L17 54 L17 26 Z"
                fill="none" stroke="#e1ddff" stroke-width="1.5" opacity=".8"/>
            <circle cx="40" cy="40" r="14" fill="none"
                stroke="#fff" stroke-width="3"/>
            <path d="M40 17 V30 M40 50 V63 M17 40 H30 M50 40 H63"
                stroke="#fff" stroke-width="3" stroke-linecap="round"/>
            <circle cx="40" cy="40" r="4" fill="#fff"/>
        </svg>`
    },
    {
        name: 'Architect',
        //min: 4000,
        //max: 7200,
        min: 4500,
        max: 7500,
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
        skill: 'demonstrated the ability to connect technical security controls with organisational risks and governance.',
        color: '#ffbf57',
        icon: '⛨',
        svg:
        `
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id="architectBadge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffe18a"/>
                    <stop offset="48%" stop-color="#c58a16"/>
                    <stop offset="100%" stop-color="#66370b"/>
                </linearGradient>
            </defs>
            <path d="M40 3 L72 17 L72 48 Q70 64 40 77 Q10 64 8 48 L8 17 Z"
                fill="#633c12" stroke="#a16a13" stroke-width="2"/>
            <path d="M40 6 L69 19 L69 47 Q67 62 40 73 Q13 62 11 47 L11 19 Z"
                fill="url(#architectBadge)" stroke="#ffe8a8" stroke-width="2.5"/>
            <path d="M40 13 L62 23 L62 46 Q60 58 40 67 Q20 58 18 46 L18 23 Z"
                fill="none" stroke="#fff0c8" stroke-width="1.5" opacity=".85"/>
            <path d="M40 23 V53 M25 38 H55"
                stroke="#fff" stroke-width="7" stroke-linecap="square"/>
            <path d="M40 23 V53 M25 38 H55"
                stroke="#fff" stroke-width="3" stroke-linecap="square"/>
        </svg>`
    },
    {
        name: 'Expert',
        //min: 7200,
        //max: Infinity,
        min: 7500,
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
        skill: 'reached the highest career rank through sustained performance and strategic security judgement.',
        color: '#ff7da9',
        icon: '✪',
        svg:
        `
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
                <linearGradient id="expertBadge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ff9ab9"/>
                    <stop offset="48%" stop-color="#ed326b"/>
                    <stop offset="100%" stop-color="#83153e"/>
                </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="37" fill="#79153e"
                stroke="#a82050" stroke-width="2"/>
            <circle cx="40" cy="38" r="34"
                fill="url(#expertBadge)" stroke="#ffabc5" stroke-width="2.5"/>
            <circle cx="40" cy="38" r="27"
                fill="none" stroke="#ffd0df" stroke-width="1.5" opacity=".85"/>
            <path d="M40 16 L46 32 H63 L49 42 L54 59 L40 49 L26 59 L31 42 L17 32 H34 Z"
                fill="#fff" stroke="#fff" stroke-width="1"
                stroke-linejoin="round"/>
        </svg>`
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

        //Notify only when the new best streak record every 10 streaks
        bestStreakLength: 10,

        //Notify only when the new XP streak record every 5 missions
        XPStreakLength: 5,

        //Extra XP awarded for daily challenges streak achieved 
        dailyStreakLength: 5,
        dailyStreakBonus: 50,
        //Number of questions per daily challenge
        dailyChallengeCount: 10,
    
        // Minimum accuracy required for each mission outcome.
        perfectAccuracy: 100,       // Perfect mission score.
        // 3 questions (2 correct = 66.7%),
        // 4 questions (3 correct = 75%), 5 questions (4 correct = 80%).
        strongMissionAccuracy: 66,  // Strong score and bonus.
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
            // Personal records.
            bestStreak: 0,
            bestXP: 0,
            bestDailyStreak: 0,

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

            // Save unfinished Daily Challenge questions.
            dailyMission: null,
            dailyProgress: 0,
            dailyStartedDate: '',
            dailyStreak: {
                count: 0,
                date: null
            },

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

            loaded.dailyMission = Array.isArray(saved.dailyMission)
                ? saved.dailyMission
                : null;

            loaded.dailyProgress = Number.isInteger(saved.dailyProgress)
                ? saved.dailyProgress
                : 0;

            loaded.dailyStartedDate = saved.dailyStartedDate || '';

            // Restore and validate Daily Challenge streak.
            const savedDailyStreak = saved.dailyStreak;
            
            loaded.dailyStreak = {
                count:
                    Number.isInteger(savedDailyStreak?.count) &&
                    savedDailyStreak.count >= 0
                        ? savedDailyStreak.count
                        : 0,
            
                date:
                    typeof savedDailyStreak?.date === 'string' &&
                    /^\d{4}-\d{2}-\d{2}$/.test(savedDailyStreak.date) &&
                    !Number.isNaN(Date.parse(savedDailyStreak.date))
                        ? savedDailyStreak.date
                        : null
            };

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
        /*
        $('start').textContent = hasStarted
            ? '▶ Continue level'
            : '🚀 Start level';
        */
        const icon = hasStarted
            ? `<svg class="cq-btn-icon" viewBox="0 0 24 24"
                   fill="none" aria-hidden="true">
                   <circle cx="12" cy="12" r="9"
                       stroke="currentColor" stroke-width="1.8"/>
                   <path d="M10 8L15 12L10 16"
                       stroke="currentColor" stroke-width="2"
                       stroke-linecap="round"
                       stroke-linejoin="round"/>
               </svg>`
            : `<svg class="cq-btn-icon" viewBox="0 0 24 24"
                   fill="none" aria-hidden="true">
                   <path d="M7 4.75V19.25L19 12L7 4.75Z"
                       fill="currentColor"
                       stroke="currentColor"
                       stroke-width="1.5"
                       stroke-linejoin="round"/>
               </svg>`;
        
        $('start').innerHTML = `
            ${icon}
            <span>${hasStarted ? 'Continue level' : 'Start level'}</span>
        `;
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
        }, 5000);
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
        $('daily').textContent = state.dailyStreak.count;

        $('hero-done').textContent = state.answered;
        $('hero-correct').textContent = state.correct;
        $('hero-xp').textContent = state.bestXP;
        $('hero-daily').textContent = state.bestDailyStreak;
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
        updateDailyButton();
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
    
                    <!-- <div
                        class="emblem"
                        style="background:linear-gradient(
                            145deg, ${r.color}, #173451
                        )">
                        ${r.icon}
                    </div>
                    -->
                    
                    <div 
                        class="emblem rank-emblem rank-emblem-${i + 1}"
                        style="--rank-color: ${r.color}"
                        aria-label="${r.name} expertise badge">
                        ${r.svg}
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

        // 10 questions per daily challenge
        const count = daily
            ? PROGRESSION.dailyChallengeCount
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

        //mission = pickQuestions(rankNumber, daily);

        mission = daily && state.dailyMission?.length
            ? state.dailyMission
            : pickQuestions(rankNumber, daily);

        if (!mission.length) {
            toast('No questions are available yet.');
            return;
        }

        if (daily && !state.dailyMission?.length) {
            state.dailyMission = mission;
            saveState();
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

        //index = 0;
        index = daily && state.dailyMission?.length
            ? (state.dailyProgress || 0)
            : 0;
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
        /*
        if (emailBox) {
            if (question.exhibit) {
                emailBox.textContent = question.exhibit;
                emailBox.classList.remove('hidden');
            } else {
                emailBox.textContent = '';
                emailBox.classList.add('hidden');
            }
        }
        */

        if (emailBox) {
            if (question.exhibit) {
        
                const escapeHTML = text => text.replace(/[&<>"']/g, char => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                })[char]);
        
                const lines = question.exhibit.split('\n');
        
                emailBox.innerHTML = `
                    <div class="cq-code-output">
                        <div class="cq-line-numbers">
                            ${lines.map((_, i) => `<span>${i + 1}</span>`).join('')}
                        </div>
                        <pre class="cq-code-content">${escapeHTML(question.exhibit)}</pre>
                    </div>
                `;
        
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
                /*
                state.bestStreak = Math.max(
                    state.bestStreak,
                    state.streak
                );
                */
                
                // Update the best streak record without an additional toast.
                updatePersonalRecord(
                    'bestStreak',
                    state.streak
                );

                // Notify every PROGRESSION.bestStreakLength streaks
                if (
                    state.streak > 0 &&
                    state.streak % PROGRESSION.bestStreakLength === 0
                ) {
                    toast(`🔥 Streak milestone! ${state.streak} consecutive correct answers!`);
                }

        
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
                `Incorrect. ${question.why}`;
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

        // Save Daily Challenge progress for resuming later.
        if (mode === 'daily') {
            state.dailyProgress = index + 1;
            // Mark the Daily Challenge completed after all 10 questions answered
            if (state.dailyProgress >= mission.length) {
                finishMission();
                return;
            }
        }

        saveState();
        updateUI();
        
        /*
        if (rankIndex() > question.rank) {
            //toast(`Rank unlocked: ${rank().name}!`);
            toast(`Rank unlocked: ${rank().icon} ${rank().name}!`);
            confettiExplosion()
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

        /*
        // Daily challenges are not counted for bonus rewards add "mode === 'daily' || " to the condition if you want so.
        const eligibleForRewards =
            missionRewardEligible &&
            mission.every(question =>
                question.rank === missionRank
            );
        */

        const eligibleForRewards =
            mode === 'daily' ||
            (
                missionRewardEligible &&
                mission.every(question =>
                    question.rank === missionRank
                )
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
        
        //Update best XP record without an additional toast.
        updatePersonalRecord(
                'bestXP',
                state.xp
            );

        // Notify best XP record every PROGRESSION.XPStreakLength completed missions.
        if (state.completedMissions > 0 && 
            state.completedMissions % PROGRESSION.XPStreakLength === 0) {
                toast(`🏆 New XP record! Your total XP has reached ${state.xp}!`);
        }
        
        
        if (mode === 'daily') {

            const day = new Date().toISOString().slice(0, 10);
            
            updateDailyStreak(day)
            
            state.dailyDone =
                day;
            
            state.dailyMission = 
                null;

            state.dailyProgress =
                0;

            state.dailyStartedDate = 
                '';

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

        const rankCompleted = rankIndex() > missionRank;

        $('result-message').innerHTML =
            !eligibleForRewards
                ? `Practice completed. No XP, streak rewards or completion bonus awarded. ${
                    RANKS[missionRank].name
                  } practice can help reinforce your knowledge.`
        
                : rankCompleted
                    ? `You completed the <strong>${
                        RANKS[missionRank].name
                      }</strong> rank! You have ${
                        RANKS[missionRank].skill
                      }`
        
                    : bonus
                        ? `Completion bonus: +${bonus} XP. ${
                            isPerfect
                                ? 'Perfect accuracy!'
                                : 'Strong work.'
                          } ${
                            rank().name
                          } career directions: <strong>${
                            rank().roles.join(', ')
                          }</strong>.`
        
                        : `No completion bonus this time. Review the feedback and try another mission. Suggested career directions: <strong>${
                            rank().roles.join(', ')
                          }</strong>.`;
    
        $('continue').innerHTML =
            rankCompleted
                ? 'Explore your new rank <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>'
                : 'Continue journey <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>';
    
        // Update the result icon according to the score.
        const resultIcon = $('result-icon');

        if (resultIcon) {
            resultIcon.textContent = isStrong
                ? (Math.random() < 0.5 ? '🎯' : '✨')
                : '📋';
        }
       
        const currentRankIndex = rankIndex();
        const hasStarted = state.startedRanks?.includes(currentRankIndex) ?? false;

        // Confetti celebration appears only when there is no rank celebration to avoid confetti overlap 
        if (currentRankIndex > missionRank && !hasStarted) {
            if (rank().name === 'Expert') {
                toast('★ EXPERT RANK ACHIEVED! You have mastered CyberQuizzy!');
                expertCelebration();
            } else {
                toast(`Rank unlocked: ${rank().icon} ${rank().name}!`);
                confettiExplosion();
            }
        } else if (isStrong) {
            confetti();
        }

        $('result').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
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

        for (let i = 0; i < 100; i++) {
            const piece = document.createElement('i');

            piece.className = 'confetti-piece';

            // Keep the particles within the central 80% of the screen.
            piece.style.left = 
                `${10 + Math.random() * 80}%`;
            
            /*
            //Keep confetti within whole the screen
            piece.style.left =
                `${Math.random() * 100}%`;
            */
            
            // Random falling speed between 2 to 3.5 seconds.
            /*
            piece.style.animationDuration =
                `${2.0 + Math.random() * 1.5}s`;
            */
            // Random falling speed: 1.0–2.5 seconds.
            piece.style.animationDuration =
                `${1.0 + Math.random() * 1.5}s`;

            // Stagger particle starts: 0–0.5 seconds.
            piece.style.animationDelay =
                `${Math.random() * 0.5}s`;

          
            // Random particle size.
            //piece.style.width = `${4 + Math.random() * 5}px`;
            //piece.style.height = `${4 + Math.random() * 5}px`;

            piece.style.background =
                colours[Math.floor(Math.random() * colours.length)];

            host.appendChild(piece);
        }

        setTimeout(() => {
            host.innerHTML = '';
        }, 2800);
    }

    /* =====================================================
       15.2 CONFETTI EXPLOSION CELEBRATION
       ===================================================== */
    function confettiExplosion() {
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
    
        // Create the firework rocket
        const rocket = document.createElement('i');
        rocket.className = 'confetti-rocket';
    
        rocket.style.left = '50%';
        rocket.style.top = '90%';
    
        host.appendChild(rocket);
    
        // Rocket reaches 70% screen height, then explodes
        setTimeout(() => {
            rocket.remove();
    
            const particles = 150;
            const centreX = 50;
            const centreY = 20;
    
            for (let i = 0; i < particles; i++) {
                const piece = document.createElement('i');
    
                piece.className = 'confetti-explosion-piece';
    
                const angle = (Math.PI * 2 * i) / particles;

                // Random travel distance: 180–500px (each particle travels a random distance within this range).
                //const distance = 100 + Math.random() * 180;
                const distance = 180 + Math.random() * 320;
                
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
    
                piece.style.left = `${centreX}%`;
                piece.style.top = `${centreY}%`;
    
                piece.style.background =
                    colours[Math.floor(Math.random() * colours.length)];
    
                piece.style.setProperty('--burst-x', `${x}px`);
                piece.style.setProperty('--burst-y', `${y}px`);
    
                piece.style.width = `${4 + Math.random() * 5}px`;
                piece.style.height = `${4 + Math.random() * 5}px`;
                piece.style.borderRadius = '50%';
    
                host.appendChild(piece);
            }
    
            setTimeout(() => {
                host.innerHTML = '';
            }, 1800);
    
        }, 750);
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
    
        const fireworks = 10;
        const particlesPerFirework = 55;
    
        for (let f = 0; f < fireworks; f++) {
            const centreX = 15 + Math.random() * 70;
            const centreY = 15 + Math.random() * 45;
    
            const delay = f * 450;
    
            for (let i = 0; i < particlesPerFirework; i++) {
                const piece = document.createElement('i');
                piece.className = 'confetti-firework-piece';
    
                const angle = (Math.PI * 2 * i) / particlesPerFirework;
                const distance = 100 + Math.random() * 300;
    
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
            'Reset all CyberQuizzy progress, XP and hint credits?'
        );

        if (!confirmed) return;

        // We reset everything for a new journey except the bestStreak, bestXP and bestDailyStreak for user challenge
        const bestStreak = state.bestStreak || 0;
        const bestXP = state.bestXP || 0;
        const bestDailyStreak = state.bestDailyStreak || 0;
        
        state = freshState();
        
        state.bestStreak = bestStreak;
        state.bestXP = bestXP;
        state.bestDailyStreak = bestDailyStreak;
        
        saveState();
        updateUI();

        $('quiz').classList.add('hidden');

        toast('Progress reset.');
    }

    /* =====================================================
       17.1 DAILY CHALLENGE
       ===================================================== */

        function startDailyChallenge() {
            //console.log('[CyberQuizzy] Daily Challenge clicked');
        
            const today = new Date().toISOString().slice(0, 10);
        
            if (state.dailyDone === today) {
                //console.log('[CyberQuizzy] Already completed today');
                toast('You have already completed today’s challenge.');
                return;
            }
        
            /*console.log('[CyberQuizzy] Starting mission', {
                rank: rankIndex(),
                questions: (window.CYBERQUIZ_QUESTIONS || []).length
            });*/

            // Discard previous day's unfinished challenge.
            if (state.dailyStartedDate !== today) {
                state.dailyMission = null;
                state.dailyProgress = 0;
                state.dailyStartedDate = today;
                saveState();
            }
        
            startMission(rankIndex(), true);
        
            //console.log('[CyberQuizzy] Mission start function returned');
        }

    /* =====================================================
       17.2 DAILY BUTTON UPDATE
       ===================================================== */
    function updateDailyButton() {
        const today = new Date().toISOString().slice(0, 10);
        const dailyButton = $('daily');
    
        const completed = state.dailyDone === today;
    
        if (completed) {
            dailyButton.setAttribute('disabled', '');
        } else {
            dailyButton.removeAttribute('disabled');
        }
    }

    /* =====================================================
       17.2 DAILY STREAK UPDATE
       ===================================================== */
    function updateDailyStreak(today) {

        // Validate existing streak data.
        if (
            !state.dailyStreak ||
            !Number.isInteger(state.dailyStreak.count) ||
            state.dailyStreak.count < 0
        ) {
            state.dailyStreak = {
                count: 0,
                date: null
            };
        }
    
        const previousDate = state.dailyStreak.date;
    
        // Prevent duplicate updates on the same day.
        if (previousDate === today) {
            return 0;
        }
    
        const todayUTC = Date.parse(`${today}T00:00:00Z`);
    
        const previousUTC = previousDate
            ? Date.parse(`${previousDate}T00:00:00Z`)
            : NaN;
    
        const oneDay = 24 * 60 * 60 * 1000;
    
        if (
            previousDate &&
            Number.isFinite(previousUTC) &&
            todayUTC - previousUTC === oneDay
        ) {
            // Consecutive daily completion.
            state.dailyStreak.count++;
        } else {
            // First completion or a missed day.
            state.dailyStreak.count = 1;
        }

        state.dailyStreak.date = today;

        // Update the best consecutive-day personal record without an additional toast.
        updatePersonalRecord(
            'bestDailyStreak',
            state.dailyStreak.count
        );

        // Award bonus at each streak milestone.
        const milestone = PROGRESSION.dailyStreakLength;
    
        if (
            Number.isInteger(milestone) &&
            milestone > 0 &&
            state.dailyStreak.count % milestone === 0
        ) {
            const reward = PROGRESSION.dailyStreakBonus;
    
            if (Number.isFinite(reward) && reward > 0) {
                state.xp += reward;
                sessionXP += reward;
                toast(`🎯 Daily streak milestone! ${state.dailyStreak.count} consecutive days completed!`);
            }
        }
    }

    /* ========================================
       PERSONAL RECORDS UPDATE
    ======================================== */
    
    function updatePersonalRecord(key, value, message = null) {
    
        const previousRecord = state[key] || 0;
    
        // Only update when the existing record is beaten.
        if (value <= previousRecord) {
            return false;
        }
    
        // Update the personal record.
        state[key] = value;
    
        // Display notification only when a message is provided.
        if (message) {
            toast(message);
        }
    
        return true;
    }


    /* ========================================
      DAILY CYBER TIP
   ======================================== */
   
 
   function displayDailyTip() {
   
       console.log('[CyberQuizzy] Initialising Daily Cyber Tip...');
   
       const tipTitle = document.getElementById('cq-tip-text');
       const tipDescription = document.getElementById('cq-tip-description');
   
       // Check whether the HTML elements exist.
       if (!tipTitle || !tipDescription) {
           console.error(
               '[CyberQuizzy] Daily Cyber Tip initialisation failed.',
               {
                   tipTitleFound: !!tipTitle,
                   tipDescriptionFound: !!tipDescription,
                   documentReadyState: document.readyState
               }
           );
           return;
       }
   
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
   
       const randomIndex = Math.floor(Math.random() * tips.length);
       const tip = tips[randomIndex];
   
       console.log('[CyberQuizzy] Selected daily tip:', randomIndex + 1, tip);
   
       tipTitle.textContent = tip.title;
       tipDescription.textContent = tip.description;
   
       console.log('[CyberQuizzy] Daily Cyber Tip displayed successfully.');
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

    // Display daily tip
    displayDailyTip();

}


export function initCyberQuizModal() {
    const modal = document.getElementById('cyberquizModal');
    const toggle = document.getElementById('cyberquizToggle');
    const close = document.getElementById('cyberquizClose');
    const backdrop = document.getElementById('cyberquizBackdrop');
    const dialog = modal?.querySelector('.cyberquiz-dialog');

    if (!modal || !toggle || !close || !backdrop || !dialog) {
        console.warn('CyberQuizzy modal elements were not found.');
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

