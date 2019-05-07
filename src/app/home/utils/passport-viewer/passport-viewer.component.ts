import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-passport-viewer',
  templateUrl: './passport-viewer.component.html',
  styleUrls: ['./passport-viewer.component.scss']
})
export class PassportViewerComponent {

  @Input() passport;

  constructor() { }

  public copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
