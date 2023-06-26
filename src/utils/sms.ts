import axios from "axios";
import { AUTHORIZATION_HEADER } from "../config/constants";

type SendSMSProps = {
  phone: string;
  OTP: string;
};

export async function sendSMS(props: SendSMSProps) {
  const senderPhone = "0000";

  // get auth token
  const { data: auth } = await axios("https://api.orange.com/oauth/v3/token", {
    method: "POST",
    headers: {
      Authorization: <string>AUTHORIZATION_HEADER,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data: "grant_type=client_credentials",
  });

  // send message
  const { data: result } = await axios(
    `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B225${senderPhone}/requests`,
    {
      method: "POST",
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`,
        "Content-Type": "application/json",
      },
      data: {
        outboundSMSMessageRequest: {
          address: `tel:+225${props.phone}`,
          senderAddress: `tel:+225${senderPhone}`,
          outboundSMSTextMessage: {
            message: `Votre code de connexion à l'application FanXP est: ${props.OTP}`,
          },
        },
      },
    }
  );

  return result;
}
