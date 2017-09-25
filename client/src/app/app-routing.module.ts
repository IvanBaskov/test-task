import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { HomeComponent } from './home/home.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ClientComponent } from './clients/client/client.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'clients', component: ClientListComponent, pathMatch: 'full'},
  {path: 'clients/:id', component: ClientComponent},
  {path: 'new-client', component: NewClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
