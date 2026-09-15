create table if not exists reports (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  type text not null,
  summary text not null,
  contact text
);
