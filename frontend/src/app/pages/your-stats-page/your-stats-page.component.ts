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
  links: LinkFromServer[];
  isLoading: boolean;
  constructor(private linkService: LinksService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.linkService.get().subscribe(
      (data: LinkFromServer[]) => {
        this.isLoading = false;
        this.links = data;
        console.log(this.links[1]);
      },
      (error) => {
        this.isLoading = false;
        MaterializeServices.tooast(error.error.message);
      }
    );
  }
}
