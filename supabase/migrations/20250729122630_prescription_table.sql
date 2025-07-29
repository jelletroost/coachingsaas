create table prescriptions(
   id uuid primary key default gen_random_uuid(),
   patient_id uuid references patients(id),
   product_id uuid references products(id),
   dosage text,
   frequency text,
   duration text,
   instructions text,
   notes text,
   status text check (status in ('active', 'completed', 'discontinued')),
   created_at timestamp with time zone default now(),
   updated_at timestamp with time zone default now()
);

