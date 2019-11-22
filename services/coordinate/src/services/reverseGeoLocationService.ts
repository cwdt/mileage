import {Coordinate} from "../domain/coordinate";
import {Address} from "../domain/address";

export interface ReverseGeoLocationService {
    find(coordinate: Coordinate): Promise<Address>;
}
