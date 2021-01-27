import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { ActivatedRoute, Params } from '@angular/router';
import { TagsService } from './../../shared/services/tags.service';
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
  constructor(private tagService: TagsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.tagNmae = params['tag'];
    });

    this.tagService.getTag(this.tagNmae).subscribe(
      (data: any) => {
        console.log(data);
        this.isLoading = false;
        this.tag = data;
      },
      (error) => {
        this.isLoading = false;
        MaterializeServices.tooast(error.error.message);
      }
    );
  }
}
