// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
  //  apiKey: "YOUR_CREDENTIALS_HERE",
  //  authDomain: "YOUR_CREDENTIALS_HERE",
  //  databaseURL: "YOUR_CREDENTIALS_HERE",
 //   projectId: "YOUR_CREDENTIALS_HERE",
 //   storageBucket: "YOUR_CREDENTIALS_HERE",
 //   messagingSenderId: "YOUR_CREDENTIALS_HERE"
  apiKey: 'AIzaSyC1A-N1MUmqwBvyj3hnUg8_6d2LSv3xr1A',
    authDomain: 'govnusave.firebaseapp.com',
    databaseURL: 'https://govnusave.firebaseio.com',
    projectId: 'govnusave',
    storageBucket: 'govnusave.appspot.com',
    messagingSenderId: '773818809551',
    appId: '1:773818809551:web:801af8618d32f2b2380bba',
    measurementId: 'G-6XKVSJRZWZ',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
