import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('imgCaptured') imgCaptured:any;
	@ViewChild('myCanvas') canvasRef:any;

	img:any;
	canvas:any;
	coords:any = {
		x:0,
		y:0
	};
  constructor(public navCtrl: NavController) {
  	
  }

  tapEvent(event){
  	console.log("event",event);
  	this.img = this.imgCaptured.nativeElement;
  	this.canvas = this.canvasRef.nativeElement;
  	this.canvas.width = this.img.width;
  	this.canvas.height = this.img.height;
  	this.canvas.getContext('2d').drawImage(this.img,0,0,this.img.width, this.img.height);

  	var pixelData = this.canvas.getContext('2d').getImageData();
  	console.log("pixelData",pixelData);
  }


// var img = document.getElementById('my-image');
// var canvas = document.createElement('canvas');
// canvas.width = img.width;
// canvas.height = img.height;
// canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

// var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
}
