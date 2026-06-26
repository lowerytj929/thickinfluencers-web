-- ThickInfluencers Vault — Complete Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)
-- Idempotent: uses CREATE TABLE IF NOT EXISTS and ALTER ... ADD COLUMN IF NOT EXISTS

--------------------------------------------------------------------------------
-- 1. PACKAGES (membership tiers)
--------------------------------------------------------------------------------
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_cents integer not null,                -- price in cents (e.g. 1500 = $15)
  price_display text not null,                  -- e.g. "$15"
  features jsonb default '[]',                  -- list of feature strings
  popular boolean default false,
  is_active boolean default true,
  telegram_link text,                           -- Telegram invite link for this tier
  created_at timestamptz default now()
);

--------------------------------------------------------------------------------
-- 2. PROFILES (extends auth.users)
--------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  website text,
  is_creator boolean default false,
  is_admin boolean default false,
  is_verified boolean default false,
  age_verified boolean default false,
  telegram_username text,
  telegram_chat_id bigint,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add any missing columns gracefully (safe to re-run)
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists website text;
alter table public.profiles add column if not exists is_creator boolean default false;
alter table public.profiles add column if not exists is_verified boolean default false;
alter table public.profiles add column if not exists age_verified boolean default false;
alter table public.profiles add column if not exists username text;
alter table public.profiles alter column username set default null;
-- Make username unique if not already (safe if already unique)
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass
    and conname = 'profiles_username_key'
  ) then
    alter table public.profiles add constraint profiles_username_key unique (username);
  end if;
end $$;

--------------------------------------------------------------------------------
-- 3. ORDERS (payment records)
--------------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  package_id uuid references public.packages(id) on delete set null,
  package_name text,
  amount_cents integer not null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  payment_provider text default 'square',
  payment_id text,                              -- Square / Stripe payment ID
  payer_email text,
  payer_name text,
  metadata jsonb default '{}',
  access_granted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

--------------------------------------------------------------------------------
-- 4. MEMBERSHIPS (active access records)
--------------------------------------------------------------------------------
create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  package_id uuid references public.packages(id) on delete cascade not null,
  plan text,                                    -- human-readable alias (vip / fyp / thickcenter-plus / full-bundle)
  telegram_invite_link text,                    -- personal / unique invite link
  telegram_invite_expires_at timestamptz,
  is_active boolean default true,
  started_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, package_id)
);

--------------------------------------------------------------------------------
-- 5. GALLERIES (content collections)
--------------------------------------------------------------------------------
create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  slug text not null unique,
  description text,
  cover_url text,
  visibility text not null default 'public' check (visibility in ('public', 'private', 'unlisted')),
  is_premium boolean default false,
  price_cents integer default 0,
  tags text[] default '{}',
  view_count integer default 0,
  like_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

--------------------------------------------------------------------------------
-- 6. MEDIA ITEMS (individual files within a gallery)
--------------------------------------------------------------------------------
create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid references public.galleries(id) on delete cascade not null,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  type text not null check (type in ('image', 'video')),
  url text not null,
  thumbnail_url text,
  width integer,
  height integer,
  file_size bigint,                             -- bytes
  title text,
  description text,
  sort_order integer default 0,
  is_premium boolean default false,
  created_at timestamptz default now()
);

--------------------------------------------------------------------------------
-- 7. CATEGORIES (taxonomy)
--------------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text
);

--------------------------------------------------------------------------------
-- 8. GALLERY_CATEGORIES (many-to-many join)
--------------------------------------------------------------------------------
create table if not exists public.gallery_categories (
  gallery_id uuid references public.galleries(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete cascade not null,
  primary key (gallery_id, category_id)
);

--------------------------------------------------------------------------------
-- 9. LIKES
--------------------------------------------------------------------------------
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  gallery_id uuid references public.galleries(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique (user_id, gallery_id)
);

--------------------------------------------------------------------------------
-- 10. REPORTS (user-flagged content)
--------------------------------------------------------------------------------
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  reported_content_type text not null,           -- e.g. 'gallery', 'media_item', 'profile'
  reported_content_id uuid not null,
  reason text not null,
  description text,
  status text not null default 'open' check (status in ('open', 'resolved', 'dismissed')),
  admin_notes text,
  created_at timestamptz default now(),
  resolved_at timestamptz
);

--------------------------------------------------------------------------------
-- 11. TAKEDOWN REQUESTS (DMCA / legal requests)
--------------------------------------------------------------------------------
create table if not exists public.takedown_requests (
  id uuid primary key default gen_random_uuid(),
  requester_name text not null,
  requester_email text not null,
  content_description text not null,
  content_url text not null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'actioned', 'dismissed')),
  admin_notes text,
  created_at timestamptz default now()
);

--------------------------------------------------------------------------------
-- 12. AUDIT LOGS (admin action trail)
--------------------------------------------------------------------------------
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  details jsonb default '{}',
  created_at timestamptz default now()
);

--------------------------------------------------------------------------------
-- INDEXES
--------------------------------------------------------------------------------

-- Orders
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_payment_id on public.orders(payment_id);
create index if not exists idx_orders_created_at on public.orders(created_at);

-- Memberships
create index if not exists idx_memberships_user_id on public.memberships(user_id);
create index if not exists idx_memberships_package_id on public.memberships(package_id);
create index if not exists idx_memberships_is_active on public.memberships(is_active);
create index if not exists idx_memberships_expires_at on public.memberships(expires_at);

-- Galleries
create index if not exists idx_galleries_creator_id on public.galleries(creator_id);
create index if not exists idx_galleries_slug on public.galleries(slug);
create index if not exists idx_galleries_visibility on public.galleries(visibility);
create index if not exists idx_galleries_is_premium on public.galleries(is_premium);
create index if not exists idx_galleries_tags on public.galleries using gin(tags);
create index if not exists idx_galleries_created_at on public.galleries(created_at desc);

-- Media items
create index if not exists idx_media_items_gallery_id on public.media_items(gallery_id);
create index if not exists idx_media_items_creator_id on public.media_items(creator_id);
create index if not exists idx_media_items_type on public.media_items(type);
create index if not exists idx_media_items_sort_order on public.media_items(sort_order);

-- Categories
create index if not exists idx_categories_slug on public.categories(slug);

-- Likes
create index if not exists idx_likes_user_id on public.likes(user_id);
create index if not exists idx_likes_gallery_id on public.likes(gallery_id);
create index if not exists idx_likes_created_at on public.likes(created_at);

-- Reports
create index if not exists idx_reports_reporter_id on public.reports(reporter_id);
create index if not exists idx_reports_status on public.reports(status);
create index if not exists idx_reports_content_type on public.reports(reported_content_type);
create index if not exists idx_reports_created_at on public.reports(created_at);

-- Takedown requests
create index if not exists idx_takedown_requests_status on public.takedown_requests(status);
create index if not exists idx_takedown_requests_email on public.takedown_requests(requester_email);
create index if not exists idx_takedown_requests_created_at on public.takedown_requests(created_at);

-- Audit logs
create index if not exists idx_audit_logs_admin_id on public.audit_logs(admin_id);
create index if not exists idx_audit_logs_action on public.audit_logs(action);
create index if not exists idx_audit_logs_created_at on public.audit_logs(created_at desc);

-- Profiles
create index if not exists idx_profiles_username on public.profiles(username);
create index if not exists idx_profiles_is_creator on public.profiles(is_creator);
create index if not exists idx_profiles_is_admin on public.profiles(is_admin);

--------------------------------------------------------------------------------
-- ROW LEVEL SECURITY
--------------------------------------------------------------------------------

alter table public.packages enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.memberships enable row level security;
alter table public.galleries enable row level security;
alter table public.media_items enable row level security;
alter table public.categories enable row level security;
alter table public.gallery_categories enable row level security;
alter table public.likes enable row level security;
alter table public.reports enable row level security;
alter table public.takedown_requests enable row level security;
alter table public.audit_logs enable row level security;

--------------------------------------------------------------------------------
-- RLS POLICIES
--------------------------------------------------------------------------------

-- Packages: anyone can read active packages
drop policy if exists "Packages are publicly viewable" on public.packages;
create policy "Packages are publicly viewable"
  on public.packages for select
  using (is_active = true);

-- Profiles: users can read / update their own profile; admins can read all
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Orders: users can view / insert their own orders
drop policy if exists "Users can view own orders" on public.orders;
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create orders" on public.orders;
create policy "Users can create orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Memberships: users can view their own memberships
drop policy if exists "Users can view own memberships" on public.memberships;
create policy "Users can view own memberships"
  on public.memberships for select
  using (auth.uid() = user_id);

-- Galleries: public can view public / unlisted galleries; creators can manage their own
drop policy if exists "Anyone can view public galleries" on public.galleries;
create policy "Anyone can view public galleries"
  on public.galleries for select
  using (visibility = 'public' or visibility = 'unlisted');

drop policy if exists "Creators can manage own galleries" on public.galleries;
create policy "Creators can manage own galleries"
  on public.galleries for all
  using (auth.uid() = creator_id);

drop policy if exists "Premium galleries require membership" on public.galleries;
-- This is a helper policy; actual premium gate-keeping is done at the app layer.
create policy "Premium galleries require membership"
  on public.galleries for select
  using (
    is_premium = false
    or exists (
      select 1 from public.memberships m
      where m.user_id = auth.uid() and m.is_active = true
    )
  );

-- Media items: visible if the parent gallery is visible
drop policy if exists "Media items inherit gallery visibility" on public.media_items;
create policy "Media items inherit gallery visibility"
  on public.media_items for select
  using (
    exists (
      select 1 from public.galleries g
      where g.id = gallery_id
      and (g.visibility = 'public' or g.visibility = 'unlisted')
    )
    or auth.uid() = creator_id
  );

drop policy if exists "Creators can manage own media" on public.media_items;
create policy "Creators can manage own media"
  on public.media_items for all
  using (auth.uid() = creator_id);

-- Categories: publicly readable
drop policy if exists "Categories are publicly viewable" on public.categories;
create policy "Categories are publicly viewable"
  on public.categories for select
  using (true);

-- Gallery categories: inherit from galleries
drop policy if exists "Gallery categories inherit gallery visibility" on public.gallery_categories;
create policy "Gallery categories inherit gallery visibility"
  on public.gallery_categories for select
  using (
    exists (
      select 1 from public.galleries g
      where g.id = gallery_id
      and (g.visibility = 'public' or g.visibility = 'unlisted')
    )
    or exists (
      select 1 from public.galleries g
      where g.id = gallery_id and g.creator_id = auth.uid()
    )
  );

-- Likes: users can view likes on visible galleries, insert / delete their own
drop policy if exists "Anyone can view likes on visible galleries" on public.likes;
create policy "Anyone can view likes on visible galleries"
  on public.likes for select
  using (
    exists (
      select 1 from public.galleries g
      where g.id = gallery_id
      and (g.visibility = 'public' or g.visibility = 'unlisted')
    )
  );

drop policy if exists "Users can like galleries" on public.likes;
create policy "Users can like galleries"
  on public.likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can unlike own likes" on public.likes;
create policy "Users can unlike own likes"
  on public.likes for delete
  using (auth.uid() = user_id);

-- Reports: users can insert reports; admins can read / update all
drop policy if exists "Users can create reports" on public.reports;
create policy "Users can create reports"
  on public.reports for insert
  with check (auth.uid() = reporter_id);

drop policy if exists "Admins can manage reports" on public.reports;
create policy "Admins can manage reports"
  on public.reports for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Takedown requests: anyone can insert (no auth required); admins can manage
drop policy if exists "Anyone can submit takedown requests" on public.takedown_requests;
create policy "Anyone can submit takedown requests"
  on public.takedown_requests for insert
  with check (true);

drop policy if exists "Admins can manage takedown requests" on public.takedown_requests;
create policy "Admins can manage takedown requests"
  on public.takedown_requests for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

-- Audit logs: admins can insert and read; users cannot see them
drop policy if exists "Admins can manage audit logs" on public.audit_logs;
create policy "Admins can manage audit logs"
  on public.audit_logs for all
  using (exists (select 1 from public.profiles where id = auth.uid() and is_admin = true));

--------------------------------------------------------------------------------
-- TRIGGER: auto-create profile on user signup
--------------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

--------------------------------------------------------------------------------
-- SEED DATA: packages
--------------------------------------------------------------------------------
insert into public.packages (name, slug, price_cents, price_display, features, popular, telegram_link)
values
  ('VIP', 'vip', 1500, '$15', '["Exclusive Vault Access", "Daily Content Updates", "Private Community"]', false, null),
  ('FYP', 'fyp', 1500, '$15', '["Trending Content", "Curated Collections", "Priority Support"]', false, null),
  ('ThickCenter+', 'thickcenter-plus', 2500, '$25', '["All FYP & VIP Perks", "Premium Archives", "Exclusive Weekly Drops", "Direct Admin Access"]', true, null),
  ('Full Bundle', 'full-bundle', 3500, '$35', '["Unrestricted Network Access", "Lifetime VIP Status", "All Premium Archives", "1-on-1 Support", "Early Access to New Drops"]', false, null)
on conflict (slug) do nothing;

--------------------------------------------------------------------------------
-- SEED DATA: categories
--------------------------------------------------------------------------------
insert into public.categories (name, slug, description, icon)
values
  ('Portrait', 'portrait', 'Portrait and headshot photography', 'user'),
  ('Editorial', 'editorial', 'Editorial and magazine-style content', 'book-open'),
  ('Lifestyle', 'lifestyle', 'Everyday lifestyle and behind-the-scenes', 'camera'),
  ('Fashion', 'fashion', 'Fashion shoots and styling', 'tag'),
  ('Art', 'art', 'Artistic and conceptual photography', 'award')
on conflict (slug) do nothing;