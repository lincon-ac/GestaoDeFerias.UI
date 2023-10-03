import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFuncionarioComponent } from './delete-funcionario.component';

describe('DeleteFuncionarioComponent', () => {
  let component: DeleteFuncionarioComponent;
  let fixture: ComponentFixture<DeleteFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFuncionarioComponent]
    });
    fixture = TestBed.createComponent(DeleteFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
