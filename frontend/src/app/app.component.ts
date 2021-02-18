import { Router } from '@angular/router';
import { errorSelector } from './store/user/error/error.selector';
import { MaterializeServices } from './services/materialize.services';
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
  constructor(private router: Router, private store: Store) {}
  ngOnInit() {
    this.errorsSubscription = this.store
      .pipe(select(errorSelector))
      .subscribe((errors) => {
        errors.map((err) => {
          console.log(1);
          if (err) {
            MaterializeServices.tooast(String(err));
            this.router.navigate(['/main']);
          }
        });
      });

    this.store.dispatch(getCurrentUserAction());
  }

  ngOnDestroy(): void {
    if (this.errorsSubscription) this.errorsSubscription.unsubscribe();
  }
}
