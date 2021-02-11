import { logoutAction } from './../../../store/user/user.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogOut(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
    this.store.dispatch(logoutAction());
  }
}
