create table feature_flags(
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table feature_flag_roles(
    id uuid primary key default gen_random_uuid(),
    feature_flag_id uuid not null references feature_flags(id),
    role_id text check (role_id in ('admin', 'coach', 'patient')) default 'patient',
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);