grant select, insert, update, delete on public.inventory to anon;
grant select, insert, update, delete on public.expenses to anon;

drop policy if exists "admin console can read inventory" on public.inventory;
create policy "admin console can read inventory"
on public.inventory
for select
to anon
using (true);

drop policy if exists "admin console can create inventory" on public.inventory;
create policy "admin console can create inventory"
on public.inventory
for insert
to anon
with check (true);

drop policy if exists "admin console can update inventory" on public.inventory;
create policy "admin console can update inventory"
on public.inventory
for update
to anon
using (true)
with check (true);

drop policy if exists "admin console can delete inventory" on public.inventory;
create policy "admin console can delete inventory"
on public.inventory
for delete
to anon
using (true);

drop policy if exists "admin console can read expenses" on public.expenses;
create policy "admin console can read expenses"
on public.expenses
for select
to anon
using (true);

drop policy if exists "admin console can create expenses" on public.expenses;
create policy "admin console can create expenses"
on public.expenses
for insert
to anon
with check (true);

drop policy if exists "admin console can update expenses" on public.expenses;
create policy "admin console can update expenses"
on public.expenses
for update
to anon
using (true)
with check (true);

drop policy if exists "admin console can delete expenses" on public.expenses;
create policy "admin console can delete expenses"
on public.expenses
for delete
to anon
using (true);
