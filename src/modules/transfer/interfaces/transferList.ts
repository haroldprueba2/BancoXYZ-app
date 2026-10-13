export interface TransferListResponse {
	message: string;
	transfers: TransferListData[];
}

export interface TransferListData {
	value: number;
	date: string;
	currency: string;
	payeer: Payeer;
}

interface Payeer {
	document: string;
	name: string;
}
