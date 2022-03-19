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
    console.log("------- pipeline event ---------");
    console.log(this.body);

    if (this.isDeployProd) {
      let threadKey = null;
      if (this.project.name) {
        threadKey = await readData(this.project.name);
      }
      console.log('getThread:', this.project.name, threadKey);
      const message = this.renderMessage();
      hangout.sendMessage(message, threadKey);
    }
  }

  isDeployProd() {
    const {
      object_attributes: { stages },
    } = this.body;
    return (stages || []).includes("deploy-dev"); // TODO: change to 'deploy-prod'
  }

  renderMessage() {

    const projectPiplineUrl = `${this.project.web_url}/-/pipelines`;
    const projectText = `<${projectPiplineUrl}|${this.project.name}>`;

    let statusText = "unknown";
    if (this.status === "success") {
      statusText = "*SUCCESS* ✅";
      // statusText = "*FAILED* 🔥";
    } else if (this.status === "fail") {
      statusText = "*FAILED* 🔥";
    }

    return `${projectText} deploy  ${statusText}`;
  }
}
