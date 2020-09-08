import React, {Component} from "react"
import {MapView} from "react-native-amap3d"
import axios from "axios"

import {toEPSG4326, wgs84togcj02} from "./utils"
import config from "../../config/config";

export var Garage = (function () {
    let parent;

    return class Garage extends Component {
        constructor(props) {
            super(props);
            parent = props.parent;

            this.state = {
                garage: []
            }
            this.mounted = false;
        }

        componentDidMount() {
            this.mounted = true;
            (async () => {
                let result = await axios.get(config.env.API.business + "/business/garage");
                if (result.data) {
                    let garage = result.data;
                    for (let i = 0; i < garage.length; i++) {
                        let pinpoint = await axios.get(config.env.API.map + "/map/pinpoint/" + garage[i].center.$id);
                        garage[i].center = pinpoint.data;
                    }
                    if (this.mounted)
                        this.setState({
                            garage: garage
                        });
                }
            })();
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        render() {
            let garagePins = [];
            for (let i = 0; i < this.state.garage.length; i++) {
                let lonlat = toEPSG4326(this.state.garage[i].center.coordinate);
                let gcjLonlat = wgs84togcj02(lonlat[0], lonlat[1])
                garagePins.push(
                    <MapView.Marker
                        coordinate={{
                            latitude: gcjLonlat[1],
                            longitude: gcjLonlat[0]
                        }}
                        title={this.state.garage[i].description}
                        onPress={(e) => {
                            console.log(e);
                        }}
                        key={i}
                    />
                )
            }

            return (
                <>
                    {garagePins}
                </>
            );
        }

        /**
         * 返回当前已加载的机库
         * @returns {Array<Object>}
         */
        garage() {
            return this.state.garage;
        }
    }
})();

export default Garage;
