import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeriasComponent } from './delete-ferias.component';

describe('DeleteFeriasComponent', () => {
  let component: DeleteFeriasComponent;
  let fixture: ComponentFixture<DeleteFeriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFeriasComponent]
    });
    fixture = TestBed.createComponent(DeleteFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
