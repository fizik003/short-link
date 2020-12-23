import { MyLinksPageComponent } from './pages/my-links-page/my-links-page.component';
import { LinkEditPageComponent } from './pages/link-edit-page/link-edit-page.component';
import { LinkCreatePageComponent } from './pages/link-create-page/link-create-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuard } from './shared/guards/auth.guard';

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
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'mylinks', component: MyLinksPageComponent },
      { path: 'main', component: MainPageComponent },
      { path: 'link/create', component: LinkCreatePageComponent },
      { path: 'link/edit/:id', component: LinkEditPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
