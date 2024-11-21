-- Drop existing tables and functions
drop table if exists public.exercise_stats cascade;
drop table if exists public.workouts cascade;

-- Create workouts table
create table public.workouts (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    exercises jsonb not null default '[]'::jsonb,
    date timestamp with time zone default timezone('utc'::text, now()) not null,
    
    constraint exercises_check check (jsonb_typeof(exercises) = 'array')
);

-- Create exercise_stats table
create table public.exercise_stats (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    workout_id uuid references public.workouts(id) on delete cascade not null,
    exercise_name text not null,
    muscle_group text not null,
    sets jsonb not null default '[]'::jsonb,
    date timestamp with time zone default timezone('utc'::text, now()) not null,
    
    constraint sets_check check (jsonb_typeof(sets) = 'array')
);

-- Create indexes
create index workouts_user_id_idx on public.workouts(user_id);
create index workouts_date_idx on public.workouts(date desc);
create index workouts_updated_at_idx on public.workouts(updated_at desc);

create index exercise_stats_user_id_idx on public.exercise_stats(user_id);
create index exercise_stats_workout_id_idx on public.exercise_stats(workout_id);
create index exercise_stats_exercise_name_idx on public.exercise_stats(exercise_name);
create index exercise_stats_date_idx on public.exercise_stats(date desc);
create index exercise_stats_updated_at_idx on public.exercise_stats(updated_at desc);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create triggers
create trigger set_updated_at
    before update on public.workouts
    for each row
    execute function public.handle_updated_at();

create trigger set_updated_at
    before update on public.exercise_stats
    for each row
    execute function public.handle_updated_at();

-- Enable RLS
alter table public.workouts enable row level security;
alter table public.exercise_stats enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Allow select for authenticated users" on public.workouts;
drop policy if exists "Allow insert for authenticated users" on public.workouts;
drop policy if exists "Allow update for authenticated users" on public.workouts;
drop policy if exists "Allow delete for authenticated users" on public.workouts;
drop policy if exists "Allow select for authenticated users" on public.exercise_stats;
drop policy if exists "Allow insert for authenticated users" on public.exercise_stats;
drop policy if exists "Allow update for authenticated users" on public.exercise_stats;
drop policy if exists "Allow delete for authenticated users" on public.exercise_stats;

-- Create policies for workouts table
create policy "workouts_select_policy"
    on public.workouts for select
    using (auth.uid() = user_id);

create policy "workouts_insert_policy"
    on public.workouts for insert
    with check (auth.uid() = user_id);

create policy "workouts_update_policy"
    on public.workouts for update
    using (auth.uid() = user_id);

create policy "workouts_delete_policy"
    on public.workouts for delete
    using (auth.uid() = user_id);

-- Create policies for exercise_stats table
create policy "exercise_stats_select_policy"
    on public.exercise_stats for select
    using (auth.uid() = user_id);

create policy "exercise_stats_insert_policy"
    on public.exercise_stats for insert
    with check (auth.uid() = user_id);

create policy "exercise_stats_update_policy"
    on public.exercise_stats for update
    using (auth.uid() = user_id);

create policy "exercise_stats_delete_policy"
    on public.exercise_stats for delete
    using (auth.uid() = user_id);

-- Grant necessary permissions
grant usage on schema public to authenticated, anon;
grant all privileges on public.workouts to authenticated;
grant all privileges on public.exercise_stats to authenticated;
grant usage, select on all sequences in schema public to authenticated;