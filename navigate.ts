import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  [x: string]: any;

  constructor(private alertController: AlertController, private platform: Platform, private storage: Storage, private httpClient: HttpClient) {
    this.navigate = 'lsd';
  }

  getNav() {
    this.storage.get('mainNav').then((value) => {
      this.navResults = JSON.parse(value);
      this.nav = this.navResults.nav;
    });
  }

  getLoc(): void {
    const a = this.lsdone;
    const b = this.sec;
    const c = this.twp;
    const d = this.rng;
    const e = this.mrd;
    this.httpClient.get('https://XXXXXXX/lookup/lsd/' + a + '-' +  b  + '-' + c + '-' +  d  + ' ' + e)
    .subscribe(resp => {
      this.getlocdata = resp;
      this.latitude = this.getlocdata.data.queries[0].result.gps.lat;
      this.longitude = this.getlocdata.data.queries[0].result.gps.lng;
    },
      err => {
          this.presentBadconnection();
      }
    );
    this.GotToConfirm();
  }

  getNTSLoc(): void {
    const a = this.qtr;
    const b = this.unit;
    const c = this.zn;
    const d = this.pq;
    const e = this.lq;
    const f = this.six;
    this.httpClient.get('https://XXXXXXXXX/lookup/nts/' + a + '' +  b  + '-' + c + '%2F' +  d  + ' ' + e + ' ' + f)
    .subscribe(resp => {
      this.getlocdata = resp;
      this.latitude = this.getlocdata.data.queries[0].result.gps.lat;
      this.longitude = this.getlocdata.data.queries[0].result.gps.lng;
    },
      err => {
          this.presentBadconnection();
      }
    );
    this.GotToConfirm();
  }

  goToLocation(): void {
    if (!this.latitude || !this.longitude) {
          this.LocError();
    } else {
        const destination = this.latitude + ',' + this.longitude;
        console.log('getLocLSD', destination);
        if (this.platform.is('ios')) {
            window.open('maps://?q=' + destination, '_system');
        } else {
            const label = encodeURI('My Destination');
            window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
          }
    }
  }

  async LocError() {
    const alert = await this.alertController.create({
      header: 'Geolocation Error!',
      subHeader: 'LSD/NTS may be incorect',
      message: 'You must reselect your LSD/NTS.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentBadconnection() {
    const alert = await this.alertController.create({
      header: 'Connection Error!',
      subHeader: 'network error',
      message: 'Check to see if you have connectivity',
      buttons: ['OK']
    });
    await alert.present();
  }

  async GotToConfirm() {
    const alert = await this.alertController.create({
      message: 'Do you wish to continue',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.goToLocation();
          }
        }
      ]
    });
    await alert.present();
  }

  async DriveToLocationAlert() {
    const alert = await this.alertController.create({
      header: 'System Error!',
      subHeader: 'GPS not working',
      message: 'Try again.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.getNav();
  }
}
