import mongoose from 'mongoose';
import { Router } from 'express';
import passport from 'passport';
import bodyParser  from 'body-parser';

import Account from '../model/account';
import config from '../config';

import { generateAccesStoken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db }) => {
    let api = Router();


    return api;
}