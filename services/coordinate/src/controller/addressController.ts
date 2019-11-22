import {Coordinate} from "../domain/coordinate";
import {Request, Response} from "express";
import {ReverseGeoLocationService} from "../services/reverseGeoLocationService";

export class AddressController {
    constructor(private service: ReverseGeoLocationService) {
    }

    public view = async (req: Request, res: Response): Promise<Response> => {
        const coordinateOrError = Coordinate.create(
            parseFloat(req.params.latitude.replace(',', '.')),
            parseFloat(req.params.longitude.replace(',', '.'))
        );

        if (!coordinateOrError.success) {
            return res.status(400).send(coordinateOrError.error());
        }

        try {
            return res.json(await this.service.find(coordinateOrError.value()));
        } catch (err) {
            return res.status(502).json({message: 'Error while retrieving address'});
        }
    };
}
