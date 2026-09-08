const firstEl = document.querySelector('.hero-title .ht-first');
const lastEl = document.querySelector('.hero-title .ht-last');
const subTextEl = document.querySelector('.hero-subtitle .sub-text');
const firstCursor = document.querySelector('.hero-title .first-name .type-cursor');
const lastCursor = document.querySelector('.hero-title .last-name .type-cursor');
const subCursor = document.querySelector('.hero-subtitle .type-cursor');

const firstText = 'LUCAS';
const lastText = 'ALM0NACID';
const subText = 'FR0NTEND & BACKEND';

function setCursor(which) {
    firstCursor.style.visibility = which === 'first' ? 'visible' : 'hidden';
    lastCursor.style.visibility = which === 'last' ? 'visible' : 'hidden';
    subCursor.style.visibility = which === 'sub' ? 'visible' : 'hidden';
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function typeInto(el, text, speed = 60) {
    for (let i = 0; i <= text.length; i++) {
        el.textContent = text.slice(0, i);
        await sleep(speed);
    }
}

async function eraseFrom(el, speed = 30) {
    const len = el.textContent.length;
    for (let i = len; i >= 0; i--) {
        el.textContent = el.textContent.slice(0, i);
        await sleep(speed);
    }
}

async function loop() {
    while (true) {
        setCursor('first');
        await typeInto(firstEl, firstText, 70);
        setCursor('last');
        await typeInto(lastEl, lastText, 70);

        setCursor('sub');
        await typeInto(subTextEl, subText, 55);
        await sleep(1200);

        await eraseFrom(subTextEl, 35);
        await sleep(200);

        setCursor('last');
        await eraseFrom(lastEl, 35);
        setCursor('first');
        await eraseFrom(firstEl, 35);
        await sleep(700);
    }
}

loop();

// --- Typewriter de "About me" ---
const aboutLine1 = document.querySelector('.about-line-1');
const aboutLine2 = document.querySelector('.about-line-2');
const aboutCursors = document.querySelectorAll('#about-card .about-cursor');

const aboutText1 = 'Web development student || Web ecosystem (Frontend & Backend)';
const aboutText2 = 'Passionate about technology and software development. I dedicate my training to building web applications, integrating user interfaces with server-side logic and relational databases. Currently expanding my skills across different programming languages and software tools.';

function setAboutCursor(index) {
    aboutCursors.forEach((c, i) => {
        c.style.visibility = i === index ? 'visible' : 'hidden';
    });
}

let aboutPlayed = false;
let aboutObserver;

async function animateAbout() {
    setAboutCursor(0);
    aboutLine1.textContent = '';
    aboutLine2.textContent = '';
    await typeInto(aboutLine1, aboutText1, 12);
    setAboutCursor(1);
    await typeInto(aboutLine2, aboutText2, 6);
    aboutObserver.disconnect();
}

const aboutCard = document.getElementById('about-card');
aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !aboutPlayed) {
            aboutPlayed = true;
            animateAbout();
        }
    });
}, { threshold: 0.3 });

aboutObserver.observe(aboutCard);

// --- Typewriter de "Services" ---
const svcTexts = document.querySelectorAll('#services-card .svc-text');
const svcCursors = document.querySelectorAll('#services-card .svc-cursor');

const servicesLines = [
    'FRONTEND',
    '-Responsive web layout design (HTML, CSS, JS, mobile-first approach)',
    '-Landing pages and web platforms with interactive user interfaces (JS, form handling, validation)',
    'BACKEND',
    '-Server-side logic with PHP (form processing, data handling)',
    '-Integration and connectivity with MySQL / relational databases',
    '-Authentication architecture (user login / registration)'
];

function setSvcCursor(index) {
    svcCursors.forEach((c, i) => {
        c.style.visibility = i === index ? 'visible' : 'hidden';
    });
}

let svcPlayed = false;
let svcObserver;

async function animateServices() {
    for (let i = 0; i < svcTexts.length; i++) {
        setSvcCursor(i);
        await typeInto(svcTexts[i], servicesLines[i], 6);
    }
    svcObserver.disconnect();
}

const servicesCard = document.getElementById('services-card');
svcObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !svcPlayed) {
            svcPlayed = true;
            animateServices();
        }
    });
}, { threshold: 0.3 });

svcObserver.observe(servicesCard);

// --- Typewriter de "Contact" ---
const contactTextEl = document.querySelector('.contact-text');
const contactCursor = document.querySelector('.contact-cursor');

const contactText = 'datatech.contacto@gmail.com';

let contactPlayed = false;
let contactObserver;

async function animateContact() {
    contactCursor.style.visibility = 'visible';
    contactTextEl.textContent = '';
    await typeInto(contactTextEl, contactText, 30);
    contactObserver.disconnect();
}

const contactCard = document.getElementById('contact');
contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !contactPlayed) {
            contactPlayed = true;
            animateContact();
        }
    });
}, { threshold: 0.3 });

contactObserver.observe(contactCard);

// --- Copiar dirección de correo al portapapeles ---
const copyBtn = document.querySelector('.copy-btn');

async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

copyBtn.addEventListener('click', async () => {
    try {
        await copyToClipboard(contactText);
        copyBtn.textContent = 'COPIED!';
    } catch (err) {
        copyBtn.textContent = 'ERROR';
    }
    setTimeout(() => {
        copyBtn.textContent = 'COPY';
    }, 2000);
});

// --- Scroll-spy de la barra lateral ---
const verticalLinks = document.querySelectorAll('.vertical-nav a');
const sectionIds = ['home', 'about', 'services'];

verticalLinks.forEach(link => link.classList.remove('active'));
const firstLink = document.querySelector('.vertical-nav a[href="#home"]');
if (firstLink) firstLink.classList.add('active');

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            verticalLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector('.vertical-nav a[href="#' + entry.target.id + '"]');
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) spyObserver.observe(el);
});

// --- Typewriter de los títulos (tech-title) ---
const techTitles = document.querySelectorAll('.tech-title');

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h = entry.target;
            const textEl = h.querySelector('.tt-text');
            typeInto(textEl, h.dataset.text, 30).then(() => {
                h.querySelector('.tt-cursor').style.visibility = 'hidden';
                titleObserver.unobserve(h);
            });
        }
    });
}, { threshold: 0.5 });

techTitles.forEach(t => titleObserver.observe(t));

// --- Menú hamburguesa del navbar ---
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
});

navbar.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
    });
});

// --- Invertir colores del botón al hacer scroll ---
window.addEventListener('scroll', () => {
    navToggle.classList.toggle('scrolled', window.scrollY > 10);
});