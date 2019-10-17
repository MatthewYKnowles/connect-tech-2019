import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'connect-tech';


  constructor(private router: Router) {

  }

  goToTalkSubmission() {
    this.router.navigate(['talk-submission']);
  }
}
