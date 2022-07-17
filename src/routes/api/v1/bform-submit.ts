import { isAddress } from '$lib/ts/helpers/banano';
import type { TCountryResponse } from '$lib/ts/types/TCountryResponse';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

interface TPostBody {
	bId: string;
	address: string;
}

function isBIdValid(bId: string): boolean {
	return typeof bId === 'string' && bId.startsWith('a') && bId.length < 65;
}

function isAddressValid(address: string): boolean {
	return typeof address === 'string' && isAddress(address);
}

const ipEndpoint = 'https://api.country.is';

export const post: RequestHandler = async ({ request, clientAddress }) => {
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
			const { data, error } = await supabase.from('dev-b-form-responses').insert([
				{
					'b-id': bId,
					address: address,
					'country-code': countryCode,
					'user-agent': userAgent,
					'ip-hashed': ipHashed
				}
			]);
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
