import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingBoxComponent } from './building-box.component';

describe('BuildingBoxComponent', () => {
  let component: BuildingBoxComponent;
  let fixture: ComponentFixture<BuildingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
