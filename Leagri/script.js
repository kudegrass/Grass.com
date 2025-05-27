const mainContent = document.querySelector('.main-content');
const navLinks = document.querySelectorAll('#side-nav ul li[data-page]');
const headerTitle = document.querySelector('header h1');
const mainLogo = document.querySelector('#main-logo');

// Function to load page content AND update history (optional)
function loadPage(page, addToHistory = true) {
  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error('Page not found');
      return response.text();
    })
    .then(html => {
      mainContent.innerHTML = html;
      if (addToHistory) {
        history.pushState({ page }, '', `#${page}`);
      }
    })
    .catch(err => {
      mainContent.innerHTML = `<p style="color:red;">Error loading page: ${err.message}</p>`;
    });
}

// Add click listeners to nav items
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  });
});

// Click logo or title to load home page
mainLogo.addEventListener('click', () => {
  loadPage('Nav/home.html');
});
headerTitle.addEventListener('click', () => {
  loadPage('Nav/home.html');
});

// Support links anywhere using data-page
document.addEventListener('click', e => {
  const link = e.target.closest('a[data-page]');
  if (link) {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', e => {
  const state = e.state;
  if (state && state.page) {
    loadPage(state.page, false); // Don't push again
  } else {
    loadPage('Nav/home.html', false);
  }
});

// Automatically load home page on first visit
window.addEventListener('DOMContentLoaded', () => {
  const hashPage = location.hash ? location.hash.slice(1) : 'Nav/home.html';
  loadPage(hashPage, false);
});

//for retaining the translateX of Side-nav links
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    
    // Remove 'active' from all nav links
    navLinks.forEach(l => l.querySelector('a').classList.remove('active'));
    
    // Add 'active' to the clicked link's <a> tag
    link.querySelector('a').classList.add('active');
    
    loadPage(page);
  });
});

let activeLink = null; // Track the current active <a>

navLinks.forEach(link => {
  const anchor = link.querySelector('a');

  // Hover enter
  anchor.addEventListener('mouseenter', () => {
    if (anchor !== activeLink && activeLink) {
      activeLink.classList.remove('active');
    }
  });

  // Hover leave
  anchor.addEventListener('mouseleave', () => {
    if (anchor !== activeLink && activeLink) {
      activeLink.classList.add('active');
    }
  });

  // Click to set active
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');

    // Remove active from all
    navLinks.forEach(l => l.querySelector('a').classList.remove('active'));

    // Set current as active
    anchor.classList.add('active');
    activeLink = anchor;

    loadPage(page);
  });
});

  // Handle course item navigation using the same dynamic loading as nav links
  document.querySelectorAll('.course-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      fetch(page)
        .then(response => {
          if (!response.ok) throw new Error('Page not found');
          return response.text();
        })
        .then(html => {
          document.querySelector('.main-content').innerHTML = html;
        })
        .catch(err => {
          document.querySelector('.main-content').innerHTML = `<p style="color:red;">Error loading page: ${err.message}</p>`;
        });
    });
  });