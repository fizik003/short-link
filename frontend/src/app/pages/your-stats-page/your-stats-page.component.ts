import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { LinkFromServer } from './../../shared/interfaces';
import { LinksService } from './../../shared/services/links.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-stats-page',
  templateUrl: './your-stats-page.component.html',
  styleUrls: ['./your-stats-page.component.scss'],
})
export class YourStatsPageComponent implements OnInit {
  stats: any;
  isLoading: boolean;
  constructor(private linkService: LinksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.linkService.getStats().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.stats = data;
      },
      (error) => {
        this.isLoading = false;
        MaterializeServices.tooast(error.error.message);
      }
    );
  }
}
