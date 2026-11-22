# AGENTS.md — Quy tắc làm việc chung

Tệp này có thể dùng cho web, ứng dụng, bot, CLI, API và automation, với bất kỳ stack nào. Nó quy định cách làm việc; requirement, đường dẫn, lệnh chạy, dữ liệu và cấu hình riêng nằm trong tài liệu của từng dự án.

## 1. Phạm vi và thứ tự ưu tiên

- Tuân thủ yêu cầu hiện tại của người dùng và phạm vi đã được giao. Không diễn giải roadmap dài hạn thành quyền triển khai toàn bộ.
- Phân biệt khảo sát, lập kế hoạch, triển khai, nghiệm thu và phát hành. Một nhiệm vụ khảo sát không cho phép scaffold, cài đặt, sửa code hoặc deploy.
- Quyết định đã được người dùng chấp thuận tiếp tục có hiệu lực; không hỏi lại cùng một quyền.
- Chỉ hỏi khi thiếu quyết định có ảnh hưởng đáng kể đến requirement, architecture, dữ liệu, bảo mật, chi phí hoặc production. Gom câu hỏi liên quan; tiếp tục phần độc lập trong khi chờ.
- Không tự chuyển phase. Khi hoàn tất phase được giao, báo cáo, đề xuất 3–5 việc tiếp theo và dừng, trừ khi người dùng đã giao nhiều phase hoặc toàn bộ công việc.

## 2. Đọc context và kiểm tra hiện trạng

1. Đọc AGENTS.md và SETUP.md nếu có.
2. Kiểm tra workspace, repository, branch và thay đổi chưa commit.
3. Đọc PROJECT.md hoặc SPEC.md, README.md và tài liệu tiến độ đang được dự án sử dụng.
4. Đọc DESIGN.md, kiến trúc, quyết định kỹ thuật hoặc báo cáo trước nếu liên quan.
5. Đọc source/config/script liên quan, trace flow hiện tại rồi mới sửa.

Tên tài liệu là gợi ý, không phải danh sách bắt buộc phải tạo. Nếu một tài liệu không tồn tại, ghi nhận khi cần; không dựng nội dung thay cho bằng chứng. Không bootstrap lại dự án đã có source.

Khi người dùng nói “Tiếp tục”, tiếp tục công việc chưa xong trong phạm vi hiện hành. Nếu phase đã kết thúc và chưa có quyền làm phase tiếp theo, trình bày đề xuất để người dùng duyệt.

## 3. Smallest correct solution

Ưu tiên giải pháp đúng, nhỏ, rõ ràng, dễ kiểm tra và bảo trì. Trước khi thêm code, cân nhắc theo thứ tự:

1. Chức năng có thực sự cần trong requirement hiện tại không?
2. Codebase đã giải quyết được chưa?
3. Standard library hoặc platform/native API có đáp ứng không?
4. Dependency hiện tại có đáp ứng không?
5. Một đoạn code trực tiếp có đủ không?
6. Chỉ sau đó cân nhắc dependency hoặc abstraction mới.

Không đánh đổi correctness, security, validation, accessibility hay xử lý lỗi quan trọng để giảm code. Không thêm functionality “sau này có thể cần”. Nguyên tắc này không phụ thuộc plugin bổ sung.

## 4. Stack, dependency và architecture

- Xác định stack từ tài liệu và manifest thực tế; không có framework/language mặc định.
- Giữ công nghệ, package manager và conventions hiện có. Không rewrite hoặc đổi stack ngoài phạm vi được giao.
- Chỉ thêm dependency khi có lợi ích rõ; kiểm tra maintenance, compatibility và chi phí vận hành. Ưu tiên project-local thay vì global.
- Không tự thêm database, auth, backend, cache, queue, analytics, cloud service, monorepo hoặc microservices khi requirement chưa cần.
- Không tạo repository/service/factory/event bus hoặc utility wrapper chỉ vì pattern phổ biến.
- Tách component/module khi có lặp lại có ý nghĩa hoặc domain boundary thực tế. Duplication nhỏ dễ hiểu đôi khi tốt hơn abstraction sớm.
- Ưu tiên derived state, local state và cơ chế sẵn có; tránh duplicate state hoặc persistence không cần thiết.

## 5. Triển khai và sửa lỗi

Thực hiện trọn chu trình trong phạm vi được giao:

inspect → plan → implement → test → fix → verify → review → document

Không dừng sau skeleton, lần build đầu hoặc test đầu. Không hỏi có nên test/sửa lỗi/tiếp tục bước cần thiết đã được ủy quyền hay không.

Khi sửa bug: reproduce → trace → xác định nguyên nhân → sửa tại nguồn → test → regression check. Nếu chưa reproduce được, nói rõ; không khẳng định nguyên nhân đã xác minh. Không suppress exception, bỏ validation hoặc sửa test chỉ để che lỗi.

Giữ thay đổi liên quan trực tiếp đến task. Ghi nhận improvement ngoài phạm vi thay vì tự triển khai. Không format hàng loạt file không liên quan.

## 6. Làm song song và tài nguyên

- Chạy song song 2–3 việc nhẹ, độc lập khi có lợi, chẳng hạn đọc tài liệu và kiểm tra cấu hình.
- Giảm concurrency với build, browser tests, native compilation hoặc công việc tốn RAM/CPU. Không chạy nhiều tác vụ nặng cùng lúc chỉ để rút ngắn thời gian.
- Không cho nhiều tiến trình cùng ghi một file hoặc sửa trạng thái dùng chung.
- Chỉ dùng sub-agent khi được phép và có phần việc độc lập rõ ràng. Kiểm tra lại kết quả trước khi dùng.

## 7. Documentation, skills và tools

- Dùng Context7 cho cú pháp, cấu hình, setup, migration hoặc lỗi riêng của library/framework/SDK/API/CLI/cloud service, kể cả công nghệ quen thuộc.
- Bắt đầu bằng resolve-library-id, chọn nguồn phù hợp và phiên bản nếu có; query-docs theo từng khái niệm. Không gửi secrets hoặc source riêng tư vào truy vấn.
- Không cần Context7 cho refactor thuần, logic nghiệp vụ hoặc khái niệm lập trình chung. Khi thiếu tài liệu, nêu giới hạn và dùng bằng chứng local phù hợp.
- Chỉ dùng skill/plugin/MCP phù hợp và đang khả dụng. Tool của agent không tự trở thành dependency của sản phẩm.
- Không tự clone tool vào source, cài MCP/plugin hoặc đổi cấu hình toàn hệ thống nếu chưa thuộc quyền được giao.
- Giữ một hệ thống task/roadmap; không tạo tài liệu trùng chức năng.

## 8. UI, accessibility và performance

Nếu dự án có UI: ưu tiên clarity, hierarchy, consistency, responsive và trạng thái loading/error/empty/success. Theo DESIGN.md nếu có. Tránh card, gradient, shadow và animation không phục vụ interaction.

Dùng semantic elements, label, keyboard navigation, focus visible, contrast dễ đọc và touch targets phù hợp. Tôn trọng reduced motion. Chỉ dùng ARIA khi cần; không copy branding/assets của sản phẩm tham khảo ngoài quyền sử dụng.

Không tối ưu sớm khi thiếu bằng chứng, nhưng tránh repeated work, duplicate requests, listener leaks, vòng lặp không giới hạn và assets/dependencies lớn không cần thiết. Tối ưu sâu dựa trên đo lường.

## 9. Testing và bằng chứng

- Đọc scripts/config để chọn validation phù hợp: unit, integration, typecheck, lint, build hoặc native/runtime tests.
- Không coi build pass là behavior pass. Kiểm tra flow như người dùng thật.
- Ví dụ web: mở trang, điều hướng, nhập, reload, responsive, keyboard và console.
- Ví dụ API: request hợp lệ/không hợp lệ, response và authorization. Ví dụ CLI: input, output, exit code và failure case.
- Không dựng framework test lớn cho thay đổi nhỏ. Logic quan trọng cần verification đáng tin cậy.
- Ghi riêng PASS/FAIL/SKIP và lý do. Thiếu dữ liệu/quyền không đồng nghĩa PASS.
- Phân biệt mock, local/emulator, browser, thiết bị/native, live service và user acceptance.
- Không bịa dữ liệu thật hoặc tải bù tài nguyên chỉ để test pass. Fixture tổng hợp phải được nhận diện rõ và không thay thế nghiệm thu dữ liệu thật.

## 10. Secrets, dữ liệu và external actions

- Không hard-code, in/log hoặc commit token, password, API key, cookie, credential, private key hay session.
- Không đọc file secrets/env thật chỉ để khảo sát; kiểm tra tên biến/template hoặc trạng thái cần thiết mà không lộ giá trị.
- Dùng cơ chế secrets phù hợp; template chỉ chứa placeholder. Ignore secrets, dữ liệu vận hành và generated artifacts theo dự án.
- Validate ở trust boundary và kiểm tra authorization tại nơi đọc/ghi dữ liệu; không chỉ dựa vào UI.
- Không tự thay đổi production database, storage, domain, quyền truy cập hoặc dữ liệu đang được hệ thống khác dùng.
- Phê duyệt phase không tự bao gồm production, chi phí, quyền nội dung hoặc công khai dữ liệu.
- Không tắt bảo vệ hệ thống để làm tool chạy. Nếu bị chặn, tìm phương án an toàn và báo đúng giới hạn.

## 11. Git và công việc của người khác

- Kiểm tra status/diff trước khi sửa và trước checkpoint. Giữ nguyên thay đổi không liên quan; không tự revert công việc của người khác.
- Chỉ init/commit/tạo remote/push theo quyền và yêu cầu hiện hành. Không coi bootstrap là quyền tự xuất bản.
- Không force-push, rewrite history, destructive reset, xóa branch/repository hoặc ghi đè remote khi chưa có phê duyệt cụ thể.
- Trước commit/push, rà index: không secrets, dependencies, debug files, dữ liệu vận hành hoặc build artifacts không cần track. Dùng secret scanner nếu khả dụng.
- Commit nhỏ, có ý nghĩa khi được yêu cầu. Ví dụ: `feat: add reminders`, `fix: validate input`, `docs: clarify setup`.

## 12. Tiến độ, hoàn thành và báo cáo

Cập nhật tài liệu tiến độ đang có bằng kết quả thực tế. Có thể dùng NOT STARTED / IN PROGRESS / BLOCKED / READY FOR REVIEW / DONE; trạng thái dự án được quy định trong tài liệu riêng. Không đánh dấu hoàn thành trước verification, không coi chờ user acceptance là đã nghiệm thu.

Task hoàn thành khi behavior yêu cầu đã có, checks phù hợp pass, flow bị ảnh hưởng được xác minh, không regression chặn luồng và không thay đổi ngoài phạm vi. Rà edge cases, complexity, dependency, secret/debug code và file thừa trước khi báo cáo.

Báo cáo ngắn gọn: thay đổi chính; validation và kết quả; giới hạn/blocker nếu có; Git thực tế. Nếu phải dừng, ghi rõ đã làm gì, còn gì và bước tiếp theo. Thông tin riêng của dự án, đường dẫn và lệnh chạy nằm trong PROJECT.md/README.md hoặc tài liệu chuyên biệt, không thêm vào bộ quy tắc chung này.

## 13. Điểm vào tài liệu CoLQ 2.0

- Luôn đọc [ROADMAP.md](ROADMAP.md) và [DECISIONS.md](DECISIONS.md) trước khi thực hiện công việc; đọc phần liên quan và kiểm tra hiện trạng trước khi sửa.
- DECISIONS là nguồn chuẩn về CONFIRMED / PROPOSED / OPEN / DEFERRED. Tuân thủ CONFIRMED; không biến đề xuất, câu hỏi mở hoặc roadmap thành quyền triển khai.
- Sau mỗi quyết định mới được người dùng xác nhận, cập nhật DECISIONS; không chỉ ghi khi quyết định cũ bị thay thế. Không tự thêm tính năng hoặc đổi công nghệ đã được chốt.
- Quyền và phase hiện hành được ghi ở đầu hai tài liệu. Chỉ thực hiện đúng phạm vi người dùng đã giao; chưa có xác nhận implementation thì không scaffold, viết code ứng dụng, cài dependency, tạo database hoặc deploy.
- Khi người dùng thay đổi quyết định, cập nhật DECISIONS và phần ROADMAP bị ảnh hưởng, giữ lịch sử thay thế ngắn. Nếu còn mâu thuẫn, hỏi người dùng trước khi thay đổi kết luận; không hỏi lại quyết định đã được làm rõ.
- Khi phạm vi hoặc thứ tự triển khai được xác nhận thay đổi, cập nhật ROADMAP. Nếu mới phát hiện nhu cầu đổi phạm vi/thứ tự, ghi PROPOSED/OPEN và xin xác nhận trước khi áp dụng.
- Sau mỗi milestone, cập nhật ROADMAP bằng trạng thái, checklist, tiêu chí nghiệm thu đã đạt/chưa đạt và bằng chứng thực tế. Milestone dùng NOT STARTED / IN PROGRESS / BLOCKED / DONE; chưa kiểm thử thì không DONE. Đã thảo luận hoặc có bản thiết kế không đồng nghĩa đã triển khai; chờ duyệt tài liệu là trạng thái review riêng.
- Không khẳng định tính năng hoạt động nếu chưa kiểm thử thực tế; báo rõ PASS/FAIL/SKIP, môi trường và giới hạn. Kiểm thử `sunny251010/CoLQ` chỉ xác lập baseline cho đối chiếu; kiểm thử `sunny251010/CoLQ-Web` xác minh hành vi của website mới.
- Không tự deploy production, nâng/bật dịch vụ trả phí hoặc thay đổi phá hủy dữ liệu. Ưu tiên giải pháp đơn giản, hiệu quả, dễ bảo trì và tiết kiệm quota; không bỏ bảo vệ hoặc audit bắt buộc để tiết kiệm.
- Giữ một hệ thống quyết định và roadmap; không tạo bản tổng hợp cạnh tranh hoặc thêm tính năng ngoài phạm vi. Yêu cầu báo cáo/dừng cụ thể của người dùng được ưu tiên hơn gợi ý bước tiếp theo trong quy tắc chung.

## 14. Skills chuyên môn và công cụ

- Dùng skill theo tác vụ, không nạp tất cả cho mọi lượt: [premium-ui-ux](.agents/skills/premium-ui-ux/SKILL.md) cho hướng thiết kế/wireframe/tokens; [frontend-visual-qa](.agents/skills/frontend-visual-qa/SKILL.md) cho UI đã render và bằng chứng tương tác; [system-architecture](.agents/skills/system-architecture/SKILL.md) cho kiến trúc/trade-offs/integrity/chi phí.
- Skills chứa quy trình tái sử dụng; quyết định sản phẩm và phase riêng vẫn ở ROADMAP/DECISIONS. Chưa có hướng thiết kế được duyệt thì trình phương án trước khi xây; phê duyệt đã có tiếp tục hiệu lực trong phạm vi đó.
- Ưu tiên tool/skill phù hợp đang có, không cài MCP hay package chỉ vì một skill nhắc tới. Khi được giao setup mới, kiểm tra nguồn/quyền/trùng chức năng và quyền cài đặt trước khi thay cấu hình.
- Xem [CODEX_TOOLING](docs/CODEX_TOOLING.md) cho kiểm kê, giới hạn và kết quả mô phỏng. Được Codex nhận diện hoặc qua mô phỏng không đồng nghĩa đã kiểm thử UI/production; ghi riêng phần chưa quan sát.
