import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Split out of 20261102_154958_home_blocks: enum values added there must be committed before they
// can be used as a column default.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'statement';
  ALTER TABLE "_pages_v_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'statement';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'heading';
  ALTER TABLE "_pages_v_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'heading';`)
}
