import { hangoutNotification as hangout } from "../hangout/HangoutNotification";
import { readData } from "../storage/redis";

export class PipelineEventHandler {
  body;
  project;
  status;

  constructor(body) {
    this.body = body;
    this.project = this.body?.project;
    this.status = (this.body?.object_attributes?.status || "").toLowerCase();
  }

  async handle() {
    if (this.isDeployProd) {
      let threadKey = null;
      if (this.project.name) {
        threadKey = await readData(this.project.name);
      }
      const message = this.renderMessage();
      hangout.sendMessage(message, threadKey);
    }
  }

  isDeployProd() {
    const {
      object_attributes: { stages },
    } = this.body;
    return (stages || []).includes("deploy-prod");
  }

  renderMessage() {
    const projectPiplineUrl = `${this.project.web_url}/-/pipelines`;
    const projectText = `<${projectPiplineUrl}|${this.project.name}>`;

    let emoji;
    switch (this.status) {
      case "success":
        emoji = "✅";
        break;
      case "fail":
        emoji = "🔥";
        break;
      default:
        emoji = "";
        break;
    }

    return `${projectText} deploy  *${this.status}* ${emoji}`;
  }
}
