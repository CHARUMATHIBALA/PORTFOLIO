// Modern Portfolio Interactions & Enhancements


// ========== Dark/Light Mode Toggle ==========
const initThemeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme') || 'light';
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const currentTheme = savedTheme || systemPreference;
  
  // Apply the initial theme
  setTheme(currentTheme);
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
};

// Initialize theme toggle when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}

// ========== Mobile Navigation Toggle ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu on link click (mobile)
  navMenu.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========== Smooth Scroll with Offset ==========
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId);
    
    if (targetEl) {
      e.preventDefault();
      const offsetTop = targetEl.offsetTop - 80; // Account for sticky navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== Intersection Observer for Animations ==========
const animatedElements = document.querySelectorAll(
  '.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4'
);

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animationObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
);

animatedElements.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  animationObserver.observe(el);
});

// ========== Skill Bars Animation ==========
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width') || '0';
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
        skillObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  }
);

skillFills.forEach((el) => {
  skillObserver.observe(el);
});

// ========== Sticky Navbar with Blur Effect ==========
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

if (navbar) {
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

// ========== Typing Effect Enhancement ==========
const typingElement = document.querySelector('.typing-effect');
if (typingElement) {
  const text = typingElement.textContent.trim();
  typingElement.textContent = '';
  typingElement.style.borderRight = '3px solid var(--primary)';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Keep cursor blinking
      typingElement.style.animation = 'blink 1s step-end infinite';
    }
  };
  
  // Start typing after a delay
  setTimeout(() => {
    typeWriter();
  }, 1000);
}

// ========== Parallax Effect for Hero Section ==========
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = hero.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroImage.style.opacity = 1 - scrolled / window.innerHeight;
    }
  }, { passive: true });
}

// ========== Card Hover Effects Enhancement ==========
const cards = document.querySelectorAll(
  '.project-card, .education-item, .achievement-item, .certification-item, .club-item, .presentation-item'
);

cards.forEach((card) => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ========== Active Navigation Link Highlighting ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightActiveSection = () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', highlightActiveSection, { passive: true });

// ========== Smooth Page Load Animation ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ========== Button Ripple Effect ==========
const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  .nav-link.active {
    color: var(--primary);
  }
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// ========== Certificate Modal Viewer ==========
const certButtons = document.querySelectorAll('.view-cert');
const modalOverlay = document.querySelector('[data-modal]');
const modalFrame = modalOverlay ? modalOverlay.querySelector('.modal-frame') : null;
const modalTitle = modalOverlay ? modalOverlay.querySelector('.modal-title') : null;
const modalClose = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;
const modalOpenLink = modalOverlay ? modalOverlay.querySelector('.modal-open-link') : null;
const modalDownloadLink = modalOverlay ? modalOverlay.querySelector('.modal-download-link') : null;
const modalLoading = modalOverlay ? modalOverlay.querySelector('.modal-loading') : null;

const closeModal = () => {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  if (modalFrame) {
    modalFrame.setAttribute('src', '');
  }
  if (modalLoading) {
    modalLoading.classList.remove('active');
  }
};

const openModal = (src, title) => {
  if (!modalOverlay || !modalFrame) return;
  if (modalLoading) modalLoading.classList.add('active');
  modalFrame.setAttribute('src', src || '');
  if (modalTitle) modalTitle.textContent = title || 'Certificate Preview';
  if (modalOpenLink) modalOpenLink.setAttribute('href', src || '#');
  if (modalDownloadLink) modalDownloadLink.setAttribute('href', src || '#');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

certButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const src = btn.getAttribute('data-cert');
    const title = btn.getAttribute('data-title');
    openModal(src, title);
  });
});

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

if (modalFrame && modalLoading) {
  modalFrame.addEventListener('load', () => {
    modalLoading.classList.remove('active');
  });
}

// ========== Sudoku Modal Popup ==========
const sudokuButtons = document.querySelectorAll('.sudoku-open');
const sudokuModal = document.querySelector('[data-sudoku-modal]');
const sudokuFrame = sudokuModal ? sudokuModal.querySelector('.sudoku-frame') : null;
const sudokuClose = sudokuModal ? sudokuModal.querySelector('.sudoku-modal-close') : null;

const closeSudoku = () => {
  if (!sudokuModal) return;
  sudokuModal.classList.remove('active');
  document.body.style.overflow = '';
  if (sudokuFrame) sudokuFrame.setAttribute('src', '');
};

const openSudoku = (src) => {
  if (!sudokuModal || !sudokuFrame) return;
  sudokuFrame.setAttribute('src', src || '');
  sudokuModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

sudokuButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const src = btn.getAttribute('data-sudoku-src');
    openSudoku(src);
  });
});

if (sudokuModal) {
  sudokuModal.addEventListener('click', (e) => {
    if (e.target === sudokuModal) {
      closeSudoku();
    }
  });
}

if (sudokuClose) {
  sudokuClose.addEventListener('click', closeSudoku);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sudokuModal && sudokuModal.classList.contains('active')) {
    closeSudoku();
  }
});

// ========== Gentle Falling Leaves (lightweight) ==========
const leavesContainer = document.getElementById('leaves-container');
if (leavesContainer) {
  const maxLeaves = 10;
  const colors = [
    'hue-rotate(0deg) saturate(0.9) opacity(0.9)',
    'hue-rotate(20deg) saturate(0.9) opacity(0.9)',
    'hue-rotate(60deg) saturate(0.95) opacity(0.9)',
    'hue-rotate(120deg) saturate(0.85) opacity(0.9)'
  ];

  const createLeaf = () => {
    if (leavesContainer.children.length >= maxLeaves) return;
    const leaf = document.createElement('span');
    leaf.classList.add('leaf');

    const size = 16 + Math.random() * 14; // 16-30px
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size * 1.1}px`;
    leaf.style.left = Math.random() * 100 + 'vw';

    // durations
    const fall = 14 + Math.random() * 8; // 14-22s
    const sway = 7 + Math.random() * 5; // 7-12s
    const spin = 11 + Math.random() * 5; // 11-16s
    leaf.style.setProperty('--fall', `${fall}s`);
    leaf.style.setProperty('--sway', `${sway}s`);
    leaf.style.setProperty('--spin', `${spin}s`);

    // light color variation via filter
    leaf.style.filter = `${colors[Math.floor(Math.random() * colors.length)]} drop-shadow(0 2px 4px rgba(0,0,0,0.08))`;
    leaf.style.opacity = 0.32 + Math.random() * 0.08;

    leavesContainer.appendChild(leaf);

    setTimeout(() => leaf.remove(), (fall + 2) * 1000);
  };

  // seed a few leaves
  for (let i = 0; i < 5; i++) {
    setTimeout(createLeaf, i * 400);
  }

  setInterval(createLeaf, 2200);
}

// ========== Scroll to Top Button (Optional Enhancement) ==========
const createScrollToTop = () => {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  `;
  
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  }, { passive: true });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
    scrollBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'translateY(0) scale(1)';
    scrollBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  });
};

createScrollToTop();

// ========== Performance Optimization: Debounce Function ==========
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

// Optimize scroll handlers
const optimizedScrollHandler = debounce(() => {
  highlightActiveSection();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ========== Custom Leaf Cursor Enhancement ==========
const initCustomCursor = () => {
  // Define interactive elements
  const interactiveElements = [
    'a', 'button', '.btn', '.nav-link', '.project-link', '.social-link',
    '.certification-item', '.education-item', '.project-card', 
    '.club-item', '.presentation-item', '.modal-close', '.sudoku-modal-close',
    '.hamburger', '.view-cert', '.memory-open', '.sudoku-open'
  ];

  // Add interactive cursor class to hoverable elements
  interactiveElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.classList.add('cursor-interactive');
      });
      
      element.addEventListener('mouseleave', function() {
        this.classList.remove('cursor-interactive');
      });
    });
  });

  // Enhanced fallback: Check if cursor image loads properly
  const testCursor = new Image();
  testCursor.src = 'leaf-cursor-glow.svg';
  testCursor.onerror = function() {
    console.warn('Enhanced leaf cursor not found, trying fallback cursor');
    // Try fallback cursor
    const fallbackCursor = new Image();
    fallbackCursor.src = 'leaf-cursor.svg';
    fallbackCursor.onerror = function() {
      console.warn('Both cursor images not found, using default cursor');
      document.body.style.cursor = 'auto';
      
      // Remove custom cursor classes
      document.querySelectorAll('.cursor-interactive').forEach(el => {
        el.classList.remove('cursor-interactive');
      });
    };
    fallbackCursor.onload = function() {
      console.log('Using fallback leaf cursor');
      document.body.style.cursor = 'url(\'leaf-cursor.svg\') 16 2, auto';
      document.querySelectorAll('.cursor-interactive').forEach(el => {
        el.style.cursor = 'url(\'leaf-cursor.svg\') 16 2, pointer';
      });
    };
  };

  // Optional: Add subtle cursor trail effect for enhanced experience
  const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const animateTrail = () => {
      const dx = mouseX - trailX;
      const dy = mouseY - trailY;
      
      trailX += dx * 0.1;
      trailY += dy * 0.1;
      
      trail.style.left = trailX - 10 + 'px';
      trail.style.top = trailY - 10 + 'px';
      trail.style.opacity = Math.abs(dx) > 1 || Math.abs(dy) > 1 ? '0.6' : '0';
      
      requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
  };

  // Only create trail on desktop devices (not touch devices)
  if (!('ontouchstart' in window)) {
    createCursorTrail();
  }
};

// Initialize custom cursor when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
  initCustomCursor();
}

// ========== Console Welcome Message ==========
console.log('%c👋 Welcome to Charumathi\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #10b981;');
console.log('%cBuilt with ❤️ using modern web technologies', 'font-size: 14px; color: #6b7280;');
