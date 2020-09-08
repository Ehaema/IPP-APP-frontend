import React, {Component} from "react"
import {MapView} from "react-native-amap3d"
import {StyleSheet} from "react-native"

import {toEPSG4326, wgs84togcj02} from "./utils";
import Garage from "./Garage";


export var Map = (function () {
    return class Map extends Component {
        constructor(props) {
            super(props);
            this.mounted = false;
        }

        componentDidMount() {
            this.mounted = true;
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        render() {
            const centerLL = toEPSG4326([13519023.565173406, 3636438.266781322])

            this.garageLayer = React.createElement(Garage, {parent: this})

            return (
                <MapView
                    style={styles.map}
                    center={{
                        latitude: wgs84togcj02(centerLL[0], centerLL[1])[1],
                        longitude: wgs84togcj02(centerLL[0], centerLL[1])[0]
                    }}
                    zoomLevel={17.99281959015753}
                >
                    {this.garageLayer}
                </MapView>
            );
        }
    }
})();

const styles = StyleSheet.create({
    map: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
    }
})

export default Map;
