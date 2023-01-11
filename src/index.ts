import * as express from 'express';
import { Server } from './server';

const port = 5000;
const server = new Server().app;
server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});