import Joi from "joi";


const getToken = {
  params: Joi.object().keys({
    channelID: Joi.string().required(),
    isPublisher: Joi.boolean().required(),
  }),
};

export const agoraValidation = { getToken };
