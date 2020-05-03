import {Component, Input, OnInit} from '@angular/core';
import {IQuestion} from "../landing-faq.component";

@Component({
  selector: 'app-landing-faq-question',
  templateUrl: './landing-faq-question.component.html',
  styleUrls: ['./landing-faq-question.component.scss']
})
export class LandingFaqQuestionComponent implements OnInit {

  @Input() open: boolean = false;

  @Input() question: IQuestion;

  constructor() {
  }

  ngOnInit() {
  }

  toggleOpen() {
    this.open = !this.open;
  }

}
