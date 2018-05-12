/* global anime */
/* global Barba */

let skewComplete = false;
let skewExtented = false;

const choose = arr => arr[Math.floor(Math.random() * arr.length)];

const animate = (props) => {
  anime.remove(props.targets);
  return anime(props);
};

const homepageHoverAnimations = () => {
  // extend and retract skew area
  $('.skew').hover(() => {
    if (!skewComplete || skewExtented) return;
    skewExtented = true;
    animate({
      targets: '.animate-skew',
      height: [
        { value: '65vh', duration: 0 },
        { value: '70vh', duration: 1200 },
      ],
      duration: 1200,
      delay: (_, i) => i * 60,
    });
    animate({
      targets: '.animate-follow',
      marginTop: [
        { value: 0, duration: 0 },
        { value: '1vh', duration: 1200 },
      ],
      duration: 1200,
    });
  }, () => {
    if (!skewComplete || !skewExtented) return;
    skewExtented = false;
    animate({
      targets: '.animate-skew',
      height: [
        { value: '70vh', duration: 0 },
        { value: '65vh', duration: 1200 },
      ],
      duration: 1200,
      delay: (_, i) => i * -30,
    });
    animate({
      targets: '.animate-follow',
      marginTop: [
        { value: '1vh', duration: 0 },
        { value: 0, duration: 1200 },
      ],
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
};

const defaultHoverAnimations = (accentColor) => {
  // extent and retract header
  $('.header').hover((e) => {
    if (!skewComplete || skewExtented) return;
    skewExtented = true;
    animate({
      targets: e.currentTarget,
      top: '-5px',
    });
  }, (e) => {
    if (!skewComplete || !skewExtented) return;
    skewExtented = false;
    animate({
      targets: e.currentTarget,
      top: '-20px',
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
  $('button').hover((e) => {
    $(e.currentTarget).css('border-color', accentColor);
  }, (e) => {
    $(e.currentTarget).css('border-color', '#bbb');
  });
};

// eslint-disable-next-line no-unused-vars
const onIndexLoad = () => {
  homepageHoverAnimations();
  return anime
    .timeline()
    .add({
      targets: '.animate-skew',
      height: '65vh',
      skewY: '-8deg',
      opacity: 1,
      duration: 1200,
      easing: 'easeOutCirc',
      delay: (_, i) => i * 120,
      complete: () => { skewComplete = true; },
    })
    .add({
      targets: '.animate-letter',
      top: 0,
      opacity: 1,
      delay: (_, i) => i * 20,
      offset: '-=1000',
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
  return anime
    .timeline()
    .add({
      targets: '.animate-column',
      marginBottom: [
        { value: '2em', duration: 0 },
        { value: '4em', duration: 400 },
      ],
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
      duration: 1000,
      easing: 'easeInExpo',
      offset: '-=400',
      delay: (_, i) => i * -120,
    });
};

// eslint-disable-next-line no-unused-vars
const onDefaultLoad = () => {
  const randColor = choose([
    '#F23E77',
    '#7D459E',
    '#41DBBA',
  ]);
  defaultHoverAnimations(randColor);
  return anime
    .timeline()
    .add({
      targets: '.header',
      top: '-20px',
      skewY: '-4deg',
      borderBottomColor: randColor,
      opacity: 1,
      duration: 1000,
      easing: 'easeOutCirc',
      complete: () => { skewComplete = true; },
    })
    .add({
      targets: '.header-unskew',
      skewY: '4deg',
      duration: 1000,
      offset: '-=1000',
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.main',
      paddingTop: '1em',
      opacity: 1,
      duration: 800,
      offset: '-=600',
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
      top: '-200px',
      skewY: 0,
      duration: 600,
      offset: '-=350',
      easing: 'easeInExpo',
    })
    .add({
      targets: '.header-unskew',
      skewY: 0,
      duration: 600,
      offset: '-=600',
      easing: 'easeInExpo',
    });
};

$(document).ready(() => {
  const transOutOfHome = Barba.BaseTransition.extend({
    start() {
      Promise
        .all([this.newContainerLoading, onIndexUnload().finished])
        .then(() => {
          onDefaultLoad();
          this.done();
        });
    },
  });

  const transIntoHome = Barba.BaseTransition.extend({
    start() {
      Promise
        .all([this.newContainerLoading, onDefualtUnload().finished])
        .then(() => {
          onDefaultLoad();
          onIndexLoad();
          this.done();
        });
    },
  });

  Barba.Pjax.getTransition = () => {
    const prev = Barba.HistoryManager.prevStatus().namespace;
    let transition = transIntoHome;

    if (prev === 'homepage') {
      transition = transOutOfHome;
    }

    return transition;
  };

  Barba.Pjax.start();
});

// parallax
$(document.body).mousemove((e) => {
  const x = e.pageX * -0.02;
  const y = e.pageY * -0.02;
  $(e.currentTarget).css('background-position', `${x}px ${y}px`);
});
