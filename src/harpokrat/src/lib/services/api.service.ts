import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {HarpokratApi, IHarpokratApi, IHclModule, IHclService, IMeta,} from "@harpokrat/client";
import {Observable} from "rxjs";

export type QueryParams = HttpParams | { [param: string]: string | string[] };
export type RequestHeaders = HttpHeaders | { [param: string]: string | string[] };

export interface RequestOptions {
  params?: QueryParams;
  headers?: RequestHeaders;
  meta?: IMeta;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly client: IHarpokratApi;

  get hcl(): IHclService {
    return this.client.hcl;
  }

  /*get hclModule(): IHclModule {
    return this.hcl.module;
  }*/

  get hclModulePromise(): Promise<IHclModule> {
    return this.hcl.getModule();
  }

  protected constructor(
    private httpClient: HttpClient,
    @Inject('wasmUrl') private wasmUrl,
    @Inject('serverUrl') private readonly serverUrl: string,
  ) {
    this.client = new HarpokratApi({
      apiUrl: this.serverUrl,
      hclWasmUrl: wasmUrl,
      requester: <T>(url, options) => {
        return this.httpClient.request<T>(options.method || 'GET', url, {
          headers: new HttpHeaders(options.headers),
          body: options.body && JSON.stringify(options.body),
          params: options.searchParams,
        }).toPromise();
      }
    });
  }
}
