-- Manual script to enable Supabase Realtime
-- Run this in your Supabase SQL Editor

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- Enable realtime for meetings table  
ALTER PUBLICATION supabase_realtime ADD TABLE meetings;

-- Enable realtime for message_room table
ALTER PUBLICATION supabase_realtime ADD TABLE message_room;

-- Enable realtime for room_members table
ALTER PUBLICATION supabase_realtime ADD TABLE room_members;

-- Create RLS policies for realtime access
-- Allow users to see messages in rooms they're part of
CREATE POLICY "Users can view messages in their rooms" ON messages
FOR SELECT USING (
  room_id IN (
    SELECT room_id FROM room_members 
    WHERE user_id = auth.uid()
  )
);

-- Allow users to insert messages in rooms they're part of
CREATE POLICY "Users can insert messages in their rooms" ON messages
FOR INSERT WITH CHECK (
  room_id IN (
    SELECT room_id FROM room_members 
    WHERE user_id = auth.uid()
  )
);

-- Allow users to update their own messages
CREATE POLICY "Users can update their own messages" ON messages
FOR UPDATE USING (
  sender_id = auth.uid()
);

-- Allow users to see meetings in rooms they're part of
CREATE POLICY "Users can view meetings in their rooms" ON meetings
FOR SELECT USING (
  room_id IN (
    SELECT room_id FROM room_members 
    WHERE user_id = auth.uid()
  )
);

-- Allow users to insert meetings in rooms they're part of
CREATE POLICY "Users can insert meetings in their rooms" ON meetings
FOR INSERT WITH CHECK (
  room_id IN (
    SELECT room_id FROM room_members 
    WHERE user_id = auth.uid()
  )
);

-- Allow users to update meetings in rooms they're part of
CREATE POLICY "Users can update meetings in their rooms" ON meetings
FOR UPDATE USING (
  room_id IN (
    SELECT room_id FROM room_members 
    WHERE user_id = auth.uid()
  )
);

-- Allow users to see message rooms they're part of
CREATE POLICY "Users can view their message rooms" ON message_room
FOR SELECT USING (
  room_id IN (
    SELECT room_id FROM room_members 
    WHERE user_id = auth.uid()
  )
);

-- Allow users to see room members for their rooms
CREATE POLICY "Users can view room members" ON room_members
FOR SELECT USING (
  user_id = auth.uid() OR 
  room_id IN (
    SELECT room_id FROM room_members 
    WHERE user_id = auth.uid()
  )
);

-- Verify realtime is enabled
SELECT schemaname, tablename, hasindexes, hasrules, hastriggers 
FROM pg_tables 
WHERE tablename IN ('messages', 'meetings', 'message_room', 'room_members')
AND schemaname = 'public';
