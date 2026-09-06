// Main Website - Firebase live integration
const firebaseConfig = {
    apiKey: "AIzaSyDvwxmIQHAGLx7Lt6r38rHFLQVUznHvJp8",
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
    }

    window.addEventListener('DOMContentLoaded', loadWebsiteContent);
} catch (error) {
    console.warn('Firebase website integration could not start:', error);
}
