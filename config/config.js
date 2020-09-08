import * as dev from "./dev.config.json"
import * as prod from "./prod.config.json"

export let config = {
    environment: "develop",
    env: dev
}

export default config;
