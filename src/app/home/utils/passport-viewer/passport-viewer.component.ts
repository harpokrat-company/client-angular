import {Component, Input} from '@angular/core';
import {Secret} from "@harpokrat/hcl";

@Component({
  selector: 'app-passport-viewer',
  templateUrl: './passport-viewer.component.html',
  styleUrls: ['./passport-viewer.component.scss']
})
export class PassportViewerComponent {

  @Input() passport: Secret;

  constructor() {
  }

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
