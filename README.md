# location-searcher

Functnality
- User can search city and countries and the specific country/city will be appear with polygon covered (boundries)
- User can search city or country by using submit feature as well as user can search using queryparameter
- User can share it on social media as well and share it with other users by copying link using share icon
- User can select particular specific country/city from recent history, after clicking on particular section map will be get updated with specific selected location

Implementation

 - Added Error Boundry for map if search functnality dont found any result it breaks the Map Component so breaking whole thing doesnt make sense so this is where Error boundry
   comes handy instead of breaking whole thing it will render with fallback component which reset the component
   

Tech Stack and Packages

- Typescript with ReactJs
- Javascript
- Leaflet for maps
- react-hot-toast
