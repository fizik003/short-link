import { tagSelector } from './../../store/selectors';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { getTagAction } from './../../store/actions/getTag.action';
import { Store, select } from '@ngrx/store';
import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-links',
  templateUrl: './tag-links.component.html',
  styleUrls: ['./tag-links.component.scss'],
})
export class TagLinksComponent implements OnInit {
  tagNmae: string;
  tag: any;
  isLoading: boolean;
  paramsSubscribe: Subscription;
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.paramsSubscribe = this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.tagNmae = params['tag'];
          return this.store.pipe(select(tagSelector)).pipe(
            map((tags) => {
              if (tags.length) {
                const tag = tags.find((tag) => tag.name === this.tagNmae);
                if (tag) return tag;
              }
              this.store.dispatch(getTagAction({ requestTag: this.tagNmae }));
            })
          );
        })
      )
      .subscribe(
        (tag) => {
          if (tag) {
            this.tag = tag;
            this.isLoading = false;
          }
        },
        (err) => {
          MaterializeServices.tooast(err.message);
        }
      );
  }
}
