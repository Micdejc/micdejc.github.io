
/* ========================================
   NAVIGATION UTILITY DROPDOWNS
   Tools and Explore
======================================== */

(() => {
    // Prevent duplicate initialisation.
    if (window.utilityDropdownsInitialized) return;
    window.utilityDropdownsInitialized = true;

    function closeDropdown(dropdown, returnFocus = false) {
        dropdown.classList.remove("is-open");

        const toggle = dropdown.querySelector(".utility-menu-toggle");

        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");

            if (returnFocus) {
                toggle.focus();
            }
        }
    }

    function closeAllDropdowns(except = null) {
        document.querySelectorAll(".utility-dropdown").forEach((dropdown) => {
            if (dropdown !== except) {
                closeDropdown(dropdown);
            }
        });
    }

    // Handle clicks anywhere on the page.
    document.addEventListener("click", (event) => {
        const toggle = event.target.closest(".utility-menu-toggle");

        // A Tools or Explore trigger was clicked.
        if (toggle) {
            const dropdown = toggle.closest(".utility-dropdown");

            if (!dropdown) return;

            const wasOpen = dropdown.classList.contains("is-open");

            closeAllDropdowns(dropdown);

            if (wasOpen) {
                closeDropdown(dropdown);
            } else {
                dropdown.classList.add("is-open");
                toggle.setAttribute("aria-expanded", "true");
            }

            return;
        }

        // A button inside a utility menu was clicked.
        const utilityButton = event.target.closest(".utility-menu button");

        if (utilityButton) {
            const dropdown = utilityButton.closest(".utility-dropdown");

            if (dropdown) {
                closeDropdown(dropdown);
            }

            // Do not prevent the button's existing action.
            return;
        }

        // Click outside the utility dropdowns.
        if (!event.target.closest(".utility-dropdown")) {
            closeAllDropdowns();
        }
    });

    // Keyboard support.
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        const openDropdown = document.querySelector(
            ".utility-dropdown.is-open"
        );

        if (openDropdown) {
            closeDropdown(openDropdown, true);
        }
    });
})();

