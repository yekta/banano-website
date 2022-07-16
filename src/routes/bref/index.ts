import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

export const get: RequestHandler = async ({ params, clientAddress, request }) => {
	const supabase = createClient(
		'https://lmtpfftjdzugvfawylzg.supabase.co',
		// @ts-ignore
		process.env.SUPABASE_ADMIN_KEY,
		{
			fetch: (...args) => fetch(...args)
		}
	);
	let { headers } = request;
	let countryCode = headers.get('CF-IPCountry');
	let userAgent = headers.get('User-Agent');
	// @ts-ignore
	let ipHashed = bcrypt.hashSync(clientAddress, 10);
	try {
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
