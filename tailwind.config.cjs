function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`;
		}
		return `rgb(var(${variable}) / ${opacityValue})`;
	};
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		transitionDuration: {
			DEFAULT: '200ms',
			150: '150ms',
			250: '250ms',
			300: '300ms',
			350: '350ms',
			400: '400ms',
			500: '500ms',
			600: '600ms',
			700: '700ms',
			800: '800ms',
			1000: '1000ms'
		},
		transitionTimingFunction: {
			DEFAULT: 'cubic-bezier(0.5, 1, 0.89, 1)',
			in: 'ease-in',
			out: 'ease-out',
			'bounce-out': 'cubic-bezier(.2,1.5,.7,1)'
		},
		extend: {
			screens: {
				'3xl': '1792px',
				'4xl': '2048px',
				'5xl': '2800px'
			},
			colors: {
				'c-primary': withOpacityValue('--c-primary'),
				'c-secondary': withOpacityValue('--c-secondary'),
				'c-secondary-brighter': withOpacityValue('--c-secondary-brighter'),
				'c-bg': withOpacityValue('--c-bg'),
				'c-bg-secondary': withOpacityValue('--c-bg-secondary'),
				'c-on-bg': withOpacityValue('--c-on-bg'),
				'c-danger': withOpacityValue('--c-danger'),
				'c-discord': withOpacityValue('--c-discord'),
				'c-reddit': withOpacityValue('--c-reddit'),
				'c-twitter': withOpacityValue('--c-twitter'),
				'c-youtube': withOpacityValue('--c-youtube'),
				'c-instagram': withOpacityValue('--c-instagram'),
				'c-telegram': withOpacityValue('--c-telegram'),
				'c-facebook': withOpacityValue('--c-facebook'),
				'c-medium': withOpacityValue('--c-medium'),
				'c-primary-shaded': withOpacityValue('--c-primary-shaded'),
				'c-secondary-shaded': withOpacityValue('--c-secondary-shaded'),
				'c-bg-shaded': withOpacityValue('--c-bg-shaded'),
				'c-bg-secondary-shaded': withOpacityValue('--c-bg-secondary-shaded'),
				'c-bg-shaded': withOpacityValue('--c-bg-shaded'),
				'c-on-bg-shaded': withOpacityValue('--c-on-shaded-bg'),
				'c-discord-shaded': withOpacityValue('--c-discord-shaded'),
				'c-reddit-shaded': withOpacityValue('--c-reddit-shaded'),
				'c-twitter-shaded': withOpacityValue('--c-twitter-shaded'),
				'c-youtube-shaded': withOpacityValue('--c-youtube-shaded'),
				'c-instagram-shaded': withOpacityValue('--c-instagram-shaded'),
				'c-telegram-shaded': withOpacityValue('--c-telegram-shaded'),
				'c-facebook-shaded': withOpacityValue('--c-facebook-shaded'),
				'c-medium-shaded': withOpacityValue('--c-medium-shaded'),
				'c-chat-bubble': withOpacityValue('--c-chat-bubble'),
				'c-yellowpaper-bg': withOpacityValue('--c-yellowpaper-bg'),
				'c-yellowpaper-bg-shaded': withOpacityValue('--c-yellowpaper-bg-shaded'),
				'c-yellowpaper-on-bg': withOpacityValue('--c-yellowpaper-on-bg'),
				'c-yellowpaper-document-bg': withOpacityValue('--c-yellowpaper-document-bg'),
				'c-yellowpaper-primary': withOpacityValue('--c-yellowpaper-primary')
			},
			maxWidth: {
				xxs: '16rem',
				xxxs: '12rem'
			},
			maxHeight: {
				'40vh': '40vh',
				'50vh': '50vh',
				'60vh': '60vh'
			},
			ringWidth: {
				3: '3px'
			},
			animation: {
				'spin-faster': 'spin-faster 0.6s linear infinite',
				pressed: 'pressedScale 0.2s ease-out 1',
				'navbar-loading': 'navbar-loading 1.5s ease-out 1'
			},
			keyframes: {
				'spin-faster': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				pressedScale: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)' }
				},
				'navbar-loading': {
					'0%': { transform: 'scaleX(0)' },
					'100%': { transform: 'scaleX(1)' }
				}
			},
			scale: {
				80: '0.8',
				85: '0.85',
				101: '1.01',
				102: '1.02',
				103: '1.03',
				104: '1.04'
			},
			spacing: {
				'3px': '3px',
				0.75: '0.1875rem',
				4.5: '1.125rem',
				5.5: '1.375rem',
				6.5: '1.625rem',
				18: '4.5rem',
				19: '4.75rem',
				22: '5.5rem',
				26: '6.5rem',
				30: '7.5rem',
				66: '16.5rem',
				68: '17rem',
				100: '25rem',
				128: '32rem',
				140: '35rem',
				150: '37.5rem',
				160: '40rem',
				190: '45rem',
				200: '50rem',
				210: '52.5rem',
				220: '55rem',
				230: '57.5rem',
				240: '60rem',
				256: '64rem',
				288: '72rem',
				'0.3ch': '0.3ch',
				'0.4ch': '0.4ch',
				'0.5ch': '0.5ch',
				'0.75ch': '0.75ch',
				'1ch': '1ch',
				'2ch': '2ch',
				'3ch': '3ch',
				'4ch': '4ch',
				'40vh': '40vh',
				'50vh': '50vh',
				'60vh': '60vh'
			},
			boxShadow: {
				card: `0rem 0.75rem 1.5rem -0.25rem`,
				'blog-post': `0rem 0rem 0rem`,
				'blog-post-hover': `0rem 0.5rem 0rem`,
				button: '0rem 0.5rem 0rem 0rem',
				'button-hover': '0rem 0.625rem 0rem 0rem',
				'navbar-button': '0rem 0rem 0rem 0rem',
				'navbar-button-hover': '0rem 0.3rem 0rem 0rem',
				'search-bar': '0rem 2px 0rem 0rem',
				asset: '3rem 0rem 3rem 0rem',
				'yellowpaper-paper': '0rem 0.5rem 1rem 0rem',
				sidebar: '-0.5rem 0rem 0rem 0rem',
				navbar: '0rem 0.5rem 0.8rem 0rem',
				input: '0rem 1.5px 0rem 0rem',
				'input-active': '0rem 2.5px 0rem 0rem'
			},
			opacity: {
				3: '0.03',
				4: '0.04',
				6: '0.06',
				8: '0.08',
				12: '0.12',
				13: '0.13',
				15: '0.15',
				85: '0.85'
			},
			brightness: {
				80: '0.8',
				98: '0.98',
				103: '1.03',
				108: '1.08',
				115: '1.15',
				120: '1.2'
			}
		}
	},
	plugins: []
};
