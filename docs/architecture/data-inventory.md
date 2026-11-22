# Kiểm kê và hợp đồng dữ liệu

## Baseline CoLQ cũ

Nguồn commit `4b1bbe87b30a401a1f9c9b03fa8bc3965805be75`, phiên `lq-encyclopedia-observed-v1`, ứng dụng quan sát `1.64.1.11`, mùa `UNKNOWN`. Bản build snapshot đọc và kiểm tra hash từng file theo `data/current.json` và manifest nguồn. Hash manifest nguồn `883aa709ee2646ae57b6ae3eb03aa7bfcfe2f38a8712401bc99c4d5e483b9186`.

| Loại | File nguồn cùng phiên | Số hồ sơ | Điều kiện khi chuyển |
| --- | --- | ---: | --- |
| Quân cờ | `heroes.json` | 58 | Giữ hai ID Volkath 5/6 vàng và trạng thái riêng của các trường thiếu |
| Phe/Nghề | `traits.json` | 27 | Giữ 121 liên kết hai chiều giữa quân cờ và Phe/Nghề đã quan sát |
| Trang bị | `equipment.json` | 22 | Giữ nguồn và mức xác minh của nhóm hàng, tên do người dùng xác nhận và chỉ số bổ sung từ `data/enrichments/` |
| Lõi/Chúc phúc | `augments.json` | 82 | Tên giao diện Lõi và URL legacy `/chuc-phuc/` đều cần tương thích |
| Nhiệm vụ | `quests.json` | 18 | Giữ loại và tham chiếu phần thưởng, có nhãn cho 4 số lượng tướng hoặc trang bị mặc định `1` |
| Hướng dẫn thư viện | `basic-info.json` | 3 | Giữ ID bài và URL cũ khi xử lý xung đột với landing Hướng dẫn & Mẹo |
| Hồ sơ phụ | `related-profiles.json` | 1 | Giữ liên kết riêng cho Gươm hiền triết, ngoài 210 hồ sơ chính |

177 hồ sơ `COMPLETE`, 33 `PARTIAL` trong 210 hồ sơ chính. `schema.json` và `provenance.json` mô tả hợp đồng và nguồn quan sát. Giữ nguyên byte của bản snapshot được phép tái sử dụng và ghim cả commit lẫn hash. Dùng allowlist để loại đường dẫn máy, dữ liệu thiết bị và raw screenshot/XML khỏi model công khai. Giá trị thiếu tiếp tục là `null` với trạng thái phù hợp. Có thể chuyển logic từ `scripts/data.mjs` và `src/lib/catalog.js`, rồi đối chiếu đầu ra với `dist/data/library.json`. Chỉ dùng `scripts/sync-data.mjs` sau khi xem nguồn Phase 6 và duyệt quy trình nhập mới.

## Ảnh và manifest

- Cấu hình cũ ở `data/assets/config.json` và `data/assets/manifest.json`. Bản manifest đã commit và bản lấy qua HTTPS có cùng SHA-256 `473f8c143ad7b7b5d3ebb56ba3ec739231ee5466f1eb06d18ffd38bd5b58e48e`. `schemaVersion=1`, namespace `lq`, `provenance.dataManifestSha256` khớp nguồn JSON. [Manifest đang phục vụ](https://lq-assets.sunny-contact-251010.workers.dev/lq/releases/lq-encyclopedia-observed-v1/manifest.json)
- `records[]` có 211 ID và 744 slot ánh xạ tới 269 ảnh PNG. Cấu trúc `records[].images[slot]` chứa `key`, `assetId`, chiều rộng/cao, trạng thái association và cờ ảnh độ phân giải thấp. `objects[]` chứa SHA-256, byte, MIME và cache-control. Các key theo dạng `lq/objects/sha256/<2 ký tự>/<sha256>.png`.
- Logic `scripts/shared-assets.mjs` xác minh phiên, quyền public của manifest, ID hồ sơ, key và liên kết slot khi build. M1 dùng cấu hình origin được duyệt, kết hợp `origin + '/' + key`, giữ URL và cache bất biến. So với `src/lib/assets.js` cũ, helper đó nhận tên file ảnh từ preview nội bộ, nên không dùng trực tiếp cho key R2 có prefix.
- Bản cũ ghi `rights.status=UNVERIFIED` và `publicDeliveryAllowed=true`. Xác định phạm vi dùng ảnh trên CoLQ-Web trước khi phát hành. Nếu chưa được duyệt, kiểm tra model, kích thước và mapping bằng bản local có quyền phù hợp.

## Hợp đồng động dự kiến

| Milestone | Nhóm bảng | Bất biến và liên kết |
| --- | --- | --- |
| M2 | `users`, `auth_accounts`, `sessions`, `creator_profiles`, `creator_invites`, `audit_logs` | Unique provider/subject, unique handle, invite dùng một lần, kiểm tra vai trò hiện tại khi ghi. |
| M2 | `seasons`, `patches`, `posts`, `tags`, `post_tags`, `post_versions`, `lineups`, `post_media` | Post có ID ổn định, tác giả và trạng thái. Snapshot đội hình gồm `data_version`, ID game và thông tin hiển thị cần lưu cho mùa cũ. Định danh gắn với phiên nguồn và chỉ bật vị trí hoặc buff đã kiểm chứng. Index theo loại/trạng thái/mùa/thời gian và tác giả. |
| M3 | `comments`, `reactions`, `reports` | Reply cùng bài, parent bắt buộc là root. Reaction duy nhất theo `(target_kind,target_id,user_id)`. Kiểm duyệt lưu người thực hiện và lý do. |
| M4/M6 | `polls`, `poll_options`, `poll_votes` | Unique `(poll_id,user_id)`, option thuộc đúng poll, upsert kèm điều kiện poll còn mở trong cùng thao tác. Option lưu ID tham chiếu và snapshot cho lịch sử. |
| M6 | `follows` | Unique `(follower_id,creator_id)`. |

Game data dùng để tra cứu, Creator content là nhận định có tác giả và tín hiệu cộng đồng có ngữ cảnh riêng. Mùa thực, đặc tả bàn cờ và quy tắc synergy đang chờ bằng chứng. Phân biệt `UNKNOWN` với một mùa đã xác minh trong mọi import và UI.
