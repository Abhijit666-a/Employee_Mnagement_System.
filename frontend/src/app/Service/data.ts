import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../employee/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  showform: boolean = false;
  private appurl = "https://employee-mnagement-system-qrbr.onrender.com/employees";
  constructor(private http: HttpClient) { }
  selectEmployee: any = null;
  getEmployee(employees?: Employee[]) {
    return this.http.get<any>(this.appurl + "/getEmploye")
  }

  addEmployee(Employee: any) {
    return this.http.post(this.appurl + "/addEmploye", Employee)
  }

  updateEmployee(Employee: any, id: any) {
    return this.http.put(this.appurl + "/updateEmployes/" + id, Employee)
  }

  deleteEmployee(id: any) {
    return this.http.delete(this.appurl + "/delete/" + id)
  }
  getEmploye(name: any) {
    return this.http.get(this.appurl + "/getemploye/" + name)
  }
  getEmployeeByName(name: any): Observable<any> {
    return this.http.get<any>(this.appurl + "/getemploye/" + name);
  }
}