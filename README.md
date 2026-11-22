# CoLQ 2.0

Website cộng đồng Cờ Liên Quân. Nền ứng dụng M0 nằm trong repository local dành cho `sunny251010/CoLQ-Web`. Repo `sunny251010/CoLQ` là nguồn tham chiếu cho dữ liệu thư viện, URL và logic đã có.

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
npm.cmd run preview
```

## Cấu trúc và quy ước

| Đường dẫn | Vai trò |
| --- | --- |
| `src/pages/` | Sáu điểm vào công khai và trang 404, định tuyến theo file |
| `src/layouts/SiteLayout.astro` | Metadata, điều hướng desktop/mobile, nội dung chính và footer |
| `src/components/SiteNav.astro` · `src/navigation.ts` | Component điều hướng và danh sách nhãn/URL dùng chung |
| `src/styles/site.css` | Tokens Dark Gaming UI, typography, spacing, focus và breakpoint |
| `docs/planning/` | Đặc tả, wireframe và prompt milestone |
| `docs/architecture/` | Audit, kiểm kê, kiến trúc và tiêu chí M1 |

- Đặt URL công khai bằng tiếng Việt không dấu, nhất quán dấu `/` cuối đường dẫn. Dùng `lang="vi"` và nhãn tiếng Việt cho giao diện.
- Dùng TypeScript strict cho logic và component `.astro` với CSS native cho HTML tĩnh. Tái sử dụng tokens cho màu, khoảng cách và focus.
- Giữ lockfile trong Git. Chạy `check` và `build` trước khi hoàn thành thay đổi. Bản M0 đánh dấu các trang `noindex, nofollow` vì nội dung đang ở giai đoạn chuẩn bị.
- Kiểm tra phạm vi tại [ROADMAP](ROADMAP.md) và [DECISIONS](DECISIONS.md). Kết quả chạy thực tế nằm tại [audit M0](docs/architecture/m0-audit.md).
