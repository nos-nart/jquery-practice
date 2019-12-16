import anime from 'animejs/lib/anime.es.js';

var path = anime.path('.motion-path-demo path');

anime({
  targets: '.motion-path-demo .el',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 10000,
  loop: true,
  // delay: 3000
});