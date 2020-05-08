import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteFormComponent } from './restaurante-form.component';

describe('RestauranteFormComponent', () => {
  let component: RestauranteFormComponent;
  let fixture: ComponentFixture<RestauranteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauranteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
