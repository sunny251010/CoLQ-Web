# M1 · Thư viện CoLQ 2.0 và nghiệm thu tương đương

M1 chưa bắt đầu. Triển khai trong `sunny251010/CoLQ-Web` sau khi duyệt M0. Mục tiêu là người đọc mở được nội dung thư viện thật trong shell mới, bằng route ổn định và với nguồn dữ liệu minh bạch.

| Thứ tự | Hạng mục | Tiêu chí qua |
| --- | --- | --- |
| 1 | Chốt đầu vào và lưu baseline | Ghim revision, JSON nguồn, hai manifest theo hash và bản diff hai sửa đổi local. Chốt URL `/huong-dan/`, chính sách alias `/thu-vien/*`, quyền ảnh và quyền staging. Ghi lại mọi khác biệt được chủ dự án duyệt. [Kiểm kê dữ liệu](data-inventory.md) |
| 2 | Viết lớp nhập liệu tĩnh | Dùng `data/current.json`, manifest đóng băng và hai enrichment. Xác minh schema, hash, ID, mọi tham chiếu và liên kết ảnh ở build. Duy trì ID/slug, trạng thái trường và nguồn của dữ liệu bổ sung. So đầu ra với `dist/data/library.json` của snapshot. |
| 3 | Hoàn thiện shell và thư viện | Hoàn thiện header/footer, menu mobile, trang chủ, hub thư viện, nhóm danh mục và trang chi tiết. Tìm tiếng Việt có hoặc không dấu, lọc theo nguồn, giữ lựa chọn trong URL. HTML nội dung chính đọc được khi tắt JS. Kiểm tra thao tác toàn ô trang bị và hiển thị thưởng vàng. |
| 4 | Nghiệm thu dữ liệu và media | 210 chính + 1 phụ, 177/33, 58/27/22/82/18/3 theo danh mục, 121 tham chiếu hai chiều, hai Volkath riêng, 4 mặc định số lượng có nhãn. Kiểm tra 744 mapping tới 269 key, đúng ID/slot/kích thước, nguồn và quyền dùng. Giữ `UNKNOWN` nếu chưa có nguồn mùa. |
| 5 | Kiểm tra URL và runtime | Duyệt từng ngoại lệ bằng [chỉ mục URL](url-inventory.csv). Kiểm kê 211 detail, thử danh mục, tên có dấu, query/filter, hash/anchor, 404, canonical và redirect nếu có. Xác nhận apex/base URL sau khi biết host. Kiểm tra Workers Static Assets local, sau đó staging riêng nếu được phép. Chưa thêm auth/backend vào M1. |
| 6 | Kiểm tra người dùng và rollback | Typecheck, build, đối chiếu tự động ID/trạng thái/URL, kiểm tra bàn phím và screen reader smoke, 360/390/768/1024/1440 px, no horizontal overflow, tìm/lọc/back/reload, lỗi ảnh, empty, console. Lưu ảnh desktop/mobile và bảng chênh lệch. Khôi phục artifact cùng phiên dữ liệu trước nếu phát hiện lệch. |

## Các điều kiện cần duyệt

- Với `/huong-dan/`, phương án ưu tiên là landing mới có lối vào ba bài cũ rồi giữ URL chi tiết. Nếu đổi URL, bổ sung kiểm tra canonical, alias, query/hash và host redirect trước khi phát hành. `/` đổi mục đích thì phải giữ lối vào tính năng tra cứu.
- Chốt phạm vi dùng ảnh và nguồn bảo chứng. Manifest tự ghi `rights.status=UNVERIFIED`. Đối chiếu ảnh trên local theo quyền hiện có. Nghiệm thu ảnh trên môi trường công khai còn phụ thuộc phê duyệt.
- Chốt kho GitHub, quyền push và host staging nếu cần kiểm tra từ xa. Bản build, smoke localhost và inventory có thể kiểm tra trước. Các tài nguyên production đang chạy được tách khỏi quy trình M1.

Mốc sau M1 theo [ROADMAP](../../ROADMAP.md). Hoàn thành M1 cần kết quả chạy thực tế và review của chủ dự án trước M2.
