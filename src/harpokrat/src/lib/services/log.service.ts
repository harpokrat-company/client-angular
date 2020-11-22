import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {ApiService} from './api.service';
import {ILog} from '@harpokrat/client';

@Injectable({
  providedIn: 'root'
})
export class LogService extends ResourceService<ILog> {

  constructor(apiService: ApiService) {
    super(apiService, 'logs', apiService.client.users);
  }
}
