/*
  CHỈNH THÔNG TIN THIỆP TẠI ĐÂY.
  Không cần sửa script.js nếu chỉ thay tên, ngày, địa điểm, ảnh hoặc nhạc.
*/
window.INVITATION_CONFIG = {
  // Nội dung hiển thị
  coverEyebrow: "MỘT LỜI MỜI NHỎ",
  greeting: "Thân gửi bạn,",
  hostName: "Tên người mời",
  eventName: "Một buổi gặp mặt thân mật",
  letterParagraphs: [
    "Có những dịp trở nên đáng nhớ không phải vì điều gì quá lớn lao, mà bởi những người mình được gặp và những khoảnh khắc được sẻ chia.",
    "Mình muốn dành một ngày thật đặc biệt để gặp gỡ, trò chuyện và lưu lại vài kỷ niệm đẹp. Và mình rất mong bạn sẽ có mặt."
  ],

  // THAY các giá trị mẫu bên dưới bằng thông tin sự kiện thật
  eventDateISO: "2026-12-20T18:00:00+07:00", // định dạng YYYY-MM-DDTHH:mm:ss+07:00
  dateLabel: "20 tháng 12, 2026",
  timeLabel: "18:00",
  locationName: "Địa điểm tổ chức",
  address: "Địa chỉ sẽ được cập nhật",
  mapUrl: "", // Dán link Google Maps vào giữa hai dấu ngoặc kép

  // Ảnh: thay file trong images hoặc sửa đường dẫn ở đây
  galleryImages: [
    "images/moment-01.svg",
    "images/moment-02.svg",
    "images/moment-03.svg"
  ],

  // Nhạc: mặc định là bản lofi nguyên bản có sẵn trong thư mục music
  musicPath: "music/lofi-original.wav"
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
  url: "",
  publishableKey: ""
};
