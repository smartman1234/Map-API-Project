var favList = [];

    $(function () {
        event.preventDefault();

        $.ajax({
            url: '/index',
            method: 'GET',
            contentType: 'application/json',
            success: function (response) {
                response.favLocation.forEach(function (fav) {
                    var lat = fav.lat;
                    var lng = fav.lng;
                    var latlng = new google.maps.LatLng(lat, lng);
                    fav.latlng = latlng;
                    favList.push(fav);

                });
                var favTile = favList[0];
                console.log(favTile);
                getPlacePhoto(favTile);
            }

        });

    });
    var gridPhotoModel = function (photo) {
        console.log(photo);
        this.photo = ko.observable(photo);
    }
    
    function getPlacePhoto(favTile, photo) {
        console.log(favTile.markerID);
        var innerHTML = document.getElementById('fav-photo');
        var service = new google.maps.places.PlacesService(innerHTML);

        service.getDetails({

            placeId: favTile.markerID
        }, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Set the marker property on this infowindow so it isn't created again.
                console.log(place);
                if (place.photos) {
                    var photo = place.photos[0].getUrl(
                        { maxHeight: 500, maxWidth: 700 });

                    ko.applyBindings(new gridPhotoModel(photo));
                }



            }

        });


    }