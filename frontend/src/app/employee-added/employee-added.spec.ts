import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdded } from './employee-added';

describe('EmployeeAdded', () => {
  let component: EmployeeAdded;
  let fixture: ComponentFixture<EmployeeAdded>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAdded]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAdded);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
