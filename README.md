# Cẩm Nang Cờ Liên Quân

Website cộng đồng Cờ Liên Quân trên CoLQ-Web. Thư viện tĩnh dùng dữ liệu quan sát từ repo `sunny251010/CoLQ` và URL ảnh từ manifest R2 đã ghim.

Menu chính gồm Trang chủ, Đội hình, Hướng dẫn & Mẹo, Thư viện, Liên hệ & Góp ý theo thứ tự này. Mặc định sửa, kiểm thử và commit local. Push hoặc deploy theo yêu cầu riêng.

Menu Thư viện mặc định mở `/quan-co/`. `/thu-vien/` phục vụ tìm kiếm toàn thư viện. Công thức ghép trang bị được bỏ khỏi giao diện và danh sách trường chưa xác minh.

## Chạy local

Dùng Node.js 24 hoặc Node.js 22 từ 22.12. Trên PowerShell, dùng `npm.cmd`.

```powershell
npm.cmd ci
npm.cmd run dev
```

Mở `http://localhost:4321/`. Kiểm tra kiểu và xem bản build bằng các lệnh sau.

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run verify:build
npm.cmd run preview
```

Các trang tra cứu gồm `/thu-vien/`, `/quan-co/`, `/phe-nghe/`, `/trang-bi/`, `/chuc-phuc/` và `/nhiem-vu/`. `/huong-dan/` giữ ba hướng dẫn cũ, còn `/gioi-thieu/` giữ các liên kết tới từng phần hướng dẫn.

## Cấu hình SEO

Cloudflare Workers Builds dùng nhánh `preview/cloudflare` của `sunny251010/CoLQ-Web` cho Worker `colq-web-preview`. Trong **Settings → Builds**, đặt **Production branch** thành `preview/cloudflare`. Push lên nhánh đó sẽ kích hoạt triển khai. Điều kiện `WORKERS_CI_BRANCH` trong lệnh build bảo đảm Worker chỉ nhận bản build từ nhánh này.

```sh
# Build
test "$WORKERS_CI_BRANCH" = preview/cloudflare && npm run build && npm run verify:build
# Deploy
npx wrangler deploy --config wrangler.jsonc
```

Worker phục vụ thư viện tĩnh và dùng cấu hình SEO staging. Nền tài khoản M2A được kiểm thử riêng trên local.

Build mặc định dùng chế độ staging và gắn `noindex, follow`. Khi chuẩn bị bản production, đặt `COLQ_ENV=production` cùng `COLQ_SITE_URL` là origin HTTPS chính thức. Build sẽ dừng nếu thiếu origin hoặc origin sai định dạng. Canonical và sitemap được sinh từ origin đã cấu hình. Trang 404 và các trang chưa có nghiệp vụ vẫn dùng `noindex`.

## Cấu trúc và quy ước

| Đường dẫn | Vai trò |
| --- | --- |
| `src/pages/` | Năm trang chính, danh mục, hồ sơ, 404 và endpoint JSON/SEO tĩnh |
| `src/layouts/` | Layout chung, metadata và khung điều hướng thư viện |
| `src/components/SiteNav.astro` · `src/navigation.ts` | Component điều hướng và danh sách nhãn/URL dùng chung |
| `src/styles/` | Tokens Dark Gaming UI, layout tra cứu, focus và breakpoint |
| `public/fonts/` | Noto Sans Variable từ Fontsource 5.3.0, dùng lại bộ Latin và tiếng Việt của CoLQ cũ theo giấy phép SIL OFL 1.1 |
| `src/lib/` · `data/legacy/` | Kiểu dữ liệu và snapshot thư viện, manifest R2 và provenance theo SHA-256 |
| `scripts/verify-*.mjs` | Kiểm tra hash, ID, quan hệ, ảnh, URL và SEO của bản build |
| `docs/planning/` | Đặc tả, wireframe và prompt milestone |
| `docs/architecture/` | Audit, kiểm kê, kiến trúc và tiêu chí M1 |

- Đặt URL công khai bằng tiếng Việt không dấu, nhất quán dấu `/` cuối đường dẫn. Dùng `lang="vi"` và nhãn tiếng Việt cho giao diện.
- Dùng TypeScript strict cho logic và component `.astro` với CSS native cho HTML tĩnh. Tái sử dụng tokens cho màu, khoảng cách và focus.
- Giữ lockfile trong Git. Chạy `check`, `build` và `verify:build` trước khi hoàn thành thay đổi.
- Kiểm tra phạm vi tại [ROADMAP](ROADMAP.md) và [DECISIONS](DECISIONS.md). Xem [audit M0](docs/architecture/m0-audit.md) và [checklist M1](docs/architecture/m1-checklist.md).
