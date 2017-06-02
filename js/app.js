var HappyHourLocator = angular.module("HappyHourLocator", ['ngGeolocation']);
HappyHourLocator.config([
  "$sceDelegateProvider",
  ($sceDelegateProvider)=> {
    // We must whitelist the JSONP endpoint that we are using to show that we trust it
    $sceDelegateProvider.resourceUrlWhitelist([
      "self",
      "https://maps.googleapis.com/**",
      "http://quotesondesign.com/**"
    ]);
  }
]);


