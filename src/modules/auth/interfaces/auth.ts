export interface AuthRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	user: AuthUser;
}

export interface AuthUser {
	id: number;
	name: string;
	email: string;
}
