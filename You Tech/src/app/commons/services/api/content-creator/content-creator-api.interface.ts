export interface IResponseContentCreator {
	idContentCreator: number;
	name: string;
	lastName: string;
	urlGithub?: string;
	urlTwitter?: string;
	urlLinkedin?: string;
	idPseudonym?: string;
	imageProfile: string;
}

export interface IresponseAllBroadcastMedium {
	idBroadcastMedium: number;
	urImage: string;
	name: string;
	idPlatform: number;
	platform: string;
	urlPLatform: string;
	tagList: TagList[];
}

export interface TagList {
	idTag: number;
	description: string;
}

export interface IResponseContentCreatorForEdition {
	name: string;
	lastName: string;
	urlGithub?: string;
	urlTwitter?: string;
	urlLinkedin?: string;
	pseudonym: string;
	email: string;
	password: string;
	nameImageProfile: string;
	imageProfile: string;
}

export interface IRequestContentCreatorEdit extends IResponseContentCreatorForEdition {
	idContentCreator: number;
}

export interface IResponseContentCreatorSearchPrincipal {
	name: string;
	lastName: string;
	urlGithub?: string;
	urlTwitter?: string;
	urlLinkedin?: string;
	pseudonym: string;
	nameImageProfile: string;
	imageProfile: string;
}
