-- Run this in: Supabase Dashboard → SQL Editor → New query

create extension if not exists "uuid-ossp";

-- Profiles
create table public.profiles (
  id         uuid references auth.users(id) on delete cascade primary key,
  full_name  text,
  phone      text,
  avatar_url text,
  country    text default 'GH',
  role       text default 'customer',
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Markets
create table public.markets (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  description text,
  city        text not null,
  country     text not null,
  lat         numeric(9,6),
  lng         numeric(9,6),
  image_url   text,
  category    text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- Vendors
create table public.vendors (
  id            uuid default uuid_generate_v4() primary key,
  profile_id    uuid references public.profiles(id) on delete cascade,
  market_id     uuid references public.markets(id) on delete set null,
  business_name text not null,
  description   text,
  phone         text,
  avatar_url    text,
  is_live       boolean default false,
  live_viewers  integer default 0,
  rating        numeric(2,1) default 0.0,
  review_count  integer default 0,
  total_sales   integer default 0,
  country       text not null,
  is_verified   boolean default false,
  created_at    timestamptz default now()
);

-- Products
create table public.products (
  id          uuid default uuid_generate_v4() primary key,
  vendor_id   uuid references public.vendors(id) on delete cascade,
  name        text not null,
  description text,
  price       numeric(10,2) not null,
  currency    text not null,
  image_url   text,
  stock_qty   integer default 0,
  category    text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- Orders
create table public.orders (
  id               uuid default uuid_generate_v4() primary key,
  customer_id      uuid references public.profiles(id),
  vendor_id        uuid references public.vendors(id),
  product_id       uuid references public.products(id),
  quantity         integer default 1,
  unit_price       numeric(10,2) not null,
  total_amount     numeric(10,2) not null,
  currency         text not null,
  status           text default 'pending',
  payment_method   text,
  payment_ref      text,
  payment_status   text default 'unpaid',
  delivery_address text,
  delivery_eta     text,
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Reviews
create table public.reviews (
  id          uuid default uuid_generate_v4() primary key,
  order_id    uuid references public.orders(id),
  customer_id uuid references public.profiles(id),
  vendor_id   uuid references public.vendors(id),
  rating      integer check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz default now()
);

-- Auto-update vendor rating
create or replace function public.update_vendor_rating()
returns trigger as $$
begin
  update public.vendors
  set
    rating = (select round(avg(rating)::numeric,1) from public.reviews where vendor_id = new.vendor_id),
    review_count = (select count(*) from public.reviews where vendor_id = new.vendor_id)
  where id = new.vendor_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_review_created
  after insert on public.reviews
  for each row execute procedure public.update_vendor_rating();

-- Row Level Security
alter table public.profiles  enable row level security;
alter table public.markets   enable row level security;
alter table public.vendors   enable row level security;
alter table public.products  enable row level security;
alter table public.orders    enable row level security;
alter table public.reviews   enable row level security;

create policy "Profiles public read"    on public.profiles for select using (true);
create policy "Profiles own update"     on public.profiles for update using (auth.uid() = id);
create policy "Markets public read"     on public.markets  for select using (true);
create policy "Vendors public read"     on public.vendors  for select using (true);
create policy "Vendors own update"      on public.vendors  for update using (auth.uid() = profile_id);
create policy "Products public read"    on public.products for select using (is_active = true);
create policy "Products vendor manage"  on public.products for all using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);
create policy "Orders customer read"    on public.orders for select using (auth.uid() = customer_id);
create policy "Orders vendor read"      on public.orders for select using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);
create policy "Orders customer insert"  on public.orders for insert with check (auth.uid() = customer_id);
create policy "Orders vendor update"    on public.orders for update using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);
create policy "Reviews public read"     on public.reviews for select using (true);
create policy "Reviews customer insert" on public.reviews for insert with check (auth.uid() = customer_id);

-- Seed markets
insert into public.markets (name, description, city, country, lat, lng, category) values
  ('Makola Market',    'Accra''s largest open-air market',          'Accra',  'GH', 5.5502, -0.2174, 'General'),
  ('Kumasi Central',   'Heart of Ashanti commerce and crafts',       'Kumasi', 'GH', 6.6885, -1.6244, 'Crafts'),
  ('Computer Village', 'West Africa''s largest electronics hub',     'Lagos',  'NG', 6.6018,  3.3515, 'Electronics'),
  ('Balogun Market',   'Lagos iconic textile and goods market',      'Lagos',  'NG', 6.4544,  3.3948, 'General'),
  ('Wuse Market',      'Abuja premier market for food and clothing', 'Abuja',  'NG', 9.0630,  7.4898, 'Food');
