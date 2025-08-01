alter table feature_access
add column staging_allowed boolean not null default false,
add column production_allowed boolean not null default false;