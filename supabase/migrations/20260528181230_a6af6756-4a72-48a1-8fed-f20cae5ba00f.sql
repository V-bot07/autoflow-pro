
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
grant execute on function public.has_role(uuid, public.app_role) to service_role;
-- has_role is used inside RLS policies which run as the policy owner, so revoking from authenticated is fine.

-- Tighten public booking insert: prevent setting privileged columns
drop policy if exists "public can create booking" on public.bookings;
create policy "public can create booking" on public.bookings
for insert to anon, authenticated
with check (
  status = 'pending'
  and progress_stage = 'received'
  and notes is null
);
