import { Routes } from '@angular/router';
import { UserListComponent } from './Components/user-list/user-list.component';
import { AddUserComponent } from './Components/add-user/add-user.component';

export const routes: Routes = [
  { path: '', outlet: 'user-list', component: UserListComponent },
  { path: '', outlet: 'app-add-user', component: AddUserComponent }
];
