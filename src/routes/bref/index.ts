import type { RequestHandler } from '@sveltejs/kit';
import { createClient, type PostgrestResponse } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import type { TCountryResponse } from '$lib/ts/types/TCountryResponse';
import { getDeviceInfo } from '$lib/ts/helpers/getDeviceInfo';
import { getFormattedNow } from '$lib/ts/helpers/getFormattedNow';

const ipEndpoint = 'https://api.country.is';
const discordWebhookUrl = String(import.meta.env.VITE_DISCORD_B_WEBHOOK_URL);
const tableName = 'dev-b-ref-logs';

export const GET: RequestHandler = async ({ params, clientAddress, request }) => {
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
				body: JSON.stringify(
					getDiscordWebhookBody(countryCode, deviceInfo.type, deviceInfo.os, deviceInfo.browser)
				)
			})
		];
		const [supabaseRes, webhoookRes] = await Promise.all(promises);
		const { data, error } = supabaseRes as PostgrestResponse<any>;

		console.log('\nData: ', data, '\nError:', error);
	} catch (error) {
		console.log(error);
	}
	return {
		status: 302,
		headers: {
			Location: 'https://banano.cc'
		}
	};
};

function getDiscordWebhookBody(
	countryCode: string | null | undefined,
	deviceType: string | null | undefined,
	deviceOs: string | null | undefined,
	deviceBrowser: string | null | undefined
) {
	return {
		content: null,
		embeds: [
			{
				title: '🚘 Someone has passed through the ref!',
				color: 16506129,
				fields: [
					{
						name: 'Country',
						value: countryCode ?? 'Unknown'
					},
					{
						name: 'Device Type',
						value: deviceType ?? 'Unknown'
					},
					{
						name: 'Device Browser',
						value: deviceBrowser ?? 'Unknown'
					},
					{
						name: 'Device OS',
						value: deviceOs ?? 'Unknown'
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
