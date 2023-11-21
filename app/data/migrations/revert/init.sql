-- Revert devsconnect:init from pg

BEGIN;

DROP TABLE IF EXISTS "project_has_user", "user_has_tag", "project_has_tag","tag", "project", "user";

COMMIT;
