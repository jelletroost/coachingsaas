create function on_user_insert()
returns trigger as $$
begin
   if new.role = 'patient' then
      insert into patients (user_id) values (new.id);
   elseif new.role = 'coach' then
      insert into coaches (user_id) values (new.id);
   end if;
   return new;
end;
$$ language plpgsql;

create trigger create_patient_on_user_insert
after insert on users
for each row
execute function on_user_insert();