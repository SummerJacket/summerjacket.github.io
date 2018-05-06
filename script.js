/* global anime */

let skewComplete = false;
let letterComplete = false;

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
    complete: () => letterComplete = true,
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

$('.skew').on('mouseenter', () => {
  if (!skewComplete) return;
  animate({
    targets: '.animate-skew',
    height: [
      { value: '65%', duration: 0 },
      { value: '70%', duration: 1000 },
    ],
    delay: (_, i) => i * 60,
  });
});
$('.skew').on('mouseleave',() => {
  if (!skewComplete) return;
  animate({
    targets: '.animate-skew',
    height: [
      { value: '70%', duration: 0 },
      { value: '65%', duration: 1000 },
    ],
    delay: (_, i) => i * -60,
  });
});

$('.animate-letter').on('mouseenter', (e) => {
  if (!letterComplete) return;
  animate({
    targets: e.currentTarget,
  });
});
$('.animate-letter').on('mouseleave', (e) => {
  if (!letterComplete) return;
  animate({
    targets: e.currentTarget,
  });
});

$('.animate-column').on('mouseenter', (e) => {
  animate({
    targets: e.currentTarget,
    scale: 1.2,
    elasticity: 600,
  });
});
$('.animate-column').on('mouseleave',(e) => {
  animate({
    targets: e.currentTarget,
    scale: 1,
    elasticity: 400,
  });
});
