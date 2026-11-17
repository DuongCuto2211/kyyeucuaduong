/*
  CHỈNH THÔNG TIN THIỆP TẠI ĐÂY.
  Không cần sửa script.js nếu chỉ thay tên, ngày, địa điểm, ảnh hoặc nhạc.
*/
window.INVITATION_CONFIG = {
  // Nội dung hiển thị
  coverEyebrow: "MỘT LỜI MỜI NHỎ",
  greeting: "Thân gửi",
  hostName: "duongcuto2211",
  eventName: "Buổi Kỷ Yếu Nho Nhỏ Của Dương",
  letterParagraphs: [
    "Ba năm c3 chớp mắt cái là hết",
    "Ngày chụp kỷ yếu sắp đến rồi!!!mong có cậu đến góp vui."
  ],

  // THAY các giá trị mẫu bên dưới bằng thông tin sự kiện thật
  eventDateISO: "2026-11-29T18:00:00+07:00", // định dạng YYYY-MM-DDTHH:mm:ss+07:00
  dateLabel: "29 tháng 11, 2026",
  timeLabel: "9:00-10:30",
  locationName: "Địa điểm chụp ảnh",
  address: "Trường THPT Cẩm Lý",
  mapUrl: "https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+THPT+C%E1%BA%A9m+L%C3%BD/@21.2193859,106.3683307,17z/data=!3m1!4b1!4m6!3m5!1s0x31357ac76b275837:0x6e9da6024c88506!8m2!3d21.2193809!4d106.3709056!16s%2Fg%2F1v1tkkcn?hl=vi&entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D", // Dán link Google Maps vào giữa hai dấu ngoặc kép

  // Ảnh: thay file trong images hoặc sửa đường dẫn ở đây
  galleryImages: [
    "images/moment-01.jpg",
    "images/moment-02.jpg",
    "images/moment-03.jpg"
  ],

  // Nhạc: mặc định là bản lofi nguyên bản có sẵn trong thư mục music
  musicPath: "music/lofi-original.mp3"
};

/*
  KẾT NỐI SỔ LƯU BÚT SUPABASE
  1. Tạo project tại https://supabase.com/
  2. Chạy nội dung file supabase.sql trong SQL Editor.
  3. Vào Project Settings > API Keys, sao chép Project URL và Publishable key.
  4. Dán vào hai dòng dưới đây.

  Chỉ dùng Publishable key (hoặc anon key cũ), TUYỆT ĐỐI không dùng secret/service_role key.
*/
window.SUPABASE_CONFIG = {
  url: "https://rxyjaeqayxlsrmkgfnot.supabase.co/rest/v1/",
  publishableKey: "sb_publishable_FBI9BJUGhi6pUOr7qoIDqg_65FtRpzz"
};
