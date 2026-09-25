/* =========================================================
   DLN - Deviner Le Nombre
   GitHub Pages version
   No PHP / No database
   ========================================================= */

const DLN = {
    MAX_LEVEL: 100,
    STEP: 10,
    DEFAULT_ATTEMPTS: 5,
    BONUS: 5,
    HINT_COST: 11
};

// Session-only global record.
// It disappears when the page is refreshed.
if (typeof window.dlnRecord !== "number") {
    window.dlnRecord = 0;
}

const dlnGame = {
    player: "",
    level: 1,
    attempts: DLN.DEFAULT_ATTEMPTS,
    superHits: 0,
    target: null,
    score: 0,
    active: false,
    firstAttempt: true
};


/* =========================================================
   INITIALIZATION
   ========================================================= */

export function initDLN() {
    const modal = document.getElementById("gameModal");

    if (!modal) {
        console.error("DLN: game modal was not found.");
        return;
    }

    bindDlnEvents();

    console.log("DLN: game initialized.");
}


/* =========================================================
   EVENT BINDING
   ========================================================= */

function bindDlnEvents() {

    const gameToggle = document.getElementById("gameToggle");
    const closeButton = document.getElementById("gameModalClose");

    const startButton = document.getElementById("dlnStart");
    const validateButton = document.getElementById("bouton");
    const continueButton = document.getElementById("bouton2");
    const restartButton = document.getElementById("bouton3");
    const hintButton = document.getElementById("boutonIndice");

    const numberInput = document.getElementById("nombre");
    const playerInput = document.getElementById("nom");

    if (gameToggle) {
        gameToggle.addEventListener("click", openGameModal);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeGameModal);
    }

    if (startButton) {
        startButton.addEventListener("click", startDlnGame);
    }

    if (validateButton) {
        validateButton.addEventListener("click", validateDlnGuess);
    }

    if (continueButton) {
        continueButton.addEventListener("click", continueDlnGame);
    }

    if (restartButton) {
        restartButton.addEventListener("click", restartDlnGame);
    }

    if (hintButton) {
        hintButton.addEventListener("click", showDlnHint);
    }

    if (numberInput) {
        numberInput.addEventListener("keydown", event => {

            if (event.key === "Enter" && !numberInput.disabled) {
                event.preventDefault();
                validateDlnGuess();
            }
        });
    }

    if (playerInput) {
        playerInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                event.preventDefault();
                startDlnGame();
            }
        });
    }
}


/* =========================================================
   MODAL
   ========================================================= */

function openGameModal() {

    const modal = document.getElementById("gameModal");

    if (!modal) {
        console.error("DLN: game modal was not found.");
        return;
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("game-modal-open");
}


function closeGameModal() {

    const modal = document.getElementById("gameModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("game-modal-open");
}


/* =========================================================
   START GAME
   ========================================================= */

function startDlnGame() {

    const playerInput = document.getElementById("nom");
    const playerName = playerInput
        ? playerInput.value.trim()
        : "";

    if (!playerName) {
        showDlnFeedback(
            "Player name required",
            "Please enter your name before starting the game.",
            "warning"
        );

        shakeDlnElement(playerInput);
        return;
    }

    if (playerName.length < 3) {
        showDlnFeedback(
            "Name too short",
            "Your name must contain at least 3 characters.",
            "warning"
        );

        shakeDlnElement(playerInput);
        return;
    }

    if (playerName.includes(";")) {
        showDlnFeedback(
            "Invalid name",
            "Please choose a name without the ';' character.",
            "warning"
        );

        shakeDlnElement(playerInput);
        return;
    }

    dlnGame.player = playerName;
    dlnGame.level = 1;
    dlnGame.attempts = DLN.DEFAULT_ATTEMPTS;
    dlnGame.superHits = 0;
    dlnGame.target = null;
    dlnGame.score = 0;
    dlnGame.active = true;
    dlnGame.firstAttempt = true;

    showDlnGameScreen();

    launchDlnLevel();
}


/* =========================================================
   GAME SCREEN
   ========================================================= */

function showDlnGameScreen() {

    const startScreen = document.getElementById("blockNom");
    const gameScreen = document.getElementById("blockJeu");

    if (startScreen) {
        startScreen.style.display = "none";
    }

    if (gameScreen) {
        gameScreen.style.display = "block";
    }
}


/* =========================================================
   LEVEL
   ========================================================= */

function launchDlnLevel() {

    if (!dlnGame.active) {
        return;
    }

    const max = dlnGame.level * DLN.STEP;

    dlnGame.target = generateRandomNumber(1, max);
    dlnGame.attempts = DLN.DEFAULT_ATTEMPTS;
    dlnGame.firstAttempt = true;

    updateDlnStats();
    updateDlnLevelDisplay();

    const numberInput = document.getElementById("nombre");
    const validateButton = document.getElementById("bouton");
    const continueButton = document.getElementById("bouton2");
    const restartButton = document.getElementById("bouton3");

    if (numberInput) {
        numberInput.disabled = false;
        numberInput.value = "";
        numberInput.focus();
    }

    if (validateButton) {
        validateButton.disabled = false;
        validateButton.style.display = "inline-flex";
    }

    if (continueButton) {
        continueButton.style.display = "none";
        continueButton.disabled = false;
    }

    if (restartButton) {
        restartButton.style.display = "none";
        restartButton.disabled = false;
    }

    clearDlnFeedback();

    setDlnInstruction(
        `Find the hidden number between 1 and ${max}.`
    );
}


/* =========================================================
   VALIDATE GUESS
   ========================================================= */

function validateDlnGuess() {

    if (!dlnGame.active) {
        return;
    }

    const numberInput = document.getElementById("nombre");

    if (!numberInput || numberInput.disabled) {
        return;
    }

    const value = numberInput.value.trim();

    if (value === "") {

        showDlnFeedback(
            "Enter a number",
            "Please enter a number before validating your guess.",
            "warning"
        );

        shakeDlnElement(numberInput);
        return;
    }

    const guess = Number(value);

    if (!Number.isInteger(guess)) {

        showDlnFeedback(
            "Invalid number",
            "Please enter a whole number.",
            "warning"
        );

        shakeDlnElement(numberInput);
        return;
    }

    const maximum = dlnGame.level * DLN.STEP;

    if (guess < 1 || guess > maximum) {

        showDlnFeedback(
            "Outside the range",
            `Choose a number between 1 and ${maximum}.`,
            "warning"
        );

        shakeDlnElement(numberInput);
        return;
    }

    if (guess === dlnGame.target) {

        handleCorrectGuess();
        return;
    }

    handleWrongGuess(guess);
}


/* =========================================================
   CORRECT GUESS
   ========================================================= */

function handleCorrectGuess() {

    const numberInput = document.getElementById("nombre");
    const validateButton = document.getElementById("bouton");
    const continueButton = document.getElementById("bouton2");
    const restartButton = document.getElementById("bouton3");

    /*
     * IMPORTANT:
     * Disable the input immediately after the correct answer.
     * The player cannot submit another guess until they choose
     * Continue or Restart.
     */

    if (numberInput) {
        numberInput.disabled = true;
    }

    if (validateButton) {
        validateButton.disabled = true;
    }

    /*
     * Normal correct-answer bonus.
     */
    dlnGame.attempts += DLN.BONUS;

    /*
     * Super hit:
     * If the player found the number on their first attempt,
     * award another bonus.
     */

    if (dlnGame.firstAttempt) {

        dlnGame.superHits += 1;
        dlnGame.attempts += DLN.BONUS;

        showDlnFeedback(
            "🔥 Super hit!",
            `You found the number ${dlnGame.target} on your first attempt! +${DLN.BONUS * 2} attempts.`,
            "success"
        );

    } else {

        showDlnFeedback(
            "🎉 Well done!",
            `You found the number ${dlnGame.target}! +${DLN.BONUS} attempts.`,
            "success"
        );
    }

    /*
     * Move to the completed level.
     */
    dlnGame.level += 1;

    /*
     * Milestone bonus every 20 completed levels.
     * The original game awards the BONUS value.
     */
    if (
        dlnGame.level % 20 === 0 &&
        dlnGame.level <= DLN.MAX_LEVEL
    ) {

        dlnGame.attempts += DLN.BONUS;

        showDlnFeedback(
            "🎁 Milestone bonus!",
            `Level ${dlnGame.level} reached! +${DLN.BONUS} extra attempts.`,
            "success"
        );
    }

    /*
     * Calculate score after completing the level.
     */
    dlnGame.score = calculateDlnScore();

    updateDlnStats();

    /*
     * Check if the player has completed all levels.
     */
    if (dlnGame.level > DLN.MAX_LEVEL) {

        completeDlnGame();
        return;
    }

    /*
     * The player must now explicitly choose Continue or Restart.
     */

    if (continueButton) {
        continueButton.style.display = "inline-flex";
        continueButton.disabled = false;
    }

    if (restartButton) {
        restartButton.style.display = "inline-flex";
        restartButton.disabled = false;
    }

    /*
     * Keep the input disabled.
     */
    if (numberInput) {
        numberInput.disabled = true;
    }

    if (validateButton) {
        validateButton.disabled = true;
    }
}


/* =========================================================
   WRONG GUESS
   ========================================================= */

function handleWrongGuess(guess) {

    dlnGame.firstAttempt = false;

    dlnGame.attempts -= 1;

    if (dlnGame.attempts <= 0) {

        dlnGame.attempts = 0;

        updateDlnStats();

        showDlnFeedback(
            "💥 Game over",
            `The number was ${dlnGame.target}.`,
            "error"
        );

        endDlnGame();

        return;
    }

    let message = "";

    if (guess < dlnGame.target) {

        message = `Too low! Try a number higher than ${guess}.`;

    } else {

        message = `Too high! Try a number lower than ${guess}.`;
    }

    /*
     * Add a more specific distance hint.
     */

    const maximum = dlnGame.level * DLN.STEP;
    const difference = Math.abs(guess - dlnGame.target);

    if (difference <= maximum * 0.3) {
        message += " 🔥 You are very close!";
    } else {
        message += " ❄️ You are still far away.";
    }

    showDlnFeedback(
        guess < dlnGame.target ? "⬆️ Go higher" : "⬇️ Go lower",
        `${message} Attempts remaining: ${dlnGame.attempts}.`,
        guess < dlnGame.target ? "low" : "high"
    );

    updateDlnStats();

    shakeDlnElement(document.getElementById("nombre"));
}


/* =========================================================
   CONTINUE
   ========================================================= */

function continueDlnGame() {

    if (!dlnGame.active) {
        return;
    }

    const continueButton = document.getElementById("bouton2");
    const restartButton = document.getElementById("bouton3");

    if (continueButton) {
        continueButton.style.display = "none";
    }

    if (restartButton) {
        restartButton.style.display = "none";
    }

    launchDlnLevel();

    const numberInput = document.getElementById("nombre");

    if (numberInput) {
        numberInput.disabled = false;
        numberInput.value = "";
        numberInput.focus();
    }

    const validateButton = document.getElementById("bouton");

    if (validateButton) {
        validateButton.disabled = false;
    }
}


/* =========================================================
   RESTART
   ========================================================= */

function restartDlnGame() {

    dlnGame.level = 1;
    dlnGame.attempts = DLN.DEFAULT_ATTEMPTS;
    dlnGame.superHits = 0;
    dlnGame.target = null;
    dlnGame.score = 0;
    dlnGame.active = true;
    dlnGame.firstAttempt = true;

    launchDlnLevel();

    const numberInput = document.getElementById("nombre");
    const validateButton = document.getElementById("bouton");

    if (numberInput) {
        numberInput.disabled = false;
        numberInput.value = "";
        numberInput.focus();
    }

    if (validateButton) {
        validateButton.disabled = false;
    }

    showDlnFeedback(
        "🔄 New game",
        "The game has been restarted. Good luck!",
        "info"
    );
}


/* =========================================================
   END GAME
   ========================================================= */

function endDlnGame() {

    dlnGame.active = false;

    const numberInput = document.getElementById("nombre");
    const validateButton = document.getElementById("bouton");
    const restartButton = document.getElementById("bouton3");
    const continueButton = document.getElementById("bouton2");

    if (numberInput) {
        numberInput.disabled = true;
    }

    if (validateButton) {
        validateButton.disabled = true;
    }

    if (continueButton) {
        continueButton.style.display = "none";
    }

    if (restartButton) {
        restartButton.style.display = "inline-flex";
        restartButton.disabled = false;
    }
}


/* =========================================================
   COMPLETE GAME
   ========================================================= */

function completeDlnGame() {

    dlnGame.active = false;

    const numberInput = document.getElementById("nombre");
    const validateButton = document.getElementById("bouton");
    const continueButton = document.getElementById("bouton2");
    const restartButton = document.getElementById("bouton3");

    if (numberInput) {
        numberInput.disabled = true;
    }

    if (validateButton) {
        validateButton.disabled = true;
    }

    if (continueButton) {
        continueButton.style.display = "none";
    }

    if (restartButton) {
        restartButton.style.display = "inline-flex";
        restartButton.disabled = false;
    }

    const oldRecord = window.dlnRecord;

    if (dlnGame.score > oldRecord) {

        window.dlnRecord = dlnGame.score;

        showDlnFeedback(
            "🏆 NEW RECORD!",
            `${dlnGame.player} finished the game with ${dlnGame.score} points!`,
            "record"
        );

        animateDlnRecord();

    } else {

        showDlnFeedback(
            "🏆 Game completed!",
            `Congratulations ${dlnGame.player}! Your score is ${dlnGame.score}.`,
            "success"
        );
    }
}


/* =========================================================
   SCORE
   ========================================================= */

function calculateDlnScore() {

    return (
        ((dlnGame.level - 1) * DLN.STEP) +
        (dlnGame.superHits * DLN.BONUS)
    );
}


function updateDlnStats() {

    const levelElement = document.getElementById("niveau");
    const attemptsElement = document.getElementById("tentatives");
    const superHitsElement = document.getElementById("supercoups");
    const scoreElement = document.getElementById("score");

    if (levelElement) {
        levelElement.textContent =
            Math.min(dlnGame.level, DLN.MAX_LEVEL);
    }

    if (attemptsElement) {
        attemptsElement.textContent =
            dlnGame.attempts;
    }

    if (superHitsElement) {
        superHitsElement.textContent =
            dlnGame.superHits;
    }

    if (scoreElement) {
        scoreElement.textContent =
            dlnGame.score;
    }
}


function updateDlnLevelDisplay() {

    const levelElement = document.getElementById("niveau");

    if (levelElement) {
        levelElement.textContent = dlnGame.level;
    }
}


/* =========================================================
   HINT
   ========================================================= */

function showDlnHint() {

    if (!dlnGame.active) {
        return;
    }

    if (dlnGame.attempts <= DLN.HINT_COST) {

        showDlnFeedback(
            "💡 Hint unavailable",
            `You need more than ${DLN.HINT_COST} attempts to use a hint.`,
            "warning"
        );

        return;
    }

    dlnGame.attempts -= DLN.HINT_COST;

    const distance = Math.abs(
        dlnGame.target - Math.floor((dlnGame.level * DLN.STEP) / 2)
    );

    let hint;

    if (distance <= DLN.STEP * 0.2) {
        hint = "The number is somewhere near the middle of the range.";
    } else if (dlnGame.target <= (dlnGame.level * DLN.STEP) / 2) {
        hint = "The number is in the lower half of the range.";
    } else {
        hint = "The number is in the upper half of the range.";
    }

    showDlnFeedback(
        "💡 Hint",
        `${hint} (-${DLN.HINT_COST} attempts)`,
        "info"
    );

    updateDlnStats();
}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showDlnFeedback(title, message, type = "info") {

    const notification = document.getElementById("notificationJeu");

    if (!notification) {
        return;
    }

    notification.className = "";
    notification.classList.add("dln-feedback", `dln-${type}`);

    notification.innerHTML = `
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(message)}</span>
    `;

    void notification.offsetWidth;

    notification.classList.add("dln-feedback-show");
}


function clearDlnFeedback() {

    const notification = document.getElementById("notificationJeu");

    if (!notification) {
        return;
    }

    notification.className = "dln-feedback";
    notification.innerHTML = "";
}


function setDlnInstruction(message) {

    const instruction = document.getElementById("instruction");

    if (instruction) {
        instruction.textContent = message;
    }
}


/* =========================================================
   ANIMATION
   ========================================================= */

function shakeDlnElement(element) {

    if (!element) {
        return;
    }

    element.classList.remove("dln-shake");

    void element.offsetWidth;

    element.classList.add("dln-shake");

    setTimeout(() => {
        element.classList.remove("dln-shake");
    }, 500);
}


function animateDlnRecord() {

    const notification = document.getElementById("notificationJeu");

    if (!notification) {
        return;
    }

    notification.classList.add("dln-record-animation");
}


/* =========================================================
   UTILITY
   ========================================================= */

function generateRandomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   RESET
   ========================================================= */

export function resetDLN() {

    dlnGame.player = "";
    dlnGame.level = 1;
    dlnGame.attempts = DLN.DEFAULT_ATTEMPTS;
    dlnGame.superHits = 0;
    dlnGame.target = null;
    dlnGame.score = 0;
    dlnGame.active = false;
    dlnGame.firstAttempt = true;

    const startScreen = document.getElementById("blockNom");
    const gameScreen = document.getElementById("blockJeu");

    if (startScreen) {
        startScreen.style.display = "block";
    }

    if (gameScreen) {
        gameScreen.style.display = "none";
    }

    clearDlnFeedback();
}
