import { hangoutNotification as hangout } from "../hangout/HangoutNotification";
import { storeData } from "../storage/redis";

export class TagPushEventHandler {
  body;
  project;
  tag;
  userName;

  constructor(body) {
    this.body = body;
    this.project = this.body.project;
    this.tag = this.getTag();
    this.userName = this.body.user_username;
  }

  async handle() {
    const message = this.renderMessage();
    const threadKey = this.generateThreadKey();    
    storeData(this.project.name, threadKey);
    hangout.sendMessage(message, threadKey);
  }

  renderMessage() {
    let projectText = this.project.name;
    if (this.project.web_url) {
      const projectPiplineUrl = `${this.project.web_url}/-/pipelines`;
      projectText = `<${projectPiplineUrl}|${this.project.name}>`;
    }

    return `_${this.userName}_ tag  *${this.tag}*  to ${projectText}  🚀`;
  }

  getTag() {
    return this.body.ref.replace("refs/tags/", "");
  }

  generateThreadKey() {
    return `${this.project.name}_${this.tag}`;
  }
}
