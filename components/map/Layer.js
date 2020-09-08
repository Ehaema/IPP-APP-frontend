import React, {Component} from "react"
import {MapView} from "react-native-amap3d"
import axios from "axios"

import {toEPSG4326, wgs84togcj02} from "./utils"
import config from "../../config/config";

export var Layer = (function () {
    let parent;

    return class Layer extends Component {
        constructor(props) {
            super(props);
            parent = props.parent;

            this.state = {
                features: []
            }
            this.mounted = false;
        }

        async loadFeatures() {
            return [];
        }

        componentDidMount() {
            this.mounted = true;
            (this.loadFeatures())().then((arr) => {
                if(this.mounted) {
                    this.setState({
                        features: arr
                    })
                }
            });
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        onPress() {

        }

        render() {
            let layer = [];
            for (let i = 0; i < this.state.features.length; i++) {
                let lonlat = toEPSG4326(this.state.features[i].coordinate);
                let gcjLonlat = wgs84togcj02(lonlat[0], lonlat[1])
                layer.push(
                    <MapView.Marker
                        coordinate={{
                            latitude: gcjLonlat[1],
                            longitude: gcjLonlat[0]
                        }}
                        title={this.state.features[i].description}
                        onPress={(e) => {
                            this.onPress(e)
                        }}
                        key={i}
                    />
                )
            }

            return (
                <>
                    {layer}
                </>
            );
        }

        /**
         * 返回当前已加载的特征
         * @returns {Array<Object>}
         */
        getFeatures() {
            return this.state.features;
        }
    }
})();

export default Layer;
