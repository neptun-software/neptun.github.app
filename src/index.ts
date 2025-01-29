import { Probot } from "probot";
import { IS_DEV } from './env.js';
import { InsertGithubAppInstallationRepositorySchema, createGithubAppInstallationRepository, deleteGithubAppInstallationRepository, updateGithubAppInstallationRepository } from "./repositories/github.js";
import { filterToSchemaProperties, keepMatchingProperties } from "./utils.js";

// Docs: https://probot.github.io/docs/
// Possible events: https://github.com/octokit/webhooks.js/#webhook-events (app.on(["event", "event"]) | app.on("event") | app.on("event.action"))
export default (app: Probot) => {
	app.log.info("Starting neptun.github.app...");

	app.onAny(async (context) => {
		if (IS_DEV) {
			app.log.info({ event: context.name, payload: context.payload });
		}
	})

	/*
	Example Payload: 

	 "action": "edited"

	 "sender":{
		  "id":121523551

	 "changes":{
		  "description":{
				"from":"Simple calculator android app."
	 (The updated (new) state is always inside of repository.)

	 "installation":{
		  "id":55362129

	 "repository":{
		  "id":890625048
		  "owner":{
				"id":121523551
	 */

	app.on("repository.created", async (context) => {
		const repository = context.payload.repository;
		const minimalRepository = filterToSchemaProperties(repository, InsertGithubAppInstallationRepositorySchema);

		try {
			const createdGithubAppInstallationRepository = await createGithubAppInstallationRepository(minimalRepository);

			if (IS_DEV) {
				app.log.info("[CREATED] Repository", { repository: createdGithubAppInstallationRepository });
			}
		} catch (err) {
			if (IS_DEV) {
				app.log.error("[CREATE] Failed to create Repository", { error: err });
			}
		}
	})

	app.on(["repository.edited", "repository.renamed"], async (context) => {
		const repository = context.payload.repository;
		const minimalRepository = filterToSchemaProperties(repository, InsertGithubAppInstallationRepositorySchema);
		const changedAttributes = keepMatchingProperties(minimalRepository, context.payload.changes);

		try {
			const updatedGithubAppInstallationRepository = await updateGithubAppInstallationRepository(minimalRepository.githubRepositoryId, changedAttributes);

			if (IS_DEV) {
				app.log.info("[UPDATED] Repository", { repository: updatedGithubAppInstallationRepository });
			}
		} catch (err) {
			if (IS_DEV) {
				app.log.error("[UPDATE] Failed to update Repository", { error: err });
			}
		}
	})

	app.on(["repository.deleted", "repository.transferred"], async (context) => {
		const repository = context.payload.repository;
		const minimalRepository = filterToSchemaProperties(repository, InsertGithubAppInstallationRepositorySchema);

		try {
			const deletedGithubAppInstallationRepository = await deleteGithubAppInstallationRepository(minimalRepository.githubRepositoryId);

			if (IS_DEV) {
				app.log.info("[DELETED] Repository", { success: deletedGithubAppInstallationRepository });
			}
		} catch (err) {
			if (IS_DEV) {
				app.log.error("[DELETE] Failed to delete Repository", { error: err });
			}
		}
	})
};
