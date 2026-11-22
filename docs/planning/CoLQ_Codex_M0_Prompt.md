# PROMPT CHO CODEX — CoLQ M0: AUDIT VÀ BOOTSTRAP WEBSITE MỚI

Dựng website CoLQ 2.0 tại `sunny251010/CoLQ-Web`. Đọc `sunny251010/CoLQ` làm nguồn tham chiếu. M0 gồm audit, scaffold Astro + TypeScript local, tokens Dark Gaming UI, sáu route cấp một và đặc tả kỹ thuật. Dừng để duyệt trước M1. Xem [quyết định](../../DECISIONS.md) và [roadmap](../../ROADMAP.md).

## Bối cảnh đầu vào
- Đọc tài liệu `CoLQ_Product_Spec_v1.md` và preview wireframe `CoLQ_Wireframes_v1.html` đính kèm. Chúng là product requirements và UI proposal, **không phải bằng chứng về source thực tế**.
- Theo báo cáo Codex trước đó: 269 ảnh đã lên R2 dùng tại 744 vị trí, 16/16 tests đạt. Có 15 avatar thưởng vàng sửa SVG và 22 ô trang bị full-tile clickable **chỉ ở local, chưa push/deploy**. Phải đối chiếu git status và filesystem trước khi hành động.
- Site công khai từng được báo cáo tại `https://colq.sunny-contact-251010.workers.dev/quan-co/`; ảnh tại `https://lq-assets.sunny-contact-251010.workers.dev/lq/releases/lq-encyclopedia-observed-v1/manifest.json`.
- Mùa `S3 2026`, unit A/B, board mock trong wireframe là **ví dụ, không phải dữ liệu đã xác minh**.

## Giới hạn hành động an toàn
1. **LOCAL ONLY.** Không push, không deploy, không sửa production D1/R2/Worker, không xóa hay restore dữ liệu, không thay secrets, không thêm OAuth credentials.
2. Không chạy scripts với side effects production. Với scripts chưa hiểu, đọc source trước khi chạy.
3. Không discard, reset, stash làm mất thay đổi local; nếu có dirty working tree thì ghi lại đầy đủ file/status và bảo toàn.
4. Nếu repo/Cloudflare/manifest không truy cập được, ghi `UNKNOWN/BLOCKED` chứ không giả mạo kiểm tra đạt.
5. Dựng Astro + TypeScript, tokens và route trong repo mới. Nhập thư viện thật thuộc M1. Google OAuth, CMS, Creator Studio, bình luận và bình chọn thuộc milestone sau. Kiểm tra bản build M0 ở local bằng trình duyệt.

## Tasks theo thứ tự
A. Chụp hiện trạng: branch, commit hash, git status, remote, scripts package, tree quan trọng, Wrangler bindings, asset pipeline, deployment routing, URL/SEO hiện tại. Tách rõ code committed và uncommitted.
B. Kiểm kê thư viện và dữ liệu: nguồn JSON, số hồ sơ thực tế, mùa/version, quân cờ/lõi/trang bị/phe-nghe/nhiem-vu, nguồn bằng chứng và dữ liệu chưa xác minh. Xuất URL inventory + asset mapping + image provenance.
C. Đối chiếu thay đổi avatar thưởng vàng 15 SVG và equipment item clickable 22 ô với source hiện tại. Chỉ đọc/kiểm tra không sửa.
D. Chạy các kiểm thử **local an toàn** sau khi đọc script, báo command/result, không bịa pass/fail. Kiểm tra build, links, overflow responsive trong điều kiện tool thực tế cho phép.
E. Dựng nền Astro 6 + TypeScript tĩnh, kiểm tra kiểu/build/điều hướng; thiết kế kế hoạch cho Cloudflare Workers, D1, R2, xác thực, Studio, SSR, redirect và rollback.
F. Đề xuất D1 schema cho roles/invites/posts/lineups/comments/reactions/polls/report/audit. Lập security matrix authorization với test case creator A không sửa của B. Đánh giá Better Auth + Google OAuth + Drizzle + D1/Workers bằng compatibility spike plan (không tạo live credentials).
G. Mapping từng yêu cầu Product Spec → module/file hiện có → reuse/refactor/new → dependency → risk → milestone (M1–M6).
H. Viết checklist nghiệm thu M1 cụ thể, ưu tiên không mất dữ liệu hay URL; xác định prerequisites cần chủ dự án cung cấp.

## Deliverables
- `docs/architecture/m0-audit.md`: VERIFIED / REPORTED ONLY / UNKNOWN, evidence & command logs.
- `docs/architecture/url-inventory.csv`: old url, type, new url, action (keep/301/new), evidence.
- `docs/architecture/data-inventory.md`: schemas/data/media provenance & gaps.
- `docs/architecture/migration-plan.md`: steps, staging bindings, rollback, test plan.
- `docs/architecture/m1-checklist.md`: work breakdown + acceptance criteria.

## Báo cáo cuối
Viết bằng tiếng Việt, ngắn gọn nhưng có bằng chứng:
- Working tree và uncommitted changes đã bảo toàn hay chưa
- Mức độ tương thích của repo với spec (fit/gap)
- Những bước/kiểm thử thực sự đã chạy và kết quả
- 10 rủi ro lớn nhất (nếu có)
- Danh sách việc cần chủ dự án làm (nếu thật sự cần)
- Tuyệt đối **không** báo đã push/deploy hoặc có PASS khi chưa chứng minh

**DỪNG SAU M0 để chủ dự án duyệt kế hoạch M1.**
