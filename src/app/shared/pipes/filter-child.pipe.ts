import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterChild'
})

// Class represent Filter Child Pipe
export class FilterChildPipe implements PipeTransform {
    transform(input: any, filter: any, isMenu: any = false): any {
        if (isMenu) {
            const data = input.filter((item: any) => item.parentId === filter);
            return data.sort((a: any, b: any) => parseInt(a.sequence, 10) - parseInt(b.sequence, 10)); // sorted in ascending order by sequence
        } else {
            return input.filter((item: any) => item.parentId === filter && parseInt(filter, 10) > 0);
        }
    }
}
