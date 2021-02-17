import { ContentPageComponent } from './pages/content-page/content-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { YourStatsPageComponent } from './pages/content-page/components/your-stats-page/your-stats-page.component';
import { TagLinksComponent } from './pages/content-page/components/tag-links/tag-links.component';
import { LinkDetailsPageComponent } from './pages/content-page/components/link-details-page/link-details-page.component';
import { MyLinksPageComponent } from './pages/content-page/components/my-links-page/my-links-page.component';
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
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,

    // canActivate: [AuthGuard],

    children: [
      { path: 'main', component: MainPageComponent },
      { path: 'content', component: ContentPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
