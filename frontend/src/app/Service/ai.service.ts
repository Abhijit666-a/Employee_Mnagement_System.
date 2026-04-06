import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = "https://employee-management-system-qrbr.onrender.com/api/v1/employees";

  constructor(private http: HttpClient) { }

  postAiMessage(prompt: string): Observable<string> {
    return this.http.post(this.apiUrl + "/input", { prompt: prompt }, { responseType: 'text' });
  }
}