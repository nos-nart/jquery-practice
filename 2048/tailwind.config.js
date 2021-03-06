module.exports = {
  theme: {
    // Some useful comment
    extend: {
      spacing: {
       '72': '18rem',
       '84': '21rem',
       '96': '24rem',
      }
    },
    colors: {
      'transparent': 'transparent',
      'white': '#fff',
      'brown-100': '#eee4da59',
      'brown-200': '#eee4da', //2
      'brown-300': '#ede0c8', //4
      'brown-400': '#bbada0',
      'brown-500': '#8f7a66',
      'brown-600': '#776e65',
      'orage-300': '#f2b179', //8
      'orage-400': '#f59563', //16
      'orage-500': '#f67c5f', //32
      'red-500': '#f65e3b', //64
      'yellow-400': '#edcf72', //128
      'yellow-500': '#edcc61', //256
      'yellow-600': '#edc850' //512
    },
    transitionProperty: { // defaults to these values
      'none': 'none',
      'all': 'all',
      'color': 'color',
      'bg': 'background-color',
      'border': 'border-color',
      'colors': ['color', 'background-color', 'border-color'],
      'opacity': 'opacity',
      'transform': 'transform',
    },
    transitionDuration: { // defaults to these values
      'default': '250ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    },
    transitionTimingFunction: { // defaults to these values
      'default': 'ease',
      'linear': 'linear',
      'ease': 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
    transitionDelay: { // defaults to these values
      'default': '0ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    },
    willChange: { // defaults to these values
      'auto': 'auto',
      'scroll': 'scroll-position',
      'contents': 'contents',
      'opacity': 'opacity',
      'transform': 'transform',
    },
  },
  variants: {
    // Some useful comment
    transitionProperty: ['responsive'],
    transitionDuration: ['responsive'],
    transitionTimingFunction: ['responsive'],
    transitionDelay: ['responsive'],
    willChange: ['responsive'],
  },
  plugins: [
    // ...
    require('tailwindcss-transitions')(),
    require('tailwindcss-grid')({
      grids: [2, 3, 4, 5, 6, 8, 10, 12],
      gaps: {
        0: '0',
        4: '1rem',
        8: '2rem',
        '4-x': '1rem',
        '4-y': '1rem',
      },
      autoMinWidths: {
        '16': '4rem',
        '24': '6rem',
        '300px': '300px',
      },
      variants: ['responsive'],
    }),
  ]
}
