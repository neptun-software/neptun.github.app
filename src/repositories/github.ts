import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import {
  githubAppInstallationRepository,
} from '../../database/migrations/schema.js';
import { db } from '../db.js';
import { IS_DEV } from '../env.js';
import { eq } from 'drizzle-orm';

const InsertGithubAppInstallationRepositorySchemaBase = createInsertSchema(
  githubAppInstallationRepository
);

export const InsertGithubAppInstallationRepositorySchema =
  InsertGithubAppInstallationRepositorySchemaBase.pick({
    githubRepositoryId: true,
    githubRepositoryName: true,
    githubRepositoryDescription: true,
    githubRepositorySize: true,
    githubRepositoryLanguage: true,
    githubRepositoryLicense: true,
    githubRepositoryUrl: true,
    githubRepositoryWebsiteUrl: true,
    githubRepositoryDefaultBranch: true,
    githubRepositoryIsPrivate: true,
    githubRepositoryIsFork: true,
    githubRepositoryIsTemplate: true,
    githubRepositoryIsArchived: true,
    githubAppInstallationId: true,
  });

type NewGithubAppInstallationRepository = z.infer<
  typeof InsertGithubAppInstallationRepositorySchema
>;

export const createGithubAppInstallationRepository = async (
  installationRepositoryToCreate: NewGithubAppInstallationRepository
) => {
  const createdGithubAppInstallationRepository = await db
    .insert(githubAppInstallationRepository)
    .values(installationRepositoryToCreate)
    .returning()
    .catch((err) => {
      if (IS_DEV)
        console.error(
          'Failed to create github app installation repository in database!',
          err
        );
      return null;
    });

  if (!createdGithubAppInstallationRepository) return null;

  return createdGithubAppInstallationRepository[0];
};

export const updateGithubAppInstallationRepository = async (
  id: number,
  fields: Partial<NewGithubAppInstallationRepository>
) => {
  const updatedGithubAppInstallationRepository = await db
    .update(githubAppInstallationRepository)
    .set(fields)
    .where(eq(githubAppInstallationRepository.id, id))
    .returning()
    .catch((err) => {
      if (IS_DEV)
        console.error(
          'Failed to update github app installation repository in database!',
          err
        );
      return null;
    });

  if (!updatedGithubAppInstallationRepository) return null;

  return updatedGithubAppInstallationRepository[0];
};

export const deleteGithubAppInstallationRepository = async (id: number) => {
  return await db
    .delete(githubAppInstallationRepository)
    .where(eq(githubAppInstallationRepository.id, id))
    .then(() => true)
    .catch((err) => {
      if (IS_DEV)
        console.error(
          'Failed to delete github app installation repository from database!',
          err
        );
      return false;
    });
};
