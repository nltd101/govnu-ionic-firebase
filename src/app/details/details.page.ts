import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup } from '@angular/forms';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  validations_form: FormGroup;
  image: any;
  item: any;
  load: boolean = false;
  mine: boolean = false;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    
  ) {}
 
  ngOnInit() {
    this.getData();
    this.afAuth.user.subscribe((currentUser) => {
      console.log(currentUser.uid == this.item.payload.doc.data().userid);
      if (this.item.payload.doc.data().userid == currentUser.uid) {
        this.mine = true;
      }
    });
    console.log(this.item.payload.doc.data());
  }

  //get data, function is shown in detail.resolver
  getData() {
    this.route.data.subscribe((routeData) => {
      let data = routeData['data'];
      if (data) {
        this.item = data;
      }
    });
  }
  
  
  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Xóa',
      message: 'Bạn muốn xóa chuyến đi này?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Xóa',
          handler: () => {
            this.firebaseService.deleteJourneys(this.item.payload.doc.id).then(
              (res) => {
                this.router.navigate(['/home']);
              },
              (err) => console.log(err),
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async presentLoading(loading) {
    return await loading.present();
  }
}
