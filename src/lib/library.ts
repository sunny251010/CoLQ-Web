import snapshot from '../../data/legacy/library.json';
import assetManifest from '../../data/legacy/manifest.json';

export const categories = {
  heroes: { path: '/quan-co/', title: 'Quân cờ', summary: 'Kỹ năng, giá vàng và chỉ số theo cấp sao', glyph: '♞' },
  traits: { path: '/phe-nghe/', title: 'Phe / Nghề', summary: 'Hiệu ứng, mốc kích hoạt và quân cờ liên quan', glyph: '✦' },
  equipment: { path: '/trang-bi/', title: 'Trang bị', summary: 'Chỉ số, nội tại và nhóm trang bị', glyph: '⚔' },
  augments: { path: '/chuc-phuc/', title: 'Lõi / Chúc phúc', summary: 'Hiệu ứng của lõi xanh, tím và vàng', glyph: '◆' },
  quests: { path: '/nhiem-vu/', title: 'Nhiệm vụ', summary: 'Điều kiện và phần thưởng đã quan sát', glyph: '▤' },
  'basic-info': { path: '/huong-dan/', title: 'Hướng dẫn', summary: 'Luật chơi và hướng dẫn từ thư viện cũ', glyph: '▤' },
} as const;

export type Category = keyof typeof categories;
export const libraryCategories = ['heroes', 'traits', 'equipment', 'augments', 'quests'] as const;

export const augmentTiers = [
  { value: 'Thường', label: 'Lõi xanh', id: 'loi-xanh', tone: 'blue' },
  { value: 'Huyền thoại / Sử thi', label: 'Lõi tím', id: 'loi-tim', tone: 'purple' },
  { value: 'Truyền thuyết', label: 'Lõi vàng', id: 'loi-vang', tone: 'gold' },
] as const;

export type FieldState = 'VERIFIED' | 'UNVERIFIED' | 'NOT_APPLICABLE' | 'USER_PROVIDED';

export interface Field {
  value: unknown;
  state: FieldState;
  sources: string[];
}

export interface EquipmentGroup {
  id: string;
  label: string;
  anchor: string;
  ordinal: number;
  expectedCount: number;
}

export interface Reward {
  reward_type: 'gold' | 'chess' | 'equipment';
  reward_name: string;
  target_id?: string;
  quantity: number | null;
  quantity_is_default?: boolean;
}

export interface StarLevel {
  stars: number;
  attrs: { name: string; value_text: string | null }[];
}

export interface LibraryRecord {
  id: string;
  category: Category;
  name: string;
  href: string;
  status: 'COMPLETE' | 'PARTIAL';
  auxiliary: boolean;
  fields: Record<string, Field | undefined>;
  missing: { field: string }[];
  price: number | null;
  quality: string | null;
  traits: { id: string; name: string }[];
  members: string[];
  equipmentGroup?: Pick<EquipmentGroup, 'id' | 'label' | 'anchor'> & { position: number };
  equipmentSupplement?: {
    stats: { label: string; valueText: string }[];
    effectText?: string;
    notes: { status: string; text: string }[];
  };
}

interface Catalog {
  version: string;
  application: string;
  season: 'UNKNOWN';
  records: LibraryRecord[];
  auxiliary: LibraryRecord[];
  counts: Record<Category | 'total' | 'COMPLETE' | 'PARTIAL', number>;
  equipmentGroups: EquipmentGroup[];
  publicAssetOrigin: string;
}

export interface ImageSlot {
  key: string;
  width: number;
  height: number;
  assetId: string;
}

export const catalog = snapshot as unknown as Catalog;
export const records = [...catalog.records, ...catalog.auxiliary];
export const recordById = new Map(records.map((record) => [record.id, record]));
export const imagesById = new Map(assetManifest.records.map((record) => [
  record.id,
  record.images as Record<string, ImageSlot | undefined>,
]));
export const guides = catalog.records.filter((record) => record.category === 'basic-info');

export function fieldValue<T>(record: LibraryRecord, field: string): T | undefined {
  return (record.fields[field]?.value ?? undefined) as T | undefined;
}

export function guideSections(record: LibraryRecord): { text: string }[] {
  return fieldValue<{ text: string }[]>(record, 'sections') ?? [];
}

export function primarySlot(record: LibraryRecord): string {
  if (record.category === 'heroes') return 'portrait';
  if (record.category === 'quests') return 'reward:0';
  return 'icon';
}

export function recordSummary(record: LibraryRecord): string {
  switch (record.category) {
    case 'heroes':
      return fieldValue<string>(record, 'skill_description') ?? fieldValue<string>(record, 'skill_name') ?? '';
    case 'equipment':
      return fieldValue<string>(record, 'summary') ?? '';
    case 'augments':
      return fieldValue<string>(record, 'description') ?? '';
    case 'traits':
      return fieldValue<{ effect: string }[]>(record, 'levels')?.[0]?.effect ?? '';
    case 'quests':
      return (fieldValue<Reward[]>(record, 'rewards') ?? []).map((reward) =>
        reward.reward_type === 'gold' ? `${reward.quantity ?? '?'} vàng` : reward.reward_name
      ).join(' · ');
    case 'basic-info':
      return fieldValue<{ text: string }[]>(record, 'sections')?.find(({ text }) => text.length > 45)?.text ?? '';
  }
}

export function recordTitle(record: LibraryRecord): string {
  return record.price == null ? record.name : `${record.name} · ${record.price} vàng`;
}
