import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/Employee.service'
import { AddEmployeeComponent } from 'src/app/component/add-employee/add-employee.component';
import { EditEmployeeComponent } from 'src/app/component/edit-employee/edit-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  idemployee: string="";

  form: FormGroup;

  constructor(private EmployeeService: EmployeeService, private fb: FormBuilder,private modalService: NgbModal) { 
    

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
    Swal.fire({
      title: 'Yakin hapus data?',
      text: "Data yang sudah terhapus tidak dapat dikembalikan lagi.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Batal Hapus',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus data!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EmployeeService.delete(id).subscribe(() => {
    })
    const idx = this.employees.findIndex(q => q._id === id);
    this.employees.splice(idx, 1);
  }
  })
}


  addModalForm() {

  }

  get f(){
    return this.form.controls;
  }

  EditEmployee(employee : Employee, id :string) {

    const modal = this.modalService.open(EditEmployeeComponent, {centered: true, ariaLabelledBy: 'modal-basic-title'});
    modal.componentInstance.employee = employee;
    modal.result.then(employee => {
      this.EmployeeService.update(id, employee).subscribe(() => {
      });
      Swal.fire({
        title: 'Berhasil',
        text: 'Data berhasil di update!',
        icon: 'success',
        confirmButtonColor: '#0d6efd'
      }).then((result) => {
        if(result.isConfirmed){
          const idx = this.employees.findIndex(q => q._id === id);
          this.employees[idx] = {...this.employees[idx], ...employee};
        }
      })
    }).catch(e => console.log(e));
  }

  addModal() {
    const modal = this.modalService.open(AddEmployeeComponent, {centered: true});
    modal.result.then(employee => {
      console.log(employee)
      this.EmployeeService.create(employee).subscribe(() => {
        Swal.fire({
          title: 'Berhasil',
          text: 'Data berhasil di submit!',
          icon: 'success',
          confirmButtonColor: '#0d6efd'
        }).then((result) => {
          if(result.isConfirmed){
            window.location.reload()
          }
        })
      });
    }).catch(e => console.log(e));
  }

}
