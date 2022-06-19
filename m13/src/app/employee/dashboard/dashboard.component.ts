import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/Employee.service'
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  idemployee: string="";

  form: FormGroup;
  constructor(private EmployeeService: EmployeeService, private fb: FormBuilder,private router: Router) { 
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      address : ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.EmployeeService.getAll().subscribe(employees => {
      this.employees = employees;
    }) 
  }

  hapus(id: string) {
    // tambahkan confirmation alert modal
    window.location.reload()
    this.EmployeeService.delete(id).subscribe(() => {
    });
  }


  addModalForm() {

  }

  get f(){
    return this.form.controls;
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.EmployeeService.create(this.form.value).subscribe(() => {
        window.location.reload()
      });
    }
  }

  EditEmployee(employee : any) {
    this.idemployee = employee._id;
    this.form.controls['firstname'].setValue(employee.firstname);
    this.form.controls['lastname'].setValue(employee.lastname);
    this.form.controls['email'].setValue(employee.email);
    this.form.controls['address'].setValue(employee.address);
    this.form.controls['phone'].setValue(employee.phone);
  }


  update() {
    const id = this.idemployee;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.EmployeeService.update(id, this.form.value).subscribe(() => {
        window.location.reload()
        alert("Data berhasil diubah");
      });
    }
  }
}
