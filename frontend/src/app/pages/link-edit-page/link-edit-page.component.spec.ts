import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEditPageComponent } from './link-edit-page.component';

describe('LinkEditPageComponent', () => {
  let component: LinkEditPageComponent;
  let fixture: ComponentFixture<LinkEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
