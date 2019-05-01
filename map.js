	    var map;
	    
		var config = {
			apiKey: "XXXXXXXXXXXXXXX",
			authDomain: "XXXXXXXXXXXXX",
			databaseURL: "XXXXXXXXXXXX",
			projectId: "XXXXXXXXXXX"
		};
		
		firebase.initializeApp(config);
		
		const db = firebase.firestore();
		
		firebase.auth().signInAnonymously()
			.then(function() {
			   console.log('Message data loaded')
			   
			   }).catch(function(error) {
			   var errorCode = error.code;
			   var errorMessage = error.message;
			   console.log(errorCode);
			   console.log(errorMessage);
		});
		
		function initMap() {		
			const mapBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(54.746818, -119.405589),
				new google.maps.LatLng(55.035186, -118.905672));
				const mapMinZoom = 9;
				const mapMaxZoom = 13;
			
			const maptiler = new google.maps.ImageMapType({
			    getTileUrl: function(coord, zoom) { 
			        const proj = map.getProjection();
			        const z2 = Math.pow(2, zoom);
			        const tileXSize = 256 / z2;
			        const tileYSize = 256 / z2;
			        const tileBounds = new google.maps.LatLngBounds(
			            proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
			            proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
			        );
			        const x = coord.x >= 0 ? coord.x : z2 + coord.x
			        const y = coord.y;
			        if (mapBounds.intersects(tileBounds) && (mapMinZoom <= zoom) && (zoom <= mapMaxZoom))
			            return zoom + "/" + x + "/" + y + ".png";
			        else
			            return "https://www.maptiler.com/img/none.png";
			    },
			    tileSize: new google.maps.Size(256, 256),
			    isPng: true,
			    name: "Rendered with MapTiler Desktop",
			    alt: "Rendered with MapTiler Desktop",
			
			    opacity: 0.8
			});	
			
			
			const map = new google.maps.Map(document.getElementById('map'), {
			  center: {lat: 54.987906, lng: -118.984037},
			  zoom: 10,
			  styles: [{
			    featureType: 'poi',
			    stylers: [{ visibility: 'off' }]  // Turn off POI.
			  },
			  {
			    featureType: 'transit.station',
			    stylers: [{ visibility: 'off' }]  // Turn off bus, train stations etc.
			  }],
			  disableDoubleClickZoom: true,
			  streetViewControl: false,
			});
			
			map.setMapTypeId('satellite');
			map.overlayMapTypes.insertAt(0, maptiler);

			const ctaLayerLabel = new google.maps.KmlLayer({
				preserveViewport: true,
				clickable: false,	
			url: ''
			}); 
			
			const ctaLayerMedium = new google.maps.KmlLayer({
				preserveViewport: true,
				url: ''
			}); 
			
			const ctaLayerSmall = new google.maps.KmlLayer({
				preserveViewport: true,
				url: ''
			}); 

			const ctaLayerRoads = new google.maps.KmlLayer({
				preserveViewport: true,
				url: ''
			});
		

			google.maps.event.addListener(map, 'zoom_changed', function() {	
			if ( map.getZoom() <= 8){
				ctaLayerSmall.setMap(null);
				ctaLayerMedium.setMap(null);
					 
				 } else if ( map.getZoom() <= 10){
					ctaLayerSmall.setMap(map);
					ctaLayerMedium.setMap(null);
				    ctaLayerLabel.setMap(null);
			
					} else if ( map.getZoom() <= 12){
						ctaLayerSmall.setMap(null);
						ctaLayerMedium.setMap(map);			
			
						} else if ( map.getZoom() <= 13){
							ctaLayerSmall.setMap(null);
							ctaLayerMedium.setMap(map);	
								
							} else {									
								ctaLayerSmall.setMap(null);
								ctaLayerMedium.setMap(map); 		
								ctaLayerLabel.setMap(null);
								}
			});	

			ctaLayerLabel.setMap(map);
	
			db.collection("posts").get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const image = doc.data().image;
					const lat = doc.data().lat;
					const lng = doc.data().lng;
					const name = doc.data().name;
					const role = doc.data().role;
					const text = doc.data().text;					
					const time = doc.data().time;
					const position = new google.maps.LatLng(lat, lng);
					const marker = new google.maps.Marker({
						position,
						map: map,
						title: text
					});
					
					const infowindow = new google.maps.InfoWindow({
					 content: ('<b>MST time:&nbsp;&nbsp;</b>' + time + "<br />" +'<b>name:&nbsp;&nbsp;</b>' + name + "<br />" + '<b>role:&nbsp;&nbsp;</b>' + role + "<br />" + '<b>message:&nbsp;&nbsp;</b>' + '<p> ' + text + ' </p>' +  '<img  src="' + image + '">')
        				});
        				
					marker.addListener('click', function() {
						infowindow.open(map, marker);
					});			    	
    				});
			});
		}
