import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared.module';
import { CaseManagerRoutingModule } from './case-manager-routing.module';
import { CaseManagerListComponent } from './case-manager-list/case-manager-list.component';

@NgModule({
  imports: [
    CaseManagerRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

  ],
  declarations: [
    CaseManagerListComponent,
  ]
})
export class CaseManagerModule {}
