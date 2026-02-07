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

// ===== FUNGSI UNTUK MEMPOSISIKAN ULANG MODALS KE BODY =====
// Ini memperbaiki masalah modal content yang tidak tampil karena overflow:hidden pada parent sections
function repositionModals() {
    // Ambil semua modal elements
    const modals = document.querySelectorAll('.modal');
    
    // Pindahkan setiap modal ke body agar tidak terpotong oleh overflow:hidden
    modals.forEach(modal => {
        // Jika modal ada di dalam container flora/fauna
        const parentContainer = modal.closest('#flora-container, #fauna-container');
        if (parentContainer) {
            // Pindahkan modal ke body
            document.body.appendChild(modal);
        }
    });
}

// ===== INISIALISASI SEMUA FITUR SETELAH COMPONENTS DIMUAT =====
function initializeFeatures() {
    // Pindahkan modals ke body PERTAMA KALI sebelum inisialisasi lainnya
    repositionModals();
    
    // Inisialisasi sidebar toggle
    initSidebar();
    
    // Inisialisasi navbar effects
    initNavbar();
    
    // Inisialisasi smooth scrolling
    initSmoothScroll();
    
    // Inisialisasi carousel pagination
    initCarouselPagination();
    
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
    
    // Event listener untuk tombol toggle
    sidebarToggle.addEventListener('click', function() {
        // Toggle class 'active' untuk sidebar dan tombol
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        // Toggle class pada body untuk shift content
        document.body.classList.toggle('sidebar-open');
    });
    
    // Tutup sidebar saat klik di luar area sidebar
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);
        
        // Jika klik di luar sidebar dan bukan pada toggle button
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            sidebarToggle.classList.remove('active');
            // Remove class dari body saat sidebar ditutup
            document.body.classList.remove('sidebar-open');
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
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Fungsi untuk set active menu (hanya satu yang aktif)
    function setActiveMenu(menuId) {
        // Hapus active dari semua nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Tambahkan active ke menu yang sesuai
        if (menuId) {
            const activeLink = document.querySelector(`.nav-link[href="#${menuId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Efek navbar saat scroll
    window.addEventListener('scroll', function() {
        // Tambahkan class 'scrolled' jika scroll lebih dari 50px
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active menu berdasarkan section yang sedang terlihat
    window.addEventListener('scroll', function() {
        let current = '';
        
        // Cek section mana yang sedang terlihat
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Cek apakah section sedang terlihat di viewport (dengan offset 100px)
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Set active menu sesuai section yang terlihat
        setActiveMenu(current);
    });
    
    // Event listener untuk setiap nav link saat diklik
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ambil target id dari href
            const targetId = this.getAttribute('href').substring(1); // Remove '#'
            
            // Set active menu langsung (tanpa menunggu scroll event)
            setActiveMenu(targetId);
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
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// ===== FUNGSI CAROUSEL PAGINATION =====
// Menangani carousel dan update pagination saat slide berubah
function initCarouselPagination() {
    // Ambil semua carousel di halaman
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const carouselId = carousel.getAttribute('id');
        
        // Cek apakah carousel memiliki ID
        if (!carouselId) return;
        
        // Ambil bootstrap carousel instance
        const bootstrapCarousel = new bootstrap.Carousel(carousel, {
            interval: 2000 // Auto-slide setiap 2 detik
        });
        
        // Ambil semua pagination links untuk carousel ini
        const paginationLinks = document.querySelectorAll(`a[data-bs-target="#${carouselId}"][data-bs-slide-to]`);
        
        // Inisialisasi active state pagination
        function updatePagination() {
            const activeSlide = carousel.querySelector('.carousel-item.active');
            const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(activeSlide);
            
            // Hapus active dari semua pagination links
            paginationLinks.forEach(link => {
                link.parentElement.classList.remove('active');
            });
            
            // Tambahkan active ke pagination link yang sesuai
            if (paginationLinks[activeIndex]) {
                paginationLinks[activeIndex].parentElement.classList.add('active');
            }
        }
        
        // Update pagination saat carousel berubah
        carousel.addEventListener('slid.bs.carousel', function() {
            updatePagination();
        });
        
        // Handle pagination link clicks
        paginationLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default href behavior
                
                // Slide ke index yang ditentukan
                bootstrapCarousel.to(index);
                updatePagination();
            });
        });
        
        // Initial update pagination
        updatePagination();
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
