import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user-service';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    const baseUrl = 'http://localhost:8081';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a POST request for signup', () => {
        const mockUser: any = { username: 'test', password: '123', email: 'test@example.com' };

        service.ngsingup(mockUser).subscribe(response => {
        service.ngsignup(mockUser).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${baseUrl}/register`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockUser);
        req.flush({ message: 'User registered successfully' });
    });

    it('should send a POST request for login', () => {
        const mockLogin: any = { username: 'test', password: '123' };

        service.ngLogin(mockLogin).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${baseUrl}/login`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockLogin);
        req.flush({ token: 'fake-jwt-token' });
    });

    it('should send a PUT request to update password', () => {
        const mockUser: any = { username: 'test', password: 'newPassword' };

        service.ngupdate(mockUser).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const req = httpMock.expectOne(`${baseUrl}/updatepassword`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockUser);
        req.flush({ message: 'Password updated' });
    });

    it('should send a GET request to fetch profile', () => {
        const username = 'testuser';
        service.profile(username).subscribe();

        const req = httpMock.expectOne(`${baseUrl}/profile/${username}`);
        expect(req.request.method).toBe('GET');
        req.flush({ username: 'testuser', email: 'test@example.com' });
    });
});