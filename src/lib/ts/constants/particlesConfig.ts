export const particlesConfig = {
	fullScreen: {
		enable: false,
		zIndex: 0
	},
	detectRetina: true,
	interactivity: {
		events: {
			onHover: {
				enable: true,
				mode: 'grab',
				parallax: {
					force: 60
				}
			}
		},
		modes: {
			grab: {
				distance: 300
			}
		}
	},
	particles: {
		links: {
			color: {
				value: '#fbdd11'
			},
			distance: 250,
			enable: true,
			opacity: 0.5
		},
		move: {
			attract: {
				rotate: {
					x: 600,
					y: 1200
				}
			},
			enable: true,
			outModes: {
				bottom: 'out',
				left: 'out',
				right: 'out',
				top: 'out'
			}
		},
		number: {
			density: {
				enable: true
			},
			value: 24
		},
		shape: {
			type: 'image',
			image: {
				src: '/images/banana-for-particles.png',
				width: 64,
				height: 64
			}
		},
		size: {
			value: 18,
			random: true,
			anim: {
				enable: false,
				speed: 40,
				size_min: 12,
				sync: true
			}
		}
	}
};
