/* ================================
   LOADER UNTUK COMPONENTS
   File ini memuat semua component HTML
   ke dalam halaman utama secara dinamis
   ================================ */

// ===== FUNGSI UNTUK MEMUAT COMPONENT =====
// Fungsi ini mengambil file HTML component dan memasukkannya ke dalam elemen tertentu
async function loadComponent(componentPath, targetElementId) {
    try {
        // Fetch file component dari path yang diberikan
        const response = await fetch(componentPath);
        
        // Cek apakah fetch berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Ambil content HTML dari response
        const html = await response.text();
        
        // Masukkan HTML ke dalam target element
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
        
        return true;
    } catch (error) {
        // Log error jika terjadi masalah
        console.error(`Error loading component ${componentPath}:`, error);
        return false;
    }
}

// ===== LOAD SEMUA COMPONENTS SAAT HALAMAN DIMUAT =====
document.addEventListener('DOMContentLoaded', async function() {
    // Array berisi semua component yang perlu dimuat
    // Format: [path component, id target element]
    const components = [
        ['components/sidebar.html', 'sidebar-container'],
        ['components/beranda.html', 'beranda-container'],
        ['components/flora.html', 'flora-container'],
        ['components/fauna.html', 'fauna-container'],
        ['components/galeri.html', 'galeri-container'],
        ['components/fakta.html', 'fakta-container'],
        ['components/lokasi.html', 'lokasi-container'],
        ['components/kontak.html', 'kontak-container'],
        ['components/footer.html', 'footer-container']
    ];
    
    // Load semua component secara berurutan
    for (const [componentPath, targetId] of components) {
        await loadComponent(componentPath, targetId);
    }
    
    // Setelah semua component dimuat, inisialisasi fitur-fitur
    initializeFeatures();
});

// ===== INISIALISASI SEMUA FITUR SETELAH COMPONENTS DIMUAT =====
function initializeFeatures() {
    // Inisialisasi sidebar toggle
    initSidebar();
    
    // Inisialisasi navbar effects
    initNavbar();
    
    // Inisialisasi smooth scrolling
    initSmoothScroll();
    
    // Inisialisasi contact form
    initContactForm();
    
    // Inisialisasi scroll animations
    initScrollAnimations();
}

// ===== FUNGSI SIDEBAR =====
// Menangani pembukaan dan penutupan sidebar berita
function initSidebar() {
    const sidebar = document.getElementById('newsSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Cek apakah element sidebar dan toggle ada
    if (!sidebar || !sidebarToggle) return;
    
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

// ===== FUNGSI UNTUK MEMBUKA BERITA =====
// Fungsi untuk membuka link berita di tab baru
function openNews(url) {
    window.open(url, '_blank');
}

// ===== FUNGSI NAVBAR =====
// Membuat navbar berubah style saat di-scroll
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Efek navbar saat scroll
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
        
        // Cek section mana yang sedang terlihat
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

// ===== FUNGSI SMOOTH SCROLL =====
// Membuat scrolling halus saat klik menu navigasi
function initSmoothScroll() {
    // Ambil semua link navigasi
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Cegah default behavior
            e.preventDefault();
            
            // Ambil target section dari href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll ke target section dengan smooth behavior
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Tutup navbar mobile jika terbuka
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// ===== FUNGSI CONTACT FORM =====
// Handle submit form kontak
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    // Cek apakah form ada
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // Prevent form dari submit default
        e.preventDefault();
        
        // Ambil nilai dari form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validasi form
        if (!name || !email || !message) {
            alert('Mohon isi semua field!');
            return;
        }
        
        // Di sini bisa ditambahkan logic untuk mengirim data ke server
        // Untuk sekarang, hanya menampilkan alert sukses
        alert(`Terima kasih ${name}! Pesan Anda telah dikirim.`);
        
        // Reset form setelah submit
        contactForm.reset();
    });
}

// ===== FUNGSI SCROLL ANIMATIONS =====
// Menambahkan animasi saat element muncul di viewport
function initScrollAnimations() {
    // Observer untuk detect element yang masuk viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // Jika element terlihat, tambahkan class 'visible'
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe semua section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}
