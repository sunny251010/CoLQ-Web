# Kiến trúc CoLQ 2.0

## Nền tảng và lựa chọn kỹ thuật

| Thành phần | Vai trò và lý do |
| --- | --- |
| Astro 6.4.8 và HTML tĩnh | Đã dùng ở M0. Định tuyến theo file, HTML có sẵn khi tải và điều hướng chạy bằng liên kết. Kiến trúc cho phép thêm SSR theo route khi cần dữ liệu động. |
| TypeScript 5.9.3, `@astrojs/check` 0.9.12, npm | Đã ghim phiên bản và lockfile. Chế độ strict kiểm tra component và hợp đồng dữ liệu. npm quản lý dependency cho ứng dụng. |
| CSS native và font hệ thống | Đã dùng ở M0. Giữ bảng màu Dark Gaming, font hỗ trợ tiếng Việt, input touch 44 px, focus rõ và dung lượng tải thấp. |
| JSON đóng băng, adapter nhập liệu, Astro routes tĩnh | M1 thử import ở thời điểm build. Giữ manifest và JSON nguồn theo phiên, chiếu ra model công khai có kiểm tra kiểu. Dùng Astro Content Collections nếu thử nghiệm cho thấy phù hợp với JSON lồng và ID cũ. |
| Cloudflare Workers và Workers Static Assets | Phục vụ HTML/CSS/JSON tĩnh và xử lý SSR/API trong cùng ứng dụng khi có nghiệp vụ. M1 xác minh bản static trong môi trường local tương thích. M2 cần adapter tương thích Astro 6, workerd và bindings. |
| Cloudflare D1 | Giữ dữ liệu quan hệ của session, vai trò, bài, tương tác và poll. Ràng buộc SQL và ghi nguyên tử giữ tính nhất quán khi nhiều yêu cầu đến cùng lúc. |
| Cloudflare R2 | Tái sử dụng origin đọc công khai của thư viện sau xác minh quyền. Media Creator dùng namespace và quyền riêng để kiểm soát nháp, xuất bản và chi phí. |
| Google OAuth, Better Auth và Drizzle | Google đã được chốt. Better Auth với D1 trực tiếp và Better Auth qua Drizzle D1 là hai phương án cần thử. Chỉ chọn package sau khi chạy được luồng session và migration trong runtime mục tiêu. |

[Astro 6 và Node](https://v6.docs.astro.build/en/guides/upgrade-to/v6/) · [Astro TypeScript](https://v6.docs.astro.build/en/guides/typescript/) · [Astro trên Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/) · [Better Auth trên Cloudflare](https://better-auth.com/docs/guides/cloudflare)

## Render, định tuyến và cache

| Bề mặt | Cách phục vụ dự kiến | Điều kiện |
| --- | --- | --- |
| Trang chủ, thư viện, tài nguyên | HTML prerender, tài nguyên tĩnh và ảnh theo key bất biến tại origin thích hợp | Dữ liệu hợp lệ tại build, ảnh có kích thước từ manifest và CSS/JS local. Chỉ dùng JS cho tương tác cần thiết. |
| Danh sách và bài Creator, hồ sơ Creator, kết quả poll | SSR công khai có nội dung trong HTML và chỉ cache phản hồi độc lập với session | Bản nháp hoặc bài ẩn trả 404 ngoài phạm vi xem trước. Kiểm thử việc xóa cache hoặc hết TTL sau khi ẩn bài. |
| Studio, admin, xem trước, auth và API ghi | Worker đọc session, kiểm tra quyền và đặt `Cache-Control: private, no-store` | Đặt `noindex` cho trang riêng. Mọi thao tác ghi có kiểm tra quyền, origin/CSRF, payload và rate limit phù hợp. |

Đường dẫn và canonical thuộc một host được duyệt. Khi có domain, chỉ đưa URL canonical đã xuất bản vào sitemap và đặt title, mô tả, Open Graph cùng breadcrumb phù hợp. M0 đặt `noindex, nofollow` cho bản chuẩn bị. Hồ sơ không tồn tại trả 404. Chỉ bật redirect 301 theo mapping đã duyệt. Giữ query có ý nghĩa, ID cũ và kiểm chứng hash/anchor bằng trình duyệt vì phần này vắng mặt trong HTTP request. [Chỉ mục URL](url-inventory.csv)

## Phân quyền và Creator Studio · M2

1. Google OAuth tạo hoặc tìm account theo `(provider, subject)` và một user ID nội bộ. Lời mời dùng email đã xác minh từ Google, có thời hạn và dùng được một lần. Gắn lời mời vào user ID trong thao tác ghi nguyên tử có audit. Lập chính sách bootstrap admin riêng. Session cookie dùng `HttpOnly`, `Secure` khi HTTPS và SameSite phù hợp callback. Kiểm thử `state`, origin và URL quay lại nội bộ.
2. Server kiểm tra session, trạng thái quyền và ownership trên mọi endpoint ghi hoặc đọc bản nháp. Thu hồi Creator chặn ngay tạo/sửa/xuất bản, kể cả session tạo trước khi thu hồi. Kiểm tra `author_id` ngay trong câu lệnh ghi để tránh điều kiện tranh chấp. Admin can thiệp có audit gồm người thực hiện, mục tiêu, thao tác, mốc thời gian và lý do.
3. Creator tạo bài đội hình hoặc hướng dẫn. Bài đội hình chọn hồ sơ đã xác minh, mùa nếu có nguồn và tier tự đánh giá. Editor dùng allowlist cho cấu trúc nội dung, chỉ chấp nhận URL YouTube/TikTok phù hợp và tải embed khi nhấp. Creator xem trước bản nháp riêng tư, tự xuất bản rồi có thể cập nhật hoặc ẩn. Nội dung và phiên bản được lưu cùng thao tác ghi nhất quán. Đội hình trùng của hai tác giả giữ hai post ID riêng.
4. Upload dùng key theo chủ sở hữu và phiên tải. Worker xác nhận quyền trước khi cấp URL ký hạn ngắn. Ảnh nằm ở vùng riêng trong lúc chờ kiểm tra kích thước, loại, byte, khả năng ghi đè và ownership trước khi gắn vào bài. Dùng key công khai bất biến riêng của bản đã xác minh để URL ký còn hiệu lực không ghi đè ảnh đã duyệt. D1 lưu liên kết và trạng thái. Dọn file mồ côi theo đợt có giới hạn và cho phép thử lại an toàn. [R2 presigned URLs](https://developers.cloudflare.com/r2/api/s3/presigned-urls/)

| Kiểm thử quyền | Kỳ vọng |
| --- | --- |
| Khách đọc bài public, đoán URL xem trước hoặc gọi API ghi | Bài public đọc được, phần riêng từ chối hoặc 404, hành động ghi cần session |
| Thành viên thường hoặc Creator đã bị thu hồi gửi yêu cầu publish | Trả từ chối quyền, không cập nhật bài hay ghi phiên bản mới |
| Creator A dùng ID bài/ảnh của B để sửa, publish hoặc đọc bản nháp | Từ chối qua server, dữ liệu của B giữ nguyên |
| Creator tự đăng bài, admin can thiệp có lý do | Xuất bản đúng trạng thái và ghi audit cho thao tác admin và thu hồi |
| Phiên hết hạn, replay invite, callback sai origin, quay lại URL ngoài | Từ chối hoặc đưa về đường dẫn hợp lệ, ghi tối thiểu dữ liệu chẩn đoán |

## Môi trường, migration và hoàn tác

- **M1 local.** Kiểm tra Astro tĩnh trên mô phỏng Workers, static-asset routing, 404 và trailing slash. Khi cần xác nhận sớm đường SSR, chọn cặp Astro/adapter có `peerDependencies` phù hợp và thử một route prerender cùng một route SSR đọc binding mẫu trên workerd.
- **M2 local và staging.** So Better Auth với D1 trực tiếp và Better Auth qua Drizzle D1. So sánh schema sinh ra, migration SQL, API Node khả dụng, kích thước bundle, session rotation, Google callback/revoke và hành vi ghi cạnh tranh. Dùng server-side secret và callback đúng origin môi trường. Áp migration qua quy trình vận hành riêng đã kiểm duyệt.
- **Dữ liệu sống.** Tách Worker, D1, R2 Creator và OAuth client/callback giữa staging và production. Ticket phát hành cần dự toán quota, backup và diễn tập restore, phiên bản ứng dụng tương thích schema cũ/mới, kiểm thử 404/redirect/media và phương án giữ host cũ. Dùng prepared statements, index đo bằng query thật và `batch()` hoặc một câu lệnh nguyên tử khi ghi cần nhất quán. [D1 binding API](https://developers.cloudflare.com/d1/worker-api/d1-database/) · [D1 limits](https://developers.cloudflare.com/d1/platform/limits/) · [Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
- **Hoàn tác.** M1 quay về artifact, dataset và manifest ghim trước đó. Nếu cutover riêng được phê duyệt, giữ baseline và cấu hình routing của host cũ để bỏ mapping lỗi. Từ M2, dùng migration tương thích và quy trình restore đã diễn tập cho dữ liệu D1 và object R2. Nếu đã có lượt ghi mới, chuẩn bị đồng bộ hoặc khắc phục bằng bản tiếp theo để giữ dữ liệu.
- **Vận hành.** Log lỗi theo route và request ID, giới hạn PII, loại token, cookie và body nhạy cảm. Đo chi phí qua Worker requests, thời gian CPU, D1 rows read/written, R2 ops/storage và cache hit, rồi đặt ngưỡng theo traffic đã quan sát. Kiểm tra LCP/INP/CLS trên luồng thật theo Product Spec khi có dữ liệu.
