import {Inject, Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {ApiService} from './api.service';
import {ISecret} from '@harpokrat/client';

@Injectable({
  providedIn: 'root'
})
export class SecretService extends ResourceService<ISecret> {

  constructor(
    apiService: ApiService,
    @Inject('serverUrl') serverUrl: string,
  ) {
    super(apiService, 'secrets', apiService.client.secrets);
  }
}
