import React, {useEffect, useState, useMemo, useRef} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoBox } from '@react-google-maps/api';
const pointInPolygon = require('point-in-polygon');


const containerStyle = {
    width: '100%',
    height: '90vh'
  };
  
//   const center = {
//     lat: -3.745,
//     lng: -38.523
//   };

  const createMapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: false,
  }

function MapComponent(props) {
    const[turfBoundaries, setTurfBoundaries] = useState([])
    const[mapBoundaries, setMapBoundaries] = useState([])
    const[housesFromDb, setHousesFromDb] = useState([])
    const[housesToRender, setHouseToRender] = useState([])
    const[zoomedFar, setZoomedFar] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [selectedMarkerPosition, setSelectedMarkerPosition] = useState(null);

    const mapRef = useRef(null);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
    }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onDragEnd = async () => {
        const map = mapRef.current;
        let zoomLevel = map.getZoom()
        if (zoomLevel < 14){
            setZoomedFar(true)
        }else{
            setZoomedFar(false)
        }

        // let neLat = await map.getBounds().getNorthEast().lat();
        // let neLng = await map.getBounds().getNorthEast().lng();
        // let swLat = await map.getBounds().getSouthWest().lat();
        // let swLng = await map.getBounds().getSouthWest().lng();

        const bounds = map.getBounds();
    
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
    
        const nw = new window.google.maps.LatLng(ne.lat(), sw.lng());
        const se = new window.google.maps.LatLng(sw.lat(), ne.lng());
    
        const polygonCoords = [
          [ ne.lat(), ne.lng() ],
          [ nw.lat(), nw.lng() ],
          [ sw.lat(), sw.lng() ],
          [ se.lat(), se.lng() ],
          [ ne.lat(), ne.lng() ]
        ];

        const polygonCoords2 = [
            [ne.lng(), ne.lat()],
            [nw.lng(), nw.lat()],
            [sw.lng(), sw.lat()],
            [se.lng(), se.lat()],
            [ne.lng(), ne.lat()]
          ];

        setTurfBoundaries(polygonCoords)
        setMapBoundaries(polygonCoords2)
        if(mapBoundaries.length  !==  0){
            sendMapBoundaries()
            // console.log("coords", mapBoundaries)
          }
    };

    const sendMapBoundaries = async () => {
        const data = mapBoundaries
        try{
          const apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/houseswithinboundary`, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          const data2 = await apiResponse.json()
          console.log('data from api', data2.data)
        //   this.setState({housesFromDb: data2.data})
          setHousesFromDb(data2.data)
          console.log(housesFromDb)
          if(housesFromDb.length == 0){
            setHouseToRender([])
            // this.setState({housesToRender: []})
            // this.setState({ loadingHouses: false })
            // setHouseToRender([])
          }else{
            // this.setState({ showMarkers: false })
            housesFilter()
          }
          } catch(error) {
            console.log(error)
            // this.setState({ loadingHouses: false })
          } finally {
            
          }
    }

    const housesFilter = () => {
        const houses = housesFromDb.map((item, index) => {
          let houses = item.houses
          return houses
        }).flat(1)

        const houses2 = houses.map((item, index) => {
          let pt = [item.houseCoordinates.coordinates[1],item.houseCoordinates.coordinates[0]];
          let poly = turfBoundaries;
    
          if(pointInPolygon(pt, poly)){
            let data = item
            return data
          }
        }).flat(1)
    
        // console.log("houses",houses2)

        const removeUndefined = houses2.filter(( element ) => {
          return element !== undefined ;
        })
        // console.log(removeUndefined)
        // this.setState({ housesToRender: removeUndefined, loadingHouses: false })
        setHouseToRender(removeUndefined)
        // this.setState({ showMarkers: true })
      }

      const onChildClick = (marker) => {
        setSelectedMarker(marker);
        setSelectedMarkerPosition({ lat: marker.houseCoordinates.coordinates[1],lng: marker.houseCoordinates.coordinates[0] });
      };

      const center = useMemo(() => {
        return { lat: props.center.lat, lng: props.center.lng }; // replace with your desired initial center coordinates
      }, []);
    
    return isLoaded ? (
        <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onDragEnd={onDragEnd}
            onZoomChanged={onDragEnd}
            options={createMapOptions}
        >
            {zoomedFar? (
                <div style={{ position: 'absolute', top: 0 , right: 0, padding: 10, backgroundColor: 'white', borderRadius: 5}}>
                    <p>Zomed out too far</p>
                </div>
            ):(null)}
            {housesToRender.map((marker) => (
                <Marker
                icon={{
                    url: require('../../images/marker.png'),
                    scaledSize: {
                      width: 50,
                      height: 50
                    }
                }}
                key={marker._id}
                position={{lat: marker.houseCoordinates.coordinates[1],lng: marker.houseCoordinates.coordinates[0]}}
                onClick={() => onChildClick(marker)}
                />
            ))}
            {selectedMarker && selectedMarkerPosition && (
                <InfoBox
                position={selectedMarkerPosition}
                options={{ closeBoxURL: '', enableEventPropagation: true }}
                >
                <div style={{ backgroundColor: 'white', padding: '7px' }}>
                    <img src={selectedMarker.houseImage[0]} />
                    <h2>$ {selectedMarker.price}</h2>
                    <h4>{selectedMarker.country}</h4>
                    <p>{selectedMarker.description}</p>
                </div>
                </InfoBox>
            )}
          <></>
        </GoogleMap>
    ) : <></>
}

export default MapComponent