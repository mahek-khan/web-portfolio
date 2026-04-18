document.addEventListener('DOMContentLoaded', () => {

    /* ================= SELECTORS ================= */
    const navLinks      = document.querySelectorAll('header nav a');
    const sections      = document.querySelectorAll('section');
    const menuIcon      = document.querySelector('#menu-icon');
    const navbar        = document.querySelector('header nav');
    const header        = document.querySelector('header');
    const barAnimation  = document.querySelector('.bars-animation');
    /* Target CV btn specifically — the one inside .btn-sci */
    const cvButton      = document.querySelector('.btn-sci .btn');

    /* ================= MOBILE MENU ================= */
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    /* ================= DOWNLOAD CV ================= */
    if (cvButton) {
        cvButton.addEventListener('click', (e) => {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = 'cv.pdf'; // ← replace with your actual file path
            link.download = 'Mahek_Khan_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    /* ================= ANIMATION RESET ================= */
    function resetAnimations() {
        header.classList.remove('active');
        void header.offsetWidth;
        header.classList.add('active');

        barAnimation.classList.remove('active', 'hide');
        void barAnimation.offsetWidth;
        barAnimation.classList.add('active');
    }

    /* ================= SHOW SECTION ================= */
    function showSection(index) {
        sections.forEach(sec => {
            sec.classList.remove('active');
            sec.scrollTop = 0; // reset scroll when leaving
        });
        if (sections[index]) {
            sections[index].classList.add('active');
            sections[index].scrollTop = 0; // start new section at top
        }
        /* Close mobile menu */
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    /* ================= NAV LINKS ================= */
    navLinks.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (link.classList.contains('active')) {
                /* Already active — just close mobile menu */
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
                return;
            }

            resetAnimations();

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            setTimeout(() => {
                showSection(idx);
            }, 1100);
        });
    });

    /* ================= RESUME BUTTONS ================= */
    const resumeBtns    = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            resumeBtns.forEach(b => b.classList.remove('active'));
            resumeDetails.forEach(d => d.classList.remove('active'));
            btn.classList.add('active');
            if (resumeDetails[idx]) {
                resumeDetails[idx].classList.add('active');
            }
        });
    });

    /* ================= PORTFOLIO SLIDER ================= */
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    const arrowRight       = document.getElementById('next');
    const arrowLeft        = document.getElementById('prev');
    const imgSlide         = document.querySelector('.portfolio-carousel .img-slide');
    const imgItems         = document.querySelectorAll('.portfolio-carousel .img-item');

    if (imgSlide && arrowRight && arrowLeft) {
        const totalSlides = imgItems.length; // e.g. 8
        let currentIndex  = 0;

        function updateSlider() {
            imgSlide.style.transform = `translateX(-${currentIndex * 100}%)`;

            portfolioDetails.forEach(d => d.classList.remove('active'));
            if (portfolioDetails[currentIndex]) {
                portfolioDetails[currentIndex].classList.add('active');
            }

            /* Fix: disable at last index (totalSlides - 1), not totalSlides - 2 */
            arrowRight.disabled = (currentIndex >= totalSlides - 1);
            arrowLeft.disabled  = (currentIndex <= 0);
        }

        arrowRight.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        arrowLeft.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        /* ---- Touch / Swipe support for mobile ---- */
        let touchStartX = 0;
        let touchEndX   = 0;
        const SWIPE_THRESHOLD = 50; // px

        imgSlide.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        imgSlide.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                if (diff > 0 && currentIndex < totalSlides - 1) {
                    currentIndex++; // swipe left → next
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--; // swipe right → prev
                }
                updateSlider();
            }
        }, { passive: true });

        /* Initialise */
        updateSlider();
    }

});
