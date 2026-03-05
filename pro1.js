/* ══════════════════════════════════════════
   SAK YANT — main.js  (Full Rebuild)
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. SCROLL REVEAL ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  reveals.forEach(el => revealObs.observe(el));


  /* ─── 2. NAVBAR SCROLL DARKEN ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 60
      ? 'rgba(12,7,4,0.97)' : 'rgba(30,17,8,0.88)';
  });


  /* ─── 3. MOBILE HAMBURGER ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Inject mobile open style once
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = `
    @media(max-width:900px){
      .nav-links.open{
        display:flex!important;flex-direction:column;
        position:absolute;top:100%;left:0;right:0;
        background:rgba(12,7,4,.98);
        padding:24px 6%;gap:18px;
        border-bottom:1px solid rgba(212,175,55,.18);
        animation:fadeDown .3s ease-out;
      }
    }
    @keyframes fadeDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    .nav-links a.active{color:#F0D060!important;text-shadow:0 0 12px rgba(212,175,55,.6);}
    .nav-links a.active::after{width:100%!important;}
  `;
  document.head.appendChild(mobileStyle);

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    if (open) {
      bars[0].style.transform = 'translateY(6px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(b => {
        b.style.transform = ''; b.style.opacity = '';
      });
    });
  });


  /* ─── 4. ACTIVE NAV HIGHLIGHT ─── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => activeObs.observe(s));


  /* ─── 5. YANTRA FILTER TABS ─── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allCards   = document.querySelectorAll('.yantra-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      allCards.forEach(card => {
        const cats = card.dataset.cat || '';
        const show = f === 'all' || cats.includes(f);

        if (card.classList.contains('extra-card')) {
          // Extra cards: only show if currently expanded AND matches
          if (card.classList.contains('visible-extra')) {
            card.classList.toggle('filtered-out', !show);
          }
        } else {
          card.classList.toggle('filtered-out', !show);
        }
      });
    });
  });


  /* ─── 6. SHOW ALL / SHOW LESS YANTRA ─── */
  const btnShowAll = document.getElementById('btnShowAll');
  const btnText    = document.getElementById('btnShowAllText');
  const extraCards = document.querySelectorAll('.extra-card');
  let expanded     = false;

  window.toggleYantra = function () {
    expanded = !expanded;
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

    extraCards.forEach(card => {
      if (expanded) {
        card.classList.add('visible-extra');
        card.style.animation = 'fadeUp .5s ease-out both';
        // Apply current filter
        const cats = card.dataset.cat || '';
        card.classList.toggle('filtered-out',
          activeFilter !== 'all' && !cats.includes(activeFilter));
      } else {
        card.classList.remove('visible-extra');
        card.classList.remove('filtered-out');
        card.style.animation = '';
      }
    });

    btnText.textContent = expanded
      ? '✦ แสดงน้อยลง'
      : '✦ แสดงลายยันต์ทั้งหมด (9 ลาย)';
  };

  btnShowAll.addEventListener('click', window.toggleYantra);


  /* ─── 7. CONSULT BUTTONS → scroll to contact ─── */
  window.scrollToContact = function () {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('.card-consult-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Pre-fill yantra select if possible
      const cardTitle = btn.closest('.yantra-card')?.querySelector('.card-title')?.textContent;
      const select = document.getElementById('fyantra');
      if (select && cardTitle) {
        for (let opt of select.options) {
          if (opt.text.includes(cardTitle.trim())) { select.value = opt.value; break; }
        }
      }
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  });


  /* ─── 7.5 IMAGE EXPANDER ─── */
  window.expandImage = function(src) {
    const modal = document.getElementById('imgModal');
    const img = document.getElementById('modalImg');
    if (modal && img) {
      img.src = src;
      modal.style.display = 'flex';
    }
  };

  window.closeImgModal = function() {
    const modal = document.getElementById('imgModal');
    if (modal) modal.style.display = 'none';
  };

  /* ─── 8. BOOKING FORM SUBMIT ─── */
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name    = document.getElementById('fname')?.value.trim();
      const contact = document.getElementById('fcontact')?.value.trim();

      if (!name || !contact) {
        submitBtn.style.boxShadow = '0 0 0 2px #ff4444';
        setTimeout(() => submitBtn.style.boxShadow = '', 1500);
        return;
      }

      // Show success
      document.getElementById('bookingForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';

      // Animate in
      document.getElementById('formSuccess').style.animation = 'fadeUp .6s ease-out';
    });
  }

});

const modalImg = document.getElementById("modalImg");

let scale = 1;

modalImg.addEventListener("wheel", (e) => {
  e.preventDefault();

  scale += e.deltaY * -0.001;   // เลื่อนขึ้น = ซูมเข้า
  scale = Math.min(Math.max(1, scale), 4); // จำกัด 1x - 4x

  modalImg.style.transform = `scale(${scale})`;
});