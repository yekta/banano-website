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
		extend: {
			colors: {
				'c-primary': withOpacityValue('--c-primary'),
				'c-secondary': withOpacityValue('--c-secondary'),
				'c-bg': withOpacityValue('--c-bg'),
				'c-on-bg': withOpacityValue('--c-on-bg'),
				'c-discord': withOpacityValue('--c-discord'),
				'c-reddit': withOpacityValue('--c-reddit'),
				'c-twitter': withOpacityValue('--c-twitter'),
				'c-instagram': withOpacityValue('--c-instagram'),
				'c-telegram': withOpacityValue('--c-telegram'),
				'c-facebook': withOpacityValue('--c-facebook')
			},
			spacing: {
				128: '32rem',
				140: '35rem',
				190: '45rem',
				200: '50rem',
				220: '55rem',
				230: '57.5rem',
				240: '60rem',
				256: '64rem',
				288: '72rem'
			},
			boxShadow: {
				card: `0 0.75rem 1.5rem -0.25rem`
			},
			opacity: {
				6: '0.06',
				8: '0.08'
			}
		}
	},
	plugins: []
};
