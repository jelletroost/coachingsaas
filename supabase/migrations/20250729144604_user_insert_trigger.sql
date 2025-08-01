create function on_user_insert()
returns trigger as $$
declare
   role_name text;
begin
   -- Get the role name from user_roles table
   select name into role_name from user_roles where id = new.role_id;
   
   if role_name = 'patient' then
      insert into patients (user_id) values (new.id);
   elseif role_name = 'coach' then
      insert into coaches (user_id) values (new.id);
   end if;
   return new;
end;
$$ language plpgsql;

create trigger create_patient_on_user_insert
after insert on users
for each row
execute function on_user_insert();