import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private snapshotChangesSubscription: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {}

  

  getJourneys() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe((currentUser) => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs
            .collection('journeys',ref => ref
            .orderBy('time', 'desc'))
            .snapshotChanges();

          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  deleteJourneys(taskKey) {
    return new Promise<any>((resolve, reject) => {
      this.afs
        .collection('journeys')
        .doc(taskKey)
        .delete()
        .then(
          (res) => resolve(res),
          (err) => reject(err),
        );
    });
  }

  createJourney(value) {
    console.log(value);
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs
        .collection('journeys')
        .add({
          getter: value.getter,
          origin: value.origin,
          destination: value.destination,
          phone: value.phone,

          time: value.time,
          cost: value.cost,
          note: value.note,
          userid: currentUser.uid,
        })
        .then(
          (res) => resolve(res),
          (err) => reject(err),
        );
    });
  }


  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL('image/jpeg');
      callback(dataURL);
    };
    img.src = imageUri;
  }

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url').then(
          (snapshot) => {
            snapshot.ref.getDownloadURL().then((res) => resolve(res));
          },
          (err) => {
            reject(err);
          },
        );
      });
    });
  }
}
