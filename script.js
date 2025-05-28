const mainContent = document.querySelector('.main-content');
const navLinks = document.querySelectorAll('#side-nav ul li a[data-page]');
const headerTitle = document.querySelector('header h1');
const mainLogo = document.querySelector('#main-logo');

const pageCache = {};   // Cache for loaded pages
let isLoading = false;  // Prevent multiple loads at once
let activeLink = null;  // Track currently active nav link

// Show a loading message during fetch
function showLoading() {
  mainContent.innerHTML = '<p style="color: gray;">Loading...</p>';
}

// Load page content with caching and history update
function loadPage(page, addToHistory = true) {
  if (isLoading) return;
  isLoading = true;

  if (pageCache[page]) {
    // Load from cache
    mainContent.innerHTML = pageCache[page];
    if (addToHistory) {
      history.pushState({ page }, '', `#${page}`);
    }
    isLoading = false;
  } else {
    showLoading();
    fetch(page)
      .then(response => {
        if (!response.ok) throw new Error('Page not found');
        return response.text();
      })
      .then(html => {
        pageCache[page] = html;
        mainContent.innerHTML = html;
        if (addToHistory) {
          history.pushState({ page }, '', `#${page}`);
        }
      })
      .catch(err => {
        mainContent.innerHTML = `<p style="color:red;">Error loading page: ${err.message}</p>`;
      })
      .finally(() => {
        isLoading = false;
      });
  }
}

// Set active nav link visually
function setActiveLink(anchor) {
  navLinks.forEach(l => l.querySelector('a').classList.remove('active'));
  anchor.classList.add('active');
  activeLink = anchor;
}

// Initialize nav link event listeners
navLinks.forEach(anchor => {
  // Click on nav item
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const page = anchor.getAttribute('data-page');
    setActiveLink(anchor);
    loadPage(page);
  });

  // Hover enter - temporarily remove active if another link is active
  anchor.addEventListener('mouseenter', () => {
    if (anchor !== activeLink && activeLink) {
      activeLink.classList.remove('active');
    }
  });

  // Hover leave - restore active link if needed
  anchor.addEventListener('mouseleave', () => {
    if (anchor !== activeLink && activeLink) {
      activeLink.classList.add('active');
    }
  });
});


// Click logo or header title to load home page
mainLogo.addEventListener('click', () => {
  loadPage('Nav/home.html');
  setActiveLink(navLinks[0].querySelector('a')); // Assume first nav link is home
});
headerTitle.addEventListener('click', () => {
  loadPage('Nav/home.html');
  setActiveLink(navLinks[0].querySelector('a'));
});

// Support any links with data-page attribute (delegated)
document.addEventListener('click', e => {
  const link = e.target.closest('a[data-page]');
  if (link) {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  }
});

// Handle browser back/forward navigation with popstate
window.addEventListener('popstate', e => {
  const state = e.state;
  if (state && state.page) {
    loadPage(state.page, false);
  } else {
    loadPage('Nav/home.html', false);
  }
});

// Keyboard support for undo (Backspace, ArrowLeft) and forward (ArrowRight)
// Debounce to avoid double triggers
let keyTimeout = null;
window.addEventListener('keydown', e => {
  if (keyTimeout) return;
  if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
    history.back();
    keyTimeout = setTimeout(() => keyTimeout = null, 200);
  } else if (e.key === 'ArrowRight') {
    history.forward();
    keyTimeout = setTimeout(() => keyTimeout = null, 200);
  }
});

// Preload home page cache and load initial page based on URL hash
window.addEventListener('DOMContentLoaded', () => {
  fetch('Nav/home.html')
    .then(res => res.text())
    .then(html => {
      pageCache['Nav/home.html'] = html;
    })
    .finally(() => {
      const hashPage = location.hash ? location.hash.slice(1) : 'Nav/home.html';
      loadPage(hashPage, false);

      // Set active link on initial load if it matches nav link
      const initialLink = [...navLinks].find(link => link.getAttribute('data-page') === hashPage);
      if (initialLink) {
        setActiveLink(initialLink.querySelector('a'));
      }
    });
});

// Handle course item navigation (same dynamic loading)
document.querySelectorAll('.course-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  });
});
