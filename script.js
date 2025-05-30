const mainContent = document.querySelector('.main-content');
const navLinks = document.querySelectorAll('#side-nav ul li a[data-page]');
const headerTitle = document.querySelector('header h1');
const mainLogo = document.querySelector('#main-logo');

const pageCache = {};
let isLoading = false;
let activeLink = null;

function showLoading() {
  mainContent.innerHTML = '<p style="color: gray;">Loading...</p>';
}

function loadPage(page, addToHistory = true) {
  if (isLoading) return;
  isLoading = true;

  if (pageCache[page]) {
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

function setActiveLink(anchor) {
  navLinks.forEach(l => l.classList.remove('active'));
  anchor.classList.add('active');
  activeLink = anchor;
}

navLinks.forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const page = anchor.getAttribute('data-page');
    setActiveLink(anchor);
    loadPage(page);
  });

  anchor.addEventListener('mouseenter', () => {
    if (anchor !== activeLink && activeLink) {
      activeLink.classList.remove('active');
    }
  });

  anchor.addEventListener('mouseleave', () => {
    if (anchor !== activeLink && activeLink) {
      activeLink.classList.add('active');
    }
  });
});

mainLogo.addEventListener('click', () => {
  loadPage('nav/home.html');
  setActiveLink(navLinks[0]);
});

headerTitle.addEventListener('click', () => {
  loadPage('nav/home.html');
  setActiveLink(navLinks[0]);
});

document.addEventListener('click', e => {
  const link = e.target.closest('a[data-page]');
  if (link) {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  }
});

window.addEventListener('popstate', e => {
  const state = e.state;
  if (state && state.page) {
    loadPage(state.page, false);
  } else {
    loadPage('nav/home.html', false);
  }
});

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

window.addEventListener('DOMContentLoaded', () => {
  fetch('nav/home.html')
    .then(res => res.text())
    .then(html => {
      pageCache['nav/home.html'] = html;
    })
    .finally(() => {
      const hashPage = location.hash ? location.hash.slice(1) : 'nav/home.html';
      loadPage(hashPage, false);

      const initialLink = [...navLinks].find(link => link.getAttribute('data-page') === hashPage);
      if (initialLink) {
        setActiveLink(initialLink);
      }
    });
});

document.querySelectorAll('.course-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    loadPage(page);
  });
});
