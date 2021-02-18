import {
  statSelector,
  statIsLoading,
} from '../../../../store/stat/stat.selector';
import { getStatisticAction } from '../../../../store/stat/stat.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MaterializeServices } from '../../../../services/materialize.services';
import { LinksService } from '../../../../services/links.service';
import { Component, OnInit } from '@angular/core';
import { StatisticsResponseInterface } from 'src/app/store/types/statisticsRsponse.interface';

@Component({
  selector: 'app-your-stats-page',
  templateUrl: './your-stats-page.component.html',
  styleUrls: ['./your-stats-page.component.scss'],
})
export class YourStatsPageComponent implements OnInit {
  statistics$: Observable<StatisticsResponseInterface>;
  isLoading$: Observable<boolean>;
  constructor(private linkService: LinksService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getStatisticAction());
    this.statistics$ = this.store.pipe(select(statSelector));
    this.isLoading$ = this.store.pipe(select(statIsLoading));
  }
}
