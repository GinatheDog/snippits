import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio/audio.service';

@Component({
  selector: 'app-oilvolwater',
  templateUrl: './oilvolwater.page.html',
  styleUrls: ['./oilvolwater.page.scss'],
})
export class OilvolwaterPage implements OnInit {
  data: any;
  track2 = 'assets/sounds/beep2.mp3';

  constructor(private audio: AudioService) {
      this.data = {};
  }

  convertSum() {
      const waterLength = this.data.length;
      const waterWidth = this.data.width;
      const waterColor = this.data.color;
      const wLength = parseFloat(waterLength);
      const wWidth = parseFloat(waterWidth);
      const wColor = parseFloat(waterColor);
      const wTotal = ( (wLength * wWidth) * wColor * 0.000001 ) * 1000;
      this.data.total = wTotal.toFixed(1) + ' litres in waterway';
      this.playSound();
  }

  clear() {
      this.data.color = [];
      this.data.length = [];
      this.data.width = [];
      this.data.total = [];
      this.playSound();
  }

  playSound() {
    this.audio.loadSound(this.track2);
    console.log('sound2');
  }

  ngOnInit() {
  }
}
