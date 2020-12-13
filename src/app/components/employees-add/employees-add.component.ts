import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {CrudService} from '../../service/crud.service';
import {Position} from '../../model/Position';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent implements OnInit {


  listPosition: Position[];
  isSubmitted: false;
  employeeForm = this.formBuilder.group({
    name: [''],
    birtDate: [''],
    position: [''],
    idNumber: [''],
    gender: [''],
    isDelete: [0]
  });
  model: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
  }

  ngOnInit() {
    this.crudService.GetAllPosition().subscribe((res) => {
      console.log(`Position : ${JSON.stringify(res)}`);
      this.listPosition = res;
    });
  }

  onSubmit(): any {
    // console.log(`this.employeeForm.value : ${JSON.stringify(this.employeeForm.value)}`);
    // console.log(`this.employeeForm.value.birtDate: ${this.employeeForm.value.birtDate}`);
    let data = this.employeeForm.value;
    if (this.validating(data)) {
      data.birtDate = `${data.birtDate.year}-${data.birtDate.month}-${data.birtDate.day}`;
      if (window.confirm('Apakah anda akan menyimpan data ini?')) {
        this.crudService.AddEmployee(data)
          .subscribe((res) => {
            // console.log('Data added successfully!');
            if (res.ResponseCode == '00') {
              this.ngZone.run(() => this.router.navigateByUrl(''));
            } else {
              window.alert(`${res.ResposeMessage}`);
            }
          }, (err) => {
            console.log('error', err.message);
          });
      } else {
        this.model = '';
      }
    }
  }

  validating = (data): any => {
    let valid = true;
    if (data.name == '') {
      valid = false;
      window.alert('Nama harus diisi');
    } else if (data.birtDate == '' || data.birtDate == undefined) {
      valid = false;
      window.alert('Tanggal lahir harus diisi');
    } else if (data.position == '') {
      valid = false;
      window.alert('Jabatan harus diisi');
    } else if (data.idNumber == '') {
      valid = false;
      window.alert('NIP harus diisi');
    } else if (isNaN(data.idNumber)) {
      valid = false;
      window.alert('NIP harus numerik');
    } else if (data.gender == '') {
      valid = false;
      window.alert('Jenis Kelamin harus diisi');
    }
    return valid;
  };
}
