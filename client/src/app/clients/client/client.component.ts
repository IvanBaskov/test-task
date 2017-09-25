import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Client } from '../../model/types';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-client',
  providers: [ClientsService],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public client: Client;

  constructor(private route: ActivatedRoute, private clientsService: ClientsService) {
  }

  async ngOnInit() {
    let id = this.route.snapshot.params['id'];
    let res = await this.clientsService.getClient(id);
    this.client = res.client;
  }

}
