-- Verify devsconnect:init on pg

BEGIN;

SELECT * FROM "user", "project", "tag", "project_has_tag", "user_has_tag", "project_has_user" WHERE false;

ROLLBACK;
