import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_benefits_items_icon" AS ENUM('none', 'creativeExcellence', 'professionalTeam', 'collaborativeApproach', 'onTimeDelivery');
  CREATE TYPE "public"."enum_home_page_hero_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_home_page_hero_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_home_page_statement_title_size" AS ENUM('statement', 'large', 'heading', 'display');
  CREATE TYPE "public"."enum_home_page_statement_align" AS ENUM('center', 'bottomLeft');
  CREATE TYPE "public"."enum_home_page_statement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_home_page_statement_link_appearance" AS ENUM('underline', 'pill');
  CREATE TYPE "public"."enum_home_page_statement_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_home_page_statement_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_home_page_marquee_layout" AS ENUM('stacked', 'crossed');
  CREATE TYPE "public"."enum_home_page_marquee_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_home_page_work_layout" AS ENUM('grid', 'staggered');
  CREATE TYPE "public"."enum_home_page_work_populate_by" AS ENUM('latest', 'category', 'selection');
  CREATE TYPE "public"."enum_home_page_work_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_home_page_work_link_appearance" AS ENUM('underline', 'pill');
  CREATE TYPE "public"."enum_home_page_work_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_home_page_work_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_home_page_benefits_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_home_page_benefits_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_home_page_reaching_title_size" AS ENUM('statement', 'large', 'heading', 'display');
  CREATE TYPE "public"."enum_home_page_reaching_align" AS ENUM('center', 'bottomLeft');
  CREATE TYPE "public"."enum_home_page_reaching_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_home_page_reaching_link_appearance" AS ENUM('underline', 'pill');
  CREATE TYPE "public"."enum_home_page_reaching_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_home_page_reaching_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_home_page_awards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_home_page_awards_link_appearance" AS ENUM('underline', 'pill');
  CREATE TYPE "public"."enum_home_page_awards_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_home_page_awards_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_work_page_title_size" AS ENUM('xxl', 'xl', 'l', 'm');
  CREATE TYPE "public"."enum_work_page_title_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_work_page_title_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_work_page_title_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_work_page_grid_layout" AS ENUM('grid', 'staggered');
  CREATE TYPE "public"."enum_work_page_grid_populate_by" AS ENUM('latest', 'category', 'selection');
  CREATE TYPE "public"."enum_work_page_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_work_page_grid_link_appearance" AS ENUM('underline', 'pill');
  CREATE TYPE "public"."enum_work_page_grid_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_work_page_grid_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_about_page_benefits_items_icon" AS ENUM('none', 'creativeExcellence', 'professionalTeam', 'collaborativeApproach', 'onTimeDelivery');
  CREATE TYPE "public"."enum_about_page_title_size" AS ENUM('xxl', 'xl', 'l', 'm');
  CREATE TYPE "public"."enum_about_page_title_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_about_page_title_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_about_page_title_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_about_page_video_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_about_page_video_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_about_page_video_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_about_page_lists_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_about_page_lists_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_about_page_benefits_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_about_page_benefits_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_about_page_reaching_title_size" AS ENUM('statement', 'large', 'heading', 'display');
  CREATE TYPE "public"."enum_about_page_reaching_align" AS ENUM('center', 'bottomLeft');
  CREATE TYPE "public"."enum_about_page_reaching_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_about_page_reaching_link_appearance" AS ENUM('underline', 'pill');
  CREATE TYPE "public"."enum_about_page_reaching_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_about_page_reaching_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_about_page_experience_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_about_page_experience_link_appearance" AS ENUM('underline', 'pill');
  CREATE TYPE "public"."enum_about_page_experience_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_about_page_experience_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_contact_page_title_size" AS ENUM('xxl', 'xl', 'l', 'm');
  CREATE TYPE "public"."enum_contact_page_title_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_contact_page_title_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_contact_page_title_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_contact_page_image_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_contact_page_image_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_contact_page_image_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_contact_page_info_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_contact_page_info_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TYPE "public"."enum_contact_page_form_theme" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_contact_page_form_animation_preset" AS ENUM('none', 'text-reveal', 'chars', 'fade', 'fade-up', 'image-reveal', 'stagger');
  CREATE TABLE "home_page_hero_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_marquee_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"reverse" boolean
  );
  
  CREATE TABLE "home_page_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_benefits_items_icon" DEFAULT 'none',
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_awards_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"first" varchar NOT NULL,
  	"second" varchar,
  	"third" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_image_id" integer,
  	"hero_image_speed" numeric DEFAULT 1.5,
  	"hero_caption" varchar,
  	"hero_show_socials" boolean,
  	"hero_theme" "enum_home_page_hero_theme" DEFAULT 'light',
  	"hero_animation_preset" "enum_home_page_hero_animation_preset" DEFAULT 'text-reveal',
  	"hero_animation_delay" numeric,
  	"hero_animation_duration" numeric,
  	"hero_animation_stagger" numeric,
  	"statement_caption" varchar,
  	"statement_title" varchar,
  	"statement_title_size" "enum_home_page_statement_title_size" DEFAULT 'statement',
  	"statement_text" varchar,
  	"statement_align" "enum_home_page_statement_align" DEFAULT 'center',
  	"statement_background_media_id" integer,
  	"statement_overlay_opacity" numeric DEFAULT 0.25,
  	"statement_enable_link" boolean,
  	"statement_link_type" "enum_home_page_statement_link_type" DEFAULT 'reference',
  	"statement_link_new_tab" boolean,
  	"statement_link_url" varchar,
  	"statement_link_label" varchar,
  	"statement_link_appearance" "enum_home_page_statement_link_appearance" DEFAULT 'underline',
  	"statement_theme" "enum_home_page_statement_theme" DEFAULT 'light',
  	"statement_animation_preset" "enum_home_page_statement_animation_preset" DEFAULT 'text-reveal',
  	"statement_animation_delay" numeric,
  	"statement_animation_duration" numeric,
  	"statement_animation_stagger" numeric,
  	"marquee_speed" numeric DEFAULT 5000,
  	"marquee_gap" numeric DEFAULT 50,
  	"marquee_layout" "enum_home_page_marquee_layout" DEFAULT 'stacked',
  	"marquee_background_image_id" integer,
  	"marquee_overlay_opacity" numeric DEFAULT 0.75,
  	"marquee_theme" "enum_home_page_marquee_theme" DEFAULT 'light',
  	"work_title" varchar,
  	"work_intro" varchar,
  	"work_layout" "enum_home_page_work_layout" DEFAULT 'grid',
  	"work_populate_by" "enum_home_page_work_populate_by" DEFAULT 'latest',
  	"work_limit" numeric DEFAULT 6,
  	"work_show_tabs" boolean,
  	"work_enable_link" boolean,
  	"work_link_type" "enum_home_page_work_link_type" DEFAULT 'reference',
  	"work_link_new_tab" boolean,
  	"work_link_url" varchar,
  	"work_link_label" varchar,
  	"work_link_appearance" "enum_home_page_work_link_appearance" DEFAULT 'underline',
  	"work_theme" "enum_home_page_work_theme" DEFAULT 'light',
  	"work_animation_preset" "enum_home_page_work_animation_preset" DEFAULT 'stagger',
  	"work_animation_delay" numeric,
  	"work_animation_duration" numeric,
  	"work_animation_stagger" numeric,
  	"benefits_label" varchar,
  	"benefits_pinned" boolean DEFAULT true,
  	"benefits_theme" "enum_home_page_benefits_theme" DEFAULT 'light',
  	"benefits_animation_preset" "enum_home_page_benefits_animation_preset" DEFAULT 'fade-up',
  	"benefits_animation_delay" numeric,
  	"benefits_animation_duration" numeric,
  	"benefits_animation_stagger" numeric,
  	"reaching_caption" varchar,
  	"reaching_title" varchar,
  	"reaching_title_size" "enum_home_page_reaching_title_size" DEFAULT 'statement',
  	"reaching_text" varchar,
  	"reaching_align" "enum_home_page_reaching_align" DEFAULT 'center',
  	"reaching_background_media_id" integer,
  	"reaching_overlay_opacity" numeric DEFAULT 0.25,
  	"reaching_enable_link" boolean,
  	"reaching_link_type" "enum_home_page_reaching_link_type" DEFAULT 'reference',
  	"reaching_link_new_tab" boolean,
  	"reaching_link_url" varchar,
  	"reaching_link_label" varchar,
  	"reaching_link_appearance" "enum_home_page_reaching_link_appearance" DEFAULT 'underline',
  	"reaching_theme" "enum_home_page_reaching_theme" DEFAULT 'light',
  	"reaching_animation_preset" "enum_home_page_reaching_animation_preset" DEFAULT 'text-reveal',
  	"reaching_animation_delay" numeric,
  	"reaching_animation_duration" numeric,
  	"reaching_animation_stagger" numeric,
  	"awards_title" varchar,
  	"awards_columns_first" varchar,
  	"awards_columns_second" varchar,
  	"awards_columns_third" varchar,
  	"awards_enable_link" boolean,
  	"awards_link_type" "enum_home_page_awards_link_type" DEFAULT 'reference',
  	"awards_link_new_tab" boolean,
  	"awards_link_url" varchar,
  	"awards_link_label" varchar,
  	"awards_link_appearance" "enum_home_page_awards_link_appearance" DEFAULT 'underline',
  	"awards_theme" "enum_home_page_awards_theme" DEFAULT 'light',
  	"awards_animation_preset" "enum_home_page_awards_animation_preset" DEFAULT 'text-reveal',
  	"awards_animation_delay" numeric,
  	"awards_animation_duration" numeric,
  	"awards_animation_stagger" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"projects_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "work_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title" varchar,
  	"title_size" "enum_work_page_title_size" DEFAULT 'xxl',
  	"title_align" "enum_work_page_title_align" DEFAULT 'center',
  	"title_theme" "enum_work_page_title_theme" DEFAULT 'light',
  	"title_animation_preset" "enum_work_page_title_animation_preset" DEFAULT 'text-reveal',
  	"title_animation_delay" numeric,
  	"title_animation_duration" numeric,
  	"title_animation_stagger" numeric,
  	"grid_title" varchar,
  	"grid_intro" varchar,
  	"grid_layout" "enum_work_page_grid_layout" DEFAULT 'grid',
  	"grid_populate_by" "enum_work_page_grid_populate_by" DEFAULT 'latest',
  	"grid_limit" numeric DEFAULT 6,
  	"grid_show_tabs" boolean,
  	"grid_enable_link" boolean,
  	"grid_link_type" "enum_work_page_grid_link_type" DEFAULT 'reference',
  	"grid_link_new_tab" boolean,
  	"grid_link_url" varchar,
  	"grid_link_label" varchar,
  	"grid_link_appearance" "enum_work_page_grid_link_appearance" DEFAULT 'underline',
  	"grid_theme" "enum_work_page_grid_theme" DEFAULT 'light',
  	"grid_animation_preset" "enum_work_page_grid_animation_preset" DEFAULT 'stagger',
  	"grid_animation_delay" numeric,
  	"grid_animation_duration" numeric,
  	"grid_animation_stagger" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "work_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"projects_id" integer,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "about_page_lists_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"entries" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_benefits_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_benefits_items_icon" DEFAULT 'none',
  	"title" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_experience_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"first" varchar NOT NULL,
  	"second" varchar,
  	"third" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title" varchar,
  	"title_size" "enum_about_page_title_size" DEFAULT 'xxl',
  	"title_align" "enum_about_page_title_align" DEFAULT 'center',
  	"title_theme" "enum_about_page_title_theme" DEFAULT 'light',
  	"title_animation_preset" "enum_about_page_title_animation_preset" DEFAULT 'text-reveal',
  	"title_animation_delay" numeric,
  	"title_animation_duration" numeric,
  	"title_animation_stagger" numeric,
  	"video_media_id" integer,
  	"video_width" "enum_about_page_video_width" DEFAULT 'container',
  	"video_speed" numeric,
  	"video_theme" "enum_about_page_video_theme" DEFAULT 'light',
  	"video_animation_preset" "enum_about_page_video_animation_preset" DEFAULT 'fade-up',
  	"video_animation_delay" numeric,
  	"video_animation_duration" numeric,
  	"video_animation_stagger" numeric,
  	"lists_text" varchar,
  	"lists_theme" "enum_about_page_lists_theme" DEFAULT 'light',
  	"lists_animation_preset" "enum_about_page_lists_animation_preset" DEFAULT 'text-reveal',
  	"lists_animation_delay" numeric,
  	"lists_animation_duration" numeric,
  	"lists_animation_stagger" numeric,
  	"benefits_label" varchar,
  	"benefits_pinned" boolean DEFAULT true,
  	"benefits_theme" "enum_about_page_benefits_theme" DEFAULT 'light',
  	"benefits_animation_preset" "enum_about_page_benefits_animation_preset" DEFAULT 'fade-up',
  	"benefits_animation_delay" numeric,
  	"benefits_animation_duration" numeric,
  	"benefits_animation_stagger" numeric,
  	"reaching_caption" varchar,
  	"reaching_title" varchar,
  	"reaching_title_size" "enum_about_page_reaching_title_size" DEFAULT 'statement',
  	"reaching_text" varchar,
  	"reaching_align" "enum_about_page_reaching_align" DEFAULT 'center',
  	"reaching_background_media_id" integer,
  	"reaching_overlay_opacity" numeric DEFAULT 0.25,
  	"reaching_enable_link" boolean,
  	"reaching_link_type" "enum_about_page_reaching_link_type" DEFAULT 'reference',
  	"reaching_link_new_tab" boolean,
  	"reaching_link_url" varchar,
  	"reaching_link_label" varchar,
  	"reaching_link_appearance" "enum_about_page_reaching_link_appearance" DEFAULT 'underline',
  	"reaching_theme" "enum_about_page_reaching_theme" DEFAULT 'light',
  	"reaching_animation_preset" "enum_about_page_reaching_animation_preset" DEFAULT 'text-reveal',
  	"reaching_animation_delay" numeric,
  	"reaching_animation_duration" numeric,
  	"reaching_animation_stagger" numeric,
  	"experience_title" varchar,
  	"experience_columns_first" varchar,
  	"experience_columns_second" varchar,
  	"experience_columns_third" varchar,
  	"experience_enable_link" boolean,
  	"experience_link_type" "enum_about_page_experience_link_type" DEFAULT 'reference',
  	"experience_link_new_tab" boolean,
  	"experience_link_url" varchar,
  	"experience_link_label" varchar,
  	"experience_link_appearance" "enum_about_page_experience_link_appearance" DEFAULT 'underline',
  	"experience_theme" "enum_about_page_experience_theme" DEFAULT 'light',
  	"experience_animation_preset" "enum_about_page_experience_animation_preset" DEFAULT 'text-reveal',
  	"experience_animation_delay" numeric,
  	"experience_animation_duration" numeric,
  	"experience_animation_stagger" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title" varchar,
  	"title_size" "enum_contact_page_title_size" DEFAULT 'xxl',
  	"title_align" "enum_contact_page_title_align" DEFAULT 'center',
  	"title_theme" "enum_contact_page_title_theme" DEFAULT 'light',
  	"title_animation_preset" "enum_contact_page_title_animation_preset" DEFAULT 'text-reveal',
  	"title_animation_delay" numeric,
  	"title_animation_duration" numeric,
  	"title_animation_stagger" numeric,
  	"image_media_id" integer,
  	"image_width" "enum_contact_page_image_width" DEFAULT 'container',
  	"image_speed" numeric,
  	"image_theme" "enum_contact_page_image_theme" DEFAULT 'light',
  	"image_animation_preset" "enum_contact_page_image_animation_preset" DEFAULT 'fade-up',
  	"image_animation_delay" numeric,
  	"image_animation_duration" numeric,
  	"image_animation_stagger" numeric,
  	"info_text" varchar,
  	"info_show_email" boolean DEFAULT true,
  	"info_show_phone" boolean DEFAULT true,
  	"info_show_socials" boolean DEFAULT true,
  	"info_theme" "enum_contact_page_info_theme" DEFAULT 'light',
  	"info_animation_preset" "enum_contact_page_info_animation_preset" DEFAULT 'chars',
  	"info_animation_delay" numeric,
  	"info_animation_duration" numeric,
  	"info_animation_stagger" numeric,
  	"form_title" varchar,
  	"form_form_id" integer,
  	"form_enable_intro" boolean,
  	"form_intro_content" jsonb,
  	"form_theme" "enum_contact_page_form_theme" DEFAULT 'light',
  	"form_animation_preset" "enum_contact_page_form_animation_preset" DEFAULT 'fade-up',
  	"form_animation_delay" numeric,
  	"form_animation_duration" numeric,
  	"form_animation_stagger" numeric,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home_page_hero_roles" ADD CONSTRAINT "home_page_hero_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_marquee_rows" ADD CONSTRAINT "home_page_marquee_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_benefits_items" ADD CONSTRAINT "home_page_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_awards_rows" ADD CONSTRAINT "home_page_awards_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_statement_background_media_id_media_id_fk" FOREIGN KEY ("statement_background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_marquee_background_image_id_media_id_fk" FOREIGN KEY ("marquee_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_reaching_background_media_id_media_id_fk" FOREIGN KEY ("reaching_background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_page_rels" ADD CONSTRAINT "work_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."work_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_page_rels" ADD CONSTRAINT "work_page_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_page_rels" ADD CONSTRAINT "work_page_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_page_rels" ADD CONSTRAINT "work_page_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_page_rels" ADD CONSTRAINT "work_page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_lists_lists" ADD CONSTRAINT "about_page_lists_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_benefits_items" ADD CONSTRAINT "about_page_benefits_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_experience_rows" ADD CONSTRAINT "about_page_experience_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_video_media_id_media_id_fk" FOREIGN KEY ("video_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_reaching_background_media_id_media_id_fk" FOREIGN KEY ("reaching_background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_form_form_id_forms_id_fk" FOREIGN KEY ("form_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_hero_roles_order_idx" ON "home_page_hero_roles" USING btree ("_order");
  CREATE INDEX "home_page_hero_roles_parent_id_idx" ON "home_page_hero_roles" USING btree ("_parent_id");
  CREATE INDEX "home_page_marquee_rows_order_idx" ON "home_page_marquee_rows" USING btree ("_order");
  CREATE INDEX "home_page_marquee_rows_parent_id_idx" ON "home_page_marquee_rows" USING btree ("_parent_id");
  CREATE INDEX "home_page_benefits_items_order_idx" ON "home_page_benefits_items" USING btree ("_order");
  CREATE INDEX "home_page_benefits_items_parent_id_idx" ON "home_page_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_awards_rows_order_idx" ON "home_page_awards_rows" USING btree ("_order");
  CREATE INDEX "home_page_awards_rows_parent_id_idx" ON "home_page_awards_rows" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_statement_statement_background_media_idx" ON "home_page" USING btree ("statement_background_media_id");
  CREATE INDEX "home_page_marquee_marquee_background_image_idx" ON "home_page" USING btree ("marquee_background_image_id");
  CREATE INDEX "home_page_reaching_reaching_background_media_idx" ON "home_page" USING btree ("reaching_background_media_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_pages_id_idx" ON "home_page_rels" USING btree ("pages_id");
  CREATE INDEX "home_page_rels_posts_id_idx" ON "home_page_rels" USING btree ("posts_id");
  CREATE INDEX "home_page_rels_projects_id_idx" ON "home_page_rels" USING btree ("projects_id");
  CREATE INDEX "home_page_rels_categories_id_idx" ON "home_page_rels" USING btree ("categories_id");
  CREATE INDEX "work_page_rels_order_idx" ON "work_page_rels" USING btree ("order");
  CREATE INDEX "work_page_rels_parent_idx" ON "work_page_rels" USING btree ("parent_id");
  CREATE INDEX "work_page_rels_path_idx" ON "work_page_rels" USING btree ("path");
  CREATE INDEX "work_page_rels_categories_id_idx" ON "work_page_rels" USING btree ("categories_id");
  CREATE INDEX "work_page_rels_projects_id_idx" ON "work_page_rels" USING btree ("projects_id");
  CREATE INDEX "work_page_rels_pages_id_idx" ON "work_page_rels" USING btree ("pages_id");
  CREATE INDEX "work_page_rels_posts_id_idx" ON "work_page_rels" USING btree ("posts_id");
  CREATE INDEX "about_page_lists_lists_order_idx" ON "about_page_lists_lists" USING btree ("_order");
  CREATE INDEX "about_page_lists_lists_parent_id_idx" ON "about_page_lists_lists" USING btree ("_parent_id");
  CREATE INDEX "about_page_benefits_items_order_idx" ON "about_page_benefits_items" USING btree ("_order");
  CREATE INDEX "about_page_benefits_items_parent_id_idx" ON "about_page_benefits_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_experience_rows_order_idx" ON "about_page_experience_rows" USING btree ("_order");
  CREATE INDEX "about_page_experience_rows_parent_id_idx" ON "about_page_experience_rows" USING btree ("_parent_id");
  CREATE INDEX "about_page_video_video_media_idx" ON "about_page" USING btree ("video_media_id");
  CREATE INDEX "about_page_reaching_reaching_background_media_idx" ON "about_page" USING btree ("reaching_background_media_id");
  CREATE INDEX "about_page_rels_order_idx" ON "about_page_rels" USING btree ("order");
  CREATE INDEX "about_page_rels_parent_idx" ON "about_page_rels" USING btree ("parent_id");
  CREATE INDEX "about_page_rels_path_idx" ON "about_page_rels" USING btree ("path");
  CREATE INDEX "about_page_rels_pages_id_idx" ON "about_page_rels" USING btree ("pages_id");
  CREATE INDEX "about_page_rels_posts_id_idx" ON "about_page_rels" USING btree ("posts_id");
  CREATE INDEX "about_page_rels_projects_id_idx" ON "about_page_rels" USING btree ("projects_id");
  CREATE INDEX "contact_page_image_image_media_idx" ON "contact_page" USING btree ("image_media_id");
  CREATE INDEX "contact_page_form_form_form_idx" ON "contact_page" USING btree ("form_form_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_hero_roles" CASCADE;
  DROP TABLE "home_page_marquee_rows" CASCADE;
  DROP TABLE "home_page_benefits_items" CASCADE;
  DROP TABLE "home_page_awards_rows" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "work_page" CASCADE;
  DROP TABLE "work_page_rels" CASCADE;
  DROP TABLE "about_page_lists_lists" CASCADE;
  DROP TABLE "about_page_benefits_items" CASCADE;
  DROP TABLE "about_page_experience_rows" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_rels" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TYPE "public"."enum_home_page_benefits_items_icon";
  DROP TYPE "public"."enum_home_page_hero_theme";
  DROP TYPE "public"."enum_home_page_hero_animation_preset";
  DROP TYPE "public"."enum_home_page_statement_title_size";
  DROP TYPE "public"."enum_home_page_statement_align";
  DROP TYPE "public"."enum_home_page_statement_link_type";
  DROP TYPE "public"."enum_home_page_statement_link_appearance";
  DROP TYPE "public"."enum_home_page_statement_theme";
  DROP TYPE "public"."enum_home_page_statement_animation_preset";
  DROP TYPE "public"."enum_home_page_marquee_layout";
  DROP TYPE "public"."enum_home_page_marquee_theme";
  DROP TYPE "public"."enum_home_page_work_layout";
  DROP TYPE "public"."enum_home_page_work_populate_by";
  DROP TYPE "public"."enum_home_page_work_link_type";
  DROP TYPE "public"."enum_home_page_work_link_appearance";
  DROP TYPE "public"."enum_home_page_work_theme";
  DROP TYPE "public"."enum_home_page_work_animation_preset";
  DROP TYPE "public"."enum_home_page_benefits_theme";
  DROP TYPE "public"."enum_home_page_benefits_animation_preset";
  DROP TYPE "public"."enum_home_page_reaching_title_size";
  DROP TYPE "public"."enum_home_page_reaching_align";
  DROP TYPE "public"."enum_home_page_reaching_link_type";
  DROP TYPE "public"."enum_home_page_reaching_link_appearance";
  DROP TYPE "public"."enum_home_page_reaching_theme";
  DROP TYPE "public"."enum_home_page_reaching_animation_preset";
  DROP TYPE "public"."enum_home_page_awards_link_type";
  DROP TYPE "public"."enum_home_page_awards_link_appearance";
  DROP TYPE "public"."enum_home_page_awards_theme";
  DROP TYPE "public"."enum_home_page_awards_animation_preset";
  DROP TYPE "public"."enum_work_page_title_size";
  DROP TYPE "public"."enum_work_page_title_align";
  DROP TYPE "public"."enum_work_page_title_theme";
  DROP TYPE "public"."enum_work_page_title_animation_preset";
  DROP TYPE "public"."enum_work_page_grid_layout";
  DROP TYPE "public"."enum_work_page_grid_populate_by";
  DROP TYPE "public"."enum_work_page_grid_link_type";
  DROP TYPE "public"."enum_work_page_grid_link_appearance";
  DROP TYPE "public"."enum_work_page_grid_theme";
  DROP TYPE "public"."enum_work_page_grid_animation_preset";
  DROP TYPE "public"."enum_about_page_benefits_items_icon";
  DROP TYPE "public"."enum_about_page_title_size";
  DROP TYPE "public"."enum_about_page_title_align";
  DROP TYPE "public"."enum_about_page_title_theme";
  DROP TYPE "public"."enum_about_page_title_animation_preset";
  DROP TYPE "public"."enum_about_page_video_width";
  DROP TYPE "public"."enum_about_page_video_theme";
  DROP TYPE "public"."enum_about_page_video_animation_preset";
  DROP TYPE "public"."enum_about_page_lists_theme";
  DROP TYPE "public"."enum_about_page_lists_animation_preset";
  DROP TYPE "public"."enum_about_page_benefits_theme";
  DROP TYPE "public"."enum_about_page_benefits_animation_preset";
  DROP TYPE "public"."enum_about_page_reaching_title_size";
  DROP TYPE "public"."enum_about_page_reaching_align";
  DROP TYPE "public"."enum_about_page_reaching_link_type";
  DROP TYPE "public"."enum_about_page_reaching_link_appearance";
  DROP TYPE "public"."enum_about_page_reaching_theme";
  DROP TYPE "public"."enum_about_page_reaching_animation_preset";
  DROP TYPE "public"."enum_about_page_experience_link_type";
  DROP TYPE "public"."enum_about_page_experience_link_appearance";
  DROP TYPE "public"."enum_about_page_experience_theme";
  DROP TYPE "public"."enum_about_page_experience_animation_preset";
  DROP TYPE "public"."enum_contact_page_title_size";
  DROP TYPE "public"."enum_contact_page_title_align";
  DROP TYPE "public"."enum_contact_page_title_theme";
  DROP TYPE "public"."enum_contact_page_title_animation_preset";
  DROP TYPE "public"."enum_contact_page_image_width";
  DROP TYPE "public"."enum_contact_page_image_theme";
  DROP TYPE "public"."enum_contact_page_image_animation_preset";
  DROP TYPE "public"."enum_contact_page_info_theme";
  DROP TYPE "public"."enum_contact_page_info_animation_preset";
  DROP TYPE "public"."enum_contact_page_form_theme";
  DROP TYPE "public"."enum_contact_page_form_animation_preset";`)
}
