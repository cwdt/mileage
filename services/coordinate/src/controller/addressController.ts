import {Coordinate} from "../domain/coordinate";
import {Request, Response} from "express";
import {ReverseGeoLocationService} from "../services/reverseGeoLocationService";

export class AddressController {
    constructor(private service: ReverseGeoLocationService) {
    }

    public view = async (req: Request, res: Response): Promise<Response> => {
        const coordinateResult = Coordinate.create(
            parseFloat(req.params.latitude.replace(',', '.')),
            parseFloat(req.params.longitude.replace(',', '.'))
        );

        if (!coordinateResult.success) {
            return res.status(400).json({message: coordinateResult.error()});
        }

        try {
            return res.status(200).header('Cache-Control', 'max-age=31536000').json(await this.service.find(coordinateResult.value()));
        } catch (err) {
            console.log('Err while retrieving address:', err.message);
            return res.status(502).json({message: 'Error while retrieving address'});
        }
    };
}
