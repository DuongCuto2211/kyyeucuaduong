-- Chạy toàn bộ file này trong Supabase Dashboard > SQL Editor > New query > Run.
-- Bảng này cho phép khách xem lời nhắn và gửi lời nhắn mới.
-- Khách KHÔNG được sửa hoặc xóa lời nhắn đã gửi.

create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  message text not null check (
    char_length(btrim(message)) between 1 and 300
    and message !~* '(https?://|www\.)'
  ),
  created_at timestamptz not null default now()
);

create index if not exists guestbook_created_at_idx
  on public.guestbook (created_at desc);

alter table public.guestbook enable row level security;

-- Thu hồi quyền rộng (nếu dự án có cấp quyền mặc định), sau đó chỉ cấp quyền cần thiết.
revoke all on table public.guestbook from anon, authenticated;
grant usage on schema public to anon;
grant select on table public.guestbook to anon;
grant insert (name, message) on table public.guestbook to anon;

-- Xóa policy cũ cùng tên để có thể chạy lại file SQL an toàn.
drop policy if exists "Anyone can read guestbook" on public.guestbook;
drop policy if exists "Anyone can add a guestbook note" on public.guestbook;

create policy "Anyone can read guestbook"
  on public.guestbook
  for select
  to anon
  using (true);

create policy "Anyone can add a guestbook note"
  on public.guestbook
  for insert
  to anon
  with check (
    char_length(btrim(name)) between 1 and 40
    and char_length(btrim(message)) between 1 and 300
    and message !~* '(https?://|www\.)'
  );

-- Không tạo policy UPDATE hoặc DELETE: khách không thể sửa/xóa lời nhắn.
