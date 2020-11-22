import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ResourceService} from '../../../services/resource.service';
import {IResource} from '@harpokrat/client';

@Component({
  selector: 'hpk-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})
export class DeleteFormComponent implements OnInit {

  error: string;

  secretForm: FormGroup;

  loading: boolean;

  @Input() resource: IResource;

  @Input() service: ResourceService;

  @Output() delete = new EventEmitter<void>();

  constructor(
    private readonly $fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.secretForm = this.$fb.group([]);
  }

  onDelete() {
    this.loading = true;
    this.service.delete(this.resource.id).subscribe(
      () => {
        this.loading = false;
        this.delete.emit()
      },
      (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'An error occurred';
      },
    );
  }
}
