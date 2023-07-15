import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'statusRegister'
})
export class statusRegisterPipe implements PipeTransform {
	transform(value: number): string {
		return value === 1 ? 'ACTIVO' : 'INACTIVO';
	}
}
