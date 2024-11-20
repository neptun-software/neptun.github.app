import {
	pgTable,
	pgEnum,
	serial,
	text,
	timestamp,
	integer,
	unique,
	boolean,
	uuid,
} from "drizzle-orm/pg-core";

export const aiModelEnum = pgEnum("ai_model_enum", [
	"OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
	"mistralai/Mistral-7B-Instruct-v0.1",
	"meta-llama/Meta-Llama-3-8B-Instruct",
]);
export const chatConversationMessageActorEnum = pgEnum(
	"chat_conversation_message_actor_enum",
	["user", "assistant"],
);
export const oauthProviderEnum = pgEnum("oauth_provider_enum", [
	"github",
	"google",
]);

export const chatConversation = pgTable("chat_conversation", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	model: aiModelEnum("model").notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	neptunUserId: integer("neptun_user_id")
		.notNull()
		.references(() => neptunUser.id, { onDelete: "cascade" }),
});

export const chatConversationFile = pgTable("chat_conversation_file", {
	id: serial("id").primaryKey().notNull(),
	title: text("title"),
	language: text("language").default("text").notNull(),
	fileExtension: text("file_extension").default("txt").notNull(),
	text: text("text").notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	neptunUserId: integer("neptun_user_id")
		.notNull()
		.references(() => neptunUser.id, { onDelete: "cascade" }),
	chatConversationId: integer("chat_conversation_id")
		.notNull()
		.references(() => chatConversation.id, { onDelete: "cascade" }),
	chatConversationMessageId: integer("chat_conversation_message_id")
		.notNull()
		.references(() => chatConversationMessage.id, { onDelete: "cascade" }),
});

export const chatConversationMessage = pgTable("chat_conversation_message", {
	id: serial("id").primaryKey().notNull(),
	message: text("message").notNull(),
	actor: chatConversationMessageActorEnum("actor").default("user").notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	neptunUserId: integer("neptun_user_id")
		.notNull()
		.references(() => neptunUser.id, { onDelete: "cascade" }),
	chatConversationId: integer("chat_conversation_id")
		.notNull()
		.references(() => chatConversation.id, { onDelete: "cascade" }),
});

export const neptunUser = pgTable(
	"neptun_user",
	{
		id: serial("id").primaryKey().notNull(),
		primaryEmail: text("primary_email").notNull(),
		hashedPassword: text("hashed_password"),
		createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	},
	(table) => {
		return {
			neptunUserPrimaryEmailUnique: unique(
				"neptun_user_primary_email_unique",
			).on(table.primaryEmail),
		};
	},
);

export const neptunUserOauthAccount = pgTable("neptun_user_oauth_account", {
	id: serial("id").primaryKey().notNull(),
	provider: oauthProviderEnum("provider").notNull(),
	oauthUserId: text("oauth_user_id").notNull(),
	oauthEmail: text("oauth_email").notNull(),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	neptunUserId: integer("neptun_user_id")
		.notNull()
		.references(() => neptunUser.id, { onDelete: "cascade" }),
});

export const githubAppInstallation = pgTable("github_app_installation", {
	id: serial("id").primaryKey().notNull(),
	githubAccountType: text("github_account_type").notNull(),
	githubAccountAvatarUrl: text("github_account_avatar_url").notNull(),
	githubAccountId: integer("github_account_id").notNull(),
	githubAccountName: text("github_account_name"),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
	neptunUserId: integer("neptun_user_id")
		.notNull()
		.references(() => neptunUser.id, { onDelete: "cascade" }),
});

export const githubAppInstallationRepository = pgTable(
	"github_app_installation_repository",
	{
		id: serial("id").primaryKey().notNull(),
		githubRepositoryId: integer("github_repository_id").notNull(),
		githubRepositoryName: text("github_repository_name").notNull(),
		githubRepositoryDescription: text("github_repository_description"),
		githubRepositorySize: integer("github_repository_size"),
		githubRepositoryLanguage: text("github_repository_language"),
		githubRepositoryLicense: text("github_repository_license"),
		githubRepositoryUrl: text("github_repository_url").notNull(),
		githubRepositoryWebsiteUrl: text("github_repository_website_url"),
		githubRepositoryDefaultBranch: text("github_repository_default_branch"),
		githubRepositoryIsPrivate: boolean(
			"github_repository_is_private",
		).notNull(),
		githubRepositoryIsFork: boolean("github_repository_is_fork"),
		githubRepositoryIsTemplate: boolean("github_repository_is_template"),
		githubRepositoryIsArchived: boolean(
			"github_repository_is_archived",
		).notNull(),
		createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
		githubAppInstallationId: integer("github_app_installation_id")
			.notNull()
			.references(() => githubAppInstallation.id, { onDelete: "cascade" }),
	},
);

export const chatConversationShare = pgTable(
	"chat_conversation_share",
	{
		id: serial("id").primaryKey().notNull(),
		isShared: boolean("is_shared").default(true).notNull(),
		shareId: uuid("share_id").defaultRandom().notNull(),
		isProtected: boolean("is_protected").default(false).notNull(),
		hashedPassword: text("hashed_password"),
		createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
		chatConversationId: integer("chat_conversation_id")
			.notNull()
			.references(() => chatConversation.id, { onDelete: "cascade" }),
	},
	(table) => {
		return {
			chatConversationShareShareIdUnique: unique(
				"chat_conversation_share_share_id_unique",
			).on(table.shareId),
			chatConversationShareChatConversationIdUnique: unique(
				"chat_conversation_share_chat_conversation_id_unique",
			).on(table.chatConversationId),
		};
	},
);

export const chatConversationShareWhitelistEntry = pgTable(
	"chat_conversation_share_whitelist_entry",
	{
		id: serial("id").primaryKey().notNull(),
		createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
		updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
		whitelistedNeptunUserId: integer("whitelisted_neptun_user_id")
			.notNull()
			.references(() => neptunUser.id, { onDelete: "cascade" }),
		chatConversationShareId: integer("chat_conversation_share_id")
			.notNull()
			.references(() => chatConversationShare.id, { onDelete: "cascade" }),
	},
);
