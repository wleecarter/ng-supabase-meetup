create table items (
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users not null,
  title text,
  details text,
  imageUrl text
);
 
alter table items enable row level security;
 
create policy "Individuals can create items." on items for
    insert with check (auth.uid() = user_id);
 
create policy "Individuals can view their own items. " on items for
    select using (auth.uid() = user_id);
 
create policy "Individuals can update their own items." on items for
    update using (auth.uid() = user_id);
 
create policy "Individuals can delete their own items." on items for
    delete using (auth.uid() = user_id);