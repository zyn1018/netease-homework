import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatGridList, MatGridListModule, MatInputModule, MatRadioModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTabsModule
  ]
})
export class SharedModule {
}
