/* =========================================
   WILD TATTOO — SCRIPT.JS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ANO AUTOMÁTICO DO FOOTER
       ========================================= */

    const footer = document.querySelector("footer");

    if (footer) {
        footer.innerHTML = footer.innerHTML.replace(
            "2026",
            new Date().getFullYear()
        );
    }


    /* =========================================
       NAVEGAÇÃO SUAVE
       ========================================= */

    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    const header = document.querySelector("header");

                    const headerHeight = header
                        ? header.offsetHeight
                        : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    /* =========================================
       ANIMAÇÃO DAS SECÇÕES
       ========================================= */

    const animatedElements = document.querySelectorAll(
        ".card, .title, .design-text, .portfolio-box, .contact-text"
    );

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    animatedElements.forEach(function (element) {

        element.classList.add("scroll-animation");

        observer.observe(element);

    });


    /* =========================================
       HEADER AO FAZER SCROLL
       ========================================= */

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    /* =========================================
       BOTÃO VOLTAR AO TOPO
       ========================================= */

    const backToTop = document.createElement("button");

    backToTop.innerHTML = "↑";

    backToTop.className = "back-to-top";

    backToTop.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================
       BOTÕES DE CONTACTO
       ========================================= */

    const contactButtons =
        document.querySelectorAll(
            '.instagram, .whatsapp'
        );

    contactButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const link = this.getAttribute("href");

            if (!link || link === "#") {

                console.log(
                    "Ainda falta colocar o link deste contacto."
                );

            }

        });

    });


    /* =========================================
       EFEITO NO LOGO
       ========================================= */

    const logo = document.querySelector(".hero-logo");

    if (logo) {

        logo.addEventListener("mouseenter", function () {

            this.style.transform = "scale(1.05)";

        });

        logo.addEventListener("mouseleave", function () {

            this.style.transform = "";

        });

    }

});
