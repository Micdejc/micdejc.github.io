/* ========================================
   NAVIGATION DROPDOWNS
   Main navigation: About, Research,
   Insights, Community
   Utility menus: Tools and Explore
   DLN statistics help
======================================== */

(() => {
    // Prevent duplicate initialisation.
    if (window.utilityDropdownsInitialized) return;
    window.utilityDropdownsInitialized = true;

    /* ========================================
       UTILITY DROPDOWNS
    ======================================== */

    function closeUtilityDropdown(dropdown, returnFocus = false) {
        dropdown.classList.remove("is-open");

        const toggle = dropdown.querySelector(".utility-menu-toggle");

        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");

            if (returnFocus) {
                toggle.focus();
            }
        }
    }

    function closeAllUtilityDropdowns(except = null) {
        document.querySelectorAll(".utility-dropdown").forEach((dropdown) => {
            if (dropdown !== except) {
                closeUtilityDropdown(dropdown);
            }
        });
    }

    /* ========================================
       MAIN NAVIGATION DROPDOWNS
       Uses native <details> and <summary>
    ======================================== */

    function closeMainDropdowns(except = null) {
        document.querySelectorAll(
            ".nav-links .nav-dropdown > details[open]"
        ).forEach((details) => {
            if (details !== except) {
                details.open = false;
            }
        });
    }

    /* ========================================
       DLN STATISTICS HELP
    ======================================== */

    function closeDLNStatHelp() {
        const message = document.getElementById("dlnStatHelpMessage");

        document.querySelectorAll(".dln-stat-help").forEach((button) => {
            button.setAttribute("aria-expanded", "false");
        });

        if (message) {
            message.hidden = true;
            message.textContent = "";
        }
    }

    function initialiseDLNStatHelp() {
        // Event delegation also supports dynamically added DLN content.
        document.addEventListener("click", (event) => {
            const button = event.target.closest(".dln-stat-help");

            if (!button) return;

            const message = document.getElementById("dlnStatHelpMessage");

            if (!message) return;

            const wasExpanded =
                button.getAttribute("aria-expanded") === "true";

            // Reset all statistic help buttons.
            document.querySelectorAll(".dln-stat-help").forEach((item) => {
                item.setAttribute("aria-expanded", "false");
            });

            // Clicking the active button closes its explanation.
            if (wasExpanded) {
                message.hidden = true;
                message.textContent = "";
                return;
            }

            // Display the selected statistic's explanation.
            button.setAttribute("aria-expanded", "true");
            message.textContent = button.dataset.help || "";
            message.hidden = false;
        });
    }

    // Initialise DLN help independently of navigation dropdowns.
    initialiseDLNStatHelp();

    /* ========================================
       CLICK HANDLING
    ======================================== */

    document.addEventListener("click", (event) => {
        // Main navigation dropdown trigger.
        const summary = event.target.closest(
            ".nav-links .nav-dropdown > details > summary"
        );

        if (summary) {
            const currentDetails = summary.parentElement;

            // Let the browser toggle <details> first.
            setTimeout(() => {
                if (currentDetails.open) {
                    closeMainDropdowns(currentDetails);
                }
            }, 0);

            // Close utility menus when opening main navigation.
            closeAllUtilityDropdowns();

            return;
        }

        // Utility dropdown trigger.
        const utilityToggle = event.target.closest(
            ".utility-menu-toggle"
        );

        if (utilityToggle) {
            const dropdown = utilityToggle.closest(".utility-dropdown");

            if (!dropdown) return;

            const wasOpen = dropdown.classList.contains("is-open");

            // Close other utility menus.
            closeAllUtilityDropdowns(dropdown);

            // Close any open main navigation menu.
            closeMainDropdowns();

            if (wasOpen) {
                closeUtilityDropdown(dropdown);
            } else {
                dropdown.classList.add("is-open");
                utilityToggle.setAttribute("aria-expanded", "true");
            }

            return;
        }

        // Utility action button, such as Search or Dark mode.
        const utilityButton = event.target.closest(
            ".utility-menu button"
        );

        if (utilityButton) {
            const dropdown = utilityButton.closest(".utility-dropdown");

            if (dropdown) {
                closeUtilityDropdown(dropdown);
            }

            // Preserve the button's existing action.
            return;
        }

        // Click outside the main navigation and utility menus.
        if (!event.target.closest(".nav-links")) {
            closeMainDropdowns();
        }

        if (!event.target.closest(".utility-dropdown")) {
            closeAllUtilityDropdowns();
        }
    });

    /* ========================================
       KEYBOARD SUPPORT
    ======================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        // Close DLN statistics help.
        closeDLNStatHelp();

        // Close the open utility dropdown.
        const openUtilityDropdown = document.querySelector(
            ".utility-dropdown.is-open"
        );

        if (openUtilityDropdown) {
            closeUtilityDropdown(openUtilityDropdown, true);
        }

        // Close the open main navigation dropdown.
        const openMainDropdown = document.querySelector(
            ".nav-links .nav-dropdown > details[open]"
        );

        if (openMainDropdown) {
            openMainDropdown.open = false;

            const summary = openMainDropdown.querySelector("summary");

            if (summary) {
                summary.focus();
            }
        }
    });
})();
