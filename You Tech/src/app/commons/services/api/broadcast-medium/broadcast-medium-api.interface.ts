export interface IResponseAllBroadcastMedium {
	idBroadcastMedium: number;
	urImage: string;
	nameImage: string;
	name: string;
	description: string;
	idPlatform: number;
	platform: string;
	urlPlatform: string;
	tagList: TagList[];
}

export interface TagList {
	idTag: number;
	description: string;
}

export interface IRequestSaveBroadcastMedium {
	urImage: string;
	nameImage: string;
	name: string;
	description: string;
	url: string;
	idBroadcastType: number;
	idContentCreator: number;
	broadcastMediumTagList: number[];
}
