import { TestBed } from '@angular/core/testing';

import { ConferenceRestService } from './conference-rest.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ConferenceRestService', () => {
  let service: ConferenceRestService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(ConferenceRestService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    service.submitTalk('Matthew Knowles', 'matthewyknowles@gmail.com', 'Test Drive an Angular App').subscribe(response => {
      expect(response).toEqual({successMessage: 'Matthew Knowles, Thank you for your submission on Test Drive an Angular App'});
    });
    const req = http.expectOne('http://localhost:5000/api/submissions');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body)
      .toEqual({Name: 'Matthew Knowles', Email: 'matthewyknowles@gmail.com', SubmissionTitle: 'Test Drive an Angular App'});
    req.flush({ConfirmationMessage: 'Matthew Knowles, Thank you for your submission on Test Drive an Angular App'});
  });
});
