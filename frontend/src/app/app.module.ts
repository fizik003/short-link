import { GetLinkByIdEffect } from './store/links/effects/getLinkById.effect';
import { GetTagEffect } from './store/links/effects/getTag.effect';
import { GetStatisticsEffect } from './store/stat/effects/getStatistics.effect';
import { DeleteLinkEffect } from './store/links/effects/deleteLink.effect';
import { CreateLinkEffect } from './store/links/effects/createLink.effect';
import { LinkUpdateEffect } from './store/links/effects/linkUpdate.effect';
import { GetCurrentUserEffect } from './store/user/effects/getCurrentUser.effect';
import { LoginEffect } from './store/user/effects/login.effects';
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

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
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
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { RegisterFormComponent } from './pages/auth-page/components/register-form/register-form.component';
import { LoginFormComponent } from './pages/auth-page/components/login-form/login-form.component';
import { reducer as userReducer } from './store/user/user.reducer';
import { LinkReducer } from './store/links/link.reducer';
import { statReducer } from './store/stat/stat.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    MainPageComponent,
    LinkCreatePageComponent,
    MyLinksPageComponent,
    LinkEditPageComponent,
    LinkDetailsPageComponent,
    SpinerComponent,
    LinkCardComponent,
    TagLinksComponent,
    YourStatsPageComponent,
    AuthPageComponent,
    RegisterFormComponent,
    LoginFormComponent,
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
    StoreModule.forRoot({
      user: userReducer,
      link: LinkReducer,
      stat: statReducer,
    }),
    EffectsModule.forRoot([
      LoginEffect,
      GetCurrentUserEffect,
      LinkUpdateEffect,
      CreateLinkEffect,
      DeleteLinkEffect,
      GetStatisticsEffect,
      GetTagEffect,
      GetLinkByIdEffect,
    ]),
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
