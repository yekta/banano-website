import { getDeviceInfo } from '$lib/ts/helpers/getDeviceInfo';
import { getFormattedNow } from '$lib/ts/helpers/getFormattedNow';
import { isEmail } from '$lib/ts/helpers/isEmail';
import type { TCountryResponse } from '$lib/ts/types/TCountryResponse';
import { createClient, type PostgrestResponse } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

const ipEndpoint = 'https://api.country.is';
const discordWebhookUrl = String(import.meta.env.VITE_DISCORD_BUSINESS_FORM_WEBHOOK_URL);
const tableName = 'business-form-responses';

export const post: RequestHandler = async ({ request, clientAddress }) => {
	let { businessName, businessEmail, message } = (await request.json()) as TPostBody;

	if (
		businessName &&
		businessEmail &&
		message &&
		isNameValid(businessName) &&
		isEmailValid(businessEmail) &&
		isMessageValid(message)
	) {
		const supabase = createClient(
			'https://lmtpfftjdzugvfawylzg.supabase.co',
			// @ts-ignore
			String(import.meta.env.VITE_SUPABASE_ADMIN_KEY),
			{
				fetch: (...args) => fetch(...args)
			}
		);
		const { headers } = request;
		const userAgent = headers.get('User-Agent');
		const deviceInfo = getDeviceInfo(userAgent);
		// @ts-ignore
		const ipHashed = bcrypt.hashSync(clientAddress, 10);
		let countryCode: null | string = null;
		try {
			const countryRes = await fetch(`${ipEndpoint}/${clientAddress}`);
			const countryData: TCountryResponse = await countryRes.json();
			countryCode = countryData.country;
		} catch (error) {
			console.log(error);
		}
		try {
			const promises = [
				supabase.from(tableName).insert([
					{
						'business-name': businessName,
						'business-email': businessEmail,
						message: message,
						'country-code': countryCode,
						'user-agent': userAgent,
						'ip-hashed': ipHashed,
						'device-type': deviceInfo.type,
						'device-os': deviceInfo.os,
						'device-browser': deviceInfo.browser
					}
				]),
				fetch(discordWebhookUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(getDiscordWebhookBody(businessName, businessEmail, message))
				})
			];
			const [supabaseRes, webhoookRes] = await Promise.all(promises);
			const { data, error } = supabaseRes as PostgrestResponse<any>;

			console.log(webhoookRes);
			if (data && !error) {
				console.log('\nData: ', data, '\nError:', error);
				return {
					status: 200,
					body: {
						data: 'Success',
						error: null
					}
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	return {
		status: 200,
		body: {
			data: null,
			error: 'Something went wrong'
		}
	};
};

interface TPostBody {
	businessName: string;
	businessEmail: string;
	message: string;
}

function isNameValid(name: string): boolean {
	return typeof name === 'string' && name.length > 0 && name.length < 100;
}

function isEmailValid(email: string): boolean {
	return typeof email === 'string' && email.length > 0 && isEmail(email);
}

function isMessageValid(message: string): boolean {
	return typeof message === 'string' && message.length > 0 && message.length <= 1000;
}

function getDiscordWebhookBody(name: string, email: string, message: string) {
	let body = {
		content: null,
		embeds: [
			{
				title: '💼 Someone has filled the business form!',
				color: 11953728,
				fields: [
					{
						name: 'Business Name',
						value: name
					},
					{
						name: 'Business Email',
						value: email
					}
				],
				footer: {
					text: getFormattedNow()
				}
			}
		],
		attachments: []
	};
}
