import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ShotsDialogComponent} from './shots-dialog.component';

export interface Shot {
  focusTimeS: number;
  triggerTimeS: number;
}

@Component({
  selector: 'app-shots',
  templateUrl: './shots.component.html',
  styleUrls: ['./shots.component.scss']
})
export class ShotsComponent implements OnInit {

  displayedColumns: string[] = ['focusTimeS', 'triggerTimeS', 'moveUp', 'moveDown'];
  // shots = new Array<Shot>();+

  shots: Shot[] = [
    {focusTimeS: 1.1, triggerTimeS: 2.1},
    {focusTimeS: 2.1, triggerTimeS: 2.2},
    {focusTimeS: 3.1, triggerTimeS: 2.3},
    {focusTimeS: 4.1, triggerTimeS: 2.4},
    {focusTimeS: 5.1, triggerTimeS: 2.5}
  ];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  editCell(shot: Shot, column: string) {
    const dialogRef = this.dialog.open(ShotsDialogComponent, {
      width: '250px',
      data: shot[column]
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNaN(result)) {
        shot[column] = result;
      }
    });
  }

  isNotLastRow(i: number) {
    return this.shots.length - 1 > i;
  }

  moveUp(i: number) {
    this.move(i, i - 1);
  }

  moveDown(i: number) {
    this.move(i, i + 1);
  }

  move(oldIndex: number, newIndex: number) {
    if (newIndex >= this.shots.length) {
      let k = newIndex - this.shots.length + 1;
      while (k--) {
        this.shots.push(undefined);
      }
    }
    this.shots.splice(newIndex, 0, this.shots.splice(oldIndex, 1)[0]);
    this.shots = [].concat(this.shots); // change id for change detection
  }
}
