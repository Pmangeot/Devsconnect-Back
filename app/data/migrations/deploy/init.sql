-- Deploy devsconnect:init to pg

BEGIN;

DROP TABLE IF EXISTS "user", "project", "tag", "project_has_tag", "user_has_tag", "project_has_user";

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "lastname" VARCHAR(64) NOT NULL,
    "firstname" VARCHAR(64) NOT NULL, 
    "email" VARCHAR(64) NOT NULL UNIQUE,
    "pseudo" VARCHAR(64) NOT NULL UNIQUE,
    "password" VARCHAR(64) NOT NULL,
    "description" TEXT NOT NULL,
    "picture" VARCHAR(255) NOT NULL DEFAULT 'profil.webp',
    "availability" BOOLEAN DEFAULT FALSE,
    "refresh_token" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    CHECK ("email" ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE TABLE "project" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(64) NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "availability" BOOLEAN DEFAULT TRUE,
    "user_id" INT NOT NULL REFERENCES "user" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "tag" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(64) NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "project_has_tag" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project" ("id") ON DELETE CASCADE,
    "tag_id" INT NOT NULL REFERENCES "tag" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_tag" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "tag_id" INT NOT NULL REFERENCES "tag" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "project_has_user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "project_id" INT NOT NULL REFERENCES "project" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "is_active" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);
COMMIT;
