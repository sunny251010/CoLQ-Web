import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

function readPinned(file, expectedHash) {
  const bytes = readFileSync(new URL(`../data/legacy/${file}`, import.meta.url));
  assert.equal(sha256(bytes), expectedHash, `${file} differs from the audited CoLQ snapshot`);
  return JSON.parse(bytes);
}

const catalog = readPinned('library.json', '125f36da10cfa84e89cfc13e0af3699c212fadd139db8f9d2ba025a4332f3739');
const provenance = readPinned('provenance.json', 'b5efad541a53211c81253974ad398b241ca0f5dd7848077d9539cada7835e857');
const manifest = readPinned('manifest.json', '473f8c143ad7b7b5d3ebb56ba3ec739231ee5466f1eb06d18ffd38bd5b58e48e');
assert.equal(catalog.version, manifest.release);
assert.equal(catalog.version, provenance.version);
assert.equal(catalog.manifestSha256, provenance.manifestSha256);
assert.equal(catalog.manifestSha256, manifest.provenance.dataManifestSha256);
assert.equal(catalog.season, 'UNKNOWN');
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.rights.status, 'UNVERIFIED');
assert.equal(manifest.rights.publicDeliveryAllowed, true);

const { records, auxiliary, counts } = catalog;
const all = [...records, ...auxiliary];
const byId = new Map(all.map((record) => [record.id, record]));
assert.equal(records.length, 210);
assert.equal(auxiliary.length, 1);
assert.equal(byId.size, 211);
assert.equal(new Set(all.map(({ href }) => href)).size, 211);
assert.equal(records.filter(({ status }) => status === 'COMPLETE').length, 177);
assert.equal(records.filter(({ status }) => status === 'PARTIAL').length, 33);
const routeBases = { heroes: 'quan-co', traits: 'phe-nghe', equipment: 'trang-bi', augments: 'chuc-phuc', quests: 'nhiem-vu', 'basic-info': 'huong-dan' };
const expectedCounts = { heroes: 58, traits: 27, equipment: 22, augments: 82, quests: 18, 'basic-info': 3 };
for (const [category, expected] of Object.entries(expectedCounts)) {
  assert.equal(counts[category], expected);
  assert.equal(records.filter((record) => record.category === category).length, expected);
}

let relations = 0;
let directRewards = 0;
let defaultQuantities = 0;
for (const record of all) {
  assert.ok(Object.hasOwn(routeBases, record.category));
  const root = record.auxiliary ? 'ho-so' : routeBases[record.category];
  assert.match(record.href, new RegExp(`^/${root}/[a-z0-9-]+-[a-z0-9]{8}/$`));
  assert.ok(record.href.endsWith(`-${record.id.slice(-8)}/`));
  for (const field of Object.values(record.fields)) {
    assert.ok(['VERIFIED', 'UNVERIFIED', 'NOT_APPLICABLE', 'USER_PROVIDED'].includes(field.state));
    assert.ok(Array.isArray(field.sources));
  }
  for (const { id } of record.traits) {
    const trait = byId.get(id);
    assert.equal(trait?.category, 'traits');
    assert.ok(trait.members.includes(record.id));
    relations++;
  }
  for (const id of record.members) {
    assert.ok(byId.get(id)?.traits.some((trait) => trait.id === record.id));
  }
  for (const reward of record.fields.rewards?.value ?? []) {
    if (reward.target_id) {
      const target = byId.get(reward.target_id);
      assert.equal(target?.category, reward.reward_type === 'chess' ? 'heroes' : 'equipment');
      directRewards++;
    }
    if (reward.quantity_is_default) {
      assert.notEqual(reward.reward_type, 'gold');
      assert.equal(reward.quantity, 1);
      assert.equal(reward.quantity_observed, null);
      defaultQuantities++;
    }
  }
}
assert.equal(relations, 121);
assert.equal(defaultQuantities, 4);
assert.deepEqual(records.filter(({ name }) => name === 'Volkath').map(({ price }) => price).sort(), [5, 6]);

const objectByKey = new Map(manifest.objects.map((entry) => [entry.key, entry]));
assert.equal(manifest.objects.length, 269);
assert.equal(objectByKey.size, 269);
for (const { key, sha256: hash, bytes, contentType } of manifest.objects) {
  assert.match(hash, /^[a-f0-9]{64}$/);
  assert.equal(key, `lq/objects/sha256/${hash.slice(0, 2)}/${hash}.png`);
  assert.ok(Number.isInteger(bytes) && bytes > 0);
  assert.equal(contentType, 'image/png');
}

const usedKeys = new Set();
const matchedIds = new Set();
let slots = 0;
for (const entry of manifest.records) {
  const record = byId.get(entry.id);
  assert.equal(record?.name, entry.name);
  assert.equal(record.category, entry.category);
  assert.ok(!matchedIds.has(entry.id));
  matchedIds.add(entry.id);
  assert.deepEqual(Object.keys(entry.images).sort(), Object.keys(record.images).sort());
  for (const [slot, image] of Object.entries(entry.images)) {
    assert.ok(objectByKey.has(image.key));
    assert.equal(image.associationStatus, 'VERIFIED_SOURCE_ASSOCIATION');
    assert.ok(image.width > 0 && Number.isInteger(image.width) && image.height > 0 && Number.isInteger(image.height));
    assert.equal(record.images[slot].url, `${catalog.publicAssetOrigin}/${image.key}`);
    assert.equal(record.images[slot].assetId, image.assetId);
    usedKeys.add(image.key);
    slots++;
  }
}
assert.equal(matchedIds.size, all.length);
assert.equal(slots, 744);
assert.equal(usedKeys.size, 269);
console.log(`Dữ liệu hợp lệ: ${all.length} hồ sơ, ${relations} liên kết Phe/Nghề, ${directRewards} tham chiếu phần thưởng, ${slots} vị trí ảnh, ${usedKeys.size} ảnh.`);
