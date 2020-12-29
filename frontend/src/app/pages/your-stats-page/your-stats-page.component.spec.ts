import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourStatsPageComponent } from './your-stats-page.component';

describe('YourStatsPageComponent', () => {
  let component: YourStatsPageComponent;
  let fixture: ComponentFixture<YourStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourStatsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
