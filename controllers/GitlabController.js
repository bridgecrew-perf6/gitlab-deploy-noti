import { PipelineEventHandler, TagPushEventHandler } from "../services/gitlab/";

export class GitlabController {
  static handleHook(req, res) {
    const tokenHeader = req.headers["x-gitlab-token"];
    const body = req.body;
    const eventType = body.object_kind;

    let handler = null;

    switch (eventType) {
      case "tag_push":
        handler = new TagPushEventHandler(body);
        break;
      case "pipeline":
        handler = new PipelineEventHandler(body);
        break;
      default:
        break;
    }

    if (handler) {
      handler.handle();
    }

    res.status(200).json({ status: "ok" });
  }
}
