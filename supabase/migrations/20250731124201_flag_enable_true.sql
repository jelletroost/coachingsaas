alter table feature_flags
drop column enabled;

alter table feature_flag_access
add column enabled boolean not null default true;