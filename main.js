/* Theme, mobile menu, project expand, scroll reveal */
(function () {
  var root = document.documentElement;

  // ---- Theme toggle (saved in localStorage; system preference is the fallback) ----
  var themeBtn = document.getElementById('theme');
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
  }
  setTheme(root.getAttribute('data-theme'), false);
  themeBtn.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    var saved = null; try { saved = localStorage.getItem('theme'); } catch (err) {}
    if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
  });

  // ---- Mobile menu ----
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // ---- View all / fewer projects ----
  var more = document.getElementById('more');
  var extra = document.querySelectorAll('.project--more');
  more.addEventListener('click', function () {
    var show = more.getAttribute('aria-expanded') !== 'true';
    extra.forEach(function (el) { el.hidden = !show; if (show) el.classList.add('is-in'); });
    more.setAttribute('aria-expanded', show);
    more.textContent = show ? 'Show Fewer Projects' : 'View All Projects';
  });

  // ---- Scroll reveal ----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
    document.documentElement.classList.add('js');
  }
})();
