grant select, insert, update, delete on public.invoices to anon;

drop policy if exists "admin console can read invoices" on public.invoices;
create policy "admin console can read invoices"
on public.invoices
for select
to anon
using (true);

drop policy if exists "admin console can create invoices" on public.invoices;
create policy "admin console can create invoices"
on public.invoices
for insert
to anon
with check (true);

drop policy if exists "admin console can update invoices" on public.invoices;
create policy "admin console can update invoices"
on public.invoices
for update
to anon
using (true)
with check (true);

drop policy if exists "admin console can delete invoices" on public.invoices;
create policy "admin console can delete invoices"
on public.invoices
for delete
to anon
using (true);
