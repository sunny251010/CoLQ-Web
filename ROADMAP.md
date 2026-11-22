# Roadmap CoLQ 2.0

M0 đã có trên GitHub. M1 được chốt trên `m1/library` để review trước khi hợp nhất. Nền xác thực M2A theo nhánh local riêng.

Ưu tiên hiện tại là năm trang chính theo thứ tự Trang chủ → Đội hình → Hướng dẫn & Mẹo → Thư viện → Liên hệ & Góp ý. Công cụ và Bình chọn được tạm gác. Mặc định sửa, kiểm thử và commit ở local. Push và deploy cần yêu cầu phát hành cụ thể.

Đợt phát hành preview hiện tại đã được duyệt, gồm menu năm mục, tối ưu ảnh, menu Thư viện mở Quân cờ và bỏ công thức ghép trang bị khỏi giao diện.

Menu năm trang đã kiểm thử bằng Chrome local ở 390, 1024 và 1440 px, đúng thứ tự và trạng thái trang hiện tại. Typecheck đạt, build 224 HTML và xác minh đủ 223 URL cũ. Trang Liên hệ & Góp ý dùng GitHub Issues hiện có. Trang Đội hình vẫn chờ nội dung cộng đồng.

| Milestone | Trạng thái | Tiêu chí chính |
| --- | --- | --- |
| M0 · Audit và bootstrap | DONE | Đã xác minh `origin/main` tại commit `8b90f8f36b395671e1f92935a0e3c6ce636a1bd2`. |
| M1 · Thư viện và kiểm tra tương đương | DONE | Hoàn tất và kiểm thử trên `m1/library`. Chủ dự án đã duyệt push nhánh để mở PR. |
| M2 · Đăng nhập và Creator Studio | NOT STARTED | Spike runtime/auth, phân quyền theo chủ sở hữu, xuất bản bài, lưu lịch sử và bảo vệ nháp |
| M3 · Tương tác và kiểm duyệt | NOT STARTED | Reaction duy nhất, bình luận hai cấp, báo cáo, phân quyền và chống lạm dụng |
| M4 · Bình chọn yêu thích | NOT STARTED | Tạm gác theo quyết định tập trung năm trang chính. |
| M5 · Xây đội hình | NOT STARTED | Công cụ Builder tạm gác. Trang Đội hình vẫn thuộc menu chính. |
| M6 · Theo dõi Creator và bình chọn sức mạnh | NOT STARTED | Phần bình chọn sức mạnh tạm gác. Theo dõi Creator chờ phase riêng. |

- Xem tiêu chí từng milestone trong [đặc tả sản phẩm](docs/planning/CoLQ_Product_Spec_v1.md) và [prompt triển khai](docs/planning/CoLQ_Codex_Milestone_Prompts.md).
- M0 qua kiểm tra kiểu, build 7 HTML và điều hướng Chrome ở 5 chiều rộng. Bản tham chiếu CoLQ qua 16/16 test với đầu vào Phase 6. [Báo cáo và bằng chứng](docs/architecture/m0-audit.md)
- Đối chiếu hồ sơ, ảnh, URL và các điều kiện đầu vào tại [checklist M1](docs/architecture/m1-checklist.md).
- M1 qua kiểm tra kiểu, build 226 HTML, kiểm tra 223 URL cũ, Chrome ở 5 độ rộng và mô phỏng Workers tĩnh. Bằng chứng và quyền ảnh còn mở tại [nghiệm thu M1](docs/architecture/m1-checklist.md#kết-quả-đã-chạy).
- Bản xem trước dùng một Worker riêng, build từ nhánh GitHub `preview/cloudflare`. Đã kiểm tra kiểu, build 226 trang HTML, xác minh 223 URL cũ và chạy Wrangler dry run trên cấu hình preview.
