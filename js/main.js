const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const mobileNav = document.querySelector('.mobile-nav');

function toggleNav(open){
  mobileNav.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
menuBtn?.addEventListener('click', () => toggleNav(true));
closeBtn?.addEventListener('click', () => toggleNav(false));
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleNav(false)));

const sections = document.querySelectorAll('main section[id]');
const dots = document.querySelectorAll('.spine-dots a');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    dots.forEach(dot => {
      const isCurrent = dot.getAttribute('href') === `#${entry.target.id}`;
      dot.setAttribute('aria-current', String(isCurrent));
    });
  });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(s => spy.observe(s));

const revealItems = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && revealItems.length) {
  revealItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
  });

  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  revealItems.forEach(el => reveal.observe(el));
}

document.querySelectorAll('button.copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const value = btn.dataset.copy;
    const hint = btn.parentElement.querySelector('.copy-hint');
    try {
      await navigator.clipboard.writeText(value);
      if (hint) {
        hint.textContent = 'Copiado';
        hint.classList.add('show');
        setTimeout(() => hint.classList.remove('show'), 1800);
      }
    } catch (err) {
      if (hint) {
        hint.textContent = 'Copia manual: ' + value;
        hint.classList.add('show');
      }
    }
  });
});

const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();
