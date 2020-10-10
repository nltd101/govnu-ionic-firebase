import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { JourneysService } from '../services/journeys.service';
@Injectable()
export class DetailsResolver implements Resolve<any> {
  constructor(
    public firebaseService: FirebaseService,
    public journeys: JourneysService,
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      let itemId = route.paramMap.get('id');
      let item = this.journeys.getById(itemId);
      // item.id = itemId;
      resolve(item);
    });
  }
}
