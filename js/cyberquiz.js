
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
  

    const RANKS = [
        {
            name: 'Associate',
            min: 0,
            max: 250,
            sub: 'Security fundamentals',
            roles: [
                'IT support technician',
                'Junior security analyst'
            ],
            careers:
                'Build safe digital habits and understand core security controls.',
            color: '#38c8ff',
            icon: '⬡'
        },
        {
            name: 'Professional',
            min: 250,
            max: 650,
            sub: 'Operational security',
            roles: [
                'SOC analyst (Tier 1)',
                'Junior incident responder',
                'Vulnerability analyst'
            ],
            careers:
                'Triage alerts, follow playbooks and help maintain secure systems.',
            color: '#43e5a4',
            icon: '◆'
        },
        {
            name: 'Practitioner',
            min: 650,
            max: 1200,
            sub: 'Hands-on investigation',
            roles: [
                'Threat hunter',
                'Digital forensics analyst',
                'Cloud security analyst',
                'Penetration tester (junior)'
            ],
            careers:
                'Investigate suspicious behaviour, validate weaknesses and apply technical controls.',
            color: '#8b9cff',
            icon: '✦'
        },
        {
            name: 'Architect',
            min: 1200,
            max: 2000,
            sub: 'Designing secure systems',
            roles: [
                'Security architect (developing)',
                'Security engineer',
                'Cloud security engineer'
            ],
            careers:
                'Connect technical controls to system design, risk and business requirements.',
            color: '#ffbf57',
            icon: '⬟'
        },
        {
            name: 'Expert',
            min: 2000,
            max: Infinity,
            sub: 'Strategic security judgement',
            roles: [
                'Security architect',
                'Security consultant',
                'Incident response lead',
                'Security team lead'
            ],
            careers:
                'Make complex risk decisions, guide incident strategy and shape security programmes.',
            color: '#ff7da9',
            icon: '★'
        }
    ];

    const STORE = 'cyberquiz-progress-v1';

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
            seen: [],
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

            return {
                ...freshState(),
                ...saved
            };
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

            const progress = unlocked
                ? (i === 4 ? 'MASTERED' : `${state.xp} XP`)
                : `${r.min} XP required`;

            return `
                <article class="level-card
                    ${unlocked ? 'unlocked' : 'locked'}
                    ${current ? 'current' : ''}">

                    <span class="level-num">
                        RANK 0${i + 1}
                        ${current ? '· CURRENT' : ''}
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

                    <div class="career-label">
                        Career directions
                    </div>

                    <ul class="career-list">
                        ${r.roles.map(role => `
                            <li>${role}</li>
                        `).join('')}
                    </ul>

                    <button
                        data-rank="${i}"
                        ${unlocked ? '' : 'disabled'}>

                        ${unlocked
                            ? (current
                                ? 'Start current level'
                                : 'Practise this level')
                            : '🔒 Keep progressing'}
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
                        ${earned ? 'UNLOCKED' : `${r.min} XP`}
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

        let pool = allQuestions.filter(question =>
            daily
                ? question.rank <= rankNumber
                : question.rank === rankNumber
        );

        if (!pool.length) {
            pool = allQuestions;
        }

        const count = daily
            ? 5
            : Math.min(5, Math.max(3, 3 + rankNumber));

        let unseen = pool.filter(question =>
            !state.seen.includes(question.id)
        );

        if (unseen.length < count) {
            unseen = pool;
        }

        return shuffle(unseen).slice(
            0,
            Math.min(count, unseen.length)
        );
    }

    /* =====================================================
       9. START A MISSION
       ===================================================== */

    function startMission(
        rankNumber = rankIndex(),
        daily = false
    ) {
        if (rankNumber > rankIndex()) {
            toast('Unlock this rank by earning more XP.');
            return;
        }

        mode = daily ? 'daily' : 'rank';

        mission = pickQuestions(rankNumber, daily);

        if (!mission.length) {
            toast('No questions are available yet.');
            return;
        }

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
         * PHISHING EMAIL SCENARIOS
         *
         * Questions may include an "email" property.
         * Display the sample email when it exists.
         * Otherwise, hide the scenario container.
         */

        const emailBox = $('email-scenario');

        if (emailBox) {
            if (question.email) {
                emailBox.textContent = question.email;
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

        $('feedback').textContent =
            'Choose carefully. You can do this.';

        $('next').disabled = true;

        $('next').innerHTML =
            index === mission.length - 1
                ? 'Finish mission ✓'
                : 'Validate <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>';

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

        if (correct) {
            sessionCorrect++;
            state.correct++;
            state.streak++;

            state.bestStreak = Math.max(
                state.bestStreak,
                state.streak
            );

            const earned =
                20 +
                rankIndex() * 10 +
                (state.streak >= 3 ? 5 : 0);

            state.xp += earned;
            sessionXP += earned;

            $('feedback').textContent =
                `Correct! +${earned} XP · ${question.why}`;
        } else {
            state.streak = 0;

            $('feedback').textContent =
                `Not quite. ${question.why}`;
        }

        state.answered++;
        answeredThis++;

        state.seen.push(question.id);

        // Award one hint credit for every third consecutive correct answer.
        if (correct && state.streak % 3 === 0) {
            state.credits = Math.min(
                9,
                state.credits + 1
            );
        }

        saveState();
        updateUI();

        if (rankIndex() > question.rank) {
            toast(`Rank unlocked: ${rank().name}!`);
        }
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

        state.credits--;
        hintUsed = true;

        const question = mission[index];

        $('hint-button').disabled = true;
        $('hint-button').textContent = 'Hint used';

        if (!eliminated) {
            const wrongAnswers = [
                ...$('answers').querySelectorAll('button')
            ]
                .map((button, i) => ({
                    button,
                    index: i
                }))
                .filter(item =>
                    item.index !== question.correct
                );

            shuffle(wrongAnswers)
                .slice(0, 2)
                .forEach(item => {
                    item.button.classList.add('eliminated');
                    item.button.disabled = true;
                });

            eliminated = true;

            $('hint-message').textContent =
                `${question.hint} Two options have been eliminated.`;
        } else {
            $('hint-message').textContent = question.hint;
        }

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

        const bonus =
            percentage === 100
                ? 50
                : percentage >= 80
                    ? 25
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
            percentage === 100
                ? 'Flawless mission!'
                : percentage >= 60
                    ? 'Mission complete!'
                    : 'Keep training';

        $('result-summary').textContent =
            `${rank().name} progression · ${
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

        $('result-message').textContent = bonus
            ? `Completion bonus: +${bonus} XP. ${
                percentage === 100
                    ? 'Perfect accuracy!'
                    : 'Strong work.'
            } ${rank().name} career directions: ${rank().roles.join(', ')}.`
            : `Review the feedback and try another mission. Suggested next career directions: ${rank().roles.join(', ')}.`;

        $('continue').innerHTML =
            rankIndex() > mission[0].rank
                ? 'Explore your new rank <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>'
                : 'Continue journey <span class="pagination-arrow pagination-arrow-right" aria-hidden="true"></span>';

        if (percentage >= 80) {
            confetti();
        }

        $('result').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    /* =====================================================
       15. CONFETTI CELEBRATION
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

        for (let i = 0; i < 45; i++) {
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
       16. RESET PLAYER PROGRESS
       ===================================================== */

    function reset() {
        const confirmed = confirm(
            'Reset all CyberQuiz progress, XP and hint credits?'
        );

        if (!confirmed) return;

        state = freshState();

        saveState();
        updateUI();

        $('quiz').classList.add('hidden');

        toast('Progress reset.');
    }

    /* =====================================================
       17. DAILY CHALLENGE
       ===================================================== */

    function startDailyChallenge() {
        const today =
            new Date().toISOString().slice(0, 10);

        if (state.dailyDone === today) {
            toast(
                'You have already completed today’s challenge.'
            );
            return;
        }

        startMission(rankIndex(), true);
    }

    /* =====================================================
       18. EVENT LISTENERS
       ===================================================== */

    $('start').addEventListener('click', () => {
        startMission();
    });
/*
    $('daily').addEventListener(
        'click',
        startDailyChallenge
    );*/

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

        if (rankIndex() >= 4) {
            toast(
                'Expert rank reached. Keep practising to sharpen your judgement!'
            );
        }
    });

    $('reset').addEventListener('click', reset);

    const dailyButton = $('daily');
    
    if (dailyButton) {
        dailyButton.addEventListener('click', startDailyChallenge);
    } else {
        console.error('Daily Challenge button (#daily) not found.');
    }

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

