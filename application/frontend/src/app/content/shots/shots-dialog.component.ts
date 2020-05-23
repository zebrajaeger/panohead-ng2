import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-shots-dialog',
  templateUrl: './shots-dialog.component.html',
  styleUrls: ['./shots-dialog.component.scss']
})
export class ShotsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ShotsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
