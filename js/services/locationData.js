HappyHourLocator.service("getDatabyPos", [
  "$http",
  function ($http) {
        var servicesInst = {};
        servicesInst.GetJsonData = () => {
            var url =
                "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=7&callback=";
            var promise = $http({
                method: "GET",
                url: url
            }).then(
                (response) => response
            );
            return promise;
        };
        servicesInst.getData = (position) => {
            var url =
                "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                position.coords.latitude +
                "," +
                position.coords.longitude +
                "&sensor=true";

            var promise = $http({
                method: "GET",
                url: url
            }).then(
                (response) => response
            );
            return promise;
        };
        return servicesInst;
  }
]);

var map;
var infowindow;
//
//function initMap() {
//    var pyrmont = {
//        lat: -33.867,
//        lng: 151.195
//    };
//
//    map = new google.maps.Map(document.getElementById('map'), {
//        center: pyrmont,
//        zoom: 15
//    });
//
//    infowindow = new google.maps.InfoWindow();
//    var service = new google.maps.places.PlacesService(map);
//    service.nearbySearch({
//        location: pyrmont,
//        radius: 500,
//        type: ['store']
//    }, callback);
//}
