import express from 'express';
const mapRouter = express.Router();
import {getCoordinates, getDirections, getAutoSuggest} from '../controllers/maps.controller.js';

mapRouter.post('/get-coordinates', getCoordinates);
mapRouter.post('/get-directions', getDirections);
mapRouter.get('/get-auto-suggest', getAutoSuggest);

export default mapRouter;