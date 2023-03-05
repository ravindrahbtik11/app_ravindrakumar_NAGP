import { NativeDateAdapter } from '@angular/material/core';

/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class CustomDateAdapter extends NativeDateAdapter {

    parse(value: any): Date | null {

        if ((typeof value === 'string') && (value.indexOf('.') > -1)) {
            const str = value.split('.');

            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);

            return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }

    format(date: Date, displayFormat: Object): string {
        let formatedDate: string;
        let seperator: string;
        if (displayFormat === 'input' && date) {

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            seperator = '-';
            formatedDate = year + seperator + this._to2digit(month) + seperator + this._to2digit(day);
            
            // if (AppSettings.CurrentCulture === 'en') {
            //     seperator = '-';
            //     formatedDate = year + seperator + this._to2digit(month) + seperator + this._to2digit(day);
            // } else {
            //     seperator = '.';
            //     formatedDate = this._to2digit(day) + seperator + this._to2digit(month) + seperator + year;
            // }

        } else {
            formatedDate = date.toDateString();
        }
        return formatedDate;
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
