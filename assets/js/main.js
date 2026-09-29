document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  const setHeaderState = () => {
    if (!siteHeader) {
      return;
    }

    if (window.scrollY > 10) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('is-open', !expanded);
    });

    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      });
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (!primaryNav.contains(target) && !navToggle.contains(target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const projectFilter = document.querySelector('.project-filter');
  const projectList = document.querySelector('.project-list');
  const projectEmpty = document.querySelector('.project-empty');

  if (projectFilter && projectList) {
    const applyFilter = (stack) => {
      projectList.dataset.active = stack;
      projectFilter.querySelectorAll('.blog-filter-btn').forEach((button) => {
        const active = stack !== 'all' && button.dataset.filter === stack;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      let visible = 0;
      projectList.querySelectorAll('.blog-card').forEach((card) => {
        const show = stack === 'all' || card.dataset.stack === stack;
        card.hidden = !show;
        if (show) {
          visible += 1;
        }
      });

      if (projectEmpty) {
        projectEmpty.hidden = visible !== 0;
      }
    };

    projectFilter.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) {
        return;
      }
      const next = projectList.dataset.active === button.dataset.filter ? 'all' : button.dataset.filter;
      applyFilter(next);
    });
  }

  document.querySelectorAll('.member-grid .member-card').forEach((card) => {
    if (!(card instanceof HTMLDetailsElement)) {
      return;
    }

    card.addEventListener('toggle', () => {
      if (!card.open) {
        return;
      }

      document.querySelectorAll('.member-grid .member-card[open]').forEach((other) => {
        if (other !== card) {
          other.removeAttribute('open');
        }
      });

      card.scrollIntoView({ block: 'nearest' });
    });
  });

  const revealNodes = document.querySelectorAll('.reveal');
  if (!revealNodes.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  revealNodes.forEach((node, index) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }

    if (!node.style.transitionDelay) {
      node.style.transitionDelay = `${Math.min(index * 32, 260)}ms`;
    }

    observer.observe(node);
  });
});
