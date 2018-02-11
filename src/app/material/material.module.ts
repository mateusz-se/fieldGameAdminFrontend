import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatSliderModule, MatSelectModule,
  MatInputModule,  MatTooltipModule, MatIconModule,
  MatToolbarModule, MatCardModule, MatDialogModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
     MatCheckboxModule,
      MatSliderModule,
       MatSelectModule,
       MatInputModule,
       MatTooltipModule,
       MatIconModule,
       MatToolbarModule,
       MatCardModule,
      MatDialogModule,
      MatListModule
    ],
  exports: [MatButtonModule,
     MatCheckboxModule,
     MatSliderModule,
     MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatListModule],
  declarations: []
})
export class MaterialModule { }
