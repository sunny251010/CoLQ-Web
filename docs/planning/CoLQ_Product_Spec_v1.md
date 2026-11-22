# CoLQ 2.0 — Product / UX / Technical Specification v1.0

- **Ngày:** 22/11/2026
- **Trạng thái:** Đặc tả sản phẩm CoLQ 2.0. Theo dõi tiến độ tại [ROADMAP](../../ROADMAP.md) và các quyết định tại [DECISIONS](../../DECISIONS.md).
- **Repo triển khai:** `sunny251010/CoLQ-Web`
- **Repo tham chiếu chỉ đọc:** `sunny251010/CoLQ`
- **Production tham chiếu:** `https://colq.sunny-contact-251010.workers.dev/quan-co/`
- **Asset manifest dự kiến:** `https://lq-assets.sunny-contact-251010.workers.dev/lq/releases/lq-encyclopedia-observed-v1/manifest.json`

> Các số đo độc lập và mức độ xác minh của hai bản sửa local được ghi tại [audit M0](../architecture/m0-audit.md). Dữ liệu minh họa trong wireframe chỉ phục vụ trao đổi về giao diện.

## A. Quyết định sản phẩm đã CHỐT

1. CoLQ là website cộng đồng Cờ Liên Quân, xem nội dung không cần tài khoản, không quảng cáo.
2. Các nav công khai: **Trang chủ / Đội hình / Thư viện / Công cụ / Hướng dẫn & Mẹo / Bình chọn**. Liên hệ/Báo lỗi ở footer hoặc context menu.
3. **Đội hình:** lọc theo mùa mới → cũ; desktop mùa nằm ở sidebar bên phải, mobile chọn mùa phía trên danh sách; creator có bài riêng kể cả đội hình trùng.
4. Bác chủ động mời và cấp quyền Creator. Creator tự đăng và tự gắn tier Meta (S/A/B…), chỉ sửa/xóa bài của mình; admin có quyền quản trị toàn bộ và xử lý vi phạm. Meta/tier là **đánh giá của creator**, không phải kết luận chính thức của CoLQ.
5. Trang bài có **reaction, bình luận và trả lời 2 cấp, chia sẻ**; đăng nhập mới tương tác. Creator không được tự ý xóa mọi ý kiến trái chiều của người khác.
6. **Bình chọn:** yêu thích quân cờ/lõi/trang bị trước; bình chọn sức mạnh theo mùa sau. Mỗi người một phiếu hợp lệ mỗi cuộc bình chọn, cho đổi phiếu khi cuộc bình chọn còn mở. Cần chống thao túng.
7. **Theo dõi Creator:** sau reaction/bình luận.
8. **Đăng nhập:** Google trước, thành viên thường có thể được thăng vai trò creator theo lời mời; không cần cấp GitHub/Cloudflare cho creator.
9. **UI:** Dark gaming hiện đại; ưu tiên mobile, dễ đọc, tải nhẹ, không vay mượn nguyên xi nhận diện TFT/Liên Quân.
10. **Editor:** kết hợp biểu mẫu cấu trúc đội hình với vùng viết bài tự do, ảnh, video YouTube/TikTok theo link. Không cần làm đầy đủ visual board builder ngay trong milestone editor.
11. Xây dựng website mới tại `sunny251010/CoLQ-Web`. Đối chiếu thư viện JSON, ảnh R2, manifest, URL và các bản sửa chưa phát hành từ `sunny251010/CoLQ` qua truy cập chỉ đọc. Giữ đường dẫn cũ hoặc dùng mapping được duyệt, giữ nguyên byte của dữ liệu nguồn và hash đã xác minh.
12. **Cloudflare-first, low-cost/offline-friendly khi phù hợp:** Astro + TypeScript, Cloudflare Workers, D1 cho dữ liệu động, R2 cho ảnh, content collections / JSON cho thư viện. Quyết định package phải qua spike tương thích phiên bản.

## B. Đối tượng và user journeys

- **Khách:** mở Đội hình → chọn mùa, lọc S/A/creator → xem nhanh bàn cờ → mở chi tiết → nhấp Đăng nhập Google nếu muốn react/vote/comment.
- **Thành viên:** Google login → react, comment, reply, report, vote; có quyền sửa/xóa comment của chính mình trong giới hạn chính sách; vote có thể đổi trước khi đóng.
- **Creator:** được mời → đăng nhập Google → hoàn tất hồ sơ → Creator Studio → Tạo đội hình / Viết hướng dẫn → nhập form + bài tự do → xem trước → tự xuất bản → sửa bài của mình → xem bình luận và trả lời.
- **Admin:** login → mời/thu hồi creator → quản lý mùa & taxonomy → xử lý reports, bài và comments bị báo cáo → quản lý polls → quan sát audit và sức khỏe nền tảng.

## C. Sitemap/Routes (cần audit redirects URL cũ)

```text
/                              Trang chủ
/doi-hinh/                     Landing mùa mới nhất
/doi-hinh/:season/             Danh sách theo mùa
/doi-hinh/:season/:slug-id/    Bài creator độc lập
/thu-vien/                     Chuyên mục thư viện
/thu-vien/quan-co/             Danh sách quân cờ
/thu-vien/quan-co/:slug/       Chi tiết quân cờ
/thu-vien/phe-nghe/            Phe/Nghề
/thu-vien/trang-bi/            Trang bị
/thu-vien/loi/                Lõi/Chúc phúc (mapping sau audit)
/thu-vien/nhiem-vu/           Nhiệm vụ
/cong-cu/                      Hub công cụ
/cong-cu/xay-doi-hinh/        Builder (milestone riêng)
/huong-dan/                    Danh sách bài hướng dẫn
/huong-dan/:slug-id/           Bài creator
/binh-chon/                    Hub vote
/binh-chon/yeu-thich/         Favorite poll
/binh-chon/suc-manh/           Power poll (later)
/binh-chon/lich-su/            Poll archive
/creator/:handle/              Public creator profile
/dang-nhap/                    Google auth
/tai-khoan/                    Member profile/settings
/lien-he/                      Contact, feedback, reports
/creator/dashboard/            Studio (private)
/admin/                        Admin console (private)
```

**URL stability:** Không thay URL thư viện đang có nếu không cần; giữ đường dẫn cũ và 301 mapping nếu buộc chuyển. Post slug có id ngắn tránh đụng nhau. Dữ liệu mùa thực tế phải được xác minh; `s3-2026` chỉ là ví dụ.

## D. Wireframes chi tiết — desktop và mobile

### D1. Design system

- Palette đề xuất: `bg #0B1020`, `surface #131D31`, `raised #1B2940`, `primary gold #D5AD66`, `teal #55BCA5`, `text #ECF1FA`, `muted #9BAABD`, danger/status độc lập. Contrast WCAG AA cho text/controls.
- Font hỗ trợ tiếng Việt, fallback hệ thống; tránh font tự host khi chưa kiểm tra license.
- Desktop container `max-width: 1200–1280px`, gutter 24px; tablet 16–20px; mobile 16px.
- Breakpoints hướng dẫn: mobile `<640px`, tablet `640–1023px`, desktop `>=1024px`; kiểm tra 360/390/768/1024/1440px.
- Nút chạm ít nhất ~44×44px, focus visible, keyboard navigation, skip-to-content, reduced motion; không chỉ dựa vào màu để thể hiện tier.
- Skeleton loading; empty state, error/retry, upload progress, network failure, login-required modal, published/draft status; không đánh tráo demo thành dữ liệu thực.
- Header desktop sticky vừa phải, nav 6 mục + search + avatar; mobile header logo/search/menu và tab/dropdown tuỳ trang. Footer có liên hệ, báo lỗi, chính sách, tuyên bố độc lập không chính thức.

### D2. Trang chủ

**Desktop 1200–1280:**

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Logo  Trang chủ Đội hình Thư viện Công cụ Hướng dẫn Bình chọn  [Tìm] [Login]│
├────────────────────────────────────────────────────────────────────────────┤
│ Tiêu đề: Cờ Liên Quân: đội hình & cộng đồng     [Chọn mùa]                 │
│ [Tìm quân cờ / trang bị / đội hình............................]           │
│ [Đội hình nổi bật nhiều creator — grid 3 cột]                             │
│ [Khám phá đội hình] [Mới nhất] [Meta] [Sáng tạo]                            │
│ [Thẻ bài A]      [Thẻ bài B]       [Thẻ bài C]                              │
│ [Bình chọn đang diễn ra (2/3)]   [Hướng dẫn mới (1/3)]                     │
│ [Lối tắt Thư viện 5 categories]                                            │
│ [Creator mới] [Creator vừa đăng]                                           │
└────────────────────────────────────────────────────────────────────────────┘
```

**Mobile 390:** Header nhỏ; search full-width dưới header; mùa dạng chip; carousel ngang các bài nổi bật nhưng nội dung quan trọng không chỉ nằm trong carousel; list card 1 cột; bình chọn / hướng dẫn / thư viện sau danh sách; footer không chiếm viewport.

**Acceptance:** Không có hero quá cao đẩy nội dung chính dưới màn hình đầu; khối creator mới không phụ thuộc số fan; dữ liệu không tồn tại hiển thị empty state.

### D3. Danh sách Đội hình

**Desktop:** main 8–9/12 cột + **sidebar mùa 3–4/12 bên phải**; tiêu đề + mô tả mùa; hàng tab Khám phá/Mới/Nổi bật/Theo creator; filter bar sticky nhẹ (tier, nhãn, Phe/Nghề, quân chủ lực, có video, creator); list cards có preview quân cờ, tier tự đánh giá, creator, thời gian và counts (lazy/dynamic). Sidebar chỉ hiển thị những mùa có thật, mới → cũ, trạng thái mùa hiện tại.

**Mobile:** chọn mùa ở gần đầu ngay dưới title; filter button mở bottom-sheet có Reset/Áp dụng; tabs cuộn ngang; card 1 cột hiển thị 6–8 quân tối ưu vừa chiều ngang, không tràn; thao tác chạm toàn card; pagination/infinite-load có focus và back restore.

**Fairness:** chế độ Khám phá dùng vòng luân phiên giữa creator đủ điều kiện, mỗi lượt rút 1 bài/creator dựa trên độ phù hợp mùa, độ mới và visibility; bài trùng không gộp. Duy trì thứ tự phân trang ổn định qua cursor/snapshot (không random mỗi lần tải). Tab Mới nhất thuần thời gian; Nổi bật dựa tương tác đã chống abuse, không mạo nhận xếp hạng meta chuẩn.

### D4. Chi tiết bài Đội hình

**Desktop:** trái bài viết 8/12, phải sticky TOC/creator card 4/12; breadcrumb và season; title, creator profile, tier do creator chọn, tags, updated_at; **khối xem nhanh** (quân/cost/trait, board composition, trang bị/lõi); video link/embed click-to-load; hướng dẫn early/mid/late, cách xoay, khắc chế; reaction/share; comments 2 cấp; bài khác của creator.

**Mobile:** title và creator trước, các nhãn sau; preview đội hình trước bài dài; một nút sticky gọn 'Xem nhanh' hoặc 'Mở Builder' (không che content); TOC thu gọn; video click-to-load; comments phân trang; không auto-play video.

**Behavior:** một user một reaction/post, đổi reaction được; guest bấm thì mở Google login và quay lại vị trí đang tương tác; comment two levels (root/reply), xử lý nội dung độc hại, report; creator không tự xoá comments của người khác; mở trong Builder tạo bản sao người dùng.

### D5. Creator Studio — Dashboard

**Desktop:** sidebar [Tổng quan | Bài của tôi | Tạo bài | Bình luận | Hồ sơ]; cards số bài đã đăng/nháp/bình luận chưa đọc; table search, status Draft/Published/Hidden, hành động Edit/Preview/Unpublish; có link xem hồ sơ công khai.

**Mobile:** sidebar thành tabs/menu; cards 2 cột hoặc stack; nút FAB/CTA `+ Tạo bài`; bảng chuyển thành cards; popup cảnh báo khi rời editor chưa lưu.

### D6. Creator Studio — Bài đội hình

**Desktop 2 cột:** `Form cấu trúc` rộng 8/12 và `Preview + checklist` 4/12; toolbar Save Draft/Preview/Publish; progress các phần:

1. **Thông tin:** loại bài, tiêu đề, mùa thực, tier do creator gắn, nhãn và cover.
2. **Cấu hình:** chọn quân từ thư viện, slot/position theo khả năng M2, chủ lực, trang bị, lõi; re-use same schema as future Builder; xác nhận dữ liệu được kiểm chứng theo mùa.
3. **Bài viết:** Tiptap WYSIWYG headings, paragraphs, lists, image, callouts, links; video YouTube/TikTok bằng URL whitelisted; chặn HTML/iframe tự do. Trường khuyến nghị: đầu trận/giữa trận/cuối trận, ưu/nhược, khi nào nên chơi, mẹo và khắc chế (không bắt tất cả là required).
4. **Xuất bản:** SEO title/description (gợi ý tự động sửa được), preview desktop/mobile, lỗi form, draft/publish; update có `updated_at`, version history.

**Mobile:** wizard từng bước với thanh bước và autosave; form chiều dọc, preview mở trang riêng; image upload trực tiếp; warning nếu thoát với unsaved edits.

**Hướng dẫn & Mẹo:** dùng cùng editor nhưng không bắt buộc form đội hình; có thể gắn đội hình hoặc tham chiếu quân cờ.

### D7. Bình chọn

**Desktop:** title, season/period, 3 tabs Quân cờ/Lõi/Trang bị; poll status đang mở/đóng, các candidate cards, 1 lựa chọn/chủ đề/công bố kết quả; bảng kết quả theo % và số phiếu hợp lệ; history theo mùa, link sang thư viện.

**Mobile:** tabs cuộn ngang, cards 1 cột + large tap target; lựa chọn rõ ràng; guest xem kết quả nhưng cần login để vote; xác nhận đổi phiếu nếu đã vote; tránh nút vote giả dạng link.

**Phân biệt:** yêu thích khác mạnh nhất; tier của creator khác cả hai. Không công bố tỷ lệ thắng khi không có nguồn trận thật.

## E. Phân quyền (RBAC + ownership, server-enforced)

| Chức năng | Guest | Member | Creator | Admin |
|---|:---:|:---:|:---:|:---:|
| Đọc thư viện, bài, comments, poll results | ✓ | ✓ | ✓ | ✓ |
| Xài Builder và share URL | ✓ | ✓ | ✓ | ✓ |
| Báo lỗi public (rate-limit/captcha) | ✓ | ✓ | ✓ | ✓ |
| React/comment/reply/vote | — | ✓ | ✓ | ✓ |
| Tạo bài đội hình/hướng dẫn | — | — | ✓ | ✓ |
| Sửa/ẩn bài mình | — | — | ✓ | ✓ |
| Tự gắn tier/meta cho bài mình | — | — | ✓ | ✓ |
| Sửa/ẩn bài khác, xử lý reports | — | — | — | ✓ |
| Mời/thu hồi Creator, quản lý poll & season | — | — | — | ✓ |

- Google OAuth được dùng làm đăng nhập; account liên kết bằng provider subject/verified identity ổn định, không tin email gửi trực tiếp từ frontend. Lời mời theo email được kiểm tra server-side sau OAuth rồi gắn vào user id thực tế.
- Revoke Creator phải chặn ngay mọi tạo/sửa/publish; vẫn giữ tác giả và bài public trừ khi admin ẩn. Không xóa dữ liệu/hồ sơ người dùng vô cớ.
- Editor phân quyền theo `post.author_id == session.user.id`; admin audit mọi override.
- User chỉ sửa/xóa comment của chính mình; admin có quyền moderation. Creator có thể report comments, không thể xóa comment khác chỉ vì bất đồng.
- Chính sách bình chọn UNIQUE (`poll_id`, `user_id`) và reaction UNIQUE (`target_type`, `target_id`, `user_id`).
- CSRF/state validation cho auth, same-site cookies an toàn, server validation & output sanitization, ownership BOLA test, session rotation/revoke, request throttling.

## F. Data model đề xuất (thực hiện sau audit repo/auth library)

```text
users, auth_accounts, sessions, creator_profiles, creator_invites
seasons, patches, tags, posts, post_tags, post_versions
lineups, lineup_units, lineup_items, post_media
comments, reactions, reports, audit_logs
polls, poll_options, poll_votes
follows (deferred)
```

**Ý nghĩa các trường trọng điểm:**
- `seasons`: `id`, `slug`, `name`, `sort_order`, `started_at`, `ended_at`, `status`.
- `posts`: `id`, `slug`, `author_id`, `kind` (`lineup|guide`), `season_id` nullable, `tier` nullable, `title`, `excerpt`, `body_json`, `status` (`draft|published|hidden`), timestamps. Index `(status, season_id, published_at)` và `(author_id, status)`.
- `lineups`: `post_id`, `data_version`, snapshot JSON cấu hình quân/slot/trait theo mùa. Index `post_id`, không UNIQUE hóa snapshot vì trùng bài được phép.
- `comments`: `post_id`, `user_id`, `parent_id` nullable, `status`, `body`, timestamps; giới hạn hai tầng, descendants chỉ dưới root.
- `reactions`: `target_kind`, `target_id`, `user_id`, `emoji`, timestamps; unique `(target_kind,target_id,user_id)`.
- `polls`: `category` (`unit|core|item`), `kind` (`favorite|power`), `season_id` nullable, open/close, status.
- `poll_options`: `poll_id`, `entity_kind`, `entity_id`, display snapshot nếu mùa cũ.
- `poll_votes`: `poll_id`, `user_id`, `option_id`, created/updated; unique `(poll_id,user_id)`; thay vote bằng atomic upsert.
- `reports`: `subject_kind`, `subject_id`, `reporter_id` nullable, `reason`, `evidence`, `status`, `resolution`.
- `post_versions`: snapshot trước sửa để khôi phục, không rewrite lịch sử tác giả.

Phân biệt dataset:
1. **Game data** là dữ liệu tham chiếu đã xác minh, JSON/content collection versioned, không cho creator sửa trực tiếp.
2. **Creator content** là nhận định, bài riêng có tác giả, season, snapshot đội hình và tier do tác giả gắn.
3. **Community signals** là reaction, comment, favorite vote, strength vote, không đồng nghĩa thống kê trận thật.

## G. Render, SEO, media và vận hành

- **Static/prerender:** thư viện ổn định và các landing không phải personalized.
- **SSR + cache:** danh sách bài, bài creator, trang poll public; HTML chứa nội dung chính để crawl; counts/phiếu live qua API riêng tránh stale cache.
- **Private SSR/API:** Studio, admin, session, draft; `Cache-Control: private, no-store` hoặc tương đương.
- SEO: canonical, sitemap, robots, page title/description, OpenGraph, breadcrumbs, JSON-LD phù hợp, 301 legacy URL; noindex draft/private. Tránh nội dung mẫu/placeholder bị index.
- Media: game assets R2/worker hiện tại giữ nguyên (ưu tiên reuse manifest); ảnh creator R2 phân prefix, kích thước/loại file giới hạn, verify bytes/MIME, server cấp signed upload cho object cụ thể, hậu kiểm và public only after allowed; video nhúng URL YouTube/TikTok, click-to-load, không autoplay.
- Có logging mức an toàn (không ghi token); audit admin; backup DB và object metadata; staging/prod riêng bindings, OAuth callbacks, môi trường.
- Tôn trọng bản quyền ảnh game: inventory nguồn và tình trạng quyền sử dụng; disclaimer fan project không thay giấy phép.
- Hiệu năng mục tiêu (cần đo thực nghiệm): LCP p75 mobile < 2.5s, INP p75 < 200ms, CLS < 0.1 trên thiết bị/đường truyền mục tiêu; không claim đạt nếu chưa đo. Accessibility WCAG AA các luồng chính.

## H. Milestones và Definition of Done

### M0 — AUDIT VÀ KHỞI TẠO WEBSITE MỚI
**Phạm vi:** audit read-only repo nguồn và manifest, định danh dữ liệu và URL có thể tái sử dụng, dựng nền Astro + TypeScript tĩnh trong `CoLQ-Web`, tạo tokens Dark Gaming UI và sáu route cấp một. Viết kế hoạch Cloudflare, dữ liệu, auth, Creator Studio và nghiệm thu M1.

**Nghiệm thu:** kiểm tra kiểu, build, điều hướng và responsive local của repo mới. Audit nêu rõ phần đã quan sát, kết quả kiểm thử nguồn và phần còn thiếu. Dừng ở M0 để chủ dự án duyệt M1. Xem [audit M0](../architecture/m0-audit.md) và [checklist M1](../architecture/m1-checklist.md).

### M1 — DESIGN SYSTEM / ASTRO SHELL + LIBRARY PARITY
**Phạm vi:** hoàn thiện shell đã có, dựng thư viện từ bản JSON được xác minh, đối chiếu liên kết và ảnh R2; kiểm tra runtime Cloudflare trên local, chỉ dùng môi trường staging riêng khi được cho phép. Giữ URL cũ hoặc dùng mapping đã duyệt.

**DoD:** routes thư viện trước/sau thống kê, parity nội dung/ảnh/links; 360/390/768/1024/1440 không tràn; keyboard + screen reader smoke; links/redirects verified; build, typecheck, smoke, snapshot đạt; chỉ staging.

### M2 — SEASONS + CONTENT/CREATOR + GOOGLE LOGIN
**Scope:** D1 migrations, Google OAuth spike; session/invite/roles; creator profiles; dashboard; post model, tag/tier/season, form đội hình dùng chọn quân/slots + Tiptap/editor; upload R2 riêng; edit own; preview/draft/publish/unpublish; version history; SSR public post.

**DoD:** không có quyền creator không publish; Creator A không sửa của B qua API trực tiếp; admin thu hồi có hiệu lực; bài trùng giữ độc lập; Google login/logout/session persistence đúng; image/video sanitized; privacy no-store; SEO bài public; có rollback migration và staging smoke.

### M3 — REACTION + COMMENTS + MODERATION
**Scope:** emoji một reaction/user/post, toggle/replace; root/reply 2 cấp; report/comment admin moderation; share Web Share/copy URL; lazy load/pagination, rate limit, Turnstile where appropriate.

**DoD:** guest read-only, intent to interact → Google login return URL; 1 reaction row/user/target; không thể xóa comment người khác; report/hidden states được test; XSS/CSRF/abuse tests.

### M4 — FAVORITE POLLS + LIBRARY LINKING
**Scope:** category polls cho quân cờ/lõi/trang bị, theo mùa/period; open/closed, one valid vote/user/poll changeable until close; results/history; badge trên hồ sơ thư viện liên kết bảng vote.

**DoD:** unique constraint thật trong DB; concurrent vote không tạo nhiều phiếu; guest không vote; admin quản lý mở/đóng; resultados giữ history; không hiển thị như win-rate.

### M5 — TEAM BUILDER & EMBEDDED LINEUP
**Scope:** interactive board **theo quy tắc thực tế được kiểm chứng**; chọn quân/position/items/cores, synergy calc đã xác minh, URL share không cần login, local draft, xuất ảnh nếu khả thi; mở từ bài creator bằng bản sao, không sửa bản gốc.

**DoD:** board layout/capacity không tự bịa, validate snapshot, share URL roundtrip, mobile touch usability, builder không cần login, test phiên bản mùa cũ.

### M6 — FOLLOW CREATOR + POWER POLLS (DEFERRED)
**Scope:** theo dõi creator, feed bài từ người theo dõi; strength polls theo mùa tách favorite; antisybil/anti-abuse đủ cho quy mô thực tế.

**DoD:** quan hệ follow unique, unsubscribe hoạt động; poll sức mạnh được gắn nhãn cộng đồng, không mạo nhận dữ liệu thống kê trận.

**Release gates chung:** Mỗi milestone có demo/video/screenshot thật (không báo PASS nếu không test), danh sách file changed, command logs, migration plan, security checklist, KPI, rollback; **không push/deploy production khi chưa được chủ dự án đồng ý**. Chỉ tiếp tục milestone kế tiếp sau khi milestone trước có review.

## I. Các vấn đề còn cần Codex xác minh thay vì tự quyết

1. Trạng thái thực tế source hiện tại và những sửa đổi local chưa push.
2. URL/thư viện gốc (nhiệm vụ, lõi/chúc phúc, trang bị) cùng mapping và quy tắc redirect.
3. Mùa đang có thật và cách mùa/version được thể hiện trong nguồn game; KHÔNG hardcode S3 2026 là hiện tại.
4. Quy tắc bàn cờ và synergy chưa đủ bằng chứng; builder phase M5 chỉ sau verified source.
5. Trạng thái quyền sử dụng hình ảnh game; scope nội dung creator upload.
6. Cloudflare binding, compatibility date, OAuth redirect domains, availability of D1/R2, staging plan; không lấy secret từ chat hoặc commit repo.
7. So sánh Better Auth + Drizzle + Astro6 trên Workers với phương án auth tương đương; spike trước khi quyết định package.

## J. Nguồn kỹ thuật tham chiếu (kiểm tra 22/11/2026)

- Astro Cloudflare adapter: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Better Auth Cloudflare guide: https://better-auth.com/docs/guides/cloudflare
- Cloudflare D1 limits: https://developers.cloudflare.com/d1/platform/limits/
- D1 Free limit enforcement: https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/
- Cloudflare Workers limits: https://developers.cloudflare.com/workers/platform/limits/
- R2 presigned uploads: https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- Mobalytics comps UX: https://mobalytics.gg/tft/team-comps

**Đính kèm:** `CoLQ_Wireframes_v1.html` (wireframe HTML desktop/mobile với dữ liệu minh họa) và `CoLQ_Codex_M0_Prompt.md` (phạm vi audit và bootstrap M0).
