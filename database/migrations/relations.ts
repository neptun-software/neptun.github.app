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
	neptunUserTemplate,
	neptunUserTemplateCollection,
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
		chatConversationShares: many(chatConversationShare),
	}),
);

export const neptunUserRelations = relations(neptunUser, ({ many }) => ({
	chatConversations: many(chatConversation),
	neptunUserOauthAccounts: many(neptunUserOauthAccount),
	chatConversationMessages: many(chatConversationMessage),
	chatConversationFiles: many(chatConversationFile),
	githubAppInstallations: many(githubAppInstallation),
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

export const neptunUserTemplateCollectionRelations = relations(
	neptunUserTemplateCollection,
	({ one, many }) => ({
		neptunUserTemplates: many(neptunUserTemplate),
		neptunUser: one(neptunUser, {
			fields: [neptunUserTemplateCollection.neptunUserId],
			references: [neptunUser.id],
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
