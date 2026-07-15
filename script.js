// Reveal feature cards as they scroll into view
const cards = document.querySelectorAll('.feature-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
cards.forEach((card) => observer.observe(card));

// Show the real APK size instead of the hardcoded estimate
fetch('whisperchat.apk', { method: 'HEAD' })
  .then((res) => {
    const bytes = Number(res.headers.get('content-length'));
    if (!bytes) return;
    const mb = (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    document.querySelectorAll('#apk-size, #apk-size-2').forEach((el) => (el.textContent = mb));
  })
  .catch(() => {});
