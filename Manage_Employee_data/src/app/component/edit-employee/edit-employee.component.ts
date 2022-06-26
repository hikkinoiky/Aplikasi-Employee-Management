import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../Employee'

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  @Input() set employee(employee: Employee) {
    if (employee) {
      this.form.patchValue(employee);
    }
  }
  form : FormGroup
  constructor(private fb: FormBuilder,
    public modal: NgbActiveModal) { 
      this.form = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        address : ['', Validators.required],
        phone: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  update() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.modal.close(this.form.value);
    }
  }

}
