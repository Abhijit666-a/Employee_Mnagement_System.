import { Component, OnInit } from '@angular/core';
import { Data } from '../Service/data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IEmployee } from '../Employee';
import { Router, RouterLink } from '@angular/router';
import { EmployeeAdded } from '../employee-added/employee-added';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, EmployeeAdded, NgApexchartsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit {
  employees: IEmployee[] = [];
  public chartOptions: any;
  showForm = false;
  selectEmployee: any = null;
  searchText: String = '';
  isAdmin = false;

  constructor(public Service: Data, private Router: Router) { }
onSearch() {
  const nameToSearch = this.searchText.trim().toLowerCase();
  if (nameToSearch) {
    this.Service.getEmploye(nameToSearch).subscribe((res: any) => {
      if (res && res.length > 0) {
        // १. सर्व मॅच होणारे कर्मचारी मिळवा
        const foundEmployees = res as any[];
        
        // २. यादीतून हे कर्मचारी काढून टाका आणि पुन्हा सुरुवातीला जोडा
        foundEmployees.forEach(found => {
          const index = this.employees.findIndex(e => e.id === found.id);
          if (index > -1) {
            this.employees.splice(index, 1);
          }
        });

        // ३. मॅच झालेले सर्व कर्मचारी सर्वात वर (Top) जोडा
        this.employees = [...foundEmployees, ...this.employees];
        
        // ४. पहिला कर्मचारी प्रोफाइल कार्डसाठी सेट करा
        this.selectEmployee = foundEmployees[0];
      } else {
        this.selectEmployee = null;
        alert("Employee not found");
      }
    });
  }
}
  onCloseSearch() {
    this.selectEmployee = null;
    this.searchText = '';
    this.viewData();
  }


  ngOnInit() {
    const status = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role')
    if (status != 'true') {
      this.Router.navigate(['/login']);
    } else {
      this.isAdmin = (role === 'ADMIN')
      this.viewData();
    }
  }
  onAdd() {
    this.Service.selectEmployee = null;
    this.Service.showform = true;
  }
  onEdit(emp: IEmployee) {
    this.Service.selectEmployee = emp;
    this.Service.showform = true;
  }

  onClose() {
    this.Service.showform = false;
    this.Service.selectEmployee = null;
    this.viewData();
  }
  deleteEmployee(id: any) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.Service.deleteEmployee(id).subscribe(() => {
        alert("Employee Deleted Successfully");
        this.viewData();
      });
    }
  }

  viewData() {
    this.Service.getEmployee().subscribe((Response: any) => {
      this.employees = Response;
    });
  }
  onSelectEmployee(emp: IEmployee) {
  this.selectEmployee = emp;
  
  this.searchText = emp.name.toString();
}
}