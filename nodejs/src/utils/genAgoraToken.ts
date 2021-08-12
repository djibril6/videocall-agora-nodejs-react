import agora from 'agora-access-token';

const RTCToken = (
    appID: string, 
    primaryCertificate: string, 
    channel: string, 
    isPublisher: boolean
) => {
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const uid = Math.floor(Math.random() * 100000);
    const role = isPublisher ? agora.RtcRole.PUBLISHER : agora.RtcRole.SUBSCRIBER;
    

    const agoraToken = agora.RtcTokenBuilder.buildTokenWithUid(
        appID,
        primaryCertificate,
        channel,
        uid,
        role, 
        privilegeExpiredTs
    );

    return { appID, channel, uid, agoraToken, expirationTimeInSeconds }
}

export const genAgoraToken = { RTCToken }