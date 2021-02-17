import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss'],
})
export class LinkCardComponent implements OnInit, OnDestroy {
  @Input() isCanDelete: boolean = true;
  @Input() linkData: any;
  @Output() onDelete = new EventEmitter<string>();

  paramsSubscription: Subscription;
  tagNameObj: { [key: string]: string };

  delete(id: string) {
    this.onDelete.emit(id);
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
