import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartamentosComponent } from './list-departamentos.component';

describe('ListDepartamentosComponent', () => {
  let component: ListDepartamentosComponent;
  let fixture: ComponentFixture<ListDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDepartamentosComponent]
    });
    fixture = TestBed.createComponent(ListDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
