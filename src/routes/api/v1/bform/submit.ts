import { getDeviceInfo } from '$lib/ts/helpers/getDeviceInfo';
import { getFormattedNow } from '$lib/ts/helpers/getFormattedNow';
import type { TCountryResponse } from '$lib/ts/types/TCountryResponse';
import { createClient, type PostgrestResponse } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

const ipEndpoint = 'https://api.country.is';
const discordWebhookUrl = String(import.meta.env.VITE_DISCORD_B_WEBHOOK_URL);
const tableName = 'dev-b-form-responses';

export const POST: RequestHandler = async ({ request, clientAddress }) => {
	let { bId, address } = (await request.json()) as TPostBody;

	if (bId && address && isBIdValid(bId) && isAddressValid(address)) {
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
						'b-id': bId,
						address: address,
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

			if (data && !error) {
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
				title: '📃 Someone has filled the b form!',
				color: 5029707,
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

interface TPostBody {
	bId: string;
	address: string;
}

function isBIdValid(bId: string): boolean {
	return typeof bId === 'string' && bId.startsWith('a') && bId.length < 65;
}

function isAddressValid(address: string): boolean {
	return typeof address === 'string' && address.startsWith('ban_') && address.length === 64;
}
