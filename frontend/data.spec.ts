import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Data } from './data';

describe('DataService', () => {
    let service: Data;
    let httpMock: HttpTestingController;
    const baseUrl = 'http://localhost:8080';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [Data]
        });
        service = TestBed.inject(Data);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have initial state properties', () => {
        expect(service.showform).toBeFalse();
        expect(service.selectEmployee).toBeNull();
    });

    it('should retrieve employees via GET', () => {
        const mockEmployees = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

        service.getEmployee().subscribe(employees => {
            expect(employees).toEqual(mockEmployees);
        });

        const req = httpMock.expectOne(`${baseUrl}/getEmploye`);
        const req = httpMock.expectOne(`${baseUrl}/getEmployees`);
        expect(req.request.method).toBe('GET');
        req.flush(mockEmployees);
    });

    it('should add an employee via POST', () => {
        const newEmployee = { name: 'New Employee' };

        service.addEmployee(newEmployee).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${baseUrl}/addEmploye`);
        const req = httpMock.expectOne(`${baseUrl}/addEmployee`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newEmployee);
        req.flush(newEmployee);
    });

    it('should update an employee via PUT', () => {
        const updateData = { name: 'Updated Name' };
        const id = 123;

        service.updateEmployee(updateData, id).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${baseUrl}/updateEmployes/${id}`);
        const req = httpMock.expectOne(`${baseUrl}/updateEmployees/${id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(updateData);
        req.flush({ message: 'Updated successfully' });
    });

    it('should delete an employee via DELETE', () => {
        const id = 123;

        service.deleteEmployee(id).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${baseUrl}/delete/${id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({ message: 'Deleted successfully' });
    });

    it('should get employee by name via GET', () => {
        const name = 'John';
        const mockEmployee = { id: 1, name: 'John' };

        service.getEmploye(name).subscribe(response => {
        service.getEmployee(name).subscribe(response => {
            expect(response).toEqual(mockEmployee);
        });

        const req = httpMock.expectOne(`${baseUrl}/getemploye/${name}`);
        const req = httpMock.expectOne(`${baseUrl}/getEmployee/${name}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockEmployee);
    });
});