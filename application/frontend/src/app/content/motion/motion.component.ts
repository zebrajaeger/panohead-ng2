import {Component} from '@angular/core';
import {NumberDialogComponent} from '../../ui/number-dialog/number-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.scss']
})
export class MotionComponent {
  delayAfterMove = 0;
  delayBetweenShots = 0;
  delayAfterLastShot = 0;

  constructor(public dialog: MatDialog) {
  }

  editDelayAfterMove() {
    this.edit(this.delayAfterMove).then(value => this.delayAfterMove = value);
  }

  editDelayBetweenShots() {
    this.edit(this.delayBetweenShots).then(value => this.delayBetweenShots = value);
  }

  editDelayAfterLastShot() {
    this.edit(this.delayAfterLastShot).then(value => this.delayAfterLastShot = value);
  }

  edit(value: number): Promise<number> {
    return new Promise<number>(resolve => {
      const dialogRef = this.dialog.open(NumberDialogComponent, {
        width: '250px',
        data: value
      });

      dialogRef.afterClosed().subscribe(result => {
        if (!isNaN(result)) {
          resolve(result);
        }
      });
    });
  }
}
