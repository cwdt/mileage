import {Address} from "../domain/address";
import axios from 'axios';
import {Coordinate} from "../domain/coordinate";
import querystring from 'querystring';
import {ReverseGeoLocationService} from "./reverseGeoLocationService";

export class LocationIQReverseGeoLocationService implements ReverseGeoLocationService {
    async find(coordinate: Coordinate): Promise<Address> {
        const parameters = {
            key: process.env.LOCATION_IQ_API_KEY,
            lat: coordinate.latitude,
            lon: coordinate.longitude,
            format: 'json'
        };

        const res = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?${querystring.stringify(parameters)}`)
        const address = res.data.address;

        return {
            houseNumber: address.house_number,
            streetName: address.road,
            city: address.city,
            zipCode: address.postcode,
            countryCode: address.country_code,
        }
    }
}
