import { relations } from "drizzle-orm/relations";
import {
	chatUser,
	chatConversation,
	chatConversationFile,
	chatConversationMessage,
	chatUserOauthAccount,
	chatGithubAppInstallation,
	chatGithubAppInstallationRepository,
} from "./schema";

export const chatConversationRelations = relations(
	chatConversation,
	({ one, many }) => ({
		chatUser: one(chatUser, {
			fields: [chatConversation.chatUserId],
			references: [chatUser.id],
		}),
		chatConversationFiles: many(chatConversationFile),
		chatConversationMessages: many(chatConversationMessage),
	}),
);

export const chatUserRelations = relations(chatUser, ({ many }) => ({
	chatConversations: many(chatConversation),
	chatConversationFiles: many(chatConversationFile),
	chatConversationMessages: many(chatConversationMessage),
	chatUserOauthAccounts: many(chatUserOauthAccount),
	chatGithubAppInstallations: many(chatGithubAppInstallation),
}));

export const chatConversationFileRelations = relations(
	chatConversationFile,
	({ one }) => ({
		chatUser: one(chatUser, {
			fields: [chatConversationFile.chatUserId],
			references: [chatUser.id],
		}),
		chatConversation: one(chatConversation, {
			fields: [chatConversationFile.chatConversationId],
			references: [chatConversation.id],
		}),
		chatConversationMessage: one(chatConversationMessage, {
			fields: [chatConversationFile.chatConversationMessageId],
			references: [chatConversationMessage.id],
		}),
	}),
);

export const chatConversationMessageRelations = relations(
	chatConversationMessage,
	({ one, many }) => ({
		chatConversationFiles: many(chatConversationFile),
		chatUser: one(chatUser, {
			fields: [chatConversationMessage.chatUserId],
			references: [chatUser.id],
		}),
		chatConversation: one(chatConversation, {
			fields: [chatConversationMessage.chatConversationId],
			references: [chatConversation.id],
		}),
	}),
);

export const chatUserOauthAccountRelations = relations(
	chatUserOauthAccount,
	({ one }) => ({
		chatUser: one(chatUser, {
			fields: [chatUserOauthAccount.chatUserId],
			references: [chatUser.id],
		}),
	}),
);

export const chatGithubAppInstallationRelations = relations(
	chatGithubAppInstallation,
	({ one, many }) => ({
		chatUser: one(chatUser, {
			fields: [chatGithubAppInstallation.chatUserId],
			references: [chatUser.id],
		}),
		chatGithubAppInstallationRepositories: many(
			chatGithubAppInstallationRepository,
		),
	}),
);

export const chatGithubAppInstallationRepositoryRelations = relations(
	chatGithubAppInstallationRepository,
	({ one }) => ({
		chatGithubAppInstallation: one(chatGithubAppInstallation, {
			fields: [chatGithubAppInstallationRepository.chatGithubAppInstallationId],
			references: [chatGithubAppInstallation.id],
		}),
	}),
);
