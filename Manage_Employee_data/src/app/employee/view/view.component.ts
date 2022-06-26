import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { EmployeeService } from 'src/app/Employee.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  employee = {} as Employee;

  constructor(
    private route: ActivatedRoute,
    private EmployeeService: EmployeeService,
    private _location: Location
  ) { }

  backClicked() {
    this._location.back();
  }

  ngOnInit(): void {
    // First get the id from the current route.
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.EmployeeService.find(id).subscribe(employees => {
      this.employee = employees;
    });
  }

}
