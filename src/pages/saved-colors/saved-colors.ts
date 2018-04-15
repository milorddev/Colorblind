import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the SavedColorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved-colors',
  templateUrl: 'saved-colors.html',
})
export class SavedColorsPage {

	colorArray:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedColorsPage');

    	
	    this.storage.get('colorArray').then((val) => {
	      this.colorArray = (val) ? val : [];
	      console.log("done saving color");
	  });
  }

  removeColor(color){
  	this.colorArray.splice(color,1);
  	this.storage.set('colorArray', this.colorArray);
  }

}
