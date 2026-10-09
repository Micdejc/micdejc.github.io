
/* ========================================
   NAVIGATION DROPDOWNS
   Main navigation: About, Research,
   Insights, Community
   Utility menus: Tools and Explore
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

            // Keep utility menus separate, but close them
            // when opening a main navigation dropdown.
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

        const openUtilityDropdown = document.querySelector(
            ".utility-dropdown.is-open"
        );

        if (openUtilityDropdown) {
            closeUtilityDropdown(openUtilityDropdown, true);
        }

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
