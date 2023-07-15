export interface IDataUser {
	idContentCreator: number;
	urlImage: string;
	fullName: string;
	isAdmin: boolean;
}

export interface IJwtDecode {
	idContentCreator: number;
	email: string;
	name: string;
	lastName: string;
	urlImage: string;
	admin: boolean;
}
