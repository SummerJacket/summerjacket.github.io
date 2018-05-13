import animations from './animations.js';
/* global anime */
/* global Barba */

let skewComplete = false;
let skewExtented = false;
let menuOpen = false;
let accentColor;

const choose = arr => arr[Math.floor(Math.random() * arr.length)];

const loadEvents = () => {
  // extend and retract skew area
  $('.skew').hover(() => {
    if (!skewComplete || skewExtented) return;
    skewExtented = true;
    animations.skew().expand();
  }, () => {
    if (!skewComplete || !skewExtented) return;
    skewExtented = false;
    animations.skew().retract();
  });

  // nav animation
  $('.animate-column').hover((e) => {
    animations.column(e.currentTarget).scaleUp();
  }, (e) => {
    animations.column(e.currentTarget).scaleDown();
  });

  // extent and retract header
  $('.header-group').hover(() => {
    if (!skewComplete || skewExtented) return;
    skewExtented = true;
    animations.header().extend();
  }, () => {
    if (!skewComplete || !skewExtented) return;
    skewExtented = false;
    animations.header().retract();
  });

  // back button
  $('.back-arrow').hover((e) => {
    animations.column(e.currentTarget).scaleUp();
  }, (e) => {
    animations.column(e.currentTarget).scaleDown();
  });

  // input focus color
  $('input, textarea')
    .focus((e) => {
      $(e.currentTarget).css('border-color', accentColor);
    })
    .focusout((e) => {
      $(e.currentTarget).css('border-color', '#bbb');
    });

  // button hover color
  $('.form-button').hover((e) => {
    $(e.currentTarget).css({
      'background-color': accentColor,
      color: 'white',
    });
  }, (e) => {
    $(e.currentTarget).css({
      'background-color': 'transparent',
      color: accentColor,
    });
  });

  // menu
  $('.hamburger').click(() => {
    $('.hamburger').toggleClass('is-active');
    anime.remove('.header');
    if (!menuOpen) {
      menuOpen = true;
      $('.header-group').off();
      animations.menu().open();
    } else {
      menuOpen = false;
      animations.menu().close();
    }
  });
};

const onIndexLoad = () => {
  loadEvents();
  animations.homepage().enter(() => {
    skewComplete = true;
  });
};

const onIndexUnload = () => {
  skewComplete = false;
  skewExtented = false;
  return animations.homepage().leave();
};

const onDefaultLoad = () => {
  loadEvents();
  accentColor = choose(['#F23E77', '#7D459E', '#41DBBA']);
  $('.form-button').css({
    'border-color': accentColor,
    color: accentColor,
  });
  $('.header-accent').css('background-color', accentColor);
  animations.defaultPage().enter(() => {
    skewComplete = true;
  });
};

const onDefualtUnload = () => {
  skewComplete = false;
  skewExtented = false;
  menuOpen = false;
  return animations.defaultPage().leave();
};

$(document).ready(() => {
  const transOutOfHome = Barba.BaseTransition.extend({
    start() {
      Promise
        .all([this.newContainerLoading, onIndexUnload().finished])
        .then(() => { this.done(); });
    },
  });

  const transIntoHome = Barba.BaseTransition.extend({
    start() {
      Promise
        .all([this.newContainerLoading, onDefualtUnload().finished])
        .then(() => { this.done(); });
    },
  });

  Barba.Pjax.getTransition = () => {
    const prev = Barba.HistoryManager.prevStatus().namespace;
    return prev === 'homepage' ? transOutOfHome : transIntoHome;
  };

  Barba.BaseView
    .extend({
      namespace: 'homepage',
      onEnterCompleted() {
        onIndexLoad();
      },
    })
    .init();

  Barba.BaseView
    .extend({
      namespace: 'default',
      onEnterCompleted() {
        onDefaultLoad();
      },
    })
    .init();

  Barba.Pjax.start();
});

// parallax
$(document.body).mousemove((e) => {
  const x = e.pageX * -0.01;
  const y = e.pageY * -0.01;
  $(e.currentTarget).css('background-position', `${x}px ${y}px`);
});
