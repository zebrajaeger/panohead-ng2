import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './menu/menu.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

import {DigitSpinnerComponent} from './ui/digit-spinner/digit-spinner.component';
import {NumberArrayPipe} from './number-pipe';
import {SecondsSpinnerComponent} from './ui/seconds-spinner/seconds-spinner.component';
import {PictureComponent} from './content/picture/picture.component';
import {PictureOverlapXComponent} from './content/picture/picture-overlap-x/picture-overlap-x.component';
import {PictureOverlapYComponent} from './content/picture/picture-overlap-y/picture-overlap-y.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {ShotsComponent} from './content/shots/shots.component';
import {ShotsDialogComponent} from './content/shots/shots-dialog.component';
import { MotionComponent } from './content/motion/motion.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DigitSpinnerComponent,
    NumberArrayPipe,
    SecondsSpinnerComponent,
    PictureComponent,
    PictureOverlapXComponent,
    PictureOverlapYComponent,
    BreadcrumbsComponent,
    ShotsComponent,
    ShotsDialogComponent,
    MotionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
