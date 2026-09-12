// Main Website - Firebase live integration
const firebaseConfig = {
    apiKey: "AIzaSyBdhcN_5FXIaBOidpa_M9zB7ErKzvmufgk",
    authDomain: "seti-river-resort.firebaseapp.com",
    databaseURL: "https://seti-river-resort-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "seti-river-resort",
    storageBucket: "seti-river-resort.firebasestorage.app",
    messagingSenderId: "652103463409",
    appId: "1:652103463409:web:9b293fd6c6a980487fd450"
};

try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    window.firebaseDB = database;

    function setPhone(phone) {
        const clean = String(phone || '').trim();
        const href = clean ? `tel:${clean.replace(/[^+\d]/g, '')}` : '#';
        document.querySelectorAll('[data-phone]').forEach(el => {
            el.textContent = clean;
        });
        document.querySelectorAll('#heroCallBtn, #footerPhoneLink, .private-phone-link').forEach(el => {
            el.href = href;
        });
    }

    function loadWebsiteContent() {
        const fallbackLinks = {
            facebook: 'https://www.facebook.com/',
            instagram: 'https://www.instagram.com/',
            tiktok: 'https://www.tiktok.com/'
        };

        database.ref('social-media').on('value', snapshot => {
            const data = snapshot.val() || {};
            ['facebook', 'instagram', 'tiktok'].forEach(name => {
                const el = document.getElementById(name + 'Btn');
                if (!el) return;

                const socialLink = data[name] || fallbackLinks[name];
                el.href = socialLink;
                el.target = '_blank';
                el.rel = 'noopener noreferrer';
                el.style.display = 'inline-flex';
            });
        });

        database.ref('contact-info').on('value', snapshot => {
            const data = snapshot.val() || {};
            setPhone(data.phone || '+9779856070331');
            const fallbackEmail = 'setiriverresort@gmail.com';
            document.querySelectorAll('[data-email]').forEach(el => {
                el.textContent = data.email || fallbackEmail;
            });
        });

        database.ref('website-content/logo').on('value', snapshot => {
            const source = snapshot.val()?.src || 'logo.png';
            document.querySelectorAll('.brand img').forEach(img => {
                img.src = source;
            });
            let favicon = document.querySelector('link[rel="icon"]');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.rel = 'icon';
                favicon.type = 'image/png';
                document.head.appendChild(favicon);
            }
            favicon.href = source;
        });

        database.ref('website-content/aboutIcons').on('value', snapshot => {
            const defaults = {
                location: 'fa-solid fa-location-dot',
                pool: 'fa-solid fa-person-swimming',
                rooms: 'fa-solid fa-bed',
                experience: 'fa-solid fa-mountain-sun'
            };
            const data = snapshot.val() || {};
            document.querySelectorAll('[data-about-icon]').forEach(container => {
                const key = container.dataset.aboutIcon;
                const item = data[key] || {};
                container.replaceChildren();
                if (item.image) {
                    const image = document.createElement('img');
                    image.src = item.image;
                    image.alt = '';
                    container.appendChild(image);
                    return;
                }
                const icon = document.createElement('i');
                icon.className = item.iconClass || defaults[key] || 'fa-solid fa-star';
                icon.setAttribute('aria-hidden', 'true');
                container.appendChild(icon);
            });
        });
    }

    window.addEventListener('DOMContentLoaded', loadWebsiteContent);
} catch (error) {
    console.warn('Firebase website integration could not start:', error);
}
