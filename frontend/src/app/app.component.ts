import { MaterializeServices } from './materialize/materialize.services';
import { Observable, Subscription } from 'rxjs';
// import { getCurrnetUserAction } from './store/actions/getCurrentUser.action';
import { getCurrentUserAction } from './store/user/user.action';
import { Store, select } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  errorsSubscription: Subscription;
  constructor(private auth: AuthService, private store: Store) {}
  ngOnInit() {
    // const potentialToken = localStorage.getItem('auth-token');
    // if (potentialToken) {
    //   this.auth.setToken(potentialToken);
    // }

    // this.errorsSubscription = this.store
    //   .pipe(select(errorsSelector))
    //   .subscribe((err) => {
    //     if (err) {
    //       MaterializeServices.tooast(String(err));
    //     }
    //   });

    this.store.dispatch(getCurrentUserAction());
  }

  ngOnDestroy(): void {
    if (this.errorsSubscription) this.errorsSubscription.unsubscribe();
  }
}
