import axios from "axios";
import config from "../../config";

export class HangoutNotification {
  webHookUrl;

  constructor() {
    this.webHookUrl = config.hangout.web_hook;
  }

  async sendMessage(message, threadKey = null) {
    let url = config.hangout.web_hook;
    if (threadKey) {
      url += "&threadKey=" + threadKey;
    }

    const res = await axios.post(url, { text: message });

    const resThread = res.data?.thread;
    if (!resThread) {
      return null;
    }

    const resThreadKey = resThread.name.split("/").splice(-1)[0].trim();
    return resThreadKey;
  }
}

export const hangoutNotification = new HangoutNotification();
