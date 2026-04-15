// 1. Header Sticky au scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Menu Mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');
const links = document.querySelectorAll('.nav-link');

const toggleMenu = () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
};

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

links.forEach(link => link.addEventListener('click', () => {
    if(navLinks.classList.contains('active')) toggleMenu();
}));

// 3. Force le scroll fluide pour le bouton Hero (Sécurité si le CSS ne suffit pas)
const heroBtn = document.getElementById('hero-btn');
heroBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    window.scrollTo({
        top: contactSection.offsetTop - 70, // Compense le menu fixe
        behavior: 'smooth'
    });
});

// 4. Détection du Scroll pour surligner le menu et afficher les éléments (Fade-up)
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
const fadeElements = document.querySelectorAll('.fade-up');

const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });

            const fades = entry.target.querySelectorAll('.fade-up');
            fades.forEach(el => el.classList.add('visible'));
            
            if(entry.target.classList.contains('fade-up')) {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

window.addEventListener('load', () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('visible');
    });
});