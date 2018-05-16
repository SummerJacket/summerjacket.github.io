import Barba from 'barba.js';
import animations from './animations.js';

let skewComplete = false;
let skewExtented = false;
let menuOpen = false;
let menuComplete = false;
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
    if (!skewComplete || skewExtented || menuOpen) return;
    skewExtented = true;
    animations.header().extend();
  }, () => {
    if (!skewComplete || !skewExtented || menuOpen) return;
    skewExtented = false;
    animations.header().retract();
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

  // input focus color
  $('input, textarea')
    .focus((e) => {
      $(e.currentTarget).css('border-color', accentColor);
    })
    .focusout((e) => {
      $(e.currentTarget).css('border-color', '#bbb');
    });

  // menu
  $('.hamburger').click(() => {
    if (!menuComplete) return;
    menuComplete = false;
    $('.hamburger').toggleClass('is-active');
    if (!menuOpen) {
      menuOpen = true;
      animations.menu().open().finished.then(() => {
        menuComplete = true;
      });
    } else {
      animations.menu().close().finished.then(() => {
        menuComplete = true;
        menuOpen = false;
      });
    }
  });
};

const onPageLoad = () => {
  loadEvents();
};

const onPageUnload = () => {
  skewComplete = false;
  skewExtented = false;
  menuOpen = false;
};

const onIndexLoad = () => {
  onPageLoad();
  animations.homepage().enter(() => {
    skewComplete = true;
  });
};

const onIndexUnload = () => {
  onPageUnload();
  return animations.homepage().leave();
};

const onDefaultLoad = () => {
  onPageLoad();
  accentColor = choose(['#F23E77', '#7D459E', '#41DBBA']);
  $('.form-button').css({
    'border-color': accentColor,
    color: accentColor,
  });
  $('.header-accent').css('background-color', accentColor);
  animations.defaultPage().enter(() => {
    skewComplete = true;
    menuComplete = true;
  });
};

const onDefualtUnload = () => {
  onPageUnload();
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
