# Roadmap CoLQ 2.0

Phạm vi đã giao dừng sau M0. Mỗi milestone sau cần được giao riêng. Chỉ triển khai từ xa khi chủ dự án cho phép.

| Milestone | Trạng thái | Tiêu chí chính |
| --- | --- | --- |
| M0 · Audit và bootstrap | DONE | Nền local, audit chỉ đọc, sáu route, tokens, build/typecheck và Chrome smoke test. GitHub chờ xác nhận quyền hoặc khởi tạo. |
| M1 · Thư viện và kiểm tra tương đương | NOT STARTED | Dữ liệu thật, so sánh hồ sơ/ảnh/URL, responsive và khả năng hoàn tác |
| M2 · Đăng nhập và Creator Studio | NOT STARTED | Spike runtime/auth, phân quyền theo chủ sở hữu, xuất bản bài, lưu lịch sử và bảo vệ nháp |
| M3 · Tương tác và kiểm duyệt | NOT STARTED | Reaction duy nhất, bình luận hai cấp, báo cáo, phân quyền và chống lạm dụng |
| M4 · Bình chọn yêu thích | NOT STARTED | Gắn hồ sơ thư viện, một phiếu, đổi phiếu trước khi đóng, kết quả lịch sử |
| M5 · Xây đội hình | NOT STARTED | Quy tắc game có bằng chứng, bố trí và chia sẻ, kiểm thử mobile |
| M6 · Theo dõi Creator và bình chọn sức mạnh | NOT STARTED | Quan hệ theo dõi duy nhất và bình chọn sức mạnh có nhãn cộng đồng |

- Xem tiêu chí từng milestone trong [đặc tả sản phẩm](docs/planning/CoLQ_Product_Spec_v1.md) và [prompt triển khai](docs/planning/CoLQ_Codex_Milestone_Prompts.md).
- M0 qua kiểm tra kiểu, build 7 HTML và điều hướng Chrome ở 5 chiều rộng. Bản tham chiếu CoLQ qua 16/16 test với đầu vào Phase 6. [Báo cáo và bằng chứng](docs/architecture/m0-audit.md)
- Đối chiếu hồ sơ, ảnh, URL và các điều kiện đầu vào tại [checklist M1](docs/architecture/m1-checklist.md).
