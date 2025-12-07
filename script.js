/* ================================
   DOKUMENTASI JAVASCRIPT
   Website Laut Banda - Abyss
   
   Fitur-fitur:
   1. Sidebar Toggle untuk berita
   2. Navbar scroll effect
   3. Smooth scrolling
   4. Contact form handling
   5. Modal functionality
   ================================ */

// ===== INISIALISASI SAAT HALAMAN DIMUAT =====
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initNavbar();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
});

// ===== FUNGSI SIDEBAR =====
// Menangani pembukaan dan penutupan sidebar berita
function initSidebar() {
    const sidebar = document.getElementById('newsSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const toggleIcon = sidebarToggle.querySelector('i');
    
    // Event listener untuk tombol toggle
    sidebarToggle.addEventListener('click', function() {
        // Toggle class 'active' untuk sidebar dan tombol
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        
        // Ubah arah icon panah
        if (sidebar.classList.contains('active')) {
            toggleIcon.classList.remove('fa-chevron-left');
            toggleIcon.classList.add('fa-chevron-right');
        } else {
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-left');
        }
    });
    
    // Tutup sidebar saat klik di luar area sidebar
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);
        
        // Jika klik di luar sidebar dan bukan pada toggle button
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-left');
        }
    });
}

// ===== FUNGSI NAVBAR =====
// Membuat navbar berubah style saat di-scroll
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        // Tambahkan class 'scrolled' jika scroll lebih dari 50px
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Highlight menu aktif berdasarkan section yang terlihat
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Cek apakah section sedang terlihat di viewport
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active state pada nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SMOOTH SCROLLING =====
// Membuat scroll halus saat klik menu navigasi
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip jika href hanya '#'
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Hitung posisi dengan offset navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll ke section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Tutup mobile menu jika terbuka
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Scroll down arrow di hero section
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const floraSection = document.getElementById('flora');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            window.scrollTo({
                top: floraSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        });
    }
}

// ===== CONTACT FORM =====
// Menangani submit form kontak
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai dari form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validasi sederhana
            if (name && email && message) {
                // Tampilkan alert sukses
                alert('Terima kasih ' + name + '! Pesan Anda telah dikirim.');
                
                // Reset form
                contactForm.reset();
                
                // Di sini Anda bisa menambahkan kode untuk mengirim data ke server
                // Contoh:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     body: JSON.stringify({name, email, message}),
                //     headers: {'Content-Type': 'application/json'}
                // });
            } else {
                alert('Mohon lengkapi semua field!');
            }
        });
    }
}

// ===== FUNGSI UNTUK MEMBUKA BERITA =====
// Dipanggil saat user klik card berita di sidebar
function openNews(url) {
    // Buka link berita di tab baru
    window.open(url, '_blank');
    
    // Optional: Tambahkan tracking analytics
    console.log('Opening news:', url);
}

// ===== SCROLL ANIMATIONS =====
// Menambahkan animasi saat element masuk viewport
function initScrollAnimations() {
    // Intersection Observer untuk animasi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe semua section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== UTILITY FUNCTIONS =====

// Fungsi untuk mendeteksi device mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Fungsi debounce untuk optimasi performa scroll event
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ADDITIONAL FEATURES =====

// Preload images untuk performa lebih baik
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Dark mode toggle (opsional - bisa ditambahkan nanti)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            // Simpan preferensi ke localStorage
            const isLightMode = document.body.classList.contains('light-mode');
            localStorage.setItem('lightMode', isLightMode);
        });
        
        // Load preferensi dari localStorage
        const savedMode = localStorage.getItem('lightMode');
        if (savedMode === 'true') {
            document.body.classList.add('light-mode');
        }
    }
}

// Back to top button (opsional)
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
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
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
        }
    }, 100));
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initBackToTop();

// ===== CONSOLE MESSAGE =====
// Pesan untuk developer
console.log('%c🌊 Website Laut Banda - Abyss', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped with ❤️', 'color: #6AABD8; font-size: 14px;');