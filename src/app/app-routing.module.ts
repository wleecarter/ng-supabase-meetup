import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './routes/auth';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./routes/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'items',
    loadChildren: () =>
      import('./routes/items/items.module').then((m) => m.ItemListModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
