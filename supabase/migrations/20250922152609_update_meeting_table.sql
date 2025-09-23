-- First, add the room_id column to message_room
alter table message_room
add column room_id varchar(255) not null;

-- Add unique constraint to room_id so it can be referenced
alter table message_room
add constraint message_room_room_id_unique unique (room_id);

-- Update meetings table to reference room_id instead of id
alter table meetings
drop column room_id,
add column room_id varchar(255) references message_room(room_id);

-- Update messages table to reference room_id instead of id  
alter table messages
drop column room_id,
add column room_id varchar(255) references message_room(room_id);