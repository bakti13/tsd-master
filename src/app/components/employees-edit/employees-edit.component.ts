import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../service/crud.service';
import {Position} from '../../model/Position';
import {Employee} from '../../model/Employee';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.css']
})
export class EmployeesEditComponent implements OnInit {


  getId: any;
  employe: Employee;

  listPosition: Position[];
  isSubmitted: false;
  updateForm = this.formBuilder.group({
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
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {
    this.crudService.GetAllPosition().subscribe((res) => {
      console.log(`Position : ${JSON.stringify(res)}`);
      this.listPosition = res;
    });
    this.crudService.GetEmployee(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        birtDate: res['birtDate'],
        position: res['position'],
        idNumber: res['idNumber'],
        gender: (res['gender'] == 'Pria' ? '1' : '2'),
        isDelete: 0
      });
      const tanggal = res.birtDate.split("-");
      this.employe = res;
      this.idSelect =res.position.id;
      this.model = new NgbDate(parseInt(tanggal[0]), parseInt(tanggal[1]), parseInt(tanggal[2]));
    });
  }
  findPosition = (id): Position => {
    for (let i = 0; i < this.listPosition.length; i++) {
      if (id == this.listPosition[i].id) {
        return this.listPosition[i];
      }
    }
    return null;
  };

  onUpdate(): any {

    let data = this.updateForm.value;

    data.position = this.findPosition(data.position);
    if (this.validating(data)) {
      data.birtDate = `${data.birtDate.year}-${data.birtDate.month}-${data.birtDate.day}`;
      if (window.confirm('Apakah anda akan menyimpan data ini?')) {
        this.crudService.updateEmployee(this.getId, data)
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

    // this.crudService.updateEmployee(this.getId, this.updateForm.value)
    //   .subscribe(() => {
    //     console.log('Data updated successfully!');
    //     this.ngZone.run(() => this.router.navigateByUrl(''));
    //   }, (err) => {
    //     console.log(err);
    //   });
  }


  validating = (data): any => {
    let valid = true;
    if (data.name == '') {
      valid = false;
      window.alert('Nama harus diisi');
    } else if (data.birtDate == '' || data.birtDate == undefined || data.birtDate.year == undefined) {
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
  idSelect: any;

}
