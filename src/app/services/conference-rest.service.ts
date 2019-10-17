import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConferenceRestService {

  constructor(private httpClient: HttpClient) { }

  submitTalk(name: string, email: string, title: string): Observable<any> {
    const body = {
      Name: name,
      Email: email,
      SubmissionTitle: title
    };
    return this.httpClient.post('http://localhost:5000/api/submissions', body)
      .pipe(map((response: any) => {
      return {
        successMessage: response.ConfirmationMessage
      };
    }));
  }
}
