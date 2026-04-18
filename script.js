const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const cvButton = document.querySelector('.btn');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});
cvButton.addEventListener('click', (e) => {
    e.preventDefault();
    const cvLink = document.createElement('a');
    cvLink.href = '#'; 
    cvLink.download = 'Mahek_CV';
    cvLink.click();
});

function resetAnimations() {
    const header = document.querySelector('header');
const barAnimation = document.querySelector('.bars-animation');

    
    header.classList.remove('active');
    void header.offsetWidth; 
    header.classList.add('active');

    
    barAnimation.classList.remove('active');
    void barAnimation.offsetWidth; 
    barAnimation.classList.add('active');
}

function showSection(index) {
    sections.forEach(sec => sec.classList.remove('active'));
    if (sections[index]) {
        sections[index].classList.add('active');
    }
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}
 
navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();  

        if (link.classList.contains('active')) return;

        resetAnimations();

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        setTimeout(() => {
            showSection(idx);
        }, 1100);
    });
});

const resumeBtns = document.querySelectorAll('.resume-btn');
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


document.addEventListener('DOMContentLoaded', () => {

    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    const arrowRight = document.getElementById('next');
    const arrowLeft  = document.getElementById('prev');
    const imgSlide   = document.querySelector('.portfolio-carousel .img-slide');
    const imgItems   = document.querySelectorAll('.img-item');

    const totalSlides = imgItems.length;
    let index = 0;

    function updateSlider() {
        imgSlide.style.transform = `translateX(-${index * 100}%)`;

        portfolioDetails.forEach(d => d.classList.remove('active'));
        if (portfolioDetails[index]) {
            portfolioDetails[index].classList.add('active');
        }
        arrowRight.disabled = (index === totalSlides - 2);
        arrowLeft.disabled = (index === 0);
    }

    arrowRight.addEventListener('click', () => {
        if (index < totalSlides - 2) {
            index++;
            updateSlider();
        }
    });

    arrowLeft.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateSlider();
        }
    });
    updateSlider();

});

