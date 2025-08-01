create table feature_access (
    id uuid primary key default gen_random_uuid(),
    user_role_id uuid not null references user_roles(id),
    feature_name text not null,
    is_enabled boolean not null default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);