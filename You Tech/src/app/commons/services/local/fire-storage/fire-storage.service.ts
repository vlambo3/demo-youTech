import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';

export interface ISaveImageFireStorage {
	url: string;
	nameFile: string;
}

@Injectable({ providedIn: 'root' })
export class FireStorageService {
	constructor(private _storage: Storage) {}

	async saveImage(file: File): Promise<ISaveImageFireStorage> {
		const nameFile = uuidv4();
		const imageRef = ref(this._storage, `images/${nameFile}`);

		await uploadBytes(imageRef, file);
		const url = await getDownloadURL(imageRef);

		return { url, nameFile };
	}

	async deleteImage(fileName: string): Promise<void> {
		const imageRef = ref(this._storage, `images/${fileName}`);
		await deleteObject(imageRef);
	}
}
