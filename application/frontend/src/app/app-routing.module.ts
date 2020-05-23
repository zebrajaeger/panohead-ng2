import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PictureComponent} from './content/picture/picture.component';
import {PictureOverlapXComponent} from './content/picture/picture-overlap-x/picture-overlap-x.component';
import {PictureOverlapYComponent} from './content/picture/picture-overlap-y/picture-overlap-y.component';
import {ShotsComponent} from './content/shots/shots.component';
import {MotionComponent} from './content/motion/motion.component';


const routes: Routes = [
  {path: 'picture', component: PictureComponent},
  {path: 'picture/overlap/x', component: PictureOverlapXComponent},
  {path: 'picture/overlap/y', component: PictureOverlapYComponent},
  {path: 'shots', component: ShotsComponent},
  {path: 'motion', component: MotionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
