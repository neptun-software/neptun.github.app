import { Probot } from "probot";

// Docs: https://probot.github.io/docs/
// Possible events: https://github.com/octokit/webhooks.js/#webhook-events (app.on(["event", "event"]) | app.on("event") | app.on("event.action"))
export default (app: Probot) => {
  app.onAny(async (context) => {
    app.log.info({ event: context.name, payload: context.payload });
  });
};
