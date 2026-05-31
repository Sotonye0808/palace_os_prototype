-- Create address book table for storing user addresses with Google Places integration

create table address_book (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  label text not null, -- e.g., "Home", "Work", "Mom's House"
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'Nigeria',
  latitude double precision,
  longitude double precision,
  is_default boolean default false,
  google_place_id text, -- Store Google Place ID for autocomplete integration
  formatted_address text, -- Full formatted address from Google Places
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table address_book enable row level security;

-- Create policies for address book
create policy "Users can view their own address book"
  on address_book for select
  using (auth.uid() = user_id);

create policy "Users can insert their own address book entries"
  on address_book for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own address book entries"
  on address_book for update
  using (auth.uid() = user_id);

create policy "Users can delete their own address book entries"
  on address_book for delete
  using (auth.uid() = user_id);

-- Create indexes for better query performance
create index idx_address_book_user_id on address_book(user_id);
create index idx_address_book_is_default on address_book(is_default) where is_default = true;
create index idx_address_book_google_place_id on address_book(google_place_id) where google_place_id is not null;

-- Create trigger to update updated_at timestamp
create trigger update_address_book_updated_at
  before update on address_book
  for each row
  execute procedure moddatetime (updated_at);