import {MatDialogRef} from '@angular/material';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteProductDialogComponent>) {
  }

  ngOnInit() {
  }

  closeConfirm() {
    this.dialogRef.close(true);
  }
}
