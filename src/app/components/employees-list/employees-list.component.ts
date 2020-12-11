import { Component, OnInit } from '@angular/core';
import {CrudService} from '../../service/crud.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  Employes:any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetAllEmployee().subscribe(res => {
      console.log(res)
      this.Employes = res.content;
    });
  }

}
