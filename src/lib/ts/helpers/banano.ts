export function isHash(hash: string) {
	return hash.length === 64 && /^[0-9A-Fa-f]+$/.test(hash);
}

export function bytesToHex(bytes: Uint8Array) {
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}
