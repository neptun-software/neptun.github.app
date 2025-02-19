import { relations } from "drizzle-orm/relations";
import {
	neptunUser,
	neptunUserOauthAccount,
	chatConversationMessage,
	chatConversationFile,
	chatConversation,
	githubAppInstallation,
	neptunContextFile,
	neptunContextImport,
	neptunUserProject,
	projectChatConversation,
	projectUserFile,
	neptunUserFile,
	neptunUserTemplate,
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
	chatConversationMessages: many(chatConversationMessage),
	chatConversationFiles: many(chatConversationFile),
	chatConversations: many(chatConversation),
	githubAppInstallations: many(githubAppInstallation),
	neptunContextFiles: many(neptunContextFile),
	neptunContextImports: many(neptunContextImport),
	neptunUserProjects: many(neptunUserProject),
	neptunUserTemplates: many(neptunUserTemplate),
	neptunUserFiles: many(neptunUserFile),
}));

export const chatConversationMessageRelations = relations(
	chatConversationMessage,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [chatConversationMessage.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);

export const chatConversationFileRelations = relations(
	chatConversationFile,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [chatConversationFile.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);

export const chatConversationRelations = relations(
	chatConversation,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [chatConversation.neptunUserId],
			references: [neptunUser.id],
		}),
	}),
);

export const githubAppInstallationRelations = relations(
	githubAppInstallation,
	({ one }) => ({
		neptunUser: one(neptunUser, {
			fields: [githubAppInstallation.neptunUserId],
			references: [neptunUser.id],
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

export const neptunUserFileRelations = relations(
	neptunUserFile,
	({ one, many }) => ({
		projectUserFiles: many(projectUserFile),
		neptunUserTemplates: many(neptunUserTemplate),
		neptunUser: one(neptunUser, {
			fields: [neptunUserFile.neptunUserId],
			references: [neptunUser.id],
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
	}),
);
