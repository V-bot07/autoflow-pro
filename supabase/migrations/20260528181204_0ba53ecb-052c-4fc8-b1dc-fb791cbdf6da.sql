
-- ROLES
create type public.app_role as enum ('admin', 'staff');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

create policy "users can view own roles" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

-- SITE SETTINGS (single row)
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  shop_name text not null default 'Shubham Auto Clinic & Garage',
  owner_name text not null default 'Malay Parikh',
  tagline text not null default 'Engineered to the last Nm.',
  phone text not null default '+91 98765 43210',
  whatsapp text not null default '+91 98765 43210',
  email text not null default 'performance@shubhamauto.in',
  address text not null default 'Plot 42, GIDC Industrial Estate, Ahmedabad, Gujarat 380001',
  working_hours text not null default 'Mon-Sat 09:00 — 19:00',
  hero_title text not null default 'Engineered To The Last Nm.',
  hero_subtitle text not null default 'Specialized diagnostics and mechanical restoration for high-performance vehicles. Master technician Malay Parikh, signature workshop standards, brought to Ahmedabad.',
  about_story text not null default 'Founded by Malay Parikh in 2009, Shubham Auto Clinic was built on a single conviction: every machine deserves precision. We apply aerospace-grade diagnostics to luxury automotive and high-capacity superbikes — measuring every clearance, calibrating every sensor.',
  emergency_phone text not null default '+91 98765 43210',
  instagram_url text default '#',
  facebook_url text default '#',
  twitter_url text default '#',
  map_embed_url text default 'https://maps.google.com/maps?q=Ahmedabad%20Gujarat&t=&z=13&ie=UTF8&iwloc=&output=embed',
  gst_rate numeric not null default 18,
  gst_number text default '24ABCDE1234F1Z5',
  stats jsonb not null default '[{"label":"Customer Rating","value":"4.9/5"},{"label":"Vehicles Tuned","value":"8.2k+"},{"label":"Engineering Exp","value":"15yr"},{"label":"Accuracy Spec","value":"100%"}]'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant all on public.site_settings to service_role, authenticated;
alter table public.site_settings enable row level security;
create policy "public can read site settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admin can update site settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin can insert site settings" on public.site_settings for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));

insert into public.site_settings (id) values (gen_random_uuid());

-- SERVICES
create table public.services (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  category text not null default 'mechanical',
  description text not null default '',
  price numeric not null default 0,
  duration_min int not null default 60,
  icon text default 'wrench',
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.services to anon, authenticated;
grant all on public.services to service_role, authenticated;
alter table public.services enable row level security;
create policy "public can read active services" on public.services for select to anon, authenticated using (true);
create policy "admin can manage services" on public.services for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.services (code, name, category, description, price, duration_min, icon, display_order) values
('001','Precision Diagnostics','diagnostics','ECU remapping, sensor calibration, and full-spectrum electronic analysis.',2499,90,'activity',1),
('002','Drive-Line Sync','mechanical','Transmission service, differential cooling, and gear-ratio optimization.',4999,180,'cog',2),
('003','Thermal Management','mechanical','Coolant system flush, radiator upgrades, and thermal wrap installation.',1899,120,'thermometer',3),
('004','Kinetic Friction (Brakes)','safety','Brembo-spec brake servicing, rotor surfacing, and ceramic pad fitting.',3200,150,'disc',4),
('005','Surface Tech (Detailing)','detailing','Aero-correction, ceramic coating, and precision detailing for exhibition.',8500,360,'sparkles',5),
('006','Power Extraction','performance','Turbo optimization, intake resonance tuning, and exhaust fabrication.',12000,480,'zap',6),
('007','Oil & Fluid Service','maintenance','Full synthetic oil change, filter swap, and fluid top-up.',1499,45,'droplet',7),
('008','Battery & Electrical','electrical','Battery replacement, alternator test, and wiring diagnostics.',2999,60,'battery',8),
('009','Emergency Roadside','emergency','24/7 breakdown response within Ahmedabad limits.',1999,30,'siren',9);

-- CUSTOMERS
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  address text,
  notes text,
  created_at timestamptz not null default now()
);
create index on public.customers (phone);
grant all on public.customers to authenticated, service_role;
alter table public.customers enable row level security;
create policy "admin manage customers" on public.customers for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- VEHICLES
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  vehicle_type text not null default 'car',
  make text not null default '',
  model text not null default '',
  reg_no text not null default '',
  year int,
  color text,
  notes text,
  created_at timestamptz not null default now()
);
grant all on public.vehicles to authenticated, service_role;
alter table public.vehicles enable row level security;
create policy "admin manage vehicles" on public.vehicles for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- BOOKINGS (public can insert)
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_no text not null unique default ('SAC-' || lpad((floor(random()*900000)+100000)::text, 6, '0')),
  customer_name text not null,
  phone text not null,
  email text,
  vehicle_type text not null default 'car',
  vehicle_info text,
  service_id uuid references public.services(id) on delete set null,
  service_name text,
  scheduled_at timestamptz not null,
  problem text,
  status text not null default 'pending',
  progress_stage text not null default 'received',
  notes text,
  created_at timestamptz not null default now()
);
create index on public.bookings (phone);
create index on public.bookings (status);
grant select, insert on public.bookings to anon;
grant all on public.bookings to authenticated, service_role;
alter table public.bookings enable row level security;
create policy "public can create booking" on public.bookings for insert to anon, authenticated with check (true);
create policy "public can track booking" on public.bookings for select to anon, authenticated using (true);
create policy "admin manage bookings" on public.bookings for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- INVOICES
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_no text not null unique default ('INV-' || to_char(now(), 'YYYYMM') || '-' || lpad((floor(random()*9000)+1000)::text, 4, '0')),
  customer_id uuid references public.customers(id) on delete set null,
  customer_name text not null,
  customer_phone text,
  vehicle_info text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null default 0,
  discount numeric not null default 0,
  gst_rate numeric not null default 18,
  gst_amount numeric not null default 0,
  total numeric not null default 0,
  status text not null default 'unpaid',
  notes text,
  created_at timestamptz not null default now()
);
grant all on public.invoices to authenticated, service_role;
alter table public.invoices enable row level security;
create policy "admin manage invoices" on public.invoices for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- INVENTORY
create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text,
  category text default 'parts',
  qty int not null default 0,
  low_threshold int not null default 5,
  unit_price numeric not null default 0,
  created_at timestamptz not null default now()
);
grant all on public.inventory to authenticated, service_role;
alter table public.inventory enable row level security;
create policy "admin manage inventory" on public.inventory for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.inventory (name, sku, category, qty, low_threshold, unit_price) values
('Synthetic Engine Oil 5W-30 (1L)','OIL-5W30','fluids',48,10,650),
('Brake Pad Set — Front','BRK-FR','brakes',12,4,2400),
('Spark Plug — Iridium','SP-IR','engine',60,20,420),
('Air Filter — Premium','FLT-AIR','filters',22,8,890),
('Battery 12V 60Ah','BAT-60','electrical',6,3,6500),
('Ceramic Coating 30ml','CC-30','detailing',9,3,3800);

-- EXPENSES
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'general',
  amount numeric not null,
  note text,
  expense_date date not null default current_date,
  created_at timestamptz not null default now()
);
grant all on public.expenses to authenticated, service_role;
alter table public.expenses enable row level security;
create policy "admin manage expenses" on public.expenses for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- STAFF
create table public.staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default 'Mechanic',
  phone text,
  email text,
  salary numeric default 0,
  joined_on date default current_date,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant all on public.staff to authenticated, service_role;
alter table public.staff enable row level security;
create policy "admin manage staff" on public.staff for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.staff (name, role, phone, salary) values
('Malay Parikh','Master Technician / Owner','+91 98765 43210',0),
('Ravi Patel','Senior Mechanic','+91 98111 22233',32000),
('Karan Shah','Electrical Specialist','+91 98444 55566',28000),
('Imran Khan','Detailing Lead','+91 98777 88899',24000);

-- TESTIMONIALS
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vehicle text,
  quote text not null,
  rating int not null default 5,
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon, authenticated;
grant all on public.testimonials to authenticated, service_role;
alter table public.testimonials enable row level security;
create policy "public read testimonials" on public.testimonials for select to anon, authenticated using (true);
create policy "admin manage testimonials" on public.testimonials for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.testimonials (name, vehicle, quote, display_order) values
('Anirudh Mehta','Porsche 911','Malay and his team treat every engine like a precision instrument. They don''t just fix cars; they calibrate them for performance.',1),
('Riya Desai','BMW M340i','The diagnostic report I got was more detailed than what my dealership ever provided. Total confidence in their work.',2),
('Vikram Joshi','Ducati Panigale V4','Only workshop in Ahmedabad I trust with my superbike. Surgical attention to detail.',3);

-- GALLERY
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text default '',
  image_url text not null,
  category text default 'workshop',
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.gallery to anon, authenticated;
grant all on public.gallery to authenticated, service_role;
alter table public.gallery enable row level security;
create policy "public read gallery" on public.gallery for select to anon, authenticated using (true);
create policy "admin manage gallery" on public.gallery for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- PROMOTIONS
create table public.promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  badge text default 'OFFER',
  active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.promotions to anon, authenticated;
grant all on public.promotions to authenticated, service_role;
alter table public.promotions enable row level security;
create policy "public read promotions" on public.promotions for select to anon, authenticated using (true);
create policy "admin manage promotions" on public.promotions for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.promotions (title, body, badge, display_order) values
('Monsoon Calibration Special','Full diagnostic + thermal management package — 15% off through August.','OFFER',1),
('Free Pickup & Drop','Within Ahmedabad SG Highway corridor on bookings above ₹5,000.','SERVICE',2);
