import React, { Component } from 'react'
import Recent from '../home/recent/Recent';

import { BeatLoader } from 'react-spinners';

const pointInPolygon = require('point-in-polygon');

export class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      coords: {lat: 6.666440781593324, lng: -1.571534425020218},
      initialBoundaries: {},
      mapBoundaries : [],
      turfBoundaries: [],
      housesToRender: [],
      housesFromDb: [],
      likedHouses: [],
      deletedHouses: [],
      markerHouse: {},
      mapDisplayRegion: {coords:{latitude:6.666440781593324, longitude: -1.571534425020218}},
      showMarkerHouse: false,
      showMarkers: false,
      address: '',
      loadingHouses: true,
      forSale: null
    };   
  }

  componentDidMount(){
    console.log('this.props', this.props.location.state.coords)
    const coords = this.props.location.state.coords
    this.sendBoudsWithoutMap(coords.lat, coords.lng)
  }

  sendBoudsWithoutMap = async (plat,plgn) => {
    this.setState({ loadingHouses: true })
    console.log("starting", plat,plgn)
    const km = 0.04492363;
    const lat = plat;
    const lgn = plgn;
    const data = [[(lgn-km), (lat-km)],[(lgn-km), (lat+km)],[(lgn+km), (lat+km)],[(lgn+km), (lat-km)],[(lgn-km), (lat-km)]]
    const turfBoudaries = [[(lat-km), (lgn-km)],[(lat+km), (lgn-km)],[(lat+km),(lgn+km)],[ (lat-km), (lgn+km)],[ (lat-km), (lgn-km)]]
    try{
      const apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/houseswithinboundary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const data2 = await apiResponse.json()
      // console.log('data222', data2.data)
      this.setState({housesFromDb: data2.data})
      this.setState({ turfBoundaries:  turfBoudaries })
        //   setHousesFromDb(data2.data)
          // console.log(this.state.housesFromDb)
        if(this.state.housesFromDb.length == 0){
          this.setState({housesToRender: []})
          this.setState({ loadingHouses: false })
          // setHouseToRender([])
        }else{
          // this.setState({ showMarkers: false })
          this.housesFilter()
        }
      } catch(error) {
        console.log(error)
        this.setState({ loadingHouses: false })
      } finally {
        
      }
    }

    housesFilter = () => {
      const houses = this.state.housesFromDb.map((item, index) => {
        let houses = item.houses
        return houses
      }).flat(1)

      const houses2 = houses.map((item, index) => {
        let pt = [item.houseCoordinates.coordinates[1],item.houseCoordinates.coordinates[0]];
        let poly = this.state.turfBoundaries;
  
        if(pointInPolygon(pt, poly)){
          let data = item
          return data
        }
      }).flat(1)
  
      // console.log("houses",houses2)

      const removeUndefined = houses2.filter(( element ) => {
        return element !== undefined && this.state.deletedHouses.includes(element._id) === false;
      })
      console.log('removeUndefined', removeUndefined)
      this.setState({ housesToRender: removeUndefined, loadingHouses: false })
      // this.setState({ showMarkers: true })
    }

  render() {
    return (
      <>
        {this.state.loadingHouses?(
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className="container">
            <BeatLoader 
              size={90}
              color={'black'}
            />
          </div>
        ):(
          <div>
            {this.state.housesToRender.length == 0? (
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }} className="container">
                <BeatLoader 
                  size={50}
                  color={'black'}
                />
                <h1>No results</h1>
              </div>
            ):(
              <Recent title={'Results'} houses={this.state.housesToRender} />
            )}
          </div>
        )}
      </>
    )
  }
}

export default Search