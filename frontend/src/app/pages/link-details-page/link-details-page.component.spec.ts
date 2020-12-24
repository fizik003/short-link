import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDetailsPageComponent } from './link-details-page.component';

describe('LinkDetailsPageComponent', () => {
  let component: LinkDetailsPageComponent;
  let fixture: ComponentFixture<LinkDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
