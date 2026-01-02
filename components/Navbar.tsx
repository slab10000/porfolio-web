import React, { useState, useEffect } from 'react';
import { NAVIGATION_LINKS } from '../constants';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkModalState = () => {
      setIsModalOpen(document.body.classList.contains('modal-open-mobile'));
    };
    
    // Check initially
    checkModalState();
    
    // Watch for changes
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleLogoClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('https://blasmoreno.dev/');
      setToastPosition({ x: e.clientX, y: e.clientY });
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isModalOpen ? 'hidden md:block' : 'block'} ${scrolled ? 'bg-white/80 backdrop-blur-md border-black/5 py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo - Bold Typography */}
          <div 
            className="flex items-center gap-1 group cursor-pointer"
            onClick={handleLogoClick}
            title="Click to copy URL"
          >
            <div className="w-8 h-8 bg-swiss-black text-white flex items-center justify-center font-display font-bold text-sm rounded-lg group-hover:bg-swiss-lime group-hover:text-black transition-colors">
              BM
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-swiss-black">
              BLAS<span className={scrolled ? 'text-gray-400' : ''} style={!scrolled ? { color: '#d6fe51' } : {}}>.DEV</span>
            </span>
          </div>
          
          {/* Desktop Links - Pill Style */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex bg-swiss-gray/50 p-1 rounded-full border border-black/5">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-white hover:text-black hover:shadow-sm transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a href="#contact" className="ml-4 px-6 py-3 bg-swiss-black text-white rounded-full font-medium text-sm hover:bg-swiss-lime hover:text-black transition-colors">
              Get in Touch
            </a>
          </div>
          
          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-white border-b border-gray-100 p-4 shadow-xl">
          <div className="space-y-1">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-lg font-display font-medium text-gray-900 hover:bg-swiss-gray"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div 
        className={`fixed z-[100] transition-all duration-300 ease-out ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        style={{
          left: `${toastPosition.x}px`,
          top: `${toastPosition.y}px`,
          transform: showToast ? 'translate(-50%, -100%) translateY(-10px)' : 'translate(-50%, -100%) translateY(-20px)'
        }}
      >
        <div className="bg-swiss-black text-white px-4 py-3 rounded-lg shadow-lg border border-black/10 flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm font-medium">Webpage copied to clipboard</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;