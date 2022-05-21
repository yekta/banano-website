import type { TButton } from '../types/TButton';
import type { TIconSocial } from '../types/TIconSocial';

export const bananoSocials = {
	discord: {
		title: 'Discord',
		url: 'https://chat.banano.cc',
		buttonText: 'Join our Discord',
		buttonType: 'discord' as TButton,
		iconString: 'discord' as TIconSocial
	},
	reddit: {
		title: 'Reddit',
		url: 'https://reddit.com/r/banano',
		buttonText: 'Subscribe on Reddit',
		buttonType: 'reddit' as TButton,
		iconString: 'reddit' as TIconSocial
	},
	twitter: {
		title: 'Twitter',
		url: 'https://twitter.com/bananocoin',
		buttonText: 'Follow on Twitter',
		buttonType: 'twitter' as TButton,
		iconString: 'twitter' as TIconSocial
	},
	youtube: {
		title: 'YouTube',
		url: 'https://www.youtube.com/c/bananopictures',
		buttonText: 'Subscribe on YouTube',
		buttonType: 'youtube' as TButton,
		iconString: 'youtube' as TIconSocial
	},
	medium: {
		title: 'Medium',
		url: 'https://medium.com/banano',
		buttonText: 'Follow on Medium',
		buttonType: 'medium' as TButton,
		iconString: 'medium' as TIconSocial
	},
	instagram: {
		title: 'Instagram',
		url: 'https://instagram.com/bananocurrency',
		buttonText: 'Follow on Instagram',
		buttonType: 'instagram' as TButton,
		iconString: 'instagram' as TIconSocial
	},
	telegram: {
		title: 'Telegram',
		url: 'https://t.me/banano_official',
		buttonText: 'Join our Telegram',
		buttonType: 'telegram' as TButton,
		iconString: 'telegram' as TIconSocial
	},
	facebook: {
		title: 'Facebook',
		url: 'https://www.facebook.com/bananocurrency/',
		buttonText: 'Follow on Facebook',
		buttonType: 'facebook' as TButton,
		iconString: 'facebook' as TIconSocial
	},
	email: {
		title: 'Email',
		url: 'mailto:hello@banano.cc',
		buttonText: 'Contact Us',
		buttonType: 'primary' as TButton,
		iconString: 'email' as TIconSocial
	}
};
