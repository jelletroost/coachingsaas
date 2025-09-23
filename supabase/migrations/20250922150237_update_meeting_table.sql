alter table meetings
drop column receiver_id;

alter table messages
add column meeting_id uuid references meetings(id);