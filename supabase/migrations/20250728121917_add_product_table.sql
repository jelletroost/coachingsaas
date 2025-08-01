create table products (
   id uuid primary key default gen_random_uuid(),
   name text not null,
   type text check(type in ('medicine','supplement','service')),
   price numeric not null,
   currency text default 'USD',
   stock_quantity integer not null default 0,
   status text check (status in ('active','inactive')),
   prescription_required boolean default false,
   created_at timestamp with time zone default now(),
   updated_at timestamp with time zone default now()
);