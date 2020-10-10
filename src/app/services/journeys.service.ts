import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JourneysService {
  items = [];
  constructor() {}
  setData(data) {
    this.items = data;
  }
  delete(id: string){
    for (let i = 0; i< this.items.length; i++) {
         if (this.items[i].payload.doc.id == id) return this.items.splice(i,1);
    }
    return null;
  }
  getById(id: string) {
    //  console.log(this.items);
    for (let i of this.items) {
      //console.log(i);
      if (i.payload.doc.id == id) return i;
    }
    return null;
  }
}
