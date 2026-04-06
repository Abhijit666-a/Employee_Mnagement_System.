import { Component, EventEmitter, Output } from '@angular/core';
import { IEmployee } from '../Employee';
import { Data } from '../Service/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-added',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-added.html',
  styleUrl: './employee-added.css',
})
export class EmployeeAdded {
  employees: IEmployee = {
    name: '',
    email: '',
    department: '',
    salary: '',
    joiningYear : new Date().getFullYear(),
    onProject: false
  }
  constructor(private service: Data) { }
  ngOnInit() {
    if (this.service.selectEmployee)
      this.employees = this.service.selectEmployee;
    this.service.selectEmployee = null;
  }


  ngSave() {
    if (this.employees.id) {
    this.service.updateEmployee(this.employees, this.employees.id).subscribe((Response: any) => {
      alert("Employee Updated Successfully");
      this.onClose();
    });
  } else {
    this.service.addEmployee(this.employees).subscribe((Response: any) => {
      alert("Employee Added Successfully");
      this.onClose();
    });
  }
  }
  onClose() {
    this.service.showform=false;
    this.service.selectEmployee=null;
  }
  
}