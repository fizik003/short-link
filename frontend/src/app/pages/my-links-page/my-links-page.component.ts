import { Router } from '@angular/router';
import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { Observable, Subscription } from 'rxjs';
import { LinksService } from './../../shared/services/links.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { link } from 'fs';

@Component({
  selector: 'app-my-links-page',
  templateUrl: './my-links-page.component.html',
  styleUrls: ['./my-links-page.component.scss'],
})
export class MyLinksPageComponent implements OnInit, OnDestroy {
  lSub: Subscription;
  lSubDele: Subscription;
  isLoading: boolean;
  links: any;
  constructor(private linkService: LinksService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.lSub = this.linkService.get().subscribe((data) => {
      this.links = data;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.lSub) this.lSub.unsubscribe();
    if (this.lSubDele) this.lSubDele.unsubscribe();
  }

  onDelete(id: number) {
    console.log(id);
    this.lSubDele = this.linkService.delete(id).subscribe(
      (data) => {
        MaterializeServices.tooast('Ссылка удалена');
        const delId = this.links.findIndex((item) => {
          return item.id === id;
        });

        console.log(delId);
        this.links.splice(delId, 1);
      },
      (error) => {
        MaterializeServices.tooast(error.error.message);
      }
    );
  }
}
