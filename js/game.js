/* =========================================================
   DLN - Deviner Le Nombre
   GitHub Pages version
   No PHP / No database
   ========================================================= */


/* =========================================================
   PERSISTENT STORAGE
   ========================================================= */

const DLN_STORAGE_KEY =
    "dlnGameState";

const DLN_RECORD_KEY =
    "dlnRecord";


/*
 * Persistent record.
 *
 * Because this is a GitHub Pages game, the record is stored
 * locally in the player's browser.
 *
 * It survives page refreshes and browser restarts, but it is
 * not a shared global leaderboard.
 */
window.dlnRecord =
    Number(
        localStorage.getItem(DLN_RECORD_KEY)
    ) || 0;


/* =========================================================
   GAME STATE
   ========================================================= */

const dlnGame = {
    player: "Player",
    level: 1,
    attempts: 5,
    superHits: 0,
    target: null,
    score: 0,
    active: false,
    firstAttempt: true,
    hintUsed: false,

    /*
     * Indicates that a level has been completed and
     * the player is currently on the level-complete screen.
     */
    awaitingNextLevel: false
};


/* =========================================================
   CONSTANTS
   ========================================================= */

/*
 * The original game logic is based on these relationships:
 *
 *   MAX_LEVEL = MAX_NUMBER / STEP
 *   BONUS     = STEP / 2
 *   HINT_COST = STEP + 1
 */
const DLN = {

    MAX_NUMBER: 1000,
    STEP: 10,
    DEFAULT_ATTEMPTS: 5,

    get MAX_LEVEL() {
        return this.MAX_NUMBER / this.STEP;
    },

    get BONUS() {
        return this.STEP / 2;
    },

    get HINT_COST() {
        return this.STEP + 1;
    }

};


/* =========================================================
   DOM
   ========================================================= */

let dlnElements = {};


/* =========================================================
   INITIALIZATION
   ========================================================= */

export function initDLN() {

    dlnElements = {

        modal:
            document.getElementById("gameModal"),

        backdrop:
            document.getElementById("gameModalBackdrop"),

        openButton:
            document.getElementById("gameToggle"),

        closeButton:
            document.getElementById("gameModalClose"),

        startScreen:
            document.getElementById("dlnStartScreen"),

        gameScreen:
            document.getElementById("dlnGameScreen"),

        playerName:
            document.getElementById("dlnPlayerName"),

        startButton:
            document.getElementById("dlnStartButton"),

        continueButton:
            document.getElementById("dlnContinueButton"),

        startFeedback:
            document.getElementById("dlnStartFeedback"),

        savedGame:
            document.getElementById("dlnSavedGame"),

        savedGameTitle:
            document.getElementById("dlnSavedGameTitle"),

        savedGameInfo:
            document.getElementById("dlnSavedGameInfo"),

        level:
            document.getElementById("dlnLevel"),

        instruction:
            document.getElementById("dlnInstruction"),

        attempts:
            document.getElementById("dlnAttempts"),

        superHits:
            document.getElementById("dlnSuperHits"),

        score:
            document.getElementById("dlnScore"),

        record:
            document.getElementById("dlnRecord"),

        feedback:
            document.getElementById("dlnFeedback"),

        numberInput:
            document.getElementById("dlnNumber"),

        validateButton:
            document.getElementById("dlnValidate"),

        hintButton:
            document.getElementById("dlnHint"),

        nextButton:
            document.getElementById("dlnNext"),

        restartButton:
            document.getElementById("dlnRestart"),

        result:
            document.getElementById("dlnResult"),

        resultIcon:
            document.getElementById("dlnResultIcon"),

        resultTitle:
            document.getElementById("dlnResultTitle"),

        resultMessage:
            document.getElementById("dlnResultMessage"),

        resultContinue:
            document.getElementById("dlnResultContinue"),

        resultRestart:
            document.getElementById("dlnResultRestart")

    };


    if (!dlnElements.modal) {

        console.warn(
            "DLN: game modal was not found."
        );

        return;
    }


    /*
     * Load saved progress, but do not automatically
     * resume the game.
     */
    loadDlnState();

    bindDlnEvents();

    updateDlnRecord();

    updateDlnStartScreen();

}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */

function bindDlnEvents() {

    dlnElements.openButton?.addEventListener(
        "click",
        openGameModal
    );

    dlnElements.closeButton?.addEventListener(
        "click",
        closeGameModal
    );

    dlnElements.backdrop?.addEventListener(
        "click",
        closeGameModal
    );

    dlnElements.startButton?.addEventListener(
        "click",
        startDlnGame
    );

    dlnElements.continueButton?.addEventListener(
        "click",
        continueSavedDlnGame
    );

    dlnElements.validateButton?.addEventListener(
        "click",
        validateDlnGuess
    );

    dlnElements.hintButton?.addEventListener(
        "click",
        showDlnHint
    );

    dlnElements.nextButton?.addEventListener(
        "click",
        continueDlnGame
    );

    dlnElements.restartButton?.addEventListener(
        "click",
        restartDlnGame
    );

    dlnElements.resultContinue?.addEventListener(
        "click",
        continueDlnGame
    );

    dlnElements.resultRestart?.addEventListener(
        "click",
        restartDlnGame
    );


    dlnElements.playerName?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                startDlnGame();
            }

        }
    );


    dlnElements.numberInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                validateDlnGuess();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                dlnElements.modal?.classList.contains(
                    "is-open"
                )
            ) {

                closeGameModal();

            }

        }
    );

}


/* =========================================================
   MODAL
   ========================================================= */

function openGameModal() {

    dlnElements.modal.classList.add(
        "is-open"
    );

    dlnElements.modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "game-modal-open"
    );


    setTimeout(() => {

        if (!dlnGame.active) {

            dlnElements.playerName?.focus();

        } else {

            dlnElements.numberInput?.focus();

        }

    }, 250);

}


function closeGameModal() {

    dlnElements.modal.classList.remove(
        "is-open"
    );

    dlnElements.modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "game-modal-open"
    );

}


/* =========================================================
   START SCREEN
   ========================================================= */

function updateDlnStartScreen() {

    const hasSavedGame =
        dlnGame.active;


    if (!hasSavedGame) {

        dlnElements.continueButton.hidden =
            true;

        dlnElements.savedGame.hidden =
            true;

        dlnElements.startButton.hidden =
            false;

        return;
    }


    dlnElements.continueButton.hidden =
        false;

    dlnElements.savedGame.hidden =
        false;

    dlnElements.startButton.hidden =
        false;


    dlnElements.savedGameTitle.textContent =
        `👋 Welcome back, ${dlnGame.player}!`;


    dlnElements.savedGameInfo.textContent =
        `You're on level ${dlnGame.level} with ` +
        `${dlnGame.attempts} attempts, ` +
        `${dlnGame.superHits} Super Hits, ` +
        `and ${dlnGame.score} points.`;

}


/* =========================================================
   START NEW GAME
   ========================================================= */

function startDlnGame() {

    const name =
        dlnElements.playerName.value.trim();


    /*
    if (
        name.length > 0 &&
        name.length < 3
    ) {

        showStartFeedback(
            "Please enter at least 3 characters.",
            "invalid"
        );

        shakeInput(dlnElements.playerName);

        return;
    }
    */


    if (!name) {

        showStartFeedback(
            "Please enter your name before starting the game.",
            "invalid"
        );

        shakeInput(
            dlnElements.playerName
        );

        return;
    }


    if (name.length < 3) {

        showStartFeedback(
            "Your name must contain at least 3 characters.",
            "invalid"
        );

        shakeInput(
            dlnElements.playerName
        );

        return;
    }


    if (name.includes(";")) {

        showStartFeedback(
            "Please choose a name without the ';' character.",
            "invalid"
        );

        shakeInput(
            dlnElements.playerName
        );

        return;
    }


    /*
     * Starting a new game intentionally removes
     * the previous unfinished game.
     *
     * The record is preserved.
     */
    clearDlnState();


    dlnGame.player =
        name || "Player";

    dlnGame.level =
        1;

    dlnGame.attempts =
        DLN.DEFAULT_ATTEMPTS;

    dlnGame.superHits =
        0;

    dlnGame.target =
        null;

    dlnGame.score =
        0;

    dlnGame.active =
        true;

    dlnGame.firstAttempt =
        true;
   
    dlnGame.hintUsed = 
        false;

    dlnGame.awaitingNextLevel =
        false;


    dlnElements.startScreen.hidden =
        true;

    dlnElements.gameScreen.hidden =
        false;

    dlnElements.result.hidden =
        true;


    startDlnLevel();

}


/* =========================================================
   CONTINUE SAVED GAME
   ========================================================= */

function continueSavedDlnGame() {

    if (!dlnGame.active) {
        return;
    }


    dlnElements.startScreen.hidden =
        true;

    dlnElements.gameScreen.hidden =
        false;

    dlnElements.result.hidden =
        true;


    dlnElements.playerName.value =
        dlnGame.player;


    /*
     * If the player closed the page while the
     * level-complete screen was visible, restore
     * that state rather than generating a new target.
     */
    if (dlnGame.awaitingNextLevel) {

        dlnElements.level.textContent =
            dlnGame.level;

        dlnElements.attempts.textContent =
            dlnGame.attempts;

        dlnElements.superHits.textContent =
            dlnGame.superHits;

        dlnElements.score.textContent =
            dlnGame.score;

        updateDlnRecord();

        showDlnLevelComplete();

        return;
    }


    /*
     * Otherwise restore the exact target and
     * current level.
     */
    startDlnLevel(true);

}


/* =========================================================
   START LEVEL
   ========================================================= */

function startDlnLevel(
    restore = false
) {

    if (
        dlnGame.level >
        DLN.MAX_LEVEL
    ) {

        completeEntireDlnGame();

        return;
    }


    const maximum =
        dlnGame.level * DLN.STEP;


    /*
     * Generate a new number only when starting
     * a genuinely new level.
     *
     * When restoring, preserve the saved target.
     */
    if (
        !restore ||
        dlnGame.target === null
    ) {

        dlnGame.target =
            generateNumber(
                1,
                maximum
            );

    }


    dlnGame.firstAttempt =
        restore
            ? dlnGame.firstAttempt
            : true;

    dlnGame.hintUsed =
        restore
           ? dlnGame.hintUsed
           : false;


    dlnGame.awaitingNextLevel =
        false;


    dlnElements.numberInput.value =
        "";


    dlnElements.level.textContent =
        dlnGame.level;


    dlnElements.instruction.textContent =
        `Guess a number between 1 and ${maximum}.`;


    dlnElements.attempts.textContent =
        dlnGame.attempts;


    dlnElements.superHits.textContent =
        dlnGame.superHits;


    dlnElements.score.textContent =
        dlnGame.score;


    updateDlnRecord();

    clearDlnFeedback();


    dlnElements.hintButton.hidden =
        dlnGame.attempts <= DLN.HINT_COST;


    dlnElements.nextButton.hidden =
        true;


    dlnElements.restartButton.hidden =
        true;


    dlnElements.validateButton.hidden =
        false;


    dlnElements.validateButton.className =
        "dln-primary-button";


    dlnElements.validateButton.disabled =
        false;


    dlnElements.numberInput.disabled =
        false;


    saveDlnState();


    setTimeout(() => {

        dlnElements.numberInput.focus();

    }, 100);

}


/* =========================================================
   GENERATE RANDOM NUMBER
   ========================================================= */

function generateNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


/* =========================================================
   VALIDATE GUESS
   ========================================================= */

function validateDlnGuess() {

    if (!dlnGame.active) {
        return;
    }


    const rawValue =
        dlnElements.numberInput.value.trim();


    const guess =
        Number(rawValue);


    const maximum =
        dlnGame.level * DLN.STEP;


    /* Invalid input */

    if (
        rawValue === "" ||
        !Number.isInteger(guess)
    ) {

        showDlnFeedback(
            "Please enter a whole number.",
            "invalid"
        );

        shakeInput(
            dlnElements.numberInput
        );

        return;
    }


    /* Outside range */

    if (
        guess < 1 ||
        guess > maximum
    ) {

        showDlnFeedback(
            `Choose a number between 1 and ${maximum}.`,
            "invalid"
        );

        shakeInput(
            dlnElements.numberInput
        );

        return;
    }


    /* Correct */

    if (
        guess === dlnGame.target
    ) {

        /*
         * We disable the input and validate &
         * hint buttons when correct number is guessed.
         */
        const numberInput =
            document.getElementById(
                "dlnNumber"
            );

        const validateButton =
            document.getElementById(
                "dlnValidate"
            );


        if (numberInput) {
            numberInput.disabled = true;
        }


        if (validateButton) {

            validateButton.disabled =
                true;

            //validateButton.className =
            //    "dln-secondary-button";

            validateButton.classList.add(
                "dln-secondary-button"
            );

        }


        dlnElements.hintButton.hidden =
            true;


        handleCorrectGuess();

        return;
    }


    /* Incorrect */

    dlnGame.attempts--;

    dlnGame.firstAttempt =
        false;


    updateDlnStats();

    saveDlnState();


    const distance =
        Math.abs(
            guess - dlnGame.target
        );


    const proximity =
        (maximum * 3) / 10;


    const close =
        distance <= proximity;


    if (
        guess < dlnGame.target
    ) {

        showDlnFeedback(
            close
                ? "↑ Too low, but you're close!"
                : "↑ Too low. Keep going!",
            "low"
        );

    } else {

        showDlnFeedback(
            close
                ? "↓ Too high, but you're close!"
                : "↓ Too high. Keep going!",
            "high"
        );

    }


    /* No attempts remaining */

    if (
        dlnGame.attempts <= 0
    ) {

        dlnGame.attempts =
            0;

        updateDlnStats();

        endDlnGame();

    }

}


/* =========================================================
   CORRECT GUESS
   ========================================================= */

function handleCorrectGuess() {

    const level =
        dlnGame.level;


    let bonusAttempts =
        DLN.BONUS;


    dlnGame.attempts +=
        bonusAttempts;


    /* First attempt = Super Hit */

    if (
        dlnGame.firstAttempt &&
        !dlnGame.hintUsed
    ) {

        dlnGame.superHits++;

        dlnGame.attempts +=
            DLN.BONUS;


        /*
        showDlnFeedback(
            "🔥 Super Hit! +10 attempts!",
            "success"
        );
        */


        showDlnFeedback(
            `🔥 Super hit! You found the number ${dlnGame.target} on your first attempt! +${DLN.BONUS * 2} attempts.`,
            "success"
        );


        /* Every 5 super hits */

        if (
            dlnGame.superHits %
            DLN.BONUS === 0
        ) {

            setTimeout(() => {

                dlnGame.attempts +=
                    DLN.BONUS;


                showDlnFeedback(
                    `⭐ Bonus Unlocked! ${dlnGame.superHits} super hits achieved! +${DLN.BONUS} extra attempts.`,
                    "record"
                );


                updateDlnStats();

                saveDlnState();

            }, 450);

        }

    } else {

        /*
        showDlnFeedback(
            `✨ Correct! The number was ${dlnGame.target}.`,
            "success"
        );
        */


        showDlnFeedback(
            `🎉 Well done! You found the number ${dlnGame.target}! +${DLN.BONUS} attempts.`,
            "success"
        );

    }


    /*
     * Score is calculated using the level that
     * has just been completed.
     */
    dlnGame.score =
        ((dlnGame.level - 1) * DLN.STEP) +
        (dlnGame.superHits * DLN.BONUS);


    /*
     * Final level
     */

    if (
        level >= DLN.MAX_LEVEL
    ) {

        dlnGame.level =
            DLN.MAX_LEVEL;

        dlnGame.target =
            null;

        updateDlnStats();

        saveDlnState();


        setTimeout(
            completeEntireDlnGame,
            650
        );

        return;
    }


    /*
     * Every 20 levels
     */

    if (
        level % (DLN.STEP * 2) === 0
    ) {

        setTimeout(() => {

            /*
            showDlnFeedback(
                "🎁 Level milestone! Bonus attempts awarded.",
                "record"
            );
            */

            dlnGame.attempts +=
                DLN.BONUS;


            showDlnFeedback(
                `🎁 Milestone bonus! Level ${level} passed! +${DLN.BONUS} extra attempts.`,
                "record"
            );


            updateDlnStats();

            saveDlnState();

        }, 450);

    }


    /*
     * Move to the next level logically, but do not
     * generate its target yet.
     *
     * This lets the saved state represent exactly
     * what is shown on the level-complete screen.
     */
    dlnGame.level++;

    dlnGame.target =
        null;

    dlnGame.awaitingNextLevel =
        true;


    updateDlnStats();

    saveDlnState();


    /*
     * Record
     */

    if (
        dlnGame.score >
        window.dlnRecord
    ) {

        window.dlnRecord =
            dlnGame.score;

        saveDlnRecord();

        updateDlnRecord();


        setTimeout(() => {

            showDlnFeedback(
                `🏅 NEW RECORD! ${dlnGame.player} set a new game record with ${dlnGame.score} points.`,
                "record"
            );

        }, 450);

    }


    setTimeout(() => {

        showDlnLevelComplete();

    }, 750);

}


/* =========================================================
   LEVEL COMPLETE
   ========================================================= */

function showDlnLevelComplete() {

    dlnElements.result.hidden =
        false;


    dlnElements.resultIcon.textContent =
        "😎";


    dlnElements.resultTitle.textContent =
        `Well done, ${dlnGame.player}!`;


    dlnElements.resultMessage.textContent =
        `You passed level ${dlnGame.level - 1}. Ready for level ${dlnGame.level}?`;


    dlnElements.resultContinue.hidden =
        false;


    dlnElements.resultRestart.hidden =
        false;

}


/* =========================================================
   CONTINUE
   ========================================================= */

function continueDlnGame() {

    /*
     * We enable the input and validate button each
     * new start of game level.
     */
    const numberInput =
        document.getElementById(
            "dlnNumber"
        );

    const validateButton =
        document.getElementById(
            "dlnValidate"
        );


    if (numberInput) {

        numberInput.disabled =
            false;

        numberInput.value =
            "";

    }


    if (validateButton) {

        validateButton.disabled =
            false;

        validateButton.className =
            "dln-primary-button";

    }


    dlnElements.result.hidden =
        true;


    clearDlnFeedback();


    startDlnLevel();

}


/* =========================================================
   END GAME
   ========================================================= */

function endDlnGame() {

    dlnGame.active =
        false;

    dlnGame.awaitingNextLevel =
        false;


    clearDlnState();


    dlnElements.validateButton.hidden =
        true;


    dlnElements.hintButton.hidden =
        true;


    dlnElements.numberInput.disabled =
        true;


    dlnElements.result.hidden =
        false;


    dlnElements.resultIcon.textContent =
        "😔";


    dlnElements.resultTitle.textContent =
        "Game Over";


    dlnElements.resultMessage.textContent =
        `${dlnGame.player}, your adventure ends at level ${dlnGame.level}. The number was ${dlnGame.target}.`;


    dlnElements.resultContinue.hidden =
        true;


    dlnElements.resultRestart.hidden =
        false;


    showDlnFeedback(
        `The number was ${dlnGame.target}.`,
        "failure"
    );

}


/* =========================================================
   COMPLETE ENTIRE GAME
   ========================================================= */

function completeEntireDlnGame() {

    dlnGame.active =
        false;

    dlnGame.awaitingNextLevel =
        false;

    dlnGame.target =
        null;


    clearDlnState();


    dlnElements.validateButton.hidden =
        true;


    dlnElements.hintButton.hidden =
        true;


    dlnElements.numberInput.disabled =
        true;


    dlnElements.result.hidden =
        false;


    dlnElements.resultIcon.textContent =
        "🏆";


    dlnElements.resultTitle.textContent =
        `Congratulations, ${dlnGame.player}!`;


    dlnElements.resultMessage.textContent =
        `You completed all ${DLN.MAX_LEVEL} levels of DLN with a score of ${dlnGame.score}.`;


    dlnElements.resultContinue.hidden =
        true;


    dlnElements.resultRestart.hidden =
        false;


    if (
        dlnGame.score >
        window.dlnRecord
    ) {

        window.dlnRecord =
            dlnGame.score;

        saveDlnRecord();

        updateDlnRecord();

    }

}


/* =========================================================
   RESTART
   ========================================================= */

function restartDlnGame() {

    /*
     * Restart means a completely new run.
     *
     * The record is intentionally preserved.
     */
    clearDlnState();


    dlnElements.result.hidden =
        true;


    dlnGame.player =
        dlnGame.player || "Player";


    dlnGame.level =
        1;


    dlnGame.attempts =
        DLN.DEFAULT_ATTEMPTS;


    dlnGame.superHits =
        0;


    dlnGame.target =
        null;


    dlnGame.score =
        0;


    dlnGame.active =
        true;


    dlnGame.firstAttempt =
        true;

   
    dlnGame.hintUsed =
        false;


    dlnGame.awaitingNextLevel =
        false;


    startDlnLevel();

}


/* =========================================================
   SCORE
   ========================================================= */

function updateDlnStats() {

    dlnGame.score =
        ((dlnGame.level - 1) * DLN.STEP) +
        (dlnGame.superHits * DLN.BONUS);


    dlnElements.attempts.textContent =
        dlnGame.attempts;


    dlnElements.superHits.textContent =
        dlnGame.superHits;


    dlnElements.score.textContent =
        dlnGame.score;


    updateDlnRecord();

}


/* =========================================================
   RECORD
   ========================================================= */

function updateDlnRecord() {

    dlnElements.record.textContent =
        window.dlnRecord;

}


function saveDlnRecord() {

    localStorage.setItem(
        DLN_RECORD_KEY,
        String(window.dlnRecord)
    );

}


/* =========================================================
   STORAGE
   ========================================================= */

function saveDlnState() {

    if (!dlnGame.active) {
        return;
    }


    const state = {

        player:
            dlnGame.player,

        level:
            dlnGame.level,

        attempts:
            dlnGame.attempts,

        superHits:
            dlnGame.superHits,

        target:
            dlnGame.target,

        score:
            dlnGame.score,

        active:
            dlnGame.active,

        firstAttempt:
            dlnGame.firstAttempt,

        hintUsed: 
            dlnGame.hintUsed,

        awaitingNextLevel:
            dlnGame.awaitingNextLevel

    };


    localStorage.setItem(
        DLN_STORAGE_KEY,
        JSON.stringify(state)
    );

}


function loadDlnState() {

    const savedState =
        localStorage.getItem(
            DLN_STORAGE_KEY
        );


    if (!savedState) {
        return false;
    }


    try {

        const state =
            JSON.parse(savedState);


        if (
            !state ||
            typeof state !== "object"
        ) {

            clearDlnState();

            return false;
        }


        /*
         * Validate the essential saved values.
         */
        if (
            typeof state.player !== "string" ||
            !state.player.trim()
        ) {

            clearDlnState();

            return false;
        }


        if (
            !Number.isInteger(state.level) ||
            state.level < 1 ||
            state.level > DLN.MAX_LEVEL
        ) {

            clearDlnState();

            return false;
        }


        if (
            !Number.isInteger(state.attempts) ||
            state.attempts < 0
        ) {

            clearDlnState();

            return false;
        }


        if (
            !Number.isInteger(state.superHits) ||
            state.superHits < 0
        ) {

            clearDlnState();

            return false;
        }


        if (
            !Number.isFinite(state.score) ||
            state.score < 0
        ) {

            clearDlnState();

            return false;
        }


        if (
            typeof state.active !== "boolean"
        ) {

            clearDlnState();

            return false;
        }


        if (
            typeof state.firstAttempt !== "boolean"
        ) {

            clearDlnState();

            return false;
        }


        if (
            typeof state.awaitingNextLevel !==
            "boolean"
        ) {

            clearDlnState();

            return false;
        }


        /*
         * If the saved game is currently inside a level,
         * the target must be valid for that level.
         */
        if (
            state.active &&
            !state.awaitingNextLevel
        ) {

            const maximum =
                state.level * DLN.STEP;


            if (
                !Number.isInteger(state.target) ||
                state.target < 1 ||
                state.target > maximum
            ) {

                clearDlnState();

                return false;
            }

        }


        /*
         * Restore the validated state.
         */
        dlnGame.player =
            state.player;

        dlnGame.level =
            state.level;

        dlnGame.attempts =
            state.attempts;

        dlnGame.superHits =
            state.superHits;

        dlnGame.target =
            state.target;

        dlnGame.score =
            state.score;

        dlnGame.active =
            state.active;

        dlnGame.firstAttempt =
            state.firstAttempt;
       
        dlnGame.hintUsed =
            hintUsed;

        dlnGame.awaitingNextLevel =
            state.awaitingNextLevel;


        return true;

    } catch (error) {

        console.warn(
            "DLN: unable to restore saved game.",
            error
        );


        clearDlnState();

        return false;
    }

}


function clearDlnState() {

    localStorage.removeItem(
        DLN_STORAGE_KEY
    );

}


/* =========================================================
   HINT
   ========================================================= */

function showDlnHint() {

    if (
        dlnGame.attempts <= DLN.HINT_COST
    ) {

        showDlnFeedback(
            "You need more than 11 attempts to use a hint.",
            "invalid"
        );

        return;
    }


    const guess =
        Number(
            dlnElements.numberInput.value
        );


    let reference;


    if (
        Number.isInteger(guess)
    ) {

        reference =
            guess;

    } else {

        reference =
            (dlnGame.level * DLN.STEP) / 2;

    }


    const distance =
        Math.abs(
            dlnGame.target - reference
        );


    const direction =
        dlnGame.target > reference
            ? "higher"
            : dlnGame.target < reference
                ? "lower"
                : "around";


    showDlnFeedback(
        `💡 The target is ${distance} step(s) ${direction} from ${reference} (-${DLN.HINT_COST} attempts).`,
        "record"
    );

    dlnGame.hintUsed =
        true;

    dlnGame.attempts -=
        DLN.HINT_COST;


    updateDlnStats();

    saveDlnState();


    dlnElements.hintButton.hidden =
        dlnGame.attempts <= DLN.HINT_COST;

}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showDlnFeedback(
    message,
    type = ""
) {

    const element =
        dlnElements.feedback;


    element.className =
        "dln-feedback";


    /*
     * Force the animation to restart when
     * the same notification is displayed twice.
     */
    void element.offsetWidth;


    element.textContent =
        message;


    element.classList.add(
        "show",
        type
    );

}


function showStartFeedback(
    message,
    type = ""
) {

    const element =
        dlnElements.startFeedback;


    element.className =
        "dln-feedback";


    void element.offsetWidth;


    element.textContent =
        message;


    element.classList.add(
        "show",
        type
    );

}


function clearDlnFeedback() {

    dlnElements.feedback.className =
        "dln-feedback";


    dlnElements.feedback.textContent =
        "";

}


function shakeInput(element) {

    element.classList.remove(
        "shake"
    );


    void element.offsetWidth;


    element.classList.add(
        "shake"
    );


    setTimeout(() => {

        element.classList.remove(
            "shake"
        );

    }, 450);

}


/* =========================================================
   PUBLIC RESET
   ========================================================= */

export function resetDLN() {

    clearDlnState();


    dlnGame.player =
        "Player";


    dlnGame.level =
        1;


    dlnGame.attempts =
        DLN.DEFAULT_ATTEMPTS;


    dlnGame.superHits =
        0;


    dlnGame.target =
        null;


    dlnGame.score =
        0;


    dlnGame.active =
        false;


    dlnGame.firstAttempt =
        true;

    dlnGame.hintUsed =
        false;


    dlnGame.awaitingNextLevel =
        false;


    if (dlnElements.feedback) {
        clearDlnFeedback();
    }


    updateDlnStartScreen();

}
