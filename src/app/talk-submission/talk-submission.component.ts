import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConferenceRestService} from '../services/conference-rest.service';

@Component({
  selector: 'app-talk-submission',
  templateUrl: './talk-submission.component.html',
  styleUrls: ['./talk-submission.component.css']
})
export class TalkSubmissionComponent implements OnInit {
  private form: FormGroup;
  private successMessage: string;

  constructor(private conferenceRestService: ConferenceRestService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const form = this.form.value;
    this.conferenceRestService.submitTalk(form.name, form.email, form.title)
      .subscribe((response) => {
      this.successMessage = response.successMessage;
    });
  }
}
