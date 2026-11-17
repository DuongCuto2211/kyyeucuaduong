# Thiệp mời online — phong cách handmade cổ điển

Website thiệp mời một trang, tối ưu cho điện thoại. Giao diện lấy cảm hứng từ giấy thư cũ, nét chữ viết tay, băng dính giấy và album ảnh dán tay. Câu chữ được viết theo kiểu thân mật để gửi cho bạn bè.

## Các file trong dự án

- `index.html` — cấu trúc các phần của website.
- `styles.css` — giao diện giấy thủ công, responsive và hiệu ứng cuộn.
- `config.js` — nơi sửa tên, lời mời, ngày giờ, địa điểm, ảnh, nhạc và thông tin Supabase.
- `script.js` — xử lý mở thư, nhạc, đếm ngược, album và sổ lưu bút.
- `supabase.sql` — tạo bảng và quyền truy cập cho sổ lưu bút công khai.
- `images/` — ảnh minh họa mẫu theo phong cách giấy thủ công; có thể thay bằng ảnh của nhóm bạn.
- `music/lofi-original.wav` — nhạc lofi nền nguyên bản đi kèm.

## 1. Sửa nội dung thiệp

Mở `config.js` và thay các thông tin mẫu:

- `hostName`: tên hoặc biệt danh của bạn.
- `eventName`: tên buổi gặp, sinh nhật, họp lớp hoặc dịp khác.
- `greeting`: lời chào đầu thư.
- `letterParagraphs`: nội dung lời mời. Có thể viết tự nhiên như đang nhắn trong nhóm bạn.
- `eventDateISO`: ngày giờ theo mẫu `2026-12-20T18:00:00+07:00`.
- `dateLabel`, `timeLabel`, `locationName`, `address`: ngày, giờ và nơi gặp.
- `mapUrl`: link Google Maps đầy đủ, bắt đầu bằng `https://`.

Ngày 20/12/2026 và địa điểm trong file hiện chỉ là ví dụ. Hãy thay bằng thông tin thật trước khi gửi link.

## 2. Thay ảnh bằng ảnh của nhóm

Upload ảnh của bạn vào thư mục `images/`, ví dụ `nhom-ban-1.jpg`, `nhom-ban-2.jpg`, `nhom-ban-3.jpg`. Sau đó sửa trong `config.js`:

```js
galleryImages: [
  "images/nhom-ban-1.jpg",
  "images/nhom-ban-2.jpg",
  "images/nhom-ban-3.jpg"
]
```

Tên file và chữ hoa/thường phải khớp chính xác. Nên dùng JPG hoặc WebP, cạnh dài khoảng 1600 px là đủ đẹp cho điện thoại.

## 3. Kết nối sổ lưu bút công khai bằng Supabase

GitHub Pages chỉ host file tĩnh, không tự lưu lời nhắn. Cần kết nối Supabase để tên và lời chúc mà khách gửi có thể được lưu lại và hiện cho mọi người.

1. Tạo project tại <https://supabase.com/>.
2. Mở **SQL Editor** → **New query**.
3. Mở file `supabase.sql`, sao chép toàn bộ và chạy trong SQL Editor.
4. Vào **Project Settings → API Keys** (hoặc **Connect** tùy giao diện).
5. Sao chép **Project URL** và **Publishable key**.
6. Mở `config.js`, dán hai giá trị vào `url` và `publishableKey` trong `window.SUPABASE_CONFIG`.
7. Commit `config.js` lên GitHub.

**Bảo mật:** Chỉ dùng Publishable key ở frontend. Không đưa Secret key hoặc Service Role key vào website. Sổ lưu bút là công khai — ai có link đều có thể đọc và gửi lời nhắn. SQL chỉ cấp quyền đọc và thêm lời nhắn, không cấp quyền sửa/xóa. Với sự kiện lớn, nên thêm CAPTCHA hoặc duyệt lời nhắn trước khi công khai.

## 4. Upload lên GitHub bằng trình duyệt

1. Tạo repository mới, ví dụ `thiep-moi`, chọn **Public**.
2. Chọn **Add file → Upload files**.
3. Upload các file ở thư mục gốc: `index.html`, `styles.css`, `config.js`, `script.js`, `supabase.sql`, `README.md`.
4. Upload toàn bộ thư mục `images` và các ảnh bên trong.
5. Upload thư mục `music` và file `lofi-original.wav` bên trong.
6. Nhấn **Commit changes**.

Giữ nguyên cấu trúc thư mục, đặc biệt là `images/` và `music/`, để đường dẫn ảnh và nhạc không bị lỗi.

## 5. Bật GitHub Pages

1. Vào repository → **Settings → Pages**.
2. Ở **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn branch `main` và folder `/(root)`.
4. Nhấn **Save**.
5. Khi GitHub hoàn tất, website có địa chỉ dạng `https://TEN-GITHUB.github.io/thiep-moi/`.

File `index.html` phải nằm ngay thư mục gốc của branch được xuất bản.

## 6. Thay nhạc nền

Upload file MP3/WAV bạn có quyền sử dụng vào thư mục `music/`, rồi sửa `musicPath` trong `config.js`, ví dụ:

```js
musicPath: "music/nhac-cua-minh.mp3"
```

Nhạc bắt đầu sau khi khách bấm mở thư vì trình duyệt thường chặn phát âm thanh tự động trước tương tác.

## 7. Kiểm tra trước khi gửi bạn bè

- Mở link trên điện thoại.
- Bấm **MỞ THƯ NHA**: phong bì mở, trang cuộn đến lá thư và nhạc bắt đầu phát.
- Vuốt xuống để kiểm tra các phần, album ảnh và nút bản đồ.
- Sau khi kết nối Supabase, thử gửi một lời nhắn rồi mở link ở trình duyệt khác để kiểm tra lời nhắn vẫn hiển thị.

Nếu lời nhắn không gửi được, kiểm tra `url`, `publishableKey`, bảng `guestbook` và chính sách RLS trong Supabase.
