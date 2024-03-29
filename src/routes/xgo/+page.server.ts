import { createClient, type PostgrestResponse } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { getDeviceInfo } from '$ts/helpers/getDeviceInfo';
import { getFormattedNow } from '$ts/helpers/getFormattedNow';
import { DISCORD_B_WEBHOOK_URL, SUPABASE_ADMIN_KEY } from '$env/static/private';
import type { ServerLoad } from '@sveltejs/kit';

export const prerender = false;

const discordWebhookUrl = DISCORD_B_WEBHOOK_URL;
const tableName = 'xgo-ref-logs';

export const load: ServerLoad = async ({ params, getClientAddress, request }) => {
	const supabase = createClient('https://lmtpfftjdzugvfawylzg.supabase.co', SUPABASE_ADMIN_KEY, {
		fetch: (...args) => fetch(...args)
	});
	const clientAddress = getClientAddress();
	const { headers } = request;
	const userAgent = headers.get('user-agent');
	const deviceInfo = getDeviceInfo(userAgent);
	// @ts-ignore
	const ipHashed = bcrypt.hashSync(clientAddress, 10);
	const countryCode = headers.get('cf-ipcountry');
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
		data: 'ok'
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
				title: '🚘 Someone has passed through the XGo ref!',
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
