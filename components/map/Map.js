import React,{Component} from "react"
import {MapView} from "react-native-amap3d"
import {StyleSheet} from "react-native"
import axios from "axios"

import {toEPSG4326, wgs84togcj02} from "./utils";

class MapExt extends Component{
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      garage: []
    }
  }

  componentDidMount() {
    this.mounted = true;
    (async() => {
      let result = await axios.get("http://192.168.1.107:8003/business/garage");
      if(result.data) {
        let garage = result.data;
        for(let i = 0; i < garage.length; i++) {
          let pinpoint = await axios.get("http://192.168.1.107:8000/map/pinpoint/" + garage[i].center.$id);
          garage[i].center = pinpoint.data;
        }
        if(this.mounted)
          this.setState({
            garage: garage
          });
      }
    })()
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let garagePins = [];
    for(let i = 0; i < this.state.garage.length; i++) {
      let lonlat = toEPSG4326(this.state.garage[i].center.coordinate);
      let gcjLonlat = wgs84togcj02(lonlat[0], lonlat[1])
      garagePins.push(
          <MapView.Marker
            coordinate={{
              latitude: gcjLonlat[1],
              longitude: gcjLonlat[0]
            }}
            title={this.state.garage[i].description}
            onPress={() => { console.log(1); }}
            key={i}
          />
        )
    }

    const centerLL = toEPSG4326([13519023.565173406, 3636438.266781322])

    return (
      <MapView
          style={styles.map}
          center={{
            latitude: wgs84togcj02(centerLL[0], centerLL[1])[1],
            longitude: wgs84togcj02(centerLL[0], centerLL[1])[0]
          }}
          zoomLevel={17.99281959015753}
      >
        {garagePins}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  }
})

export default MapExt;
