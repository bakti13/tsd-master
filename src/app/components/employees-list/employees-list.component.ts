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
    if (window.confirm('Do you want to go ahead?')) {
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
      },
      // columns: [
      //   {data: 'id'},
      //   {data: 'name'},
      //   {data: 'birtDate'},
      //   {data: 'position.name'},
      //   {data: 'idNumber'},
      //   {data: 'gender'},
      //   {
      //     data: 'id',
      //     render: function(data, type, full, meta) {
      //
      //       let actions = [];
      //       // actions.push(`<button class="btn btn-sm btn-primary" routerLink="/edit-employe">Edit</button>`);
      //       actions.push(`<button class="btn btn-sm btn-primary" routerLink="/promise/karyawanindex/edit/${data}">Edit</button>`);
      //       actions.push('<button class="btn btn-xs btn-danger" onclick="updateStatus(' + data + ')"><i class="icon-trash"></i>delete</button>');
      //       // actions.push('');
      //
      //
      //       /*if (full.StatusSPM !== "Draft" ) {
      //         actions.push('<a href="#" onclick="loadPriview('+data+')" class="btn btn-xs btn-warning" title="Preview"><i class="fa fa-eye"></i></a>');
      //
      //         if (full.StatusSPM === "Rejected") {
      //           actions.push('<a href="{{baseUrl}}backend/spm/edit/'+ data +'" class="btn btn-xs btn-success" title="Edit"><i class="icon-pencil"></i></a>');
      //
      //         }
      //         if (full.StatusSPM === "Menunggu Pembayaran" || full.StatusSPM === "Done") {
      //           actions.push('<a href="{{baseUrl}}backend/surat-perintah-membayar/pdf?spmHeaderId=' + data + '" class="btn btn-xs btn-danger" target="_blank" download title="Print"><i class="fa fa-print"></i></a>');
      //           actions.push('<a href="{{baseUrl}}backend/surat-perintah-membayar/upload/' + data + '" class="btn btn-xs btn-warning" data-toggle="popover" data-trigger="hover" data-content="Upload" title="upload"><i class="mdi mdi-cloud-upload"></i></a>');
      //         }
      //       } else {
      //         actions.push('<button class="btn btn-xs btn-danger" onclick="updateStatus('+data+', 8, 0)"><i class="icon-trash"></i></button>');
      //       }*/
      //       return actions.join('&nbsp;');
      //     }
      //   }
      // ]
    };
  }

}
