/* global anime */

let skewComplete = false;
let skewExtented = false;

anime
  .timeline()
  .add({
    targets: '.animate-skew',
    height: '65%',
    skewY: '-8deg',
    opacity: 1,
    duration: 1200,
    easing: 'easeOutExpo',
    delay: (_, i) => i * 120,
    complete: () => skewComplete = true,
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
    delay: (_, i) => i * 200,
    offset: '-=800',
  });

const animate = (props) => {
  anime.remove(props.targets);
  return anime(props);
};

$('.skew').hover(() => {
  if (!skewComplete || skewExtented) return;
  skewExtented = true;
  animate({
    targets: '.animate-skew',
    height: [
      { value: '65%', duration: 0 },
      { value: '70%', duration: 1200 },
    ],
    duration: 1200,
    delay: (_, i) => i * 60,
  });
}, () => {
  if (!skewComplete || !skewExtented) return;
  skewExtented = false;
  animate({
    targets: '.animate-skew',
    height: [
      { value: '70%', duration: 0 },
      { value: '65%', duration: 1200 },
    ],
    duration: 1200,
    delay: (_, i) => i * -30,
  });
});

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
