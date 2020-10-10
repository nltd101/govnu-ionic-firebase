import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController,AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { JourneysService } from '../services/journeys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private journeys: JourneysService,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
      this.presentLoading(loading);
    this.route.data.subscribe((routeData) => {
      console.log(routeData);
      routeData['data'].subscribe((data) => {
        loading.dismiss();
        //set date for journeysService
        this.journeys.setData(data);
        //set data for item array to show in list
        this.items = data;
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Đăng xuất',
      message: 'Bạn muốn có muốn đăng xuất?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Đăng xuất',
          handler: () => {
            this.authService.doLogout().then(
              (res) => {
                this.router.navigate(['/login']);
              },
              (err) => {
                console.log(err);
              },
            );
          },
        },
      ],
    });
    await alert.present();
  }
 
}
