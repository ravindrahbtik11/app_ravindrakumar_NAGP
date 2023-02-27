import { HttpClient, HttpResponse, HttpRequest, HttpHeaders, HttpInterceptor, HttpHandler, HttpEvent, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

// Class use to over load http service methods

export class ECAHttpService implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            withCredentials: true
        });

        return next.handle(request);
    }


    constructor(public http: HttpClient) { }

    // Method use to get data
    getHtml(url: string, options?: any): Observable<HttpResponse<any>> {
        const option = this.getRequestOptionArgs(options);
        return this.http.get<any>(url, { headers: option.headers, observe: 'response' });
    }

    // Method use to get data
    get(url: string, options?: any): Observable<Response> {
        return this.http.get<any>(url, this.getRequestOptionArgs(options));
    }


    // Method use to post data
    post(url: string, body: any, options?: any): Observable<Response> {
        return this.http.post<any>(this.getUrlWithRandomNumber(url), body, this.getRequestOptionArgs(options));
    }

    // Method use to put data
    put(url: string, body: any, options?: any): Observable<Response> {
        return this.http.put<any>(this.getUrlWithRandomNumber(url), body, this.getRequestOptionArgs(options));
    }

    // Method use to delete data
    delete(url: string, options?: any): Observable<Response> {
        return this.http.delete<any>(this.getUrlWithRandomNumber(url), this.getRequestOptionArgs(options));
    }

    // Method use to get request options
    private getRequestOptionArgs(optionsArgs: any) {

        const options = {
            headers: new HttpHeaders(), withCredentials: true
        };

        if (typeof optionsArgs !== 'undefined' && options !== null && options !== undefined) {
            if (typeof options.headers !== 'undefined' && options.headers !== null && options !== undefined) {

                options.headers = optionsArgs.headers;
            }
        }

        options.headers = options.headers.append('Pragma', 'no-cache');
            options.headers = options.headers.append('Cache-Control', 'no-cache');
            options.headers = options.headers.append('Cache-Control', 'no-store, no-cache, must-revalidate');
            options.headers = options.headers.append('Content-Encoding', 'UTF-8');
            options.headers = options.headers.append('Content-Security-Policy', `default-src 'self'`);
        return options;
    }


    // Method use to concatenate random number in url
    public getUrlWithRandomNumber(url: string) {
        if (url && url.length > 0 && url.indexOf('?') > -1) {
            url = url + '&a=' + Math.random();
        } else {
            url = url + '?a=' + Math.random();
        }
        return url;
    }

    // Method use to concatenate random number in url
    public getEncodedUrl(url: string, parameterName: any[], parameterValue: any[]) {
        if (parameterName && parameterValue) {
            parameterName.forEach((item, index) => {
                if (index > 0 || url && url.length > 0 && url.indexOf('?') > -1) {
                    url = url + '&' + parameterName[index] + '=' + parameterValue[index];
                } else {
                    url = url + '?' + parameterName[index] + '=' + parameterValue[index];
                }
            });
        }

        url = encodeURI(url);
        return url;
    }

    /* Manage Email Signature services end */

    public getOptions(headers: HttpHeaders): any {
        if (typeof headers === 'undefined' || headers === null || headers === undefined) {
            headers = new HttpHeaders();
        }
        headers.append('Content-Type', 'application/json; charset=utf-8');
        const options = {
            headers: headers
        };
        // const options = new HttpRequest({ headers: headers });
        return options;
    }
}
