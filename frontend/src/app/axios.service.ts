import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.get['accept'] = '*/*';
  }

  request(method: string, url: string, data: any): Promise<any> {
      let headers: any = {};

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }
}
