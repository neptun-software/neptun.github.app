import { relations } from "drizzle-orm/relations";
import {
	neptunUser,
	neptunUserOauthAccount,
	chatConversationFile,
	chatConversation,
	chatConversationMessage,
	neptunUserFile,
	githubAppInstallation,
	neptunContextImport,
	neptunUserProject,
	projectGithubInstallation,
	neptunContextFile,
	projectChatConversation,
	projectTemplateCollection,
	neptunUserTemplateCollection,
	projectUserFile,
	githubAppInstallationRepository,
	chatConversationShare,
	chatConversationShareWhitelistEntry,
	neptunUserTemplate,
	neptunUserWebauthnCredential,
} from "./schema.js";

export const neptunUserOauthAccountRelations = relations(
	neptunUserOauthAccount,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [neptunUserOauthAccount.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);

export const neptunUserRelations = relations(neptunUser, ({ many }) => ({
	neptunUserOauthAccounts: many(neptunUserOauthAccount),
	chatConversationFiles: many(chatConversationFile),
	chatConversationMessages: many(chatConversationMessage),
	chatConversations: many(chatConversation),
	githubAppInstallations: many(githubAppInstallation),
	neptunContextImports: many(neptunContextImport),
	neptunContextFiles: many(neptunContextFile),
	neptunUserProjects: many(neptunUserProject),
	neptunUserFiles: many(neptunUserFile),
	neptunUserTemplateCollections: many(neptunUserTemplateCollection),
	chatConversationShareWhitelistEntries: many(
		chatConversationShareWhitelistEntry,
	),
	neptunUserTemplates: many(neptunUserTemplate),
	neptunUserWebauthnCredentials: many(neptunUserWebauthnCredential),
}));

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

export const chatConversationRelations = relations(
	chatConversation,
	({ one, many }) => ({
		chatConversationFiles: many(chatConversationFile),
		chatConversationMessages: many(chatConversationMessage),
		neptunUser: one(neptunUser, {
			fields: [chatConversation.neptunUserId],
			references: [neptunUser.id],
		}),
		projectChatConversations: many(projectChatConversation),
		chatConversationShares: many(chatConversationShare),
	}),
);

export const chatConversationMessageRelations = relations(
	chatConversationMessage,
	({ one, many }) => ({
		chatConversationFiles: many(chatConversationFile),
		neptunUser: one(neptunUser, {
			fields: [chatConversationMessage.neptunUserId],
			references: [neptunUser.id],
		}),
		chatConversation: one(chatConversation, {
			fields: [chatConversationMessage.chatConversationId],
			references: [chatConversation.id],
		}),
	}),
);

export const neptunUserFileRelations = relations(
	neptunUserFile,
	({ one, many }) => ({
		chatConversationFiles: many(chatConversationFile),
		projectUserFiles: many(projectUserFile),
		neptunUser: one(neptunUser, {
			fields: [neptunUserFile.neptunUserId],
			references: [neptunUser.id],
		}),
		neptunUserTemplates: many(neptunUserTemplate),
	}),
);

export const githubAppInstallationRelations = relations(
	githubAppInstallation,
	({ one, many }) => ({
		neptunUser: one(neptunUser, {
			fields: [githubAppInstallation.neptunUserId],
			references: [neptunUser.id],
		}),
		projectGithubInstallations: many(projectGithubInstallation),
		githubAppInstallationRepositories: many(githubAppInstallationRepository),
	}),
);

export const neptunContextImportRelations = relations(
	neptunContextImport,
	({ one, many }) => ({
		neptunUser: one(neptunUser, {
			fields: [neptunContextImport.neptunUserId],
			references: [neptunUser.id],
		}),
		neptunUserProject: one(neptunUserProject, {
			fields: [neptunContextImport.projectId],
			references: [neptunUserProject.id],
		}),
		neptunContextFiles: many(neptunContextFile),
	}),
);

export const neptunUserProjectRelations = relations(
	neptunUserProject,
	({ one, many }) => ({
		neptunContextImports: many(neptunContextImport),
		projectGithubInstallations: many(projectGithubInstallation),
		neptunContextFiles: many(neptunContextFile),
		projectChatConversations: many(projectChatConversation),
		neptunUser: one(neptunUser, {
			fields: [neptunUserProject.neptunUserId],
			references: [neptunUser.id],
		}),
		projectTemplateCollections: many(projectTemplateCollection),
		projectUserFiles: many(projectUserFile),
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
		neptunUser: one(neptunUser, {
			fields: [neptunUserTemplateCollection.neptunUserId],
			references: [neptunUser.id],
		}),
		neptunUserTemplates: many(neptunUserTemplate),
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

export const githubAppInstallationRepositoryRelations = relations(
	githubAppInstallationRepository,
	({ one }) => ({
		githubAppInstallation: one(githubAppInstallation, {
			fields: [githubAppInstallationRepository.githubAppInstallationId],
			references: [githubAppInstallation.id],
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

export const neptunUserTemplateRelations = relations(
	neptunUserTemplate,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [neptunUserTemplate.neptunUserId],
			references: [neptunUser.id],
		}),
		neptunUserFile: one(neptunUserFile, {
			fields: [neptunUserTemplate.userFileId],
			references: [neptunUserFile.id],
		}),
		neptunUserTemplateCollection: one(neptunUserTemplateCollection, {
			fields: [neptunUserTemplate.templateCollectionId],
			references: [neptunUserTemplateCollection.id],
		}),
	}),
);

export const neptunUserWebauthnCredentialRelations = relations(
	neptunUserWebauthnCredential,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [neptunUserWebauthnCredential.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);
