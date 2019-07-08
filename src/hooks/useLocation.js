import { useState, useEffect, useCallback } from 'react';

const USER_LOCATION = 'user-location';
//default center of United States
const defaultCoords = { lat: 41.850033, lng: -87.6500523 };

const derivePrevLocationFromStorage = () =>
   //todo: determine a more optimal approach for default coords
   localStorage.getItem(USER_LOCATION) ? JSON.parse(localStorage.getItem(USER_LOCATION)) : defaultCoords;
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
      if (coords) return [defaultCoords];
      const previousUsedLocation = localStorage.getItem(USER_LOCATION) ? JSON.parse(localStorage.getItem(USER_LOCATION)) : null;
      let userLocation;
      //if there is no previousUsedLocation or there is one but it's different than the user's current location
      if (
         !previousUsedLocation ||
         (Number(previousUsedLocation.lat) !== Number(coords.lat) || Number(previousUsedLocation.lng) !== coords.lng)
      ) {
         userLocation = { lat: coords.latitude, lng: coords.longitude };
      } else {
         userLocation = previousUsedLocation;
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
