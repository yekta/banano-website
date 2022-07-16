import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

interface TCountryResponse {
	country: string;
}

export const get: RequestHandler = async ({ params, clientAddress, request }) => {
	const ipEndpoint = 'https://api.country.is';
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
	// @ts-ignore
	const ipHashed = bcrypt.hashSync(clientAddress, 10);
	try {
		const countryRes = await fetch(`${ipEndpoint}/${clientAddress}`);
		const countryData: TCountryResponse = await countryRes.json();
		const countryCode = countryData.country;
		const { data, error } = await supabase
			.from('testlogs')
			.insert([{ 'country-code': countryCode, 'user-agent': userAgent, 'ip-hashed': ipHashed }]);
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
