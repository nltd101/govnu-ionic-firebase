import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  LoadingController,
  ToastController,
  PickerController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { PickerOptions } from '@ionic/core';
import { coulunmDay, coulunmTime, nowRow } from '../date.picker.data';

@Component({
  selector: 'app-newjourney',
  templateUrl: './newjourney.page.html',
  styleUrls: ['./newjourney.page.scss'],
})
export class NewjourneyPage implements OnInit {
  validations_form: FormGroup;
  image: any;
  datetimeValue: Date;
  constructor(
    private pickerController: PickerController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
  ) {
    this.datetimeValue = new Date();
    console.log('constructor');
  }
  async showDayPicker() {
    let options: PickerOptions = {
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value);
            //temp is a buff to contain time after picking
            let temp = new Date(this.datetimeValue);

            temp.setDate(value.Day.value);
            temp.setMonth(value.Month.value - 1);
            temp.setFullYear(value.Year.value);
            this.datetimeValue = temp;
            console.log(this.datetimeValue);
          },
        },
      ],
      columns: coulunmDay(),
    };

    let picker = await this.pickerController.create(options);
    let row = new nowRow(this.datetimeValue);
    picker.columns[0].selectedIndex = row.Day();
    picker.columns[1].selectedIndex = row.Month();
    picker.columns[2].selectedIndex = row.Year();
    picker.present();
  }
  async showTimePicker() {
    let options: PickerOptions = {
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            //temp is a buff to contain time after picking
            let temp = new Date(this.datetimeValue);

            temp.setHours(value.Hours.value);
            temp.setMinutes(value.Minutes.value);
            this.datetimeValue = temp;
            console.log(value);
          },
        },
      ],
      columns: coulunmTime(),
    };

    let picker = await this.pickerController.create(options);
    let row = new nowRow(this.datetimeValue);
    picker.columns[0].selectedIndex = row.Hours();
    picker.columns[1].selectedIndex = row.Minutes();
    picker.present();
  }
  getter = 1;
  ngOnInit() {
    this.resetFields();
  }

  resetFields() {
    this.validations_form = this.formBuilder.group({
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      cost: new FormControl('', Validators.required),
      note: new FormControl(''),
    });
  }
  onChangeRadio(event) {
    this.getter = event.detail.value == 'getter' ? 1 : 0;
    console.log(event.detail.value);
  }
  onSubmit(value) {
    //console.log(value);
    let data = {
      ...value,
      getter: this.getter,
      time: this.datetimeValue.getTime(),
    };
    console.log(data);
    this.firebaseService.createJourney(data).then((res) => {
      this.router.navigate(['/home']);
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }
}
