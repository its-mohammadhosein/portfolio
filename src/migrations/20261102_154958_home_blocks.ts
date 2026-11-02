import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// The new enum values can't be used as defaults in the same transaction (Postgres: "unsafe use of
// new value"), so the title_size defaults are set in 20261102_154959_statement_title_default.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_statement_align" AS ENUM('center', 'bottomLeft');
  CREATE TYPE "public"."enum_pages_blocks_marquee_layout" AS ENUM('stacked', 'crossed');
  CREATE TYPE "public"."enum_pages_blocks_portfolio_grid_layout" AS ENUM('grid', 'staggered');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_align" AS ENUM('center', 'bottomLeft');
  CREATE TYPE "public"."enum__pages_v_blocks_marquee_layout" AS ENUM('stacked', 'crossed');
  CREATE TYPE "public"."enum__pages_v_blocks_portfolio_grid_layout" AS ENUM('grid', 'staggered');
  ALTER TYPE "public"."enum_pages_blocks_statement_title_size" ADD VALUE 'statement' BEFORE 'heading';
  ALTER TYPE "public"."enum_pages_blocks_statement_title_size" ADD VALUE 'large' BEFORE 'heading';
  ALTER TYPE "public"."enum__pages_v_blocks_statement_title_size" ADD VALUE 'statement' BEFORE 'heading';
  ALTER TYPE "public"."enum__pages_v_blocks_statement_title_size" ADD VALUE 'large' BEFORE 'heading';
  ALTER TABLE "pages_blocks_data_table" ALTER COLUMN "theme" SET DEFAULT 'light';
  ALTER TABLE "_pages_v_blocks_data_table" ALTER COLUMN "theme" SET DEFAULT 'light';
  ALTER TABLE "pages_blocks_statement" ADD COLUMN "align" "enum_pages_blocks_statement_align" DEFAULT 'center';
  ALTER TABLE "pages_blocks_statement" ADD COLUMN "background_media_id" integer;
  ALTER TABLE "pages_blocks_statement" ADD COLUMN "overlay_opacity" numeric DEFAULT 0.25;
  ALTER TABLE "pages_blocks_marquee" ADD COLUMN "layout" "enum_pages_blocks_marquee_layout" DEFAULT 'stacked';
  ALTER TABLE "pages_blocks_marquee" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_marquee" ADD COLUMN "overlay_opacity" numeric DEFAULT 0.75;
  ALTER TABLE "pages_blocks_portfolio_grid" ADD COLUMN "layout" "enum_pages_blocks_portfolio_grid_layout" DEFAULT 'grid';
  ALTER TABLE "_pages_v_blocks_statement" ADD COLUMN "align" "enum__pages_v_blocks_statement_align" DEFAULT 'center';
  ALTER TABLE "_pages_v_blocks_statement" ADD COLUMN "background_media_id" integer;
  ALTER TABLE "_pages_v_blocks_statement" ADD COLUMN "overlay_opacity" numeric DEFAULT 0.25;
  ALTER TABLE "_pages_v_blocks_marquee" ADD COLUMN "layout" "enum__pages_v_blocks_marquee_layout" DEFAULT 'stacked';
  ALTER TABLE "_pages_v_blocks_marquee" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_marquee" ADD COLUMN "overlay_opacity" numeric DEFAULT 0.75;
  ALTER TABLE "_pages_v_blocks_portfolio_grid" ADD COLUMN "layout" "enum__pages_v_blocks_portfolio_grid_layout" DEFAULT 'grid';
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_background_media_id_media_id_fk" FOREIGN KEY ("background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_statement_background_media_idx" ON "pages_blocks_statement" USING btree ("background_media_id");
  CREATE INDEX "pages_blocks_marquee_background_image_idx" ON "pages_blocks_marquee" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_statement_background_media_idx" ON "_pages_v_blocks_statement" USING btree ("background_media_id");
  CREATE INDEX "_pages_v_blocks_marquee_background_image_idx" ON "_pages_v_blocks_marquee" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_statement" DROP CONSTRAINT "pages_blocks_statement_background_media_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_marquee" DROP CONSTRAINT "pages_blocks_marquee_background_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_statement" DROP CONSTRAINT "_pages_v_blocks_statement_background_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_marquee" DROP CONSTRAINT "_pages_v_blocks_marquee_background_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "title_size" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'heading'::text;
  DROP TYPE "public"."enum_pages_blocks_statement_title_size";
  CREATE TYPE "public"."enum_pages_blocks_statement_title_size" AS ENUM('heading', 'display');
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'heading'::"public"."enum_pages_blocks_statement_title_size";
  ALTER TABLE "pages_blocks_statement" ALTER COLUMN "title_size" SET DATA TYPE "public"."enum_pages_blocks_statement_title_size" USING "title_size"::"public"."enum_pages_blocks_statement_title_size";
  ALTER TABLE "_pages_v_blocks_statement" ALTER COLUMN "title_size" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'heading'::text;
  DROP TYPE "public"."enum__pages_v_blocks_statement_title_size";
  CREATE TYPE "public"."enum__pages_v_blocks_statement_title_size" AS ENUM('heading', 'display');
  ALTER TABLE "_pages_v_blocks_statement" ALTER COLUMN "title_size" SET DEFAULT 'heading'::"public"."enum__pages_v_blocks_statement_title_size";
  ALTER TABLE "_pages_v_blocks_statement" ALTER COLUMN "title_size" SET DATA TYPE "public"."enum__pages_v_blocks_statement_title_size" USING "title_size"::"public"."enum__pages_v_blocks_statement_title_size";
  DROP INDEX "pages_blocks_statement_background_media_idx";
  DROP INDEX "pages_blocks_marquee_background_image_idx";
  DROP INDEX "_pages_v_blocks_statement_background_media_idx";
  DROP INDEX "_pages_v_blocks_marquee_background_image_idx";
  ALTER TABLE "pages_blocks_data_table" ALTER COLUMN "theme" SET DEFAULT 'dark';
  ALTER TABLE "_pages_v_blocks_data_table" ALTER COLUMN "theme" SET DEFAULT 'dark';
  ALTER TABLE "pages_blocks_statement" DROP COLUMN "align";
  ALTER TABLE "pages_blocks_statement" DROP COLUMN "background_media_id";
  ALTER TABLE "pages_blocks_statement" DROP COLUMN "overlay_opacity";
  ALTER TABLE "pages_blocks_marquee" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_marquee" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_marquee" DROP COLUMN "overlay_opacity";
  ALTER TABLE "pages_blocks_portfolio_grid" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_statement" DROP COLUMN "align";
  ALTER TABLE "_pages_v_blocks_statement" DROP COLUMN "background_media_id";
  ALTER TABLE "_pages_v_blocks_statement" DROP COLUMN "overlay_opacity";
  ALTER TABLE "_pages_v_blocks_marquee" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_marquee" DROP COLUMN "background_image_id";
  ALTER TABLE "_pages_v_blocks_marquee" DROP COLUMN "overlay_opacity";
  ALTER TABLE "_pages_v_blocks_portfolio_grid" DROP COLUMN "layout";
  DROP TYPE "public"."enum_pages_blocks_statement_align";
  DROP TYPE "public"."enum_pages_blocks_marquee_layout";
  DROP TYPE "public"."enum_pages_blocks_portfolio_grid_layout";
  DROP TYPE "public"."enum__pages_v_blocks_statement_align";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_layout";
  DROP TYPE "public"."enum__pages_v_blocks_portfolio_grid_layout";`)
}
