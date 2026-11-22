# Quyết định CoLQ 2.0

Phạm vi hiện hành là M0. Chủ dự án duyệt trước khi bắt đầu M1. Yêu cầu M0 ngày 22/11/2026 ưu tiên hơn phần planning cũ khi có mâu thuẫn.

| Trạng thái | Quyết định |
| --- | --- |
| CONFIRMED | `sunny251010/CoLQ-Web` là đích cho website mới. `sunny251010/CoLQ` được khảo sát chỉ đọc để giữ dữ liệu, asset, URL và bản sửa còn giá trị. Thay thế hướng triển khai trực tiếp trong repo cũ. |
| CONFIRMED | M0 gồm audit, scaffold Astro + TypeScript, tokens Dark Gaming UI, sáu điểm vào công khai và thiết kế kỹ thuật. Thay thế phạm vi M0 chỉ audit trong prompt cũ. |
| CONFIRMED | Website cộng đồng không quảng cáo, đọc công khai và có sáu nav theo Product Spec. Nội dung game và mùa cần nguồn kiểm chứng. |
| CONFIRMED | Cloudflare-first với Workers, D1 cho dữ liệu động và R2 cho ảnh. M0 kiểm tra local, các thay đổi và triển khai từ xa cần quyền riêng. |
| CONFIRMED | Google là phương thức đăng nhập đầu tiên. Creator theo lời mời, tự đăng, tự gắn tier và sửa bài của mình. Admin xử lý vi phạm và có audit. |
| CONFIRMED | Bình chọn yêu thích trước bình chọn sức mạnh. Có tối đa một phiếu mỗi tài khoản/cuộc, đổi được khi đang mở. Theo dõi Creator sau reaction và bình luận. |
| PROPOSED | Giữ URL thư viện cũ làm URL ổn định nếu khả thi. Duyệt cách xử lý `/huong-dan/` và từng URL cần chuyển sau audit. |
| OPEN | Quyền dùng ảnh ở CoLQ-Web, quyền phát hành repo và môi trường staging. Phạm vi của phân loại mùa và quy tắc Builder cần nguồn game bổ sung. |
| PROPOSED | Dùng bản sửa local đã kiểm kê cho SVG thưởng vàng và liên kết toàn ô trang bị làm đầu vào M1. Ghim bản diff hoặc snapshot trước khi port. |
| OPEN | Cặp phiên bản adapter/Workers, thư viện auth, phương án schema/migrations và editor cần spike. Google OAuth staging cần callback và thông tin xác thực do chủ dự án quản lý. |
| DEFERRED | Auth, Creator Studio và nội dung động từ M2. Tương tác từ M3, bình chọn ở M4/M6 và Builder theo dữ liệu thực ở M5. |

[Đặc tả sản phẩm](docs/planning/CoLQ_Product_Spec_v1.md) ghi các quy tắc chi tiết. [Kế hoạch kiến trúc](docs/architecture/migration-plan.md) ghi phương án cần kiểm chứng.
