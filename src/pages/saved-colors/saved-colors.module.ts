import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedColorsPage } from './saved-colors';

import { Clipboard } from '@ionic-native/clipboard';

@NgModule({
  declarations: [
    SavedColorsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedColorsPage),
  ],
  providers: [
  Clipboard
  ]
})
export class SavedColorsPageModule {}
