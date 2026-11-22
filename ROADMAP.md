# Roadmap CoLQ 2.0

Phạm vi đã giao dừng sau M1 local. M0 đã đồng bộ lên GitHub. M1 nằm trên nhánh local `m1/library` để nghiệm thu.

| Milestone | Trạng thái | Tiêu chí chính |
| --- | --- | --- |
| M0 · Audit và bootstrap | DONE | Đã xác minh `origin/main` tại commit `8b90f8f36b395671e1f92935a0e3c6ce636a1bd2`. |
| M1 · Thư viện và kiểm tra tương đương | DONE | Hoàn tất và kiểm thử local trên `m1/library`. Chờ chủ dự án duyệt trước khi push hoặc chuyển sang M2. |
| M2 · Đăng nhập và Creator Studio | NOT STARTED | Spike runtime/auth, phân quyền theo chủ sở hữu, xuất bản bài, lưu lịch sử và bảo vệ nháp |
| M3 · Tương tác và kiểm duyệt | NOT STARTED | Reaction duy nhất, bình luận hai cấp, báo cáo, phân quyền và chống lạm dụng |
| M4 · Bình chọn yêu thích | NOT STARTED | Gắn hồ sơ thư viện, một phiếu, đổi phiếu trước khi đóng, kết quả lịch sử |
| M5 · Xây đội hình | NOT STARTED | Quy tắc game có bằng chứng, bố trí và chia sẻ, kiểm thử mobile |
| M6 · Theo dõi Creator và bình chọn sức mạnh | NOT STARTED | Quan hệ theo dõi duy nhất và bình chọn sức mạnh có nhãn cộng đồng |

- Xem tiêu chí từng milestone trong [đặc tả sản phẩm](docs/planning/CoLQ_Product_Spec_v1.md) và [prompt triển khai](docs/planning/CoLQ_Codex_Milestone_Prompts.md).
- M0 qua kiểm tra kiểu, build 7 HTML và điều hướng Chrome ở 5 chiều rộng. Bản tham chiếu CoLQ qua 16/16 test với đầu vào Phase 6. [Báo cáo và bằng chứng](docs/architecture/m0-audit.md)
- Đối chiếu hồ sơ, ảnh, URL và các điều kiện đầu vào tại [checklist M1](docs/architecture/m1-checklist.md).
- M1 qua kiểm tra kiểu, build 226 HTML, kiểm tra 223 URL cũ, Chrome ở 5 độ rộng và mô phỏng Workers tĩnh. Bằng chứng và quyền ảnh còn mở tại [nghiệm thu M1](docs/architecture/m1-checklist.md#kết-quả-đã-chạy).
