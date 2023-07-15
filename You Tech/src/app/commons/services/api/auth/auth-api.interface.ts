import { IResponse } from '../base-api.model';

export interface IResponseLogin {
	jwt: string;
}

export interface IRequestRegister {
	name: string;
	lastName: string;
	imageProfile: string;
	nameImageProfile: string;
	email: string;
	password: string;
}

export interface IResponseRegister {
	idUser: string;
	email: string;
	token: string;
}

export type TypeResponseLogin = IResponse<IResponseLogin>;
export type TypeResponseRegister = IResponse<IResponseRegister>;
