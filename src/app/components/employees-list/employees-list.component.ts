import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../service/crud.service';
import {Employee} from '../../model/Employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  employee: Employee[];
  page: number;
  length: number;

  constructor(private crudService: CrudService) {
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Apakah anda akan menghapus data ini?')) {
      this.crudService.deleteEmployee(id).subscribe((res) => {
        // this.employee.splice(i, 1);
        location.reload();
      });
    }
  }

  ngOnInit(): void {

    this.dtOptions = {
      // pagingType: 'full_numbers',
      // pageLength: 3,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.crudService.GetAllEmployee(dataTablesParameters).subscribe(res => {
          console.log(`response : ${res}`);
          // console.log(`totalData: ${res.data.length}`);

          this.page = dataTablesParameters.start + 1;
          console.log(`page : ${this.page}`);


          this.employee = res.data;
          callback({
            recordsTotal: res.recordsTotal,
            recordsFiltered: res.recordsFiltered,
            data: []
          });
        });
      },
      language: {
        'decimal': '',
        'emptyTable': 'Tidak ada data yang ditemukan',
        'info': 'Menampilkan _START_ sd _END_ dari _TOTAL_ Entri',
        'infoEmpty': 'Menampilkan 0 sd 0 dari 0 Entri',
        'infoFiltered': '(filtered from _MAX_ total entries)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Tampilkan _MENU_',
        'loadingRecords': 'Mengambil data...',
        'processing': 'Memproses...',
        'search': 'Cari:',
        'zeroRecords': '',
        'paginate': {
          'first': 'Pertama',
          'last': 'Terakhir',
          'next': 'Selanjutnya',
          'previous': 'Sebelumnya'
        }
      }
    };
  }

}
