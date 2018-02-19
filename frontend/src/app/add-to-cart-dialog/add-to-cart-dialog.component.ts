import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.css']
})
export class AddToCartDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddToCartDialogComponent>) {
  }

  ngOnInit() {
  }

  closeConfirm() {
    this.dialogRef.close(true);
  }
}
