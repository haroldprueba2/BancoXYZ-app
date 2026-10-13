export interface TransferListResponse {
	message: string;
	transfers: TransferItem[];
}

interface TransferItem {
	value: number;
	date: string;
	currency: string;
	payeer: Payeer;
}

interface Payeer {
	document: string;
	name: string;
}
