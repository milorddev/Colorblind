import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-saved-colors',
  templateUrl: 'saved-colors.html',
})
export class SavedColorsPage {

	colorArray:any = [];
	compliment:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	public storage: Storage, public clipboard: Clipboard, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedColorsPage');

    	
	    this.storage.get('colorArray').then((val) => {
	      this.colorArray = (val) ? val : [];
	      console.log("done saving color");
	      for(var i in this.colorArray){
	      	this.colorArray[i]['compliment'] = this.getCompliments(this.colorArray[i]);
	      }
	  });
  }

  removeColor(color){
  	this.colorArray.splice(color,1);
  	this.storage.set('colorArray', this.colorArray);
  }

  copyColor(color){
  	var niceString = '';
  	if(color.hex){
  		niceString = 'RGB: (' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + '), HEX: ' + color.hex;
  	}
  	else{
  		niceString = 'RGB: (' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + ')';

  	}
  	console.log("copying color");
  	this.clipboard.copy(niceString);
    console.log(niceString);
    
    let toast = this.toastCtrl.create({
        message: 'Color copied to clipboard!',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();

  }


  getCompliments(color){
  	//var color = {rgba: {r:130,g:42,b:156}};
  	//console.log("color",color);
  	var rgb = {
  		r: color.rgba.r,
  		g: color.rgba.g,
  		b: color.rgba.b
  	};

  	
	var color1=RGB2HSV(rgb);
	var color2=RGB2HSV(rgb);
	var color3=RGB2HSV(rgb);

	color1['hue'] = HueShift(color1['hue'],180.0);
	color2['hue'] = HueShift(color2['hue'],90.0);
	color3['hue'] = HueShift(color3['hue'],-90.0);

	var compliment = {
		one: rgb,
		two: HSV2RGB(color1),
		three: HSV2RGB(color2),
		four: HSV2RGB(color3)
	}

	return compliment;

	//'rgb('+this.compliment.one.r+ ',' +this.compliment.one.g+ ',' +this.compliment.one.b+ ')'

	//let popover = this.popoverCtrl.create(PopoverPage);
    //popover.present();


  	function RGB2HSV(rgb) {
	    var hsv = new Object();
	    var max=max3(rgb.r,rgb.g,rgb.b);
	    var dif=max-min3(rgb.r,rgb.g,rgb.b);
	    hsv['saturation']=(max==0.0)?0:(100*dif/max);
	    if (hsv['saturation']==0) hsv['hue']=0;
	    else if (rgb.r==max) hsv['hue']=60.0*(rgb.g-rgb.b)/dif;
	    else if (rgb.g==max) hsv['hue']=120.0+60.0*(rgb.b-rgb.r)/dif;
	    else if (rgb.b==max) hsv['hue']=240.0+60.0*(rgb.r-rgb.g)/dif;
	    if (hsv['hue']<0.0) hsv['hue']+=360.0;
	    hsv['value']=Math.round(max*100/255);
	    hsv['hue']=Math.round(hsv['hue']);
	    hsv['saturation']=Math.round(hsv['saturation']);
	    return hsv;
	}

	// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
	// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
	function HSV2RGB(hsv) {
	    var rgb=new Object();
	    if (hsv.saturation==0) {
	        rgb['r']=rgb['g']=rgb['b']=Math.round(hsv.value*2.55);
	    } else {
	        hsv.hue/=60;
	        hsv.saturation/=100;
	        hsv.value/=100;
	        var i=Math.floor(hsv.hue);
	        var f=hsv.hue-i;
	        var p=hsv.value*(1-hsv.saturation);
	        var q=hsv.value*(1-hsv.saturation*f);
	        var t=hsv.value*(1-hsv.saturation*(1-f));
	        switch(i) {
	        case 0: rgb['r']=hsv.value; rgb['g']=t; rgb['b']=p; break;
	        case 1: rgb['r']=q; rgb['g']=hsv.value; rgb['b']=p; break;
	        case 2: rgb['r']=p; rgb['g']=hsv.value; rgb['b']=t; break;
	        case 3: rgb['r']=p; rgb['g']=q; rgb['b']=hsv.value; break;
	        case 4: rgb['r']=t; rgb['g']=p; rgb['b']=hsv.value; break;
	        default: rgb['r']=hsv.value; rgb['g']=p; rgb['b']=q;
	        }
	        rgb['r']=Math.round(rgb['r']*255);
	        rgb['g']=Math.round(rgb['g']*255);
	        rgb['b']=Math.round(rgb['b']*255);
	    }
	    return rgb;
	}

	//Adding HueShift via Jacob (see comments)
	function HueShift(h,s) { 
	    h+=s; while (h>=360.0) h-=360.0; while (h<0.0) h+=360.0; return h; 
	}

	//min max via Hairgami_Master (see comments)
	function min3(a,b,c) { 
	    return (a<b)?((a<c)?a:c):((b<c)?b:c); 
	} 
	function max3(a,b,c) { 
	    return (a>b)?((a>c)?a:c):((b>c)?b:c); 
	}
  }

}
