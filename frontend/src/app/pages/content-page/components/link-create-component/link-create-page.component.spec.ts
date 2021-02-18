import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCreatePageComponent } from './link-create-page.component';

describe('LinkCreatePageComponent', () => {
  let component: LinkCreatePageComponent;
  let fixture: ComponentFixture<LinkCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkCreatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
