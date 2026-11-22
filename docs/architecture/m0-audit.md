# Audit M0 · CoLQ 2.0

Ngày 22/11/2026. Phạm vi là audit chỉ đọc hệ thống cũ và bootstrap local website mới. Tài liệu planning, wireframe HTML và hai ảnh preview có sẵn trong `docs/planning/`. Workspace ban đầu chỉ có `AGENTS.md` và `docs/`, chưa có `.git`, `SETUP.md`, roadmap hay hồ sơ quyết định. Các skill local và tài liệu công cụ được nhắc ở cuối AGENTS chưa có trong workspace. Dùng Context7, tài liệu chính thức, Git, Node và trình duyệt local cho các phần tương ứng.

## Git và nguồn bằng chứng

- Repo local dành cho `CoLQ-Web` có nhánh `main` ở `E:\CoLQ` và `origin` đặt theo `https://github.com/sunny251010/CoLQ-Web.git`. `git ls-remote` với thông tin xác thực hiện có trả `Repository not found`. Phần GitHub chưa hoàn tất, các file M0 nằm local và chưa có commit.
- Repo `CoLQ` có `origin/main` và checkout local cùng commit `4b1bbe87b30a401a1f9c9b03fa8bc3965805be75`. Mọi build/test dùng snapshot tạm. Trang cũ khai báo Workers Static Assets từ `dist`, service ảnh dùng Worker riêng với binding R2 và cache immutable. Trạng thái local ba file chỉnh sửa được kiểm kê bằng Git index sao tạm và thao tác chỉ đọc. [Repo tham chiếu](https://github.com/sunny251010/CoLQ)
- Đã dùng `GET` cho 9 trang công khai và 2 URL JSON, tất cả HTTP 200. SHA-256 của `/data/library.json` trùng bản build cũ (`125f36da10cfa84e89cfc13e0af3699c212fadd139db8f9d2ba025a4332f3739`). [Thư viện đang phục vụ](https://colq.sunny-contact-251010.workers.dev/quan-co/)
- Chỉ mục có 227 dòng gồm 221 đầu ra HTML của snapshot (211 chi tiết, 9 landing và `404.html`), 2 URL JSON cũ và 4 landing mới có đường dẫn riêng. Đã kiểm tra 9 landing qua HTTP live. Các detail dựa trên build đã kiểm tra link nội bộ và chưa gọi từng URL live. [Chỉ mục URL](url-inventory.csv)

## Mâu thuẫn và khoảng trống

| Vấn đề | Xử lý M0 |
| --- | --- |
| Planning cũ ghi triển khai tại `CoLQ`, M0 chỉ audit và M1 tạo Astro | Đã đồng bộ Product Spec, prompt M0/M1, roadmap và quyết định theo `CoLQ-Web` mới. |
| Sitemap dự kiến `/thu-vien/*`, nhưng trang cũ có URL gốc và `/huong-dan/` trùng landing cộng đồng mới | Lập inventory theo ID và URL thật. Ưu tiên giữ URL cũ và lối dẫn đến ba bài hướng dẫn cũ. Mọi alias/301 cần phê duyệt trước phát hành. |
| README cũ có đoạn mô tả 220 trang và asset placeholder, phần khác mô tả phục vụ ảnh R2 | Build từ commit tạo 221 HTML, 0 ảnh game được đóng gói. Mẫu live và JSON cho thấy ảnh được tham chiếu đến origin R2. |
| Wireframe có mùa, vị trí bàn cờ, phe và phiếu minh họa | Mùa thực tế chưa xác minh. M0 lấy palette, phân cấp và gợi ý responsive, cùng các trạng thái chuẩn bị hoặc rỗng. |
| Hai sửa đổi từng được báo là local | Đã xác minh ở `E:\LQData\website`. `src/styles.css` và `src/ui/render.js` có thay đổi ngoài index, `src/ui/rewards.js` chưa được track. Bản snapshot cộng ba file sinh 15 SVG ở chi tiết nhiệm vụ và 22 liên kết có vùng nhấp toàn thẻ. Trang live có 15 vị trí thưởng vàng dùng mapping ảnh, còn 22 thẻ trang bị chỉ có liên kết tiêu đề. |
| Better Auth/Drizzle/Tiptap xuất hiện như lựa chọn cụ thể trong milestone | Vai trò sản phẩm đã chốt. Package xác thực/ORM/editor cần xác minh tích hợp và quyền lựa chọn sau spike. |

## Khả năng tái sử dụng

| Yêu cầu | Nguồn | Hướng thực hiện |
| --- | --- | --- |
| Tra cứu thư viện và dữ liệu game | Snapshot JSON, manifest/provenance, hai enrichment, `scripts/data.mjs` | M1 giữ nguyên dữ liệu nguồn, chuyển kiểm tra và rule chuẩn hóa vào adapter build Astro. |
| Ảnh, hash, tham chiếu | Manifest R2, `scripts/shared-assets.mjs` và cấu hình origin | M1 giữ ID/key/URL và dùng lại phân phối có sẵn khi được phép. Đã xác minh 211 hồ sơ, 744 slot, 269 key và SHA-256 manifest live trùng Git. Sáu object PNG mẫu đều khớp số byte và hash, trả cache `immutable` và CORS `*`. [Manifest](https://lq-assets.sunny-contact-251010.workers.dev/lq/releases/lq-encyclopedia-observed-v1/manifest.json) |
| Tìm, lọc, liên kết hồ sơ | `src/lib/catalog.js`, `src/app.js`, hàm tạo `href` trong `scripts/data.mjs` | Chuyển logic chuẩn hóa tiếng Việt, bộ lọc và ID ổn định. Viết markup Astro theo UI mới và dùng hành vi của bản cũ để kiểm thử tương đương. |
| Nền điều hướng và SEO | Công việc M0 và sitemap Product Spec | M1 hoàn chỉnh shell, trang chủ và trang thư viện. So URL, query, anchor và canonical trước khi xử lý redirect. |
| Google OAuth, Creator Studio, bài và moderation | Repo cũ là static, đặc tả đã có yêu cầu sản phẩm | M2 dựng auth và bài sau spike. M3 thêm reaction, bình luận hai cấp và moderation. |
| Bình chọn, Builder, theo dõi | ID/dataset sau M1 và quy tắc nghiệp vụ từ Product Spec | M4 làm bình chọn yêu thích. M5 làm Builder khi có quy tắc game được xác minh. M6 thêm theo dõi và bình chọn sức mạnh. |

## Kiểm tra thực tế

| Lệnh hoặc kiểm tra | Kết quả |
| --- | --- |
| `npm.cmd install --no-audit --no-fund` trên Windows PowerShell, Node `24.18.0` và npm `12.2.0` | PASS, lockfile có Astro `6.4.8`, TypeScript `5.9.3`, `@astrojs/check` `0.9.12`. npm 12 giữ policy chặn postinstall không được cho phép (esbuild và sharp). |
| `npm.cmd run check` | PASS, 12 file, 0 lỗi, 0 cảnh báo, 0 gợi ý. |
| `npm.cmd run build` | PASS, 7 HTML gồm sáu landing và trang 404. |
| `npm.cmd run preview` và Playwright trên Chrome `157.0.8103.80` headless | PASS ở 360/390/768/1024/1440 px. Đã mở sáu đường dẫn qua nav, reload, kiểm tra `aria-current`, focus và skip link, mở menu bằng phím, mục điều hướng cao ít nhất 44 px, không tràn ngang, trạng thái 404 và metadata `noindex`. Sáu landing không có lỗi console hay request ngoài origin. [Ảnh desktop](evidence/m0-desktop-1440.png) · [Ảnh mobile](evidence/m0-mobile-390.png) |
| `npm.cmd run build` trong snapshot CoLQ | PASS, 221 HTML, 210 hồ sơ chính. |
| `npm.cmd test` trong snapshot CoLQ | Lần đầu 15/16 vì thiếu `phase6/latest.json` ngoài clone. Lần chạy lại với pointer và manifest canonical thật đã kiểm tra hash rồi sao ra thư mục tạm đạt 16/16. |
| Build snapshot chứa ba file thay đổi local của CoLQ | PASS khi kiểm tra đầu ra HTML có đủ 15 phần thưởng SVG và 22 liên kết toàn ô theo CSS. Chưa chạy browser test tương tác cho bản local cũ. |
| HTTP live cũ và manifest | PASS trong phạm vi mẫu. Có 11 URL site cũ và manifest trả 200. Sáu trong 269 ảnh được tải để kiểm tra hash và đều khớp. |
| Workers runtime, D1, R2 Creator, đăng nhập và tương tác mới | SKIP, các dịch vụ và nghiệp vụ mới chưa nằm trong phạm vi chạy thực tế M0. |

## Rủi ro và điều còn thiếu

1. Xác nhận quyền ảnh và mức độ cho phép trên domain/repo mới. Có quyền tải ảnh đang công khai chưa đủ để xác nhận quyền sử dụng lại.
2. Xử lý xung đột `/huong-dan/`, vai trò của `/` và có cần alias `/thu-vien/*`. Mất URL, query hoặc hash có thể làm hỏng bookmark và SEO.
3. Ghim bản diff local đã xác minh để hai sửa đổi được đưa vào baseline parity và tái hiện được.
4. Mùa, bàn cờ và synergy chưa có nguồn xác minh. Giữ `UNKNOWN` và hoãn tính năng suy ra các quy tắc này.
5. Xác nhận repo GitHub, quyền push, domain/callback và quyền dùng staging tách biệt. Không có bằng chứng triển khai remote của CoLQ-Web trong M0.
6. Xác minh adapter/Workers, auth và migration trong runtime mục tiêu. Thử phân quyền và thao tác ghi D1 dưới tải đồng thời.
7. Đo quota, CPU, D1 và R2 khi có tải thật. Chuẩn bị phục hồi khi chuyển host hoặc thêm dữ liệu có ghi.

[Kiến trúc](migration-plan.md) · [Kiểm kê dữ liệu](data-inventory.md) · [Checklist M1](m1-checklist.md)
