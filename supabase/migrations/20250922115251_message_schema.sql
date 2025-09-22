create table message_room(
   id uuid primary key default gen_random_uuid(),
   name varchar(255) not null,
   is_group boolean not null default false,
   created_at timestamp with time zone default now(),
   updated_at timestamp with time zone default now()
);

create table messages(
   id uuid primary key default gen_random_uuid(),
   room_id uuid references message_room(id),
   sender_id uuid references users(id),
   content text not null,
   attachment_url text,
   created_at timestamp with time zone default now(),
   updated_at timestamp with time zone default now()
);

create table room_members(
   id uuid primary key default gen_random_uuid(),
   room_id uuid references message_room(id),
   user_id uuid references users(id),
   role varchar(255) not null default 'member',
   last_read_message_id uuid references messages(id),
   created_at timestamp with time zone default now(),
   updated_at timestamp with time zone default now()
);

create table meetings(
   id uuid primary key default gen_random_uuid(),
   room_id uuid references message_room(id),
   sender_id uuid references users(id),
   receiver_id uuid references users(id),
   type varchar(255) not null default 'phone',
   date date not null,
   meeting_link text,
   time time not null,
   duration integer not null,
   notes text,
   status varchar(255) not null default 'pending',
   created_at timestamp with time zone default now(),
   updated_at timestamp with time zone default now()
)