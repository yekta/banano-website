import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import type { TCountryResponse } from '$lib/ts/types/TCountryResponse';
import { getDeviceInfo } from '$lib/ts/helpers/getDeviceInfo';

const ipEndpoint = 'https://api.country.is';

export const get: RequestHandler = async ({ params, clientAddress, request }) => {
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
		const { data, error } = await supabase.from('dev-b-logs').insert([
			{
				'country-code': countryCode,
				'user-agent': userAgent,
				'ip-hashed': ipHashed,
				'device-type': deviceInfo.type,
				'device-os': deviceInfo.os,
				'device-browser': deviceInfo.browser
			}
		]);
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
