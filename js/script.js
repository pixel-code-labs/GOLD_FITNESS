/**
 * GOLD FITNESS - INTERACTIVE JS CONTROLLER
 * Features: Multi-branch schedule switcher, filtering, counter animation, nav toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCounters();
  initScheduleSystem();
});

/* 1. MOBILE NAVIGATION TOGGLE */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* 2. STATS COUNTER ANIMATION */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200;
      const increment = target / speed;

      const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-bar');
    if (statsSection && !animated) {
      const position = statsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      if (position < screenPosition) {
        animateCounters();
        animated = true;
      }
    }
  });
}

/* 3. MULTI-BRANCH SCHEDULE SYSTEM */
function initScheduleSystem() {
  // Branch State Data
  const scheduleData = {
    main: [
      { day: 'mon', time: '06:00 AM - 07:30 AM', title: 'Heavy Hypertrophy (Chest & Triceps)', trainer: 'Coach Vikram' },
      { day: 'mon', time: '06:00 PM - 07:00 PM', title: 'HIIT Conditioning Circuit', trainer: 'Coach Sarah' },
      { day: 'wed', time: '06:00 AM - 07:30 AM', title: 'Powerlifting / Deadlift Focus', trainer: 'Coach Vikram' },
      { day: 'wed', time: '05:30 PM - 06:30 PM', title: 'Functional Mobility', trainer: 'Coach Rahul' },
      { day: 'fri', time: '06:00 AM - 07:30 AM', title: 'Legs & Core Overload', trainer: 'Coach Vikram' },
      { day: 'sat', time: '07:00 AM - 08:30 AM', title: 'Strongman & Endurance', trainer: 'Coach Sarah' }
    ],
    west: [
      { day: 'mon', time: '06:30 AM - 07:30 AM', title: 'Calisthenics & Bodyweight', trainer: 'Coach Alex' },
      { day: 'wed', time: '07:00 AM - 08:00 AM', title: 'Cross Training Circuit', trainer: 'Coach Alex' },
      { day: 'fri', time: '06:00 PM - 07:30 PM', title: 'Hypertrophy (Back & Biceps)', trainer: 'Coach Maya' },
      { day: 'sat', time: '08:00 AM - 09:30 AM', title: 'Athletic Agility Work', trainer: 'Coach Maya' }
    ]
  };

  const branchSelect = document.getElementById('branchSelect');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const scheduleGrid = document.getElementById('scheduleGrid');

  let currentBranch = 'main';
  let currentDay = 'all';

  function renderSchedule() {
    if (!scheduleGrid) return;
    scheduleGrid.innerHTML = '';

    const branchItems = scheduleData[currentBranch] || [];
    const filteredItems = currentDay === 'all' 
      ? branchItems 
      : branchItems.filter(item => item.day === currentDay);

    if (filteredItems.length === 0) {
      scheduleGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No classes scheduled for this day at this location.</p>`;
      return;
    }

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'schedule-item';
      card.innerHTML = `
        <div class="schedule-time"><i class="fa-regular fa-clock"></i> ${item.time}</div>
        <h4 class="schedule-title">${item.title}</h4>
        <div class="schedule-trainer"><i class="fa-solid fa-user-check"></i> ${item.trainer}</div>
      `;
      scheduleGrid.appendChild(card);
    });
  }

  if (branchSelect) {
    branchSelect.addEventListener('change', (e) => {
      currentBranch = e.target.value;
      renderSchedule();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDay = btn.getAttribute('data-day');
      renderSchedule();
    });
  });

  renderSchedule();
}