
/* ========================================
   NAVIGATION UTILITY DROPDOWNS
   Tools and Explore
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".utility-dropdown");

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector(".utility-menu-toggle");
        const menu = dropdown.querySelector(".utility-menu");

        if (!toggle || !menu) return;

        // Ensure the initial state is closed.
        dropdown.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");

        // Give the dropdown panel an accessible identifier.
        if (!menu.id) {
            menu.id = `utility-menu-${Math.random()
                .toString(36)
                .slice(2, 9)}`;
        }

        toggle.setAttribute("aria-controls", menu.id);

        // Toggle the dropdown when its trigger is clicked.
        toggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const shouldOpen = !dropdown.classList.contains("is-open");

            // Close other utility dropdowns first.
            dropdowns.forEach((otherDropdown) => {
                otherDropdown.classList.remove("is-open");

                const otherToggle = otherDropdown.querySelector(
                    ".utility-menu-toggle"
                );

                if (otherToggle) {
                    otherToggle.setAttribute("aria-expanded", "false");
                }
            });

            // Open the selected dropdown if it was previously closed.
            if (shouldOpen) {
                dropdown.classList.add("is-open");
                toggle.setAttribute("aria-expanded", "true");
            }
        });

        // Keep clicks inside the dropdown from triggering outside-click logic.
        menu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        // Close the dropdown after activating a utility button.
        menu.querySelectorAll("button").forEach((button) => {
            button.addEventListener("click", () => {
                dropdown.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });

        // Keyboard support: Escape closes and returns focus to the trigger.
        dropdown.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.focus();
            }
        });
    });

    // Close utility dropdowns when clicking anywhere outside them.
    document.addEventListener("click", (event) => {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("is-open");

                const toggle = dropdown.querySelector(
                    ".utility-menu-toggle"
                );

                if (toggle) {
                    toggle.setAttribute("aria-expanded", "false");
                }
            }
        });
    });
});

