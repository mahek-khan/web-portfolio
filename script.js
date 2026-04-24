document.addEventListener('DOMContentLoaded', () => {

    const navLinks     = document.querySelectorAll('header nav a');
    const sections     = document.querySelectorAll('section');
    const menuIcon     = document.querySelector('#menu-icon');
    const navbar       = document.querySelector('header nav');
    const header       = document.querySelector('header');
    const barAnimation = document.querySelector('.bars-animation');
    const cvButton     = document.querySelector('.btn-sci .btn');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    if (cvButton) {
        cvButton.addEventListener('click', (e) => {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = 'cv.pdf';
            link.download = 'Mahek_Khan_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    const typingEl = document.querySelector('.typing-text');
    const words    = ['frontend Developer', 'backend Developer', 'coder'];
    let wordIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 60 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex  = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();

    function resetAnimations() {
        header.classList.remove('active');
        void header.offsetWidth;
        header.classList.add('active');

        barAnimation.classList.remove('active', 'hide');
        void barAnimation.offsetWidth;
        barAnimation.classList.add('active');
    }

    function showSection(index) {
        sections.forEach(sec => {
            sec.classList.remove('active');
            sec.scrollTop = 0;
        });
        if (sections[index]) {
            sections[index].classList.add('active');
            sections[index].scrollTop = 0;
        }
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    navLinks.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (link.classList.contains('active')) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
                return;
            }

            resetAnimations();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            setTimeout(() => { showSection(idx); }, 1100);
        });
    });

    const resumeBtns    = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            resumeBtns.forEach(b => b.classList.remove('active'));
            resumeDetails.forEach(d => d.classList.remove('active'));
            btn.classList.add('active');
            if (resumeDetails[idx]) resumeDetails[idx].classList.add('active');
        });
    });

    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    const arrowRight       = document.getElementById('next');
    const arrowLeft        = document.getElementById('prev');
    const imgSlide         = document.querySelector('.portfolio-carousel .img-slide');
    const imgItems         = document.querySelectorAll('.portfolio-carousel .img-item');

    if (imgSlide && arrowRight && arrowLeft) {
        const total = imgItems.length;
        let current = 0;

        imgSlide.style.display  = 'flex';
        imgSlide.style.width    = `${total * 100}%`;
        imgSlide.style.transition = 'transform 0.5s ease';

        imgItems.forEach(item => {
            item.style.width     = `${100 / total}%`;
            item.style.minWidth  = `${100 / total}%`;
            item.style.flexShrink = '0';
            item.style.boxSizing = 'border-box';
        });

        function updateSlider() {
            imgSlide.style.transform = `translateX(-${current * (100 / total)}%)`;

            portfolioDetails.forEach(d => d.classList.remove('active'));
            if (portfolioDetails[current]) portfolioDetails[current].classList.add('active');

            arrowLeft.disabled  = current <= 0;
            arrowRight.disabled = current >= total - 1;
        }

        arrowRight.addEventListener('click', () => {
            if (current < total - 1) { current++; updateSlider(); }
        });

        arrowLeft.addEventListener('click', () => {
            if (current > 0) { current--; updateSlider(); }
        });

        let touchStartX = 0;
        imgSlide.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        imgSlide.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && current < total - 1) current++;
                else if (diff < 0 && current > 0) current--;
                updateSlider();
            }
        }, { passive: true });

        updateSlider();
    }

});
