import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterChild'
})

// Class represent Filter Child Pipe
export class FilterChildPipe implements PipeTransform {
    transform(items: any, filter: any, isMenu: any = false): any {
        if (items && items.length > 0 && filter) {
            if (isMenu) {
                const data = items.filter((item: any) => item.parentId === filter);
                return data.sort((a: any, b: any) => parseInt(a.sequence, 10) - parseInt(b.sequence, 10)); // sorted in ascending order by sequence
            } else {
                return items.filter(item => {
                    return (item.name.toLowerCase().includes(filter ? filter.toLowerCase() : ''));
                });
            }
        } else {
            return items;
        }

    }
}



@Pipe({
    name: 'filterChildItem'
})

// Class represent Filter Child Pipe
export class FilterChildItemPipe implements PipeTransform {
    transform(input: any, filter: any, isMenu: any = false): any {
        if (isMenu) {
            const data = input.filter((item: any) => item.parentId === filter);
            return data.sort((a: any, b: any) => parseInt(a.sequence, 10) - parseInt(b.sequence, 10)); // sorted in ascending order by sequence
        } else {
            return input.filter((item: any) => item.parentId === filter && parseInt(filter, 10) > 0);
        }
    }
}
