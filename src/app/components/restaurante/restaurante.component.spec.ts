import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteComponent } from './restaurante.component';

describe('RestauranteComponent', () => {
  let component: RestauranteComponent;
  let fixture: ComponentFixture<RestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
