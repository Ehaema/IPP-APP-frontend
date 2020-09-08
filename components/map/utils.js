
/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
export var RADIUS = 6378137;
/**
 * @const
 * @type {number}
 */
export var HALF_SIZE = Math.PI * RADIUS;

/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
export function fromEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === undefined) {
        if (dimension > 2) {
            // preserve values beyond second dimension
            output = input.slice();
        }
        else {
            output = new Array(length);
        }
    }
    var halfSize = HALF_SIZE;
    for (var i = 0; i < length; i += dimension) {
        output[i] = (halfSize * input[i]) / 180;
        var y = RADIUS * Math.log(Math.tan((Math.PI * (+input[i + 1] + 90)) / 360));
        if (y > halfSize) {
            y = halfSize;
        }
        else if (y < -halfSize) {
            y = -halfSize;
        }
        output[i + 1] = y;
    }
    return output;
}
/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */
export function toEPSG4326(input, opt_output, opt_dimension) {
    var length = input.length;
    var dimension = opt_dimension > 1 ? opt_dimension : 2;
    var output = opt_output;
    if (output === undefined) {
        if (dimension > 2) {
            // preserve values beyond second dimension
            output = input.slice();
        }
        else {
            output = new Array(length);
        }
    }
    for (var i = 0; i < length; i += dimension) {
        output[i] = (180 * input[i]) / HALF_SIZE;
        output[i + 1] =
            (360 * Math.atan(Math.exp(input[i + 1] / RADIUS))) / Math.PI - 90;
    }
    return output;
}

let a = 6378245.0
let ee = 0.00669342162296594323

export function wgs84togcj02(lng, lat) {
    let dlat = transformlat(lng - 105.0, lat - 35.0)
    let dlng = transformlng(lng - 105.0, lat - 35.0)
    let radlat = lat / 180.0 * Math.PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    let sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * Math.PI)
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * Math.PI)
    let mglat = lat + dlat
    let mglng = lng + dlng
    return [mglng, mglat]
}

function transformlat(lng, lat) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat +
        0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 *
        Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 *
        Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 *
        Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0
    return ret
}

function transformlng(lng, lat) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng +
        0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
    ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 *
        Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 *
        Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 *
        Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0
    return ret
}
//# sourceMappingURL=epsg3857.js.map
