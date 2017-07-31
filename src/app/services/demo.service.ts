import { CookieService } from './cookie.service';
import { Http } from '@angular/http';
import { ApiService } from './api/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoService extends ApiService {

  constructor(
    public http: Http,
    public cookie: CookieService) {
    super(http, cookie);
  }

}
