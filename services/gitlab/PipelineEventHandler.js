import { hangoutNotification as hangout } from "../hangout/HangoutNotification";

export class PipelineEventHandler {
  body;
  project;
  status;
  allowStatus = ["success", "failed"];

  constructor(body) {
    this.body = body;
    this.project = this.body?.project;
    this.status = (this.body?.object_attributes?.status || "").toLowerCase();
  }

  async handle() {
    if (this.isDeployProd() && this.inAllowStatus()) {
      const message = this.renderMessage();
      const threadKey = this.project.name;
      hangout.sendMessage(message, threadKey);
    }
  }

  isDeployProd() {
    const {
      object_attributes: { stages },
    } = this.body;
    return (stages || []).includes("deploy-prod");
  }

  inAllowStatus() {
    return this.allowStatus.includes(this.status);
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

    return `${emoji} ${projectText} deploy  *${this.status}*`;
  }
}
