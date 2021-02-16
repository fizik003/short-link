import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLinksPageComponent } from './my-links-page.component';

describe('MyLinksPageComponent', () => {
  let component: MyLinksPageComponent;
  let fixture: ComponentFixture<MyLinksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLinksPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLinksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
