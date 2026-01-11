/* ================================
   DOKUMENTASI JAVASCRIPT - SCRIPT UTAMA
   Website Laut Banda - Abyss
   
   File ini berisi fungsi-fungsi tambahan
   Fungsi utama ada di components-loader.js
   ================================ */

// ===== UTILITY FUNCTIONS =====
// Fungsi-fungsi bantuan yang digunakan di berbagai bagian website

// Fungsi untuk mendeteksi apakah user menggunakan device mobile
function isMobile() {
    // Return true jika lebar layar <= 768px
    return window.innerWidth <= 768;
}

// Fungsi debounce untuk optimasi performa scroll event
// Berguna untuk mengurangi frekuensi eksekusi function saat scroll
function debounce(func, wait) {
    let timeout;
    // Return function yang akan dieksekusi setelah delay
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PRELOAD IMAGES =====
// Fungsi untuk lazy loading images agar performa lebih baik
function preloadImages() {
    // Ambil semua image dengan attribute data-src
    const images = document.querySelectorAll('img[data-src]');
    
    // Buat observer untuk detect image masuk viewport
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika image terlihat di viewport
            if (entry.isIntersecting) {
                const img = entry.target;
                // Load image dari data-src ke src
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                // Stop observing image ini
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observe semua images
    images.forEach(img => imageObserver.observe(img));
}

// ===== BACK TO TOP BUTTON =====
// Membuat tombol untuk scroll kembali ke atas halaman
function initBackToTop() {
    // Buat element button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    
    // Style inline untuk button
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-blue);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    `;
    
    // Tambahkan button ke body
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button berdasarkan scroll position
    window.addEventListener('scroll', debounce(function() {
        // Show button jika scroll lebih dari 500px
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    }, 100));
    
    // Event listener untuk klik button - scroll ke atas
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== DARK MODE TOGGLE (OPSIONAL) =====
// Fungsi untuk toggle dark/light mode
// Bisa diaktifkan jika ingin menambahkan fitur dark mode
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Cek apakah toggle button ada
    if (darkModeToggle) {
        // Event listener untuk toggle
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            // Simpan preferensi ke localStorage agar persisten
            const isLightMode = document.body.classList.contains('light-mode');
            localStorage.setItem('lightMode', isLightMode);
        });
        
        // Load preferensi dari localStorage saat halaman dimuat
        const savedMode = localStorage.getItem('lightMode');
        if (savedMode === 'true') {
            document.body.classList.add('light-mode');
        }
    }
}

// ===== SCROLL DOWN ARROW =====
// Fungsi untuk scroll down arrow di hero section
function initScrollDownArrow() {
    const scrollDown = document.querySelector('.scroll-down');
    
    // Cek apakah element ada
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            // Scroll ke section flora
            const floraSection = document.getElementById('flora');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (floraSection) {
                window.scrollTo({
                    top: floraSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== INISIALISASI FITUR TAMBAHAN =====
// Jalankan fungsi-fungsi tambahan saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tunggu sebentar agar components selesai dimuat terlebih dahulu
    setTimeout(function() {
        // Inisialisasi back to top button
        initBackToTop();
        
        // Inisialisasi scroll down arrow
        initScrollDownArrow();
        
        // Inisialisasi preload images jika ada
        preloadImages();
        
        // Optional: Aktifkan dark mode jika diperlukan
        // initDarkMode();
    }, 500);
});

// ===== CONSOLE MESSAGE =====
// Pesan untuk developer di console browser
console.log('%c🌊 Website Laut Banda - Abyss', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped with ❤️', 'color: #6AABD8; font-size: 14px;');
console.log('%cKode terorganisir dengan component-based architecture', 'color: #2E5C8A; font-size: 12px;');

// ===== EXPORT FUNCTIONS (jika diperlukan di file lain) =====
// Uncomment jika menggunakan ES6 modules
// export { isMobile, debounce, preloadImages };