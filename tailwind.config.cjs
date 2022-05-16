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
				'c-on-bg': withOpacityValue('--c-on-bg')
			},
			width: {
				128: '32rem',
				140: '35rem',
				190: '45rem',
				200: '50rem',
				256: '64rem',
				288: '72rem'
			}
		}
	},
	plugins: []
};
