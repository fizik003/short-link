import { isLoaddingSelector } from './store/selectors';
import { Observable } from 'rxjs';
import { getCurrnetUserAction } from './store/actions/getCurrentUser.action';
import { Store, select } from '@ngrx/store';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(private auth: AuthService, private store: Store) {}
  ngOnInit() {
    // const potentialToken = localStorage.getItem('auth-token');
    // if (potentialToken) {
    //   this.auth.setToken(potentialToken);
    // }

    this.store.dispatch(getCurrnetUserAction());
    this.isLoading$ = this.store.pipe(select(isLoaddingSelector));
  }
}
