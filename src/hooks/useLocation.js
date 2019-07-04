import { useState, useEffect, useCallback } from 'react';

const USER_LOCATION = 'user-location';

const derivePrevLocationFromStorage = () =>
   //todo: determine a more optimal approach for default coords
   localStorage.getItem('user-location') ? JSON.parse(localStorage.getItem('user-location')) : { lat: 35.763, lng: -78.703 };
// arbitrary coordinates in India as defaults
export default () => {
   const [location, setLocation] = useState(derivePrevLocationFromStorage());

   const geolocationAPI = (options = {}) => {
      if (!window.navigator) return;
      return new Promise((resolve, reject) => {
         window.navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
   };
   const getLocation = useCallback(async () => {
      const { localStorage } = window;
      const { coords } = await geolocationAPI();
      if (!coords) return;
      //todo: handle this case where location services are disabled
      const previousUsedLocation = localStorage.getItem(USER_LOCATION) ? JSON.parse(localStorage.getItem(USER_LOCATION)) : null;
      let userLocation;
      if (previousUsedLocation) {
         //if the current location differs from the previous used location in storage
         if (coords.latitude !== previousUsedLocation.lat || coords.longitude !== previousUsedLocation.lng) {
            userLocation = { lat: coords.latitude, lng: coords.longitude };
         } else {
            userLocation = previousUsedLocation;
         }
      }
      setLocation(userLocation);
      localStorage.setItem(USER_LOCATION, JSON.stringify(userLocation));
   }, []);

   useEffect(
      () => {
         getLocation();
      },
      [getLocation]
   );

   return [location, setLocation];
};
