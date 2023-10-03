import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepartamentoComponent } from './delete-departamento.component';

describe('DeleteDepartamentoComponent', () => {
  let component: DeleteDepartamentoComponent;
  let fixture: ComponentFixture<DeleteDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDepartamentoComponent]
    });
    fixture = TestBed.createComponent(DeleteDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
