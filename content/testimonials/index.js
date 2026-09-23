/* =========================================================
   TESTIMONIALS
========================================================= */

const testimonialFiles = [

    "amy.html",

    "phil.html",

    "thilini.html",

    "douglas.html",

    "t-scott.html"

];


export async function loadTestimonials() {

    const container =
        document.getElementById(
            "testimonials-list"
        );


    if (!container) {
        return;
    }


    for (const file of testimonialFiles) {

        try {

            const response =
                await fetch(
                    `content/testimonials/${file}`
                );


            if (!response.ok) {

                console.error(
                    `Could not load testimonial: ${file}`
                );

                continue;

            }


            const html =
                await response.text();


            container.insertAdjacentHTML(
                "beforeend",
                html
            );


        } catch (error) {

            console.error(
                `Error loading testimonial ${file}:`,
                error
            );

        }

    }


    initialiseTestimonials();

}


/* =========================================================
   TESTIMONIAL CAROUSEL
========================================================= */

function initialiseTestimonials() {

    const testimonials =
        document.querySelectorAll(
            "#testimonials-list .testimonial"
        );


    const previousButton =
        document.getElementById(
            "previousTestimonial"
        );


    const nextButton =
        document.getElementById(
            "nextTestimonial"
        );


    const counter =
        document.getElementById(
            "testimonialCounter"
        );


    if (
        !testimonials.length ||
        !previousButton ||
        !nextButton ||
        !counter
    ) {
        return;
    }


    let currentIndex = 0;

    let autoScroll;


    function updateCarousel() {

        testimonials.forEach(
            (testimonial, index) => {

                testimonial.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );


        counter.textContent =
            `${currentIndex + 1} / ${testimonials.length}`;

    }


    function nextTestimonial() {

        currentIndex =
            (currentIndex + 1) %
            testimonials.length;

        updateCarousel();

    }


    function previousTestimonial() {

        currentIndex =
            (
                currentIndex -
                1 +
                testimonials.length
            ) %
            testimonials.length;

        updateCarousel();

    }


    function startAutoScroll() {

        clearInterval(autoScroll);


        autoScroll =
            setInterval(
                nextTestimonial,
                6000
            );

    }


    function pauseAndRestart() {

        clearInterval(autoScroll);

        startAutoScroll();

    }


    nextButton.addEventListener(
        "click",
        function () {

            nextTestimonial();

            pauseAndRestart();

        }
    );


    previousButton.addEventListener(
        "click",
        function () {

            previousTestimonial();

            pauseAndRestart();

        }
    );


    const carousel =
        document.getElementById(
            "testimonials-list"
        );


    carousel.addEventListener(
        "mouseenter",
        function () {

            clearInterval(autoScroll);

        }
    );


    carousel.addEventListener(
        "mouseleave",
        function () {

            startAutoScroll();

        }
    );


    updateCarousel();

    startAutoScroll();

}
