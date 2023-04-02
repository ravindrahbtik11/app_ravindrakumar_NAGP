import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ECAHttpService } from '../shared/services';
import { AccountService } from '../login/account.service';


@Injectable()

export class ProductService {

  productFilter: any;
  productList: any;
  constructor(private http: ECAHttpService) {
  }


  // Method use to get Detailss
  public getDetail(url: string, headerList: any = null): Observable<any> {
    let headers = new HttpHeaders();
    if (headerList) {
      headerList._keys.forEach((key) => {
        headers = headers.append(key, headerList[key]);
      });
    }
    const options = { headers: headers };
    return this.http.get(url, options).pipe((response) => {
      return response;
    });
  }

  public getFormUrlEncoded(toConvert) {
    const formBody: any = [];
    for (const property in toConvert) {
      if (property) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = (toConvert[property] || toConvert[property] === '') ? encodeURIComponent(toConvert[property]) : null;
        if (encodedKey !== 'file' && encodedValue) {
          formBody.push(encodedKey + '=' + encodedValue);
        }
      }

    }
    return formBody.join('&');
  }

  // Method use to get Detailss
  public postData(url: string, data: any, headerList: any = null): Observable<any> {
    let headers = new HttpHeaders();
    if (headerList) {
      headerList._keys.forEach((key) => {
        headers = headers.append(key, headerList[key]);
      });
    }
    const options = { headers: headers };
    const body = JSON.stringify(data);
    return this.http.post(url, body, options).pipe((response) => {
      return response;
    });
  }

  // Method use to get Detailss
  public postFileData(url: string, data: any, headerList: any = null): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = { headers: headers };
    if (headerList) {
      headerList._keys.forEach((key) => {
        headers = headers.append(key, headerList[key]);
      });
    }
    // const body = this.getFormUrlEncoded(data);
    // const body = JSON.stringify(data);
    return this.http.post(url, data, options).pipe((response) => {
      return response;
    });
  }

  public updateData(url: string, data: any, headerList: any = null): Observable<any> {
    let headers = new HttpHeaders();
    if (headerList) {
      headerList._keys.forEach((key) => {
        headers = headers.append(key, headerList[key]);
      });
    }
    const options = { headers: headers };
    const body = JSON.stringify(data);
    return this.http.post(url, body, options).pipe((response) => {
      return response;
    });
  }

}