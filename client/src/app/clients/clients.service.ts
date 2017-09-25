import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Client } from '../../../../server/src/models/Client';
import { TableSelection } from '../model/types';
import { ResponseHandlerService } from '../common/response-handler.service';

type searchParams = {
  name?: string;
  phone?: string;
  birthYearFrom?: string;
  birthYearTo?: string;
  _start?: number;
  _limit?: number;
}

@Injectable()
export class ClientsService {

  constructor(private http: Http, private responseHandler: ResponseHandlerService) {
  }

  public getClients(params: searchParams): Promise<any | TableSelection<Client>> {
    let options = new RequestOptions();
    let httpParams: URLSearchParams = new URLSearchParams();
    let searchOptions: searchParams = {};

    searchOptions._start = params._start;
    searchOptions._limit = params._limit;
    params.name && (searchOptions.name = params.name);
    params.phone && (searchOptions.phone = params.phone);
    params.birthYearFrom && (searchOptions.birthYearFrom = params.birthYearFrom);
    params.birthYearTo && (searchOptions.birthYearTo = params.birthYearTo);

    return this.http.get('/api/clients', {
      search: searchOptions
    }).toPromise()
      .then(this.responseHandler.parseResponse())
      .catch(this.responseHandler.parseError());
  }

  public getClient(id: number): Promise<any> {
    return this.http.get('/api/clients/' + id).toPromise()
      .then(this.responseHandler.parseResponse())
      .catch(this.responseHandler.parseError());
  }

  public addClient(client: Client) {
    return this.http.post('/api/clients', client).toPromise()
      .then(this.responseHandler.parseResponse())
      .catch(this.responseHandler.parseError());
  }


}
