import express, { Request, Response }  from 'express';
import cors from 'cors';
import { config } from './config';
import validate from './middlewares/validate.middleware';
import { agoraValidation } from './validations';
import { genAgoraToken } from './utils';

const app = express();

app.use(cors());
app.use('*', cors());

app.use(express.json());

app.get('/agora-token/:channelID/:isPublisher', 
validate(agoraValidation.getToken), 
(req: Request, res: Response) => {
    try { 
        const result = genAgoraToken.RTCToken(
            config.agora.appID,
            config.agora.primaryCertificate,
            req.params.channelID,
            Boolean(req.params.isPublisher)
        );
        res.send({ ...result });
    } catch (error) {
        res.status(500).send(error);
    }
});


app.listen(config.port, () => {
    console.log(`🚀 Server listening on port ${config.port}`);
});
