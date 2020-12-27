import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss'],
})
export class LinkCardComponent implements OnInit {
  @Input() isCanDelete: boolean = true;
  @Input() linkData: any;
  @Output() onDelete = new EventEmitter<string>();

  delete(id: string) {
    this.onDelete.emit(id);
  }

  constructor() {}

  ngOnInit(): void {}
}
