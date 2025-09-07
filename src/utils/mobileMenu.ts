// Mobile Menu Utility - Safe open/close functionality with ESC key support

// Force menu closed on load - defensive fix for persistent/stuck menu
(function ensureMenuClosedOnLoad() {
  const mobileMenu = document.getElementById('mobile-menu') || document.querySelector('.mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay') || document.querySelector('.mobile-menu-overlay');
  const hb = document.getElementById('hamburger-btn') || document.querySelector('.hamburger-btn');

  if (mobileMenu) mobileMenu.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  if (document.body) document.body.classList.remove('menu-open');
  if (hb) hb.setAttribute('aria-expanded', 'false');

  // Defensive: remove any inline styles that may force it open
  if (mobileMenu && mobileMenu.style) {
    mobileMenu.style.transform = '';
    mobileMenu.style.left = '';
  }

  // Clear any persisted menu state
  try {
    localStorage.removeItem('menuOpen');
    sessionStorage.removeItem('menuOpen');
  } catch (e) {
    // Ignore storage errors
  }
})();

// Clear service workers and caches in development
if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const reg of registrations) {
        try {
          reg.unregister();
        } catch (e) {
          // Ignore unregister errors
        }
      }
    }).catch(() => {});
  }

  // Clear caches in development
  if ('caches' in window) {
    caches.keys().then(names => {
      for (const name of names) {
        caches.delete(name);
      }
    }).catch(() => {});
  }
}

export function initializeMobileMenu() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
  } else {
    // For React apps, also try after a short delay to ensure components are rendered
    setupMobileMenu();
    setTimeout(setupMobileMenu, 100);
  }
}

let isSetupComplete = false;

function setupMobileMenu() {
  // Prevent duplicate setup
  if (isSetupComplete) return;
  
  const hamburger = document.getElementById('hamburger-btn') || document.querySelector('.hamburger-icon');
  const mobileMenu = document.getElementById('mobile-menu') || document.querySelector('.mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay') || document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.getElementById('mobile-close-btn') || document.querySelector('.mobile-menu-close');
  
  // Only proceed if we found the essential elements
  if (!hamburger || !mobileMenu || !overlay || !closeBtn) {
    return; // Try again later
  }
  
  isSetupComplete = true;

  function safeClose() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenu.classList.add('hidden');
      // Clear any inline styles that might interfere
      if (mobileMenu.style) {
        mobileMenu.style.transform = '';
        mobileMenu.style.left = '';
        mobileMenu.style.display = '';
      }
    }
    if (overlay) {
      overlay.classList.remove('open');
      overlay.classList.add('hidden');
      // Ensure overlay doesn't block clicks
      if (overlay.style) {
        overlay.style.pointerEvents = 'none';
      }
    }
    document.body.classList.remove('menu-open');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  function safeOpen() {
    if (mobileMenu) {
      mobileMenu.classList.add('open');
      mobileMenu.classList.remove('hidden');
    }
    if (overlay) {
      overlay.classList.add('open');
      overlay.classList.remove('hidden');
      // Enable pointer events when open
      if (overlay.style) {
        overlay.style.pointerEvents = 'auto';
      }
    }
    document.body.classList.add('menu-open');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  function isMenuOpen() {
    return hamburger?.getAttribute('aria-expanded') === 'true' || 
           mobileMenu?.classList.contains('open') || 
           !mobileMenu?.classList.contains('hidden');
  }

  // Hamburger click and touch handlers
  if (hamburger) {
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      if (isMenuOpen()) {
        safeClose();
      } else {
        safeOpen();
      }
    }
    
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchend', toggleMenu);
  }

  // Close button click and touch handlers
  if (closeBtn) {
    function closeMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      safeClose();
    }
    
    closeBtn.addEventListener('click', closeMenu);
    closeBtn.addEventListener('touchend', closeMenu);
  }

  // Overlay click and touch handlers
  if (overlay) {
    function handleOverlay(e) {
      if (e.target === overlay) {
        safeClose();
      }
    }
    
    overlay.addEventListener('click', handleOverlay);
    overlay.addEventListener('touchend', handleOverlay);
  }

  // ESC key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      safeClose();
    }
  });

  // Close menu when clicking/touching navigation links
  const navLinks = document.querySelectorAll('.mobile-menu-content button, .mobile-menu a');
  navLinks.forEach(link => {
    function handleNavClick() {
      // Small delay to allow navigation to complete
      setTimeout(safeClose, 100);
    }
    
    link.addEventListener('click', handleNavClick);
    link.addEventListener('touchend', handleNavClick);
  });
  
  // Prevent body scroll when menu is open on mobile
  function preventTouchMove(e) {
    if (document.body.classList.contains('menu-open')) {
      e.preventDefault();
    }
  }
  
  document.addEventListener('touchmove', preventTouchMove, { passive: false });

  // Handle route changes (for SPA navigation)
  window.addEventListener('popstate', safeClose);
  
  // Handle window resize - close menu when switching to desktop
  function handleResize() {
    if (window.innerWidth > 768 && isMenuOpen()) {
      safeClose();
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Defensive auto-close safety timer - close if somehow left open
  setTimeout(() => {
    const menu = document.getElementById('mobile-menu') || document.querySelector('.mobile-menu');
    if (menu && (menu.classList.contains('open') || !menu.classList.contains('hidden'))) {
      safeClose();
    }
  }, 500);
  
  // Cleanup function for component unmounting
  return function cleanup() {
    document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') safeClose();
    });
    window.removeEventListener('popstate', safeClose);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('touchmove', preventTouchMove);
  };
}

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
  initializeMobileMenu();
}

// Export individual functions for manual control
export { setupMobileMenu };