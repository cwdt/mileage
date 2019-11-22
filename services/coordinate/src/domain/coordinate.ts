import {Result} from "../shared/core/result";

interface CoordinateProps {
    latitude: Number,
    longitude: Number
}

export class Coordinate {
    public readonly latitude: Number;
    public readonly longitude: Number;

    private constructor(props: CoordinateProps) {
        this.latitude = props.latitude;
        this.longitude = props.longitude;
    }

    public static create(latitude: Number, longitude: Number): Result<Coordinate> {
        if ((latitude < -90 || latitude > 90) || (longitude < -180 || longitude > 180)) {
            return Result.fail<Coordinate>('Invalid coordinates');
        }

        return Result.ok<Coordinate>(new Coordinate({latitude, longitude}));
    }
}
