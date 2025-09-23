alter table room_members
drop column room_id;

alter table room_members
add column room_id varchar(255) references message_room(room_id);