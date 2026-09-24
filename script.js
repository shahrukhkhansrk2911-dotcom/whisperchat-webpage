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

// Show the real APK size from the hosted release asset.
const apkUrl = 'https://github.com/chomu8854-afk/whisperchat/releases/download/APK/app-whisperchatsource-release.apk';
const apkSizeEls = document.querySelectorAll('#apk-size, #apk-size-2');

fetch(apkUrl, { method: 'HEAD' })
  .then((res) => {
    const bytes = Number(res.headers.get('content-length'));
    if (!bytes) return;
    const mb = (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    apkSizeEls.forEach((el) => (el.textContent = mb));
  })
  .catch(() => {
    apkSizeEls.forEach((el) => (el.textContent = '282.3 MB'));
  });
