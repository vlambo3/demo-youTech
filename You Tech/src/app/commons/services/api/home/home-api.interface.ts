export interface IResponseContentCreatorHome {
	idContentCreator: number;
	name: string;
	lastName: string;
	urlGithub?: string;
	urlTwitter?: string;
	urlLinkedin?: string;
	idPseudonym?: string;
	imageProfile: string;
	countBroadcastMedium: number;
}

export interface IResponseTags {
	idTag: number;
	description: string;
}
