-- ThickInfluencers Vault — Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- 1. PACKAGES (membership tiers)
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_cents integer not null,     -- price in cents (e.g. 1500 = $15)
  price_display text not null,       -- e.g. "$15"
  features jsonb default '[]',      -- list of feature strings
  popular boolean default false,
  is_active boolean default true,
  telegram_link text,                -- Telegram invite link for this tier
  created_at timestamptz default now()
);

-- 2. PROFILES (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  telegram_username text,
  telegram_chat_id bigint,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. ORDERS (payment records)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  package_id uuid references public.packages(id) on delete set null,
  package_name text,
  amount_cents integer not null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  payment_provider text default 'square',
  payment_id text,                   -- Square/stripe payment ID
  payer_email text,
  payer_name text,
  metadata jsonb default '{}',
  access_granted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. MEMBERSHIPS (active access records)
create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  package_id uuid references public.packages(id) on delete cascade not null,
  telegram_invite_link text,         -- personal/unique invite link
  telegram_invite_expires_at timestamptz,
  is_active boolean default true,
  started_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, package_id)
);

-- Indexes
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_memberships_user_id on public.memberships(user_id);
create index if not exists idx_memberships_is_active on public.memberships(is_active);

-- Enable Row Level Security
alter table public.packages enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.memberships enable row level security;

-- RLS Policies

-- Packages: anyone can read active packages
create policy "Packages are publicly viewable"
  on public.packages for select
  using (is_active = true);

-- Profiles: users can read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Orders: users can view their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Users can insert their own orders
create policy "Users can create orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Memberships: users can view their own memberships
create policy "Users can view own memberships"
  on public.memberships for select
  using (auth.uid() = user_id);

-- Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed data: packages
insert into public.packages (name, slug, price_cents, price_display, features, popular, telegram_link)
values
  ('VIP', 'vip', 1500, '$15', '["Exclusive Vault Access", "Daily Content Updates", "Private Community"]', false, null),
  ('FYP', 'fyp', 1500, '$15', '["Trending Content", "Curated Collections", "Priority Support"]', false, null),
  ('ThickCenter+', 'thickcenter-plus', 2500, '$25', '["All FYP & VIP Perks", "Premium Archives", "Exclusive Weekly Drops", "Direct Admin Access"]', true, null),
  ('Full Bundle', 'full-bundle', 3500, '$35', '["Unrestricted Network Access", "Lifetime VIP Status", "All Premium Archives", "1-on-1 Support", "Early Access to New Drops"]', false, null)
on conflict (slug) do nothing;