alter table messages
drop column sender_id;

alter table messages
add column sender_id uuid;
