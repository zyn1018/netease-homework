import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatToolbarModule} from '@angular/material';
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
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
