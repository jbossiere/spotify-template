var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}

  // get songs
  $scope.getSongs = function() {
    console.log($scope.track); //prints out what user inputted
    $http.get(baseUrl + $scope.track).success(function(response){ 
      data = $scope.tracks = response.tracks.items //$scope.tracks is created in order to user "tracks" later on in the <li> in the html.  It is given the universal variable "data" to use in different parts of the js and "response.tracks.item" is the path in the object that gets you to each individual track -eg. the first item in the object is called tracks so, response.tracks, then in order to access each individual track that is under the "items" category so response.tracks.item gets you all of the individual items and saves them all in "data" or "$scope.tracks" 
      console.log($scope.tracks) //prints out array of 20 objects - adding square brackets with a number like 0, will get the first object in the array
      console.log(response.tracks) //prints out one object that has items category, which is an array of 20 items - same as above
      //$scope.track = ''; erases user input after submit
    })
  }
  
  // get artists
  $scope.getArtist = function() {
    $http.get('https://api.spotify.com/v1/search?type=artist&q=' + $scope.artist).success(function(response){ //on spotify api there are various ways to get info "Search" will literally just search through a bunch, and you can get id from them, while the top ones require ID
      console.log(response)
      data = $scope.artists = response.artists.items
      console.log(data)
      //$scope.artist = '';  erases user input after submit
    })
  }

  // play the preview_url
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }

  // $scope.show = function(img) { //method to show img, if this method is uncommented not all results are shown in the li for some reason
  //   console.log(img)
  //   $scope.imageUrl = img.url;
  // }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
