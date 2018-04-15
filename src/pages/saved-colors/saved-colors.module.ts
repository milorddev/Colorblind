import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedColorsPage } from './saved-colors';

@NgModule({
  declarations: [
    SavedColorsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedColorsPage),
  ],
})
export class SavedColorsPageModule {}
