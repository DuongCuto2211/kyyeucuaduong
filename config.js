/*
  CHỈNH THÔNG TIN THIỆP TẠI ĐÂY.
  Không cần sửa script.js nếu chỉ thay tên, ngày, địa điểm, ảnh hoặc nhạc.
*/
window.INVITATION_CONFIG = {
  // Nội dung hiển thị
  coverEyebrow: "CÓ MỘT CHIẾC HẸN NÈ",
  greeting: "Này bạn ơi,",
  hostName: "Tên bạn",
  eventName: "Một buổi tụ tập nho nhỏ",
  letterParagraphs: [
    "Dạo này mỗi đứa một việc, lâu lâu mới có dịp ngồi lại với nhau. Nghĩ cũng nhớ những lần cả nhóm tụ tập, nói chuyện trên trời dưới đất rồi cười mãi không thôi.",
    "Thế nên mình muốn rủ mọi người gặp nhau một hôm, ăn uống, tám chuyện và chụp thêm vài tấm hình làm kỷ niệm. Không cần gì cầu kỳ đâu, chỉ cần mọi người có mặt là vui rồi. Nhớ đến nha!"
  ],

  // THAY các giá trị mẫu bên dưới bằng thông tin sự kiện thật
  eventDateISO: "2026-12-20T18:00:00+07:00", // định dạng YYYY-MM-DDTHH:mm:ss+07:00
  dateLabel: "20 tháng 12, 2026", // Ngày minh họa — nhớ đổi thành ngày thật
  timeLabel: "18:00",
  locationName: "Chỗ hẹn của tụi mình",
  address: "Thêm địa chỉ cụ thể vào đây nha",
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
