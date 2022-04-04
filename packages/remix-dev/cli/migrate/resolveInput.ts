import inquirer from "inquirer";

import { migrations } from "./migrations";

const resolveProjectDir = (input?: string): string => {
  return input || process.env.REMIX_ROOT || process.cwd();
};

const resolveMigrationId = async (input?: string): Promise<string> => {
  let { migrationId } = await inquirer.prompt<{ migrationId: string }>([
    {
      name: "migrationId",
      message: "Which migration would you like to apply?",
      type: "list",
      when: !input,
      pageSize: migrations.length,
      choices: migrations.map(({ id, description }) => ({
        name: `${id}: ${description}`,
        value: id,
      })),
    },
  ]);
  return input || migrationId;
};

export const resolveInput = async ({
  migrationId,
  projectDir,
}: {
  migrationId?: string;
  projectDir?: string;
}) => {
  return {
    projectDir: resolveProjectDir(projectDir),
    migrationId: await resolveMigrationId(migrationId),
  };
};