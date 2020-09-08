import React, {Component} from "react"
import Map from "./map/Map";

export var Main = (function() {
    return class Main extends Component {
        constructor() {
            super();
        }

        render() {
            return(
                <>
                    <Map/>
                </>
            )
        }
    }
})();

export default Main;
