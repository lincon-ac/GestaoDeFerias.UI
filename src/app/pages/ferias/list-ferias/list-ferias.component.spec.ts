import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeriasComponent } from './list-ferias.component';

describe('ListFeriasComponent', () => {
  let component: ListFeriasComponent;
  let fixture: ComponentFixture<ListFeriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFeriasComponent]
    });
    fixture = TestBed.createComponent(ListFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
