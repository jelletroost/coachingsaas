create table user_roles(
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    description text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table environments(
    id uuid primary key default gen_random_uuid(),
    name text unique not null
);

create table feature_flag_access(
    id uuid primary key default gen_random_uuid(),
    feature_flag_id uuid not null references feature_flags(id) on delete cascade,
    user_role_id uuid not null references user_roles(id) on delete cascade,
    environment_id uuid not null references environments(id) on delete cascade,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);