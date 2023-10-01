import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFuncionariosComponent } from './list-funcionarios.component';

describe('ListFuncionariosComponent', () => {
  let component: ListFuncionariosComponent;
  let fixture: ComponentFixture<ListFuncionariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFuncionariosComponent]
    });
    fixture = TestBed.createComponent(ListFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
