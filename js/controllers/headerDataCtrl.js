//esnext
HappyHourLocator.controller("headerDataCtrl", [
  "getDatabyPos","$geolocation", "$scope",
    (getDatabyPos, $geolocation, $scope) => {
        $scope.dDate = new Date();
        $scope.dHour = new Date();
        $scope.position = "Loading...";
        $geolocation.getCurrentPosition({ //watchPosition
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        }).then(function (position) {
            var pyrmont = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude 
                };

                map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 15
                });

                infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch({
                    location: pyrmont,
                    radius: 500,
                    type: ['bar']
                }, callback);
//                $scope.$apply(() => {
                    getDatabyPos.getData(position).then((data) => {
                        $scope.position = data.data.results[0].formatted_address;
//                        getDatabyPos.GetJsonData().then((data) => {
//                            $scope.lists = data.data;
//                        });
                    });
//                });
        });
  }
]);

//.controller('geolocCtrl', ['$geolocation', '$scope', function($geolocation, $scope) {
//        $geolocation.watchPosition({
//            timeout: 60000,
//            maximumAge: 250,
//            enableHighAccuracy: true
//        });
//        $scope.myPosition = $geolocation.position; // this object updates regularly, it has 'error' property which is a 'truthy' and also 'code' and 'message' property if an error occurs
//        
//        //It has all the location data 
//        '$scope.myPosition.coords'
//        
//        //It's truthy and gets defined when error occurs 
//        '$scope.myPosition.error'
//    }]);


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            console.log(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
