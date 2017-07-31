import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CookieService } from '../cookie.service';
import { Serializable } from './../../models/serializable';
import { environment } from './../../../environments/environment';

export type ApiParams = {
  [key: string]: any | any[];
}

const IGNORED_ERROR_CODE: Array<number> = [];

@Injectable()
export class ApiService {

  public baseUrl: string;

  constructor(
    public http: Http,
    public cookie: CookieService) {

    if (environment.production) {
      this.baseUrl = "/api/v1";
    } else {
      this.baseUrl = "/assets/mock-data";
    }
  }

  /**
   * Get Request (Singe result)
   * @param typeDef type defination
   * @param path URL
   * @param params parameters
   */
  get<T extends Serializable<T>>(typeDef: { new(): T }, path: string, params: ApiParams): Observable<T> {
    return this.http.get(this.baseUrl + path, {
      params: params,
      withCredentials: environment.withCredentials,
      headers: this.getHeaders(false, false)
    }).map(response => new typeDef().deserialize(response.json()))
      .catch(error => this.handleError(error));
  }

  /**
   * Get Request (Mutile result)
   * @param typeDef type defination
   * @param path URL
   * @param params parameters
   */
  getAll<T extends Serializable<T>>(typeDef: { new(): T }, path: string, params: ApiParams): Observable<T[]> {
    return this.http.get(this.baseUrl + path, {
      params: params,
      withCredentials: environment.withCredentials,
      headers: this.getHeaders(false, false)
    }).map(response => response.json().data.map((d) => (new typeDef().deserialize(d))))
      .catch(error => this.handleError(error));
  }

  /**
 * Get Request (Singe result)
 * @param path URL
 * @param params parameters
 */
  getDynamic<D>(path: string, params: ApiParams): Observable<D> {
    return this.http.get(this.baseUrl + path, {
      params: params,
      withCredentials: environment.withCredentials,
      headers: this.getHeaders(false, false)
    }).map(response => response.json().data)
      .catch(error => this.handleError(error));
  }

  /**
   * Post request
   * @param typeDef type defination
   * @param path 
   * @param params 
   * @param isFormData 
   */
  post<T extends Serializable<T>>(typeDef: { new(): T }, path: string, params: ApiParams, isFormData: boolean = true): Observable<T> {
    return this.http.post(this.baseUrl + path,
      this.serializeAPIParams(params, isFormData),
      {
        params: params,
        withCredentials: environment.withCredentials,
        headers: this.getHeaders(false, false)
      }).map(response => new typeDef().deserialize(response.json()))
      .catch(error => this.handleError(error));
  }

  private handleError(error: any): Observable<any> {
    let result = error.json() || error;
    if (error.status === 401) {
      // 401は auth tokenの 認証エラーなのでサインイン画面に戻す.
      //this.globalState.notifyDataChanged(GlobalEvents.AuthFailed, result);
    } else if (IGNORED_ERROR_CODE.indexOf(result.code) !== -1) {
      // IGNORED_ERROR_CODE に含まれるコードは例外としてユーザ処理を行うので共通エラー処理は行わないが、
      // エラーコードに対応するメッセージを表示する.
      //result.reason = this.getErrorMessageOfCode(result.code);
    } else {
      // 共通エラー(ポップアップ表示)を行う. 
      //this.globalState.notifyDataChanged(GlobalEvents.ApiError, result);
    }
    return Observable.throw(result);
  }

  /**
   * Serialize http request params
   * @param params Http request params
   * @param isFormData Is pass form data type default is ture
   */
  private serializeAPIParams(params: ApiParams, isFormData: boolean = true): string {
    if (isFormData) {
      let body = new URLSearchParams();
      for (let key in params) {
        const value = params[key];
        // https://stackoverflow.com/questions/2559318/how-to-check-for-an-undefined-or-null-variable-in-javascript.
        if (value != null) {
          body.append(key, params[key]);
        }
      }
      return body.toString();
    } else {
      return JSON.stringify(params)
    }
  }

  private getHeaders(hasBody: boolean, isFormData: boolean): Headers {
    let contentType: string;
    if (hasBody) {
      if (isFormData) {
        contentType = 'application/x-www-form-urlencoded';
      }
      else {
        contentType = 'application/json';
      }
    }
    else {
      contentType = null;
    }

    //TODO:authToken
    const authToken = "";
    let headers = new Headers();
    if (authToken) {
      headers.append('Auth-Token', authToken);
    }
    if (contentType) {
      headers.append('Content-Type', contentType)
    }
    return headers;
  }
}
