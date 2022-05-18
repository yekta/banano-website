function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variable}))`;
		}
		return `rgb(var(${variable}) / ${opacityValue})`;
	};
}

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		transitionDuration: {
			DEFAULT: '200ms',
			150: '150ms',
			250: '250ms',
			300: '300ms',
			400: '400ms',
			1000: '1000ms'
		},
		transitionTimingFunction: {
			DEFAULT: 'cubic-bezier(0.5, 1, 0.89, 1)',
			in: 'ease-in',
			out: 'ease-out'
		},
		extend: {
			colors: {
				'c-primary': withOpacityValue('--c-primary'),
				'c-secondary': withOpacityValue('--c-secondary'),
				'c-bg': withOpacityValue('--c-bg'),
				'c-bg-secondary': withOpacityValue('--c-bg-secondary'),
				'c-on-bg': withOpacityValue('--c-on-bg'),
				'c-discord': withOpacityValue('--c-discord'),
				'c-reddit': withOpacityValue('--c-reddit'),
				'c-twitter': withOpacityValue('--c-twitter'),
				'c-instagram': withOpacityValue('--c-instagram'),
				'c-telegram': withOpacityValue('--c-telegram'),
				'c-facebook': withOpacityValue('--c-facebook'),
				'c-primary-shaded': withOpacityValue('--c-primary-shaded'),
				'c-secondary-shaded': withOpacityValue('--c-secondary-shaded'),
				'c-bg-shaded': withOpacityValue('--c-bg-shaded'),
				'c-bg-secondary-shaded': withOpacityValue('--c-bg-secondary-shaded'),
				'c-bg-shaded': withOpacityValue('--c-bg-shaded'),
				'c-on-bg-shaded': withOpacityValue('--c-on-shaded-bg'),
				'c-discord-shaded': withOpacityValue('--c-discord-shaded'),
				'c-reddit-shaded': withOpacityValue('--c-reddit-shaded'),
				'c-twitter-shaded': withOpacityValue('--c-twitter-shaded'),
				'c-instagram-shaded': withOpacityValue('--c-instagram-shaded'),
				'c-telegram-shaded': withOpacityValue('--c-telegram-shaded'),
				'c-facebook-shaded': withOpacityValue('--c-facebook-shaded')
			},
			spacing: {
				0.75: '0.1875rem',
				4.5: '1.125rem',
				5.5: '1.375rem',
				6.5: '1.625rem',
				22: '5.5rem',
				128: '32rem',
				140: '35rem',
				190: '45rem',
				200: '50rem',
				210: '52.5rem',
				220: '55rem',
				230: '57.5rem',
				240: '60rem',
				256: '64rem',
				288: '72rem'
			},
			boxShadow: {
				card: `0rem 0.75rem 1.5rem -0.25rem`,
				button: '0rem 0.5rem 0rem 0rem',
				'button-hover': '0rem 0.625rem 0rem 0rem'
			},
			opacity: {
				3: '0.03',
				4: '0.04',
				6: '0.06',
				8: '0.08',
				15: '0.15'
			},
			brightness: {
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
