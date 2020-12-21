import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPagesComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },
  { path: '', component: SiteLayoutComponent, children: [] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
