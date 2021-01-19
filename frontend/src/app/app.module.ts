import { environment } from './../environments/environment';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { AuthService } from './shared/services/auth.service';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LinkCreatePageComponent } from './pages/link-create-page/link-create-page.component';
import { MyLinksPageComponent } from './pages/my-links-page/my-links-page.component';
import { LinkEditPageComponent } from './pages/link-edit-page/link-edit-page.component';
import { LinkDetailsPageComponent } from './pages/link-details-page/link-details-page.component';
import { SpinerComponent } from './shared/components/spiner/spiner.component';
import { LinkCardComponent } from './shared/components/link-card/link-card.component';
import { TagLinksComponent } from './pages/tag-links/tag-links.component';
import { YourStatsPageComponent } from './pages/your-stats-page/your-stats-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginPagesComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    MainPageComponent,
    LinkCreatePageComponent,
    MyLinksPageComponent,
    LinkEditPageComponent,
    LinkDetailsPageComponent,
    SpinerComponent,
    LinkCardComponent,
    TagLinksComponent,
    YourStatsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ app: reducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
