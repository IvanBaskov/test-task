import { Component, OnInit } from '@angular/core';
import { Page } from '../../model/page';
import { Client } from '../../../../../server/src/models/Client';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client-list',
  providers: [ClientsService],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  public page = new Page();
  public rows = Array<Client>();
  public filters = {name: null, phone: null, birthYearFrom: null, birthYearTo: null};

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.setPage(this.page);
  }

  public async setPage(pageInfo: any = {}) {
    let data = await this.clientsService.getClients({
      name: this.filters.name,
      phone: this.filters.phone,
      birthYearFrom: this.filters.birthYearFrom,
      birthYearTo: this.filters.birthYearTo,
      _start: (pageInfo.page - 1) * pageInfo.itemsPerPage,
      _limit: pageInfo.itemsPerPage
    });
    this.rows = data.rows;
    this.page.totalElements = data.totalElements;
  }

  public changeFilter(event) {
    this.setPage(this.page);
  }
}
