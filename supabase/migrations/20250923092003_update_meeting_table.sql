-- Remove foreign key constraint from meetings.sender_id
alter table meetings
drop constraint meetings_sender_id_fkey;
