import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

import {TalkSubmissionComponent} from './talk-submission.component';
import {ConferenceRestService} from '../services/conference-rest.service';

describe('TalkSubmissionComponent', () => {
  let component: TalkSubmissionComponent;
  let fixture: ComponentFixture<TalkSubmissionComponent>;
  let conferenceRestService: ConferenceRestService;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [TalkSubmissionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkSubmissionComponent);
    component = fixture.componentInstance;
    conferenceRestService = fixture.debugElement.injector.get(ConferenceRestService);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;

  });

  it('should not allow a submission if a field is empty', () => {
    compiled.querySelector('[data-test=name]').value = 'Matthew Knowles';
    compiled.querySelector('[data-test=name]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=email]').value = '';
    compiled.querySelector('[data-test=email]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=submission-title]').value = 'Test Drive an Angular App';
    compiled.querySelector('[data-test=submission-title]').dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(compiled.querySelector('[data-test=submit]').getAttribute('disabled')).toEqual('');
  });

  it('should allow a submission if all vlaues filled in', () => {
    compiled.querySelector('[data-test=name]').value = 'Matthew Knowles';
    compiled.querySelector('[data-test=name]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=email]').value = 'matthewyknowles@gmail.com';
    compiled.querySelector('[data-test=email]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=submission-title]').value = 'Test Drive an Angular App';
    compiled.querySelector('[data-test=submission-title]').dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(compiled.querySelector('[data-test=submit]').getAttribute('disabled')).toEqual(null);
  });

  it('should call post talk on conference rest service', () => {
    spyOn(conferenceRestService, 'submitTalk').and.returnValue(of({}));
    compiled.querySelector('[data-test=name]').value = 'Matthew Knowles';
    compiled.querySelector('[data-test=name]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=email]').value = 'matthewyknowles@gmail.com';
    compiled.querySelector('[data-test=email]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=submission-title]').value = 'Test Drive an Angular App';
    compiled.querySelector('[data-test=submission-title]').dispatchEvent(new Event('input'));
    fixture.detectChanges();
    compiled.querySelector('[data-test=submit]').click();
    expect(conferenceRestService.submitTalk)
      .toHaveBeenCalledWith('Matthew Knowles', 'matthewyknowles@gmail.com', 'Test Drive an Angular App');
  });

  it('should call post talk on conference rest service with different parameters', () => {
    spyOn(conferenceRestService, 'submitTalk').and.returnValue(of({}));
    compiled.querySelector('[data-test=name]').value = 'Matthew';
    compiled.querySelector('[data-test=name]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=email]').value = 'matt@gmail.com';
    compiled.querySelector('[data-test=email]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=submission-title]').value = 'Mutation Testing';
    compiled.querySelector('[data-test=submission-title]').dispatchEvent(new Event('input'));
    fixture.detectChanges();
    compiled.querySelector('[data-test=submit]').click();
    expect(conferenceRestService.submitTalk)
      .toHaveBeenCalledWith('Matthew', 'matt@gmail.com', 'Mutation Testing');
  });

  it('should post success message from post', fakeAsync(() => {
    spyOn(conferenceRestService, 'submitTalk').and.returnValue(
      of({successMessage: 'Matthew, thanks for your submission on Test Drive an Angular App'}));
    compiled.querySelector('[data-test=name]').value = 'Madeira Knowles';
    compiled.querySelector('[data-test=name]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=email]').value = 'madeiraknowles@gmail.com';
    compiled.querySelector('[data-test=email]').dispatchEvent(new Event('input'));
    compiled.querySelector('[data-test=submission-title]').value = 'Something About Frozen';
    compiled.querySelector('[data-test=submission-title]').dispatchEvent(new Event('input'));
    fixture.detectChanges();
    compiled.querySelector('[data-test=submit]').click();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelector('[data-test=success-message]').textContent)
      .toBe('Matthew, thanks for your submission on Test Drive an Angular App');
  }));
});
