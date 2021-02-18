import { ContentPageComponent } from './pages/content-page/content-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: AuthPageComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'main', component: MainPageComponent }],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [{ path: 'content', component: ContentPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
