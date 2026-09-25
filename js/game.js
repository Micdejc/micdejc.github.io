/* =========================================================
   DLN - Deviner Le Nombre
   GitHub Pages version
   No PHP / No database
   ========================================================= */

/*
 * Session-only record.
 *
 * Because this is a GitHub Pages game, the record is kept
 * in JavaScript memory only.
 *
 * Refreshing the page resets the record.
 */
window.dlnRecord = 0;


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
    firstAttempt: true
};


/* =========================================================
   CONSTANTS
   ========================================================= */

const DLN = {
    MAX_LEVEL: 100,
    STEP: 10,
    DEFAULT_ATTEMPTS: 5,
    BONUS: 5,
    HINT_COST: 11
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
        modal: document.getElementById("gameModal"),
        backdrop: document.getElementById("gameModalBackdrop"),
        openButton: document.getElementById("gameToggle"),
        closeButton: document.getElementById("gameModalClose"),

        startScreen: document.getElementById("dlnStartScreen"),
        gameScreen: document.getElementById("dlnGameScreen"),

        playerName: document.getElementById("dlnPlayerName"),
        startButton: document.getElementById("dlnStartButton"),
        startFeedback: document.getElementById("dlnStartFeedback"),

        level: document.getElementById("dlnLevel"),
        instruction: document.getElementById("dlnInstruction"),

        attempts: document.getElementById("dlnAttempts"),
        superHits: document.getElementById("dlnSuperHits"),
        score: document.getElementById("dlnScore"),
        record: document.getElementById("dlnRecord"),

        feedback: document.getElementById("dlnFeedback"),

        numberInput: document.getElementById("dlnNumber"),
        validateButton: document.getElementById("dlnValidate"),

        hintButton: document.getElementById("dlnHint"),
        nextButton: document.getElementById("dlnNext"),
        restartButton: document.getElementById("dlnRestart"),

        result: document.getElementById("dlnResult"),
        resultIcon: document.getElementById("dlnResultIcon"),
        resultTitle: document.getElementById("dlnResultTitle"),
        resultMessage: document.getElementById("dlnResultMessage"),
        resultContinue: document.getElementById("dlnResultContinue"),
        resultRestart: document.getElementById("dlnResultRestart")
    };

    if (!dlnElements.modal) {
        console.warn("DLN: game modal was not found.");
        return;
    }

    bindDlnEvents();
    updateDlnRecord();

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
                dlnElements.modal?.classList.contains("is-open")
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

    dlnElements.modal.classList.add("is-open");
    dlnElements.modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("game-modal-open");

    setTimeout(() => {
        if (!dlnGame.active) {
            dlnElements.playerName?.focus();
        } else {
            dlnElements.numberInput?.focus();
        }
    }, 250);
}


function closeGameModal() {

    dlnElements.modal.classList.remove("is-open");
    dlnElements.modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("game-modal-open");
}


/* =========================================================
   START GAME
   ========================================================= */

function startDlnGame() {

    const name =
        dlnElements.playerName.value.trim();

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

    dlnGame.player =
        name || "Player";

    dlnGame.level = 1;
    dlnGame.attempts = DLN.DEFAULT_ATTEMPTS;
    dlnGame.superHits = 0;
    dlnGame.score = 0;
    dlnGame.active = true;
    dlnGame.firstAttempt = true;

    dlnElements.startScreen.hidden = true;
    dlnElements.gameScreen.hidden = false;
    dlnElements.result.hidden = true;

    startDlnLevel();

}


/* =========================================================
   START LEVEL
   ========================================================= */

function startDlnLevel() {

    if (dlnGame.level > DLN.MAX_LEVEL) {
        completeEntireDlnGame();
        return;
    }

    const maximum =
        dlnGame.level * DLN.STEP;

    dlnGame.target =
        generateNumber(1, maximum);

    dlnGame.firstAttempt = true;

    dlnElements.numberInput.value = "";

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

    dlnElements.nextButton.hidden = true;
    dlnElements.restartButton.hidden = true;

    dlnElements.validateButton.hidden = false;
    dlnElements.numberInput.disabled = false;

    setTimeout(() => {
        dlnElements.numberInput.focus();
    }, 100);

}


/* =========================================================
   GENERATE RANDOM NUMBER
   ========================================================= */

function generateNumber(min, max) {

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

    const guess = Number(rawValue);

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

    if (guess === dlnGame.target) {

        /* We disable the input and validate button when correct number is guessed */
        const numberInput = document.getElementById("dlnNumber");
        const validateButton = document.getElementById("dlnValidate");

        if (numberInput) {
            numberInput.disabled = true;
        }    

        if (validateButton) {
            validateButton.disabled = true;
            validateButton.className = "dln-secondary-button";
        }      
       
        handleCorrectGuess();

        return;
    }


    /* Incorrect */

    dlnGame.attempts--;
    dlnGame.firstAttempt = false;

    updateDlnStats();

    const distance =
        Math.abs(
            guess - dlnGame.target
        );

    const proximity =
        (maximum * 3) / 10;

    const close =
        distance <= proximity;


    if (guess < dlnGame.target) {

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

    if (dlnGame.attempts <= 0) {

        dlnGame.attempts = 0;

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

    let bonusAttempts = DLN.BONUS;

    dlnGame.attempts += bonusAttempts;


    /* First attempt = Super Hit */

    if (dlnGame.firstAttempt) {

        dlnGame.superHits++;

        dlnGame.attempts += DLN.BONUS;

        showDlnFeedback(
            "🔥 Super Hit! +10 attempts!",
            "success"
        );

    } else {

        showDlnFeedback(
            `✨ Correct! The number was ${dlnGame.target}.`,
            "success"
        );

    }


    dlnGame.level++;

    updateDlnStats();


    /* Record */

    if (dlnGame.score > window.dlnRecord) {

        window.dlnRecord =
            dlnGame.score;

        updateDlnRecord();

    }


    /* Final level */

    if (
        level >= DLN.MAX_LEVEL
    ) {

        setTimeout(
            completeEntireDlnGame,
            650
        );

        return;
    }


    /* Every 20 levels */

    if (
        level % 20 === 0
    ) {

        setTimeout(() => {

            showDlnFeedback(
                "🎁 Level milestone! Bonus attempts awarded.",
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

    dlnElements.result.hidden = false;

    dlnElements.resultIcon.textContent =
        "✨";

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

    /* We enable the input and validate button each new start of game level */
    const numberInput = document.getElementById("dlnNumber");
    const validateButton = document.getElementById("dlnValidate");

    if (numberInput) {
        numberInput.disabled = false;
        numberInput.value = "";
    }

    if (validateButton) {
        validateButton.disabled = false;
        validateButton.className = "dln-primary-button";
    }
   

    dlnElements.result.hidden = true;

    clearDlnFeedback();

    startDlnLevel();

}


/* =========================================================
   END GAME
   ========================================================= */

function endDlnGame() {

    dlnGame.active = false;

    dlnElements.validateButton.hidden = true;
    dlnElements.hintButton.hidden = true;

    dlnElements.numberInput.disabled = true;

    dlnElements.result.hidden = false;

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

    dlnGame.active = false;

    dlnElements.validateButton.hidden = true;
    dlnElements.hintButton.hidden = true;
    dlnElements.numberInput.disabled = true;

    dlnElements.result.hidden = false;

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
        dlnGame.score > window.dlnRecord
    ) {

        window.dlnRecord =
            dlnGame.score;

        updateDlnRecord();

    }

}


/* =========================================================
   RESTART
   ========================================================= */

function restartDlnGame() {

    dlnElements.result.hidden = true;

    dlnGame.player =
        dlnGame.player || "Player";

    dlnGame.level = 1;
    dlnGame.attempts =
        DLN.DEFAULT_ATTEMPTS;

    dlnGame.superHits = 0;
    dlnGame.score = 0;
    dlnGame.active = true;

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
        reference = guess;
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
        `💡 The target is ${distance} step(s) ${direction} from ${reference}.`,
        "record"
    );

    dlnGame.attempts -=
        DLN.HINT_COST;

    updateDlnStats();

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

    element.classList.remove("shake");

    void element.offsetWidth;

    element.classList.add("shake");

    setTimeout(() => {

        element.classList.remove("shake");

    }, 450);

}


/* =========================================================
   PUBLIC RESET
   ========================================================= */

export function resetDLN() {

    dlnGame.player = "Player";
    dlnGame.level = 1;
    dlnGame.attempts =
        DLN.DEFAULT_ATTEMPTS;

    dlnGame.superHits = 0;
    dlnGame.target = null;
    dlnGame.score = 0;
    dlnGame.active = false;

    clearDlnFeedback();

}
