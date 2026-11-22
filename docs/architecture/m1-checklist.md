# M1 · Thư viện CoLQ 2.0 và nghiệm thu tương đương

M1 triển khai local trên nhánh `m1/library`, sau khi M0 được đồng bộ lên `main`. Mục tiêu là truy cập thư viện thật bằng URL ổn định và xem được nguồn cùng trạng thái xác minh.

| Thứ tự | Hạng mục | Tiêu chí qua |
| --- | --- | --- |
| 1 | Chốt đầu vào và lưu baseline | Ghim revision, JSON nguồn, hai manifest theo hash và bản diff hai sửa đổi local. Chốt URL `/huong-dan/`, chính sách alias `/thu-vien/*`, quyền ảnh và quyền staging. Ghi lại mọi khác biệt được chủ dự án duyệt. [Kiểm kê dữ liệu](data-inventory.md) |
| 2 | Viết lớp nhập liệu tĩnh | Dùng snapshot công khai đã được adapter cũ xác minh từ `data/current.json`, manifest đóng băng và hai enrichment. Xác minh kiểu, hash, ID, tham chiếu và liên kết ảnh ở build. Duy trì ID/slug, trạng thái trường và nguồn dữ liệu bổ sung. So đầu ra với `dist/data/library.json` của CoLQ. |
| 3 | Hoàn thiện shell và thư viện | Hoàn thiện header/footer, menu mobile, trang chủ, hub thư viện, nhóm danh mục và trang chi tiết. Tìm tiếng Việt có hoặc không dấu, lọc theo nguồn, giữ lựa chọn trong URL. HTML nội dung chính đọc được khi tắt JS. Kiểm tra thao tác toàn ô trang bị và hiển thị thưởng vàng. |
| 4 | Nghiệm thu dữ liệu và media | 210 chính + 1 phụ, 177/33, 58/27/22/82/18/3 theo danh mục, 121 tham chiếu hai chiều, hai Volkath riêng, 4 mặc định số lượng có nhãn. Kiểm tra 744 mapping tới 269 key, đúng ID/slot/kích thước, nguồn và quyền dùng. Giữ `UNKNOWN` nếu chưa có nguồn mùa. |
| 5 | Kiểm tra URL và runtime | Duyệt từng ngoại lệ bằng [chỉ mục URL](url-inventory.csv). Kiểm kê 211 detail, thử danh mục, tên có dấu, query/filter, hash/anchor, 404, canonical và redirect nếu có. Xác nhận apex/base URL sau khi biết host. Kiểm tra Workers Static Assets local, sau đó staging riêng nếu được phép. Chưa thêm auth/backend vào M1. |
| 6 | Kiểm tra người dùng và rollback | Typecheck, build, đối chiếu tự động ID/trạng thái/URL, kiểm tra bàn phím và screen reader smoke, 360/390/768/1024/1440 px, no horizontal overflow, tìm/lọc/back/reload, lỗi ảnh, empty, console. Lưu ảnh desktop/mobile và bảng chênh lệch. Khôi phục artifact cùng phiên dữ liệu trước nếu phát hiện lệch. |

## Các điều kiện trước khi phát hành

- `/huong-dan/` giữ nguyên URL landing và lối vào ba bài cũ. Trang chủ mới có ô tìm toàn thư viện. Giữ URL cũ làm canonical khi build production, nên việc chuyển host chưa cần redirect đường dẫn nội bộ.
- Chốt phạm vi dùng ảnh và nguồn bảo chứng. Manifest tự ghi `rights.status=UNVERIFIED`. Đối chiếu ảnh trên local theo quyền hiện có. Nghiệm thu ảnh trên môi trường công khai còn phụ thuộc phê duyệt.
- Chủ dự án đã duyệt push nhánh M1 để review. Host production và staging cần xác nhận trước khi triển khai từ xa.

Mốc sau M1 theo [ROADMAP](../../ROADMAP.md). Hoàn thành M1 cần kết quả chạy thực tế và review của chủ dự án trước M2.

## Đối chiếu triển khai

- Giữ 221 URL HTML và hai URL JSON của CoLQ cũ. Tổng bản build mới là 226 trang HTML. Năm trang mới gồm Thư viện, Đội hình, Công cụ, Bình chọn và Liên hệ. `/huong-dan/` chứa ba bài gốc. `/gioi-thieu/#intro-0` đến `#intro-2`, các mốc nhóm trang bị và nhóm lõi giữ được anchor.
- Sitemap production có 221 URL vì năm HTML dùng `noindex` là `/404.html`, `/lien-he/`, `/doi-hinh/`, `/cong-cu/` và `/binh-chon/`. Ba trang cuối hiển thị trạng thái chờ bài đội hình, công cụ xây đội hình và cuộc bình chọn. Trang Hướng dẫn vẫn có ba bài gốc và thông báo chưa có bài cộng đồng mới. Auth, Creator Studio, reaction và bình luận thuộc các milestone sau.
- JSON công khai và provenance ở bản build mới trùng byte với baseline đã kiểm toán. Giữ 210 chính và 1 phụ, 121 liên kết Phe/Nghề hai chiều, 4 tham chiếu phần thưởng và 4 số lượng mặc định có nhãn. Hai Volkath 5 và 6 vàng có URL riêng.
- Pin toàn bộ manifest R2. Bản build M1 và bản CoLQ cũ có bản sửa SVG cùng tham chiếu đúng một tập 256 URL ảnh phân biệt. Giữ đủ 744 ánh xạ tới 269 đối tượng trong manifest. 15 vị trí thưởng vàng trong trang chi tiết dùng SVG như bản sửa local.
- Trình duyệt giới hạn tải ảnh qua lazy loading, giữ chiều rộng và chiều cao từ manifest, rồi dùng chữ viết tắt của hồ sơ khi ảnh lỗi. Không có ảnh PNG game bên trong `dist/`.
- Dung lượng gzip đo từ artifact local khoảng 2,8 kB cho HTML trang chủ, 19,0 kB cho hub thư viện, 16,8 kB cho danh mục quân cờ và 3,8 kB cho CSS chung. Các số này chưa bao gồm ảnh R2 hay độ trễ mạng.

## Kết quả đã chạy

| Kiểm tra | Kết quả |
| --- | --- |
| `npm.cmd run check` | PASS. 36 file, 0 lỗi, 0 cảnh báo, 0 gợi ý. |
| `npm.cmd run build` và `npm.cmd run verify:build` | PASS. 226 HTML, 223 URL cũ, 5.696 liên kết/anchor nội bộ, 22 liên kết toàn ô và 15 SVG vàng ở trang chi tiết. |
| Kiểm tra dữ liệu đi kèm build | PASS. SHA-256 của snapshot, manifest và provenance, số hồ sơ, trạng thái, quan hệ, URL, 744 vị trí ảnh. |
| Chrome 157.0.8103.80 qua Playwright | PASS ở 360, 390, 768, 1024 và 1440 px. Sáu mục điều hướng, năm danh mục, hồ sơ, bàn phím, skip link, nhãn bộ lọc và chiều rộng đều đạt. Đã kiểm tra tìm có/không dấu, lọc, đặt lại, reload/back, làm nổi bật cấp sao, bấm hoặc chạm toàn ô trang bị, mở bằng Enter, SVG vàng, liên kết hai chiều và 404. |
| Nội dung không có JavaScript và ảnh lỗi | PASS. Danh mục vẫn có 58 quân cờ và liên kết hồ sơ khi tắt JavaScript. Giả lập ảnh R2 trả 404 làm ẩn ảnh hỏng, hiện fallback và giữ nội dung hồ sơ. |
| Kích thước ảnh và lưới danh mục | PASS. Ảnh chính Phe/Nghề và Trang bị 72 × 72 px, ảnh Lõi 100 × 100 px ở danh mục và hồ sơ. Lõi hai cột từ 320 px, một cột ở 280 px. Kiểm tra 280, 320, 360, 390, 768, 1024 và 1440 px không tràn ngang. [Desktop](evidence/m1-loi-1440.png) · [Mobile](evidence/m1-loi-390.png) |
| Bố cục thư viện, Giới thiệu và Noto Sans | PASS trên Chrome local. Sáu danh mục ở 280, 320, 390, 768, 1024 và 1440 px không tràn ngang. Đã kiểm tra tìm và lọc, liên kết hồ sơ, mục lục ba bài gốc, tab Lõi tự cuộn vào vùng nhìn thấy, ảnh 72 × 72 và 100 × 100 px và Noto Sans thật trên tiêu đề tiếng Việt. Danh sách 58 quân cờ vẫn hiển thị khi tắt JavaScript. |
| HTTP chỉ đọc R2 | PASS. Manifest live trùng byte bản ghim. HEAD 269/269 trả 200 với MIME và số byte đúng. Sáu GET mẫu trùng SHA-256. Key thiếu trả 404. |
| SEO local với chế độ staging và cấu hình production thử nghiệm | PASS. Bản staging dùng `noindex` và sitemap rỗng. Bản production thử với origin dành cho test có 221 canonical indexable. Trang 404, liên hệ và các chức năng chưa mở vẫn `noindex`. Thiếu origin HTTPS làm dừng build production. |
| Miniflare / workerd local | PASS. Mô phỏng Workers Static Assets bằng Miniflare 4.20260730.0 với ngày tương thích 30/07/2026. Kiểm tra HTML và JSON 200, chính sách `noindex`, 404 và chuẩn hóa dấu gạch cuối URL có giữ query. |
| Gitleaks | PASS khi quét dữ liệu M1. Index M0 đã quét trước push. |
| Cloudflare staging từ xa, Lighthouse hoặc thiết bị vật lý | SKIP. M1 nghiệm thu local. Chưa đo Core Web Vitals thực tế. |

Ảnh chụp Chrome sau khi chân dung đầu trang tải từ R2. [Trang chủ 1440 px](evidence/m1-home-1440.png) · [Trang chủ 390 px](evidence/m1-home-390.png) · [Quân cờ 1440 px](evidence/m1-quan-co-1440.png) · [Quân cờ 390 px](evidence/m1-quan-co-390.png)

## Phạm vi file

| Nhóm | Đường dẫn |
| --- | --- |
| Cấu hình và kiểm chứng | `.gitattributes`, `astro.config.mjs`, `package.json`, `scripts/verify-library.mjs`, `scripts/verify-build.mjs` |
| Dữ liệu và tra cứu | `data/legacy/{library,manifest,provenance}.json`, `src/lib/{library,search}.ts` |
| Layout và thành phần | `src/layouts/SiteLayout.astro`, `src/styles/site.css`, `src/components/{SiteNav,Breadcrumbs,CatalogSearch,FieldNote,GameImage,GoldReward,GuideSections,LibraryDirectory,LibraryNav,RecordCard,SectionLanding,TraitLinks}.astro` |
| Trang và endpoint | `src/pages/index.astro`, `404.astro`, các landing `{binh-chon,cong-cu,doi-hinh,thu-vien,huong-dan,du-lieu,gioi-thieu,lien-he}/index.astro`, `[section]/{index,[slug]}.astro`, `data/{library,provenance}.json.ts`, `robots.txt.ts`, `sitemap.xml.ts` trong `src/pages/` |
| Tài liệu | `README.md`, `ROADMAP.md`, `DECISIONS.md`, `docs/planning/CoLQ_Product_Spec_v1.md`, `docs/architecture/{data-inventory,m0-audit,m1-checklist}.md` |
| Ảnh nghiệm thu | Ảnh trang chủ và danh sách quân cờ ở 1440 và 390 px trong `docs/architecture/evidence/` |

`main` giữ mốc M0 trong thời gian review. Nhánh `m1/library` chứa phần thư viện và điều chỉnh ảnh đã kiểm thử. Để hoàn tác bản preview, dùng artifact hoặc checkout M0 đã ghim trên một thư mục riêng. Bản dữ liệu và manifest M1 giữ hash để tái tạo sau khi nghiệm thu.
