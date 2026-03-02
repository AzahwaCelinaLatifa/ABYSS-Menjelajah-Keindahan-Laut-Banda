export default function Footer() {
  return (
    <footer className="bg-[#001123]  border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm">&copy; 2026 Abyss. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white hover:text-accent text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-white hover:text-accent text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#kontak" className="text-white hover:text-accent text-sm transition-colors duration-200">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
