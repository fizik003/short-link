import { ContentPageComponent } from './pages/content-page/content-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { YourStatsPageComponent } from './pages/your-stats-page/your-stats-page.component';
import { TagLinksComponent } from './pages/tag-links/tag-links.component';
import { LinkDetailsPageComponent } from './pages/link-details-page/link-details-page.component';
import { MyLinksPageComponent } from './pages/my-links-page/my-links-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: AuthPageComponent },
      { path: 'register', component: AuthPageComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'mylinks', component: ContentPageComponent },
      { path: 'main', component: MainPageComponent },
      { path: 'content', component: ContentPageComponent },
      { path: 'my-stats', component: YourStatsPageComponent },
    ],
  },

  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'link/details/:id', component: LinkDetailsPageComponent },
      { path: 'tag/:tag', component: TagLinksComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
