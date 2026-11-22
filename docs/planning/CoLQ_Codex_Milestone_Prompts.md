# CoLQ — PROMPTS TRIỂN KHAI TUẦN TỰ M1–M6

**Cách dùng:** gửi `CoLQ_Product_Spec_v1.md`, `CoLQ_Wireframes_v1.html`, kết quả M0 đã duyệt và **một prompt milestone** mỗi lượt. Không giao đồng thời M1–M6. Nếu M0 chưa xong, dùng `CoLQ_Codex_M0_Prompt.md` trước.

## QUY ƯỚC CHUNG ÁP DỤNG CHO MỌI MILESTONE

Bạn đang làm việc trên `sunny251010/CoLQ-Web`. Chỉ đọc `sunny251010/CoLQ` để đối chiếu dữ liệu, logic và URL. Bám Product Spec, ROADMAP, DECISIONS và wireframe minh họa. Trước khi sửa hãy kiểm tra `git status`, branch, M0 report, thay đổi local và CI nếu có. Giữ production và asset service hiện tại cho đến khi có kế hoạch cutover/rollback được duyệt. Môi trường từ xa, push và deploy cần đúng phạm vi được giao. Lưu credentials OAuth/R2 ngoài Git.

Mỗi milestone cần:
- Chia checklist thực thi và tác động tới existing modules.
- Test thực tế, lưu bằng chứng command + results; nếu thiếu quyền thì báo BLOCKED, không đoán PASS.
- Kiểm tra 360/390/768/1024/1440px, keyboard, empty/error/loading states, SEO khi có public route.
- Báo chi tiết file changed, database migration (nếu có), bảo mật/phân quyền, perf và rollback.
- Dừng sau milestone; không tự động tiếp tục milestone kế tiếp.

---

## PROMPT M1 — ASTRO SHELL + LIBRARY PARITY

Đã duyệt M0. Hãy triển khai **M1** trong `CoLQ-Web` theo [checklist M1](../architecture/m1-checklist.md). Dùng scaffold Astro + TypeScript, sáu route và tokens Dark Gaming đã có. Hoàn thiện shell, trang chủ, thư viện, bộ lọc và chi tiết hồ sơ với dữ liệu quan sát đã xác minh. Thử tương thích phiên bản Cloudflare trên local trước khi chọn cấu hình. Đối chiếu JSON, URL, ảnh manifest và thay đổi local còn thiếu với baseline. Kiểm tra nguyên tắc quyền sử dụng ảnh trước khi dùng trên môi trường công khai. Cung cấp ảnh desktop/mobile, chênh lệch parity và quy trình rollback. Dừng để duyệt trước M2.

## PROMPT M2 — CREATOR & CONTENT PLATFORM

Đã duyệt M1 và chọn phương án auth tương thích bằng spike. Triển khai **M2 trên staging/local**: Google OAuth + session, invite-only Creator role, admin permissions, public creator profiles; D1 Drizzle migrations có rollback; posts guide/lineup, seasons, tags, author ownership, content statuses, post versions; Creator Studio desktop/mobile; form đội hình chọn entity từ thư viện + editor Tiptap tự do có allowlist; YouTube/TikTok embed qua link an toàn; R2 media riêng, limits; draft/preview/publish/edit/unpublish. Creator được tự publish và tự đánh S/A/B, không duyệt thủ công; bài trùng đội hình của các creator khác nhau được giữ nguyên. Chưa làm full drag-drop Builder. Public posts SSR SEO, draft private noindex/no-cache. Test matrix: guest/member cannot author; creator A cannot edit B (UI/API/direct ID); revoked creator blocked; admin can moderate; Google login callback/session/logout; upload validation, XSS; no production push. Dừng sau M2.

## PROMPT M3 — COMMENTS / REACTIONS / MODERATION

Đã duyệt M2. Triển khai **M3**: reaction đa emoji nhưng 1 lựa chọn/user/post, toggle/replace; comments hai cấp, edit own, reply, pagination; share Web Share/copy link; login redirect roundtrip; report abuse; admin moderation hide/restore, logs, spam throttles. Không cho creator xóa bình luận của người khác chỉ vì bất đồng. Server-side uniqueness/CSRF/ownership, sanitize input/output. Tránh query counts N+1 và cache lẫn private/public. Kiểm thử cạnh tranh concurrent changes, access control, XSS/spam, responsive mobile. Dừng sau M3.

## PROMPT M4 — FAVORITE POLLS

Đã duyệt M3. Triển khai **M4**: `/binh-chon/yeu-thich/` với 3 categories quân cờ/lõi/trang bị; kết nối trực tiếp ID thư viện và season/period thực; admin mở/đóng, kết quả/historical snapshots. Một tài khoản một vote/poll, được đổi khi poll open, dùng DB unique constraint + atomic upsert; guest view but login required to vote; chống spam, không hiển thị thắng/thua hay sức mạnh nếu không có dữ liệu. Thêm widget nhỏ ở trang thư viện theo ID. Test concurrent vote, close boundary, stale/archived game entities, privacy, pagination. Dừng sau M4.

## PROMPT M5 — TEAM BUILDER

Đã duyệt M4 và đã có dữ liệu bàn cờ/synergy được xác minh. Triển khai **M5**: builder phù hợp Cờ Liên Quân, không sao chép vị trí hay cơ chế TFT; search/select units, arrange positions, attach items/cores, validate capacity/traits, undo/reset, mobile tap support, local save, serialize/share URL for guests. Cho phép bài creator mở bản sao đội hình vào builder và nhúng snapshot nhưng không thay đổi bài gốc. Nếu nguồn game chưa đủ để tính synergy, dừng phần đó, báo blocker và triển khai những phần có thể chứng minh. Test encode/decode URL, version snapshots, read-only link, touch/keyboard. Dừng sau M5.

## PROMPT M6 — FOLLOW CREATOR + STRENGTH POLLS

Đã duyệt M5. Triển khai **M6**: member follow/unfollow creator với unique relation, following feed sắp theo new posts và khả năng mute; community strength-tier polls tách biệt favorite polls. Label tất cả power votes là nhận định cộng đồng, không phải win-rate. Tăng cường chống vote manipulation/abuse và review chi phí. Test authorization, no duplicate follow/votes, notification opt-in nếu được phê duyệt riêng. Dừng sau M6.

---

**Ghi nhớ:** các mock `S3 2026`, `Unit A/B`, `3/3 Phe` không phải source truth. M0 mới là đầu vào xác nhận dữ liệu và quyền truy cập thực tế trước khi làm M1.
