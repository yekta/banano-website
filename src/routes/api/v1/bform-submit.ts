import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

interface TPostBody {
	bId: string;
	address: string;
}

function isBIdValid(bId: string): boolean {
	return typeof bId === 'string' && bId.startsWith('a') && bId.length < 65;
}

function isAddressValid(address: string): boolean {
	return typeof address === 'string' && address.startsWith('b') && address.length < 65;
}

export const post: RequestHandler = async ({ request }) => {
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
		try {
			const { data, error } = await supabase
				.from('dev-b-form-responses')
				.insert([{ 'b-id': bId, address: address }]);
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
