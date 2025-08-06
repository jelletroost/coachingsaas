-- Drop tables in correct order (dependent tables first)
drop table if exists feature_flag_access;
drop table if exists feature_flag_roles;
drop table if exists feature_flags;
drop table if exists environments;