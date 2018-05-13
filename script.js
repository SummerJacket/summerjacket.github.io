/* global anime */
/* global Barba */

let skewComplete = false;
let skewExtented = false;
let menuOpen = false;
let accentColor;

const choose = arr => arr[Math.floor(Math.random() * arr.length)];

const animate = (props) => {
  anime.remove(props.targets);
  return anime(props);
};

const loadEvents = () => {
  // extend and retract skew area
  $('.skew').hover(() => {
    if (!skewComplete || skewExtented) return;
    skewExtented = true;
    animate({
      targets: '.animate-skew',
      height: ['65vh', '70vh'],
      duration: 1200,
      delay: (_, i) => i * 60,
    });
    animate({
      targets: '.animate-follow',
      marginTop: [0, '1vh'],
      duration: 1200,
    });
  }, () => {
    if (!skewComplete || !skewExtented) return;
    skewExtented = false;
    animate({
      targets: '.animate-skew',
      height: ['70vh', '65vh'],
      duration: 1200,
      delay: (_, i) => i * -30,
    });
    animate({
      targets: '.animate-follow',
      marginTop: ['1vh', 0],
      duration: 1200,
    });
  });

  // nav animation
  $('.animate-column').hover((e) => {
    animate({
      targets: e.currentTarget,
      scale: 1.2,
      elasticity: 600,
    });
  }, (e) => {
    animate({
      targets: e.currentTarget,
      scale: 1,
      elasticity: 400,
    });
  });

  // extent and retract header
  $('.header-group').hover(() => {
    if (!skewComplete || skewExtented) return;
    skewExtented = true;
    animate({
      targets: '.header',
      height: ['6.7em', '7.2em'],
      delay: (_, i) => i * 60,
    });
    animate({
      targets: '.header-unskew',
      marginTop: ['2em', '2.2em'],
    });
  }, () => {
    if (!skewComplete || !skewExtented) return;
    skewExtented = false;
    animate({
      targets: '.header',
      height: ['7.2em', '6.7em'],
      delay: (_, i) => i * -30,
    });
    animate({
      targets: '.header-unskew',
      marginTop: ['2.2em', '2em'],
    });
  });

  // back button
  $('.back-arrow').hover((e) => {
    animate({
      targets: e.currentTarget,
      scale: 1.2,
      elasticity: 600,
    });
  }, (e) => {
    animate({
      targets: e.currentTarget,
      scale: 1,
      elasticity: 400,
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
      anime
        .timeline()
        .add({ // header heights change for some reason
          targets: '.header',
          height: '6.7em',
          duration: 1,
        })
        .add({
          targets: '.header-accent',
          height: ['6.7em', '101vh'],
          skewY: 0,
          duration: 1000,
          easing: 'easeOutCirc',
        })
        .add({
          targets: '.header-background',
          height: ['6.7em', '101vh'],
          duration: 1000,
          easing: 'easeOutCirc',
          offset: '-=800',
        })
        .add({
          targets: '.header-title',
          opacity: 0,
          easing: 'easeInExpo',
          offset: '-=2000',
        })
        .add({
          targets: '.animate-menu',
          opacity: 1,
          offset: '-=500',
          easing: 'easeOutCirc',
          begin: () => {
            $('.animate-menu').css({
              display: 'block',
            });
          },
        });
    } else {
      menuOpen = false;
      anime
        .timeline()
        .add({
          targets: '.header',
          height: '101vh',
          duration: 1,
          offset: '-=800',
        })
        .add({
          targets: '.header-background',
          height: ['25vh', '6.7em'],
          easing: 'easeOutCirc',
        })
        .add({
          targets: '.header-accent',
          height: ['25vh', '6.7em'],
          skewY: '-4deg',
          easing: 'easeOutCirc',
          offset: '-=800',
          complete: () => {
            loadEvents();
          },
        })
        .add({
          targets: '.animate-menu',
          opacity: 0,
          easing: 'easeOutCirc',
          offset: '-=2000',
          complete: () => {
            $('.animate-menu').css({
              display: 'none',
            });
          },
        })
        .add({
          targets: '.header-title',
          opacity: 1,
          easing: 'easeOutExpo',
          offset: '-=800',
        });
    }
  });
};

const onIndexLoad = () => {
  loadEvents();
  return anime
    .timeline()
    .add({
      targets: '.animate-skew',
      height: '65vh',
      skewY: '-8deg',
      opacity: 1,
      duration: 800,
      easing: 'easeOutCirc',
      delay: (_, i) => i * 120,
      complete: () => { skewComplete = true; },
    })
    .add({
      targets: '.animate-letter',
      top: 0,
      opacity: 1,
      delay: (_, i) => i * 20,
      offset: '-=800',
    })
    .add({
      targets: '.animate-follow',
      top: 0,
      opacity: 1,
      easing: 'easeOutExpo',
      delay: (_, i) => i * 200,
      offset: '-=800',
    })
    .add({
      targets: '.animate-column',
      marginBottom: '2em',
      opacity: 1,
      duration: 800,
      delay: (_, i) => i * 200,
      offset: '-=800',
    });
};

const onIndexUnload = () => {
  skewComplete = false;
  skewExtented = false;
  return anime
    .timeline()
    .add({
      targets: '.animate-column',
      marginBottom: ['2em', '4em'],
      opacity: 0,
      duration: 400,
      easing: 'easeInQuad',
    })
    .add({
      targets: '.animate-follow',
      top: '-50px',
      opacity: 0,
      duration: 400,
      easing: 'easeInExpo',
      offset: '-=400',
      delay: (_, i) => i * -60,
    })
    .add({
      targets: '.animate-letter',
      top: '-100px',
      opacity: 0,
      duration: 400,
      easing: 'easeInExpo',
      offset: '-=300',
      delay: (_, i) => i * 20,
    })
    .add({
      targets: '.animate-skew',
      height: 0,
      skewY: 0,
      duration: 800,
      easing: 'easeInExpo',
      offset: '-=400',
      delay: (_, i) => i * -100,
    });
};

const onDefaultLoad = () => {
  loadEvents();
  accentColor = choose([
    '#F23E77',
    '#7D459E',
    '#41DBBA',
  ]);
  $('.form-button').css({
    'border-color': accentColor,
    color: accentColor,
  });
  $('.header-accent').css({
    'background-color': accentColor,
  });
  return anime
    .timeline()
    .add({
      targets: '.header',
      height: '6.7em',
      skewY: '-4deg',
      opacity: 1,
      duration: 800,
      easing: 'easeOutCirc',
      delay: (_, i) => i * 120,
      complete: () => { skewComplete = true; },
    })
    .add({
      targets: '.header-unskew',
      opacity: 1,
      marginTop: '2em',
      skewY: '4deg',
      duration: 800,
      offset: '-=600',
    })
    .add({
      targets: '.main',
      paddingTop: '1em',
      opacity: 1,
      duration: 800,
      offset: '-=500',
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.back-arrow',
      left: '1.2em',
      opacity: 1,
      duration: 800,
      offset: '-=400',
    });
};

const onDefualtUnload = () => {
  skewComplete = false;
  skewExtented = false;
  menuOpen = false;
  return anime
    .timeline()
    .add({
      targets: '.back-arrow',
      left: 0,
      opacity: 0,
      duration: 300,
      easing: 'easeInQuad',
    })
    .add({
      targets: '.main',
      paddingTop: 0,
      opacity: 0,
      duration: 400,
      offset: '-=150',
      easing: 'easeInExpo',
    })
    .add({
      targets: '.header',
      height: 0,
      skewY: 0,
      duration: 600,
      offset: '-=350',
      easing: 'easeInExpo',
      delay: (_, i) => i * -100,
    })
    .add({
      targets: '.header-unskew',
      marginTop: 0,
      opacity: 0,
      skewY: 0,
      duration: 600,
      offset: '-=700',
      easing: 'easeInExpo',
    });
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
