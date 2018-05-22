import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'initials'
})
export class InitialsPipe implements PipeTransform {
    transform(value: string): string {
        let initials = '';
        const words = value.split(/[\s,.]+/);
        words.forEach(element => {
            initials = initials + element.charAt(0).toUpperCase();
        });
        return initials;
    }
}
