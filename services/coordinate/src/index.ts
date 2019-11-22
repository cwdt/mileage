import express from 'express';
import dotenv from 'dotenv'
import {AddressController} from "./controller/addressController";
import {LocationIQReverseGeoLocationService} from "./services/locationIQReverseGeoLocationService";

const app: express.Application = express();
dotenv.config();

// @TODO use DI container
const addressController = new AddressController(new LocationIQReverseGeoLocationService());

app.get('/address/:latitude/:longitude', addressController.view);

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
