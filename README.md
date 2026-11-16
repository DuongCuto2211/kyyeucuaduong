# Thiệp mời online — Minimalist

Website thiệp mời một trang, tối ưu cho điện thoại, gồm phong bì mở thư, nhạc lofi nguyên bản, nội dung thư, chi tiết sự kiện, đếm ngược, album ảnh và sổ lưu bút công khai.

## Các file trong dự án

- `index.html` — cấu trúc các phần của website.
- `styles.css` — giao diện responsive, hiệu ứng mở phong bì và chuyển động khi cuộn.
- `config.js` — nơi sửa tên, lời mời, thời gian, địa điểm, ảnh, nhạc và thông tin kết nối Supabase.
- `script.js` — xử lý mở thư, nhạc, đếm ngược, album và sổ lưu bút.
- `supabase.sql` — tạo bảng và quyền truy cập cho sổ lưu bút.
- `images/` — các ảnh SVG minh họa có sẵn, có thể thay bằng ảnh của bạn.
- `music/lofi-original.wav` — nhạc lofi nền nguyên bản đi kèm.

## 1. Chỉnh nội dung thiệp trước khi đăng

Mở `config.js` và sửa các trường sau:

- `hostName`: tên người gửi thiệp.
- `eventName`: tên buổi tiệc/sự kiện.
- `greeting` và `letterParagraphs`: lời mở đầu và nội dung thư.
- `eventDateISO`: ngày giờ theo mẫu `2026-12-20T18:00:00+07:00`.
- `dateLabel`, `timeLabel`, `locationName`, `address`: thông tin hiển thị.
- `mapUrl`: link Google Maps đầy đủ, bắt đầu bằng `https://`.

Ngày 20/12/2026 hiện tại chỉ là dữ liệu minh họa. Hãy đổi ngày và giờ cho đúng sự kiện của bạn.

## 2. Kết nối sổ lưu bút công khai bằng Supabase

GitHub Pages chỉ host file tĩnh, không tự lưu lời nhắn của khách. Supabase cung cấp cơ sở dữ liệu cho chức năng này.

1. Tạo tài khoản và project tại <https://supabase.com/>.
2. Mở project, vào **SQL Editor** → **New query**.
3. Mở file `supabase.sql` trong dự án này, sao chép toàn bộ nội dung, dán vào SQL Editor rồi nhấn **Run**.
4. Vào **Project Settings → API Keys** (hoặc mục **Connect** tùy giao diện).
5. Sao chép **Project URL** và **Publishable key**.
6. Mở `config.js`, dán vào hai trường `url` và `publishableKey` trong `window.SUPABASE_CONFIG`.
7. Commit lại `config.js` lên GitHub sau khi sửa.

**Bảo mật:** Publishable key được thiết kế để dùng trong trình duyệt. Không bao giờ đưa `secret key` hoặc `service_role` key vào `config.js` hay bất kỳ file frontend nào. SQL đã bật RLS, chỉ cấp quyền đọc và thêm lời nhắn cho khách chưa đăng nhập; khách không có quyền sửa hoặc xóa lời nhắn.

Lưu ý: sổ lưu bút là công khai — bất kỳ ai có link đều có thể đọc và gửi lời nhắn. SQL giới hạn độ dài, từ chối URL và không cấp quyền sửa/xóa, nhưng một website công khai vẫn có thể bị spam. Với sự kiện lớn, nên bổ sung CAPTCHA hoặc cơ chế duyệt lời nhắn trước khi công khai.

## 3. Upload dự án lên GitHub bằng trình duyệt

1. Tạo repository mới, ví dụ `thiep-moi`, chọn **Public**.
2. Trong repository, chọn **Add file → Upload files**.
3. Upload các file ở thư mục gốc: `index.html`, `styles.css`, `config.js`, `script.js`, `supabase.sql`, `README.md`.
4. Upload toàn bộ thư mục `images` (có `favicon.svg`, `moment-01.svg`, `moment-02.svg`, `moment-03.svg`) để giữ nguyên đường dẫn.
5. Upload thư mục `music` và file `lofi-original.wav` bên trong.
6. Nhấn **Commit changes**.

Nếu GitHub không giữ thư mục khi kéo thả, hãy tạo thư mục trước bằng cách tạo file có đường dẫn `images/.gitkeep`, commit; mở thư mục `images` rồi upload các ảnh vào đó. Làm tương tự với `music`.

## 4. Bật GitHub Pages

1. Vào repository → **Settings → Pages**.
2. Ở **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn branch `main` và folder `/(root)`.
4. Nhấn **Save**.
5. Chờ GitHub triển khai, sau đó mở địa chỉ có dạng `https://TEN-GITHUB.github.io/thiep-moi/`.

File `index.html` phải nằm ngay thư mục gốc của branch đang publish.

## 5. Thay ảnh và nhạc

### Thay ảnh

Cách đơn giản nhất: upload ảnh mới vào `images/`, sau đó sửa `galleryImages` trong `config.js`, ví dụ:

```js
galleryImages: [
  "images/anh-1.jpg",
  "images/anh-2.jpg",
  "images/anh-3.jpg"
]
```

Tên file và chữ hoa/thường phải khớp chính xác. Nên nén ảnh về JPG/WebP, cạnh dài khoảng 1600 px là đủ đẹp cho thiệp điện thoại.

### Thay nhạc

Upload MP3/WAV bạn có quyền sử dụng vào thư mục `music/`, rồi đổi `musicPath`, ví dụ:

```js
musicPath: "music/ban-nhac-cua-ban.mp3"
```

Nhạc chỉ bắt đầu sau khi khách chạm nút mở thư vì trình duyệt thường chặn tự phát âm thanh trước tương tác.

## 6. Kiểm tra sau khi đăng

- Mở link trên điện thoại và máy tính.
- Chạm **MỞ THƯ**: phong bì mở, trang cuộn đến lá thư và nhạc bắt đầu phát.
- Cuộn xuống từng phần.
- Gửi thử một lời nhắn. Tải lại trang hoặc mở link ở trình duyệt khác để kiểm tra lời nhắn vẫn hiển thị.
- Kiểm tra nút bản đồ nếu đã nhập `mapUrl`.

Nếu sổ lưu bút không hoạt động, kiểm tra lại `url`, `publishableKey`, đã chạy `supabase.sql` chưa và bảng `guestbook` có nằm trong schema `public` hay không.
