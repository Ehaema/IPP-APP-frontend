import React, {Component} from "react"
import Map from "./map/Map";
import Auth from "./auth/Auth";

export var Main = (function() {
    return class Main extends Component {
        constructor() {
            super();
        }

        render() {
            return(
                <>
                    <Map/>
                    <Auth/>
                </>
            )
        }
    }
})();

export default Main;
