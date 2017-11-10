
import { Injectable } from '@angular/core';

const CONFIG = {
  apiUrl: 'http://127.0.0.1:3001/'
}

@Injectable()
export class AppSettingProvider {

  constructor() {}
  
  public getApiURL(){
    return CONFIG.apiUrl;
  }

}
