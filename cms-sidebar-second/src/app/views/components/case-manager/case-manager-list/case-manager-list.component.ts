import { FormBuilder } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { StoreService } from '../../../../services/store.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-case-manager-list',
  templateUrl: './case-manager-list.component.html',
  styleUrls: ['./case-manager-list.component.scss']
})
export class CaseManagerListComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('tableWrapper') tableWrapper;
    @ViewChild('containerFluid') container;
    private currentComponentWidth;

    rows = [];
    columns = [
      { name: 'Number', prop: 'number', flexGrow: 1 },
      { name: 'Visit no', prop: 'visitno', flexGrow: 2 },
      { name: 'Name', flexGrow: 2 },
      { name: 'NRIC', flexGrow: 2 },
      { name: 'Time', flexGrow: 1 },
      { name: 'Doctor', flexGrow: 2 },
      { name: 'Purpose', flexGrow: 3 },
      { name: 'Remarks', flexGrow: 1 },
      { name: 'Status', flexGrow: 1 },
      { name: 'Action', flexGrow: 1 },
      { name: 't', prop: 'patientid', flexGrow: 0 },
      { name: 't', prop: 'patientRegistryId', flexGrow: 0 },
      { name: 't', prop: 'consultationId', flexGrow: 0 }
    ];

    statusFilterDropdown = {
      value: [
        { value: 'ALL', label: 'ALL' },
        { value: 'OPEM', label: 'OPEN' },
        { value: 'CLOSED', label: 'CLOSED' }
      ]
    };

  constructor(
    private store: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit() {    
    if (
      localStorage.getItem('access_token') &&
      localStorage.getItem('clinicCode') &&
      localStorage.getItem('clinicId')
    ) {
      this.store.clinicCode = localStorage.getItem('clinicCode');
      this.store.clinicId = localStorage.getItem('clinicId');
    } else {
      alert('Clinic is not selected.');
      localStorage.removeItem('access_token');
      this.authService.logout();

      console.log('Access Denied');
    }
  }

  caseManagerExpand() {
      const bodyClassList = document.querySelector('body').classList;

      if (
        bodyClassList.contains('sidebar-hidden') ||
        bodyClassList.contains('asidemenu-hidden') ||
        bodyClassList.contains('sidebar-minimized') ||
        bodyClassList.contains('brand-minimized')
      ) {
        // window.dispatchEvent(new Event('resize'));
        return 'force';
      } else {
        return 'flex';
      }
    }

    ngAfterViewChecked() {
      const bodyClassList = document.querySelector('body').classList;
  
      if (
        bodyClassList.contains('sidebar-hidden') ||
        bodyClassList.contains('asidemenu-hidden') ||
        bodyClassList.contains('sidebar-minimized') ||
        bodyClassList.contains('brand-minimized')
      ) {
        // this.currentComponentWidth = this.container.nativeElement.clientWidth;
        this.table.columnMode = ColumnMode.force;
        this.table.recalculate();
        const evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('click', true, false, window, 0);
        window.dispatchEvent(evt);
  
        // console.log('this.table: ', this.table);
      } else {
        this.table.columnMode = ColumnMode.flex;
        const evt = window.document.createEvent('UIEvents');
        evt.initUIEvent('click', true, false, window, 0);
        window.dispatchEvent(evt);
  
        this.table.recalculate();
      }
    }

    toggleExpandRow(row) {
      console.log('Toggled Expand Row!', row);
      this.table.rowDetail.toggleExpandRow(row);
    }
}
