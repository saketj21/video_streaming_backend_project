import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app =express();

app.use(cors(
    {
        origin: process.env.corsOrigin,
        credentials: true
    }
));

app.use(express.json({limit: "30kb",extended: true}));
app.use(express.urlencoded({limit: "30kb",extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

export{app};