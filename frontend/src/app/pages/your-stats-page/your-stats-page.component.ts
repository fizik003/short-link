import {
  isLoaddingSelector,
  statisticsSelector,
} from './../../store/selectors';
import { getStatisticsAction } from './../../store/actions/getStatistics.action';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { LinksService } from './../../shared/services/links.service';
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
    this.store.dispatch(getStatisticsAction());
    this.statistics$ = this.store.pipe(select(statisticsSelector));
    this.isLoading$ = this.store.pipe(select(isLoaddingSelector));
    // this.linkService.getStats().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     this.isLoading = false;
    //     this.stats = data;
    //   },
    //   (error) => {
    //     this.isLoading = false;
    //     MaterializeServices.tooast(error.error.message);
    //   }
    // );
  }
}
