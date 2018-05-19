import anime from 'animejs';

const animate = (props) => {
  anime.remove(props.targets);
  return anime(props);
};

const headerHeight = { s: '6.7em', l: '7em' };

const animations = { };

animations.skew = () => {
  const skewHeight = { s: '65vh', l: '70vh' };
  const followMargin = { s: 0, l: '1vh' };
  const skewAnimations = { };
  skewAnimations.expand = () => {
    animate({
      targets: '.animate-skew',
      height: [skewHeight.s, skewHeight.l],
      duration: 1200,
      delay: (_, i) => i * 60,
    });
    animate({
      targets: '.animate-follow',
      marginTop: [followMargin.s, followMargin.l],
      duration: 1200,
    });
  };
  skewAnimations.retract = () => {
    animate({
      targets: '.animate-skew',
      height: [skewHeight.l, skewHeight.s],
      duration: 1200,
      delay: (_, i) => i * -30,
    });
    animate({
      targets: '.animate-follow',
      marginTop: [followMargin.l, followMargin.s],
      duration: 1200,
    });
  };
  return skewAnimations;
};

animations.column = (target) => {
  const columnScale = { s: 1, l: 1.2 };
  const columnAnimations = { };
  columnAnimations.scaleUp = () => {
    animate({
      targets: target,
      scale: columnScale.l,
      elasticity: 600,
    });
  };
  columnAnimations.scaleDown = () => {
    animate({
      targets: target,
      scale: columnScale.s,
      elasticity: 400,
    });
  };
  return columnAnimations;
};

animations.header = () => {
  const headerContentMargin = { s: '2em', l: '2.2em' };
  const headerAnimations = { };
  headerAnimations.extend = () => {
    animate({
      targets: '.header-accent',
      height: [headerHeight.s, headerHeight.l],
      delay: (_, i) => i * 60,
    });
    animate({
      targets: '.header-unskew',
      marginTop: [headerContentMargin.s, headerContentMargin.l],
    });
  };
  headerAnimations.retract = () => {
    animate({
      targets: '.header-accent',
      height: [headerHeight.l, headerHeight.s],
      delay: (_, i) => i * -30,
    });
    animate({
      targets: '.header-unskew',
      marginTop: [headerContentMargin.l, headerContentMargin.s],
    });
  };
  return headerAnimations;
};

animations.menu = () => {
  const openHeight = '101vh';
  const menuAnimations = { };
  menuAnimations.open = () => anime
    .timeline()
    .add({ // header heights change for some reason
      targets: '.header-background',
      height: headerHeight.l,
      duration: 1,
    })
    .add({
      targets: '.header-accent',
      height: [headerHeight.l, openHeight],
      skewY: 0,
      duration: 1000,
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.header-background',
      height: [headerHeight.l, openHeight],
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
      targets: '.animate-menu-item',
      top: 0,
      opacity: 1,
      offset: '-=900',
      delay: (_, i) => i * 60,
      begin: () => {
        $('.menu-content').css({
          display: 'block',
        });
      },
    });
  menuAnimations.close = () => anime
    .timeline()
    .add({
      targets: '.header',
      height: openHeight,
      duration: 1,
    })
    .add({
      targets: '.header-background',
      height: ['25vh', headerHeight.s],
      easing: 'easeOutCirc',
    })
    .add({
      targets: '.header-accent',
      height: ['25vh', headerHeight.l],
      skewY: '-4deg',
      easing: 'easeOutCirc',
      offset: '-=800',
    })
    .add({
      targets: '.animate-menu-item',
      top: '-50px',
      opacity: 0,
      duration: 200,
      easing: 'easeInExpo',
      offset: '-=1200',
      delay: (_, i) => i * -120,
      complete: () => {
        $('.menu-content').css({
          display: 'none',
        });
      },
    })
    .add({
      targets: '.header-title',
      opacity: 1,
      duration: 500,
      easing: 'easeOutExpo',
      offset: '-=800',
    });
  return menuAnimations;
};

animations.homepage = () => {
  const homepageAnimations = { };
  homepageAnimations.enter = callback => anime
    .timeline()
    .add({
      targets: '.animate-skew',
      height: '65vh',
      skewY: '-8deg',
      opacity: 1,
      duration: 800,
      easing: 'easeOutCirc',
      delay: (_, i) => i * 120,
      complete: () => {
        callback();
      },
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
  homepageAnimations.leave = () => anime
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
  return homepageAnimations;
};

animations.defaultPage = () => {
  const pageAnimations = { };
  pageAnimations.enter = callback => anime
    .timeline()
    .add({
      targets: '.header',
      height: '6.7em',
      skewY: '-4deg',
      opacity: 1,
      duration: 800,
      easing: 'easeOutCirc',
      delay: (_, i) => i * 120,
      complete: () => {
        callback();
      },
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
    });
  pageAnimations.leave = () => anime
    .timeline()
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
  return pageAnimations;
};

animations.projectSkew = (target) => {
  const skew = $(target).find('.project-skew')[0];
  const text = $(target).find('.project-text')[0];
  const desc = $(text).find('.project-desc')[0];
  const itemAnimations = { };
  anime.remove(skew);
  itemAnimations.hover = () => {
    anime({
      targets: skew,
      skewY: ['30deg', 0],
      translateY: '-100%',
      easing: 'easeOutExpo',
    });
    anime({
      targets: text,
      translateY: '-100%',
      easing: 'easeOutExpo',
    });
    anime({
      targets: desc,
      opacity: 0.7,
      easing: 'easeOutExpo',
    });
  };
  itemAnimations.hoverOff = () => {
    anime({
      targets: skew,
      skewY: '30deg',
      translateY: 0,
      easing: 'easeOutExpo',
    });
    anime({
      targets: text,
      translateY: 0,
      easing: 'easeOutExpo',
    });
    anime({
      targets: desc,
      opacity: 0,
      easing: 'easeOutExpo',
    });
  };
  return itemAnimations;
};

export default animations;
