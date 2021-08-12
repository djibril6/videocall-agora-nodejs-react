import express, { Request, Response }  from 'express';
import cors from 'cors';
import agora from 'agora-access-token';
import { config } from './config';
import validate from './middlewares/validate.middleware';
import { agoraValidation } from './validations';

const app = express();

app.use(cors());
app.use('*', cors());

app.use(express.json());



app.get('/agora-token/:channelID/:isPublisher', 
validate(agoraValidation.getToken), 
(req: Request, res: Response) => {
    try {
        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        const uid = Math.floor(Math.random() * 100000);
        const role = req.params.isPublisher ? agora.RtcRole.PUBLISHER : agora.RtcRole.SUBSCRIBER;
        const channel = req.params.channelID;

        const agoraToken = agora.RtcTokenBuilder.buildTokenWithUid(
            config.agora.appID, 
            config.agora.primaryCertificate, 
            channel, 
            uid, 
            role, 
            privilegeExpiredTs
        );
        res.send({ appID: config.agora.appID, channel, uid, agoraToken });
    } catch (error) {
        res.status(500).send(error);
    }
});


app.listen(config.port, () => {
    console.log(`🚀 Server listening on port ${config.port}`);
});
