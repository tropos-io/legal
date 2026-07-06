// Email de-obfuscation: the served HTML carries no plain address — spans
// hold the parts in data attributes ("legal [at] tropos [dot] io" as the
// no-JS fallback text); this assembles the real mailto link at runtime.
(function () {
  var spans = document.querySelectorAll('.obf-mail[data-u][data-d]');
  Array.prototype.forEach.call(spans, function (el) {
    var addr = el.getAttribute('data-u') + '@' + el.getAttribute('data-d');
    var a = document.createElement('a');
    a.href = 'mailto:' + addr;
    a.textContent = addr;
    el.parentNode.replaceChild(a, el);
  });
})();

// Clause navigation for legal documents:
// - builds the "On this page" list from h1/h2 headings (skipping .no_toc)
// - highlights the clause currently in view
// - adds a hover anchor (§) to each heading that copies its deep link
(function () {
  var content = document.getElementById('doc-content');
  var tocNav = document.getElementById('toc-nav');
  var aside = document.querySelector('.doc-toc');
  if (!content || !tocNav || !aside) return;

  var headings = Array.prototype.filter.call(
    content.querySelectorAll('h1[id], h2[id], h3[id]'),
    function (h) { return !h.classList.contains('no_toc'); }
  );

  // --- citable anchors on every heading -------------------------------
  headings.forEach(function (h) {
    var a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = '#' + h.id;
    a.textContent = '§';
    a.setAttribute('aria-label', 'Link to this clause');
    a.addEventListener('click', function () {
      var url = location.origin + location.pathname + '#' + h.id;
      if (navigator.clipboard) navigator.clipboard.writeText(url);
    });
    h.appendChild(a);
  });

  // --- table of contents (h1/h2 only, to keep it scannable) -----------
  var tocHeadings = headings.filter(function (h) {
    return h.tagName === 'H1' || h.tagName === 'H2';
  });
  if (tocHeadings.length < 3) return;

  var list = document.createElement('ul');
  tocHeadings.forEach(function (h) {
    var li = document.createElement('li');
    li.className = 'toc-' + h.tagName.toLowerCase();
    var a = document.createElement('a');
    a.href = '#' + h.id;
    // heading text without the trailing anchor glyph
    a.textContent = h.textContent.replace(/§\s*$/, '').trim();
    a.dataset.target = h.id;
    li.appendChild(a);
    list.appendChild(li);
  });
  tocNav.appendChild(list);
  aside.hidden = false;

  // collapse the mobile TOC by default on narrow screens
  var details = aside.querySelector('details');
  if (details && window.matchMedia('(max-width: 1080px)').matches) {
    details.open = false;
  }

  // --- scrollspy -------------------------------------------------------
  var links = {};
  Array.prototype.forEach.call(list.querySelectorAll('a'), function (a) {
    links[a.dataset.target] = a;
  });
  var active = null;

  function setActive(id) {
    if (active === id) return;
    if (active && links[active]) links[active].classList.remove('active');
    if (id && links[id]) links[id].classList.add('active');
    active = id;
  }

  if ('IntersectionObserver' in window) {
    var visible = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      // highlight the first visible heading, else keep the last one passed
      for (var i = 0; i < tocHeadings.length; i++) {
        if (visible.has(tocHeadings[i].id)) {
          setActive(tocHeadings[i].id);
          return;
        }
      }
    }, { rootMargin: '0px 0px -70% 0px' });
    tocHeadings.forEach(function (h) { observer.observe(h); });
  }
})();
