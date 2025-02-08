import { relations } from "drizzle-orm/relations";
import {
	neptunUser,
	chatConversation,
	neptunUserOauthAccount,
	chatConversationMessage,
	chatConversationFile,
	neptunUserFile,
	githubAppInstallation,
	githubAppInstallationRepository,
	neptunContextFile,
	neptunContextImport,
	neptunUserProject,
	projectChatConversation,
	projectGithubInstallation,
	projectTemplateCollection,
	neptunUserTemplateCollection,
	projectUserFile,
	neptunUserTemplate,
	chatConversationShare,
	chatConversationShareWhitelistEntry,
} from "./schema.js";

export const chatConversationRelations = relations(
	chatConversation,
	({ one, many }) => ({
		neptunUser: one(neptunUser, {
			fields: [chatConversation.neptunUserId],
			references: [neptunUser.id],
		}),
		chatConversationMessages: many(chatConversationMessage),
		chatConversationFiles: many(chatConversationFile),
		projectChatConversations: many(projectChatConversation),
		chatConversationShares: many(chatConversationShare),
	}),
);

export const neptunUserRelations = relations(neptunUser, ({ many }) => ({
	chatConversations: many(chatConversation),
	neptunUserOauthAccounts: many(neptunUserOauthAccount),
	chatConversationMessages: many(chatConversationMessage),
	chatConversationFiles: many(chatConversationFile),
	githubAppInstallations: many(githubAppInstallation),
	neptunContextFiles: many(neptunContextFile),
	neptunContextImports: many(neptunContextImport),
	neptunUserProjects: many(neptunUserProject),
	neptunUserTemplates: many(neptunUserTemplate),
	neptunUserFiles: many(neptunUserFile),
	neptunUserTemplateCollections: many(neptunUserTemplateCollection),
	chatConversationShareWhitelistEntries: many(
		chatConversationShareWhitelistEntry,
	),
}));

export const neptunUserOauthAccountRelations = relations(
	neptunUserOauthAccount,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [neptunUserOauthAccount.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);

export const chatConversationMessageRelations = relations(
	chatConversationMessage,
	({ one, many }) => ({
		neptunUser: one(neptunUser, {
			fields: [chatConversationMessage.neptunUserId],
			references: [neptunUser.id],
		}),
		chatConversation: one(chatConversation, {
			fields: [chatConversationMessage.chatConversationId],
			references: [chatConversation.id],
		}),
		chatConversationFiles: many(chatConversationFile),
	}),
);

export const chatConversationFileRelations = relations(
	chatConversationFile,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [chatConversationFile.neptunUserId],
			references: [neptunUser.id],
		}),
		chatConversation: one(chatConversation, {
			fields: [chatConversationFile.chatConversationId],
			references: [chatConversation.id],
		}),
		chatConversationMessage: one(chatConversationMessage, {
			fields: [chatConversationFile.chatConversationMessageId],
			references: [chatConversationMessage.id],
		}),
		neptunUserFile: one(neptunUserFile, {
			fields: [chatConversationFile.neptunUserFileId],
			references: [neptunUserFile.id],
		}),
	}),
);

export const neptunUserFileRelations = relations(
	neptunUserFile,
	({ one, many }) => ({
		chatConversationFiles: many(chatConversationFile),
		projectUserFiles: many(projectUserFile),
		neptunUserTemplates: many(neptunUserTemplate),
		neptunUser: one(neptunUser, {
			fields: [neptunUserFile.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);

export const githubAppInstallationRelations = relations(
	githubAppInstallation,
	({ one, many }) => ({
		neptunUser: one(neptunUser, {
			fields: [githubAppInstallation.neptunUserId],
			references: [neptunUser.id],
		}),
		githubAppInstallationRepositories: many(githubAppInstallationRepository),
		projectGithubInstallations: many(projectGithubInstallation),
	}),
);

export const githubAppInstallationRepositoryRelations = relations(
	githubAppInstallationRepository,
	({ one }) => ({
		githubAppInstallation: one(githubAppInstallation, {
			fields: [githubAppInstallationRepository.githubAppInstallationId],
			references: [githubAppInstallation.id],
		}),
	}),
);

export const neptunContextFileRelations = relations(
	neptunContextFile,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [neptunContextFile.neptunUserId],
			references: [neptunUser.id],
		}),
		neptunContextImport: one(neptunContextImport, {
			fields: [neptunContextFile.importId],
			references: [neptunContextImport.id],
		}),
		neptunUserProject: one(neptunUserProject, {
			fields: [neptunContextFile.projectId],
			references: [neptunUserProject.id],
		}),
	}),
);

export const neptunContextImportRelations = relations(
	neptunContextImport,
	({ one, many }) => ({
		neptunContextFiles: many(neptunContextFile),
		neptunUser: one(neptunUser, {
			fields: [neptunContextImport.neptunUserId],
			references: [neptunUser.id],
		}),
		neptunUserProject: one(neptunUserProject, {
			fields: [neptunContextImport.projectId],
			references: [neptunUserProject.id],
		}),
	}),
);

export const neptunUserProjectRelations = relations(
	neptunUserProject,
	({ one, many }) => ({
		neptunContextFiles: many(neptunContextFile),
		neptunContextImports: many(neptunContextImport),
		neptunUser: one(neptunUser, {
			fields: [neptunUserProject.neptunUserId],
			references: [neptunUser.id],
		}),
		projectChatConversations: many(projectChatConversation),
		projectGithubInstallations: many(projectGithubInstallation),
		projectTemplateCollections: many(projectTemplateCollection),
		projectUserFiles: many(projectUserFile),
	}),
);

export const projectChatConversationRelations = relations(
	projectChatConversation,
	({ one }) => ({
		neptunUserProject: one(neptunUserProject, {
			fields: [projectChatConversation.projectId],
			references: [neptunUserProject.id],
		}),
		chatConversation: one(chatConversation, {
			fields: [projectChatConversation.chatConversationId],
			references: [chatConversation.id],
		}),
	}),
);

export const projectGithubInstallationRelations = relations(
	projectGithubInstallation,
	({ one }) => ({
		neptunUserProject: one(neptunUserProject, {
			fields: [projectGithubInstallation.projectId],
			references: [neptunUserProject.id],
		}),
		githubAppInstallation: one(githubAppInstallation, {
			fields: [projectGithubInstallation.githubInstallationId],
			references: [githubAppInstallation.id],
		}),
	}),
);

export const projectTemplateCollectionRelations = relations(
	projectTemplateCollection,
	({ one }) => ({
		neptunUserProject: one(neptunUserProject, {
			fields: [projectTemplateCollection.projectId],
			references: [neptunUserProject.id],
		}),
		neptunUserTemplateCollection: one(neptunUserTemplateCollection, {
			fields: [projectTemplateCollection.templateCollectionId],
			references: [neptunUserTemplateCollection.id],
		}),
	}),
);

export const neptunUserTemplateCollectionRelations = relations(
	neptunUserTemplateCollection,
	({ one, many }) => ({
		projectTemplateCollections: many(projectTemplateCollection),
		neptunUserTemplates: many(neptunUserTemplate),
		neptunUser: one(neptunUser, {
			fields: [neptunUserTemplateCollection.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);

export const projectUserFileRelations = relations(
	projectUserFile,
	({ one }) => ({
		neptunUserProject: one(neptunUserProject, {
			fields: [projectUserFile.projectId],
			references: [neptunUserProject.id],
		}),
		neptunUserFile: one(neptunUserFile, {
			fields: [projectUserFile.userFileId],
			references: [neptunUserFile.id],
		}),
	}),
);

export const neptunUserTemplateRelations = relations(
	neptunUserTemplate,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [neptunUserTemplate.neptunUserId],
			references: [neptunUser.id],
		}),
		neptunUserTemplateCollection: one(neptunUserTemplateCollection, {
			fields: [neptunUserTemplate.templateCollectionId],
			references: [neptunUserTemplateCollection.id],
		}),
		neptunUserFile: one(neptunUserFile, {
			fields: [neptunUserTemplate.userFileId],
			references: [neptunUserFile.id],
		}),
	}),
);

export const chatConversationShareRelations = relations(
	chatConversationShare,
	({ one, many }) => ({
		chatConversation: one(chatConversation, {
			fields: [chatConversationShare.chatConversationId],
			references: [chatConversation.id],
		}),
		chatConversationShareWhitelistEntries: many(
			chatConversationShareWhitelistEntry,
		),
	}),
);

export const chatConversationShareWhitelistEntryRelations = relations(
	chatConversationShareWhitelistEntry,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [chatConversationShareWhitelistEntry.whitelistedNeptunUserId],
			references: [neptunUser.id],
		}),
		chatConversationShare: one(chatConversationShare, {
			fields: [chatConversationShareWhitelistEntry.chatConversationShareId],
			references: [chatConversationShare.id],
		}),
	}),
);
