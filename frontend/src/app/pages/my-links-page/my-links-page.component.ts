import { Observable } from 'rxjs';
import { LinksService } from './../../shared/services/links.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-links-page',
  templateUrl: './my-links-page.component.html',
  styleUrls: ['./my-links-page.component.scss'],
})
export class MyLinksPageComponent implements OnInit {
  links$: Observable<any>;
  constructor(private linkService: LinksService) {}

  ngOnInit(): void {
    this.links$ = this.linkService.get();
  }

  onDelete(id: number) {
    console.log(id);
  }
}
