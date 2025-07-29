alter table patients 
add column assigned_coach_id uuid references users(id);

