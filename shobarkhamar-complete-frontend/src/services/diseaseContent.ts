// Disease reference content (both languages) served by the backend.
// Seeded from app/seeds/ on the API side, so fish and poultry content has one home.
import type { Lang } from '../i18n/LanguageContext';

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : '/api/v1';

export interface LocalizedText {
  en: string;
  bn: string | null;
}

export interface LocalizedList {
  en: string[];
  bn: string[];
}

export interface TreatmentContent {
  treatment_code: string;
  name: LocalizedText;
  medication: LocalizedText;
  medication_summary: LocalizedText;
  application_method: string;
  dosage: LocalizedText;
  duration_days: number | null;
  precaution: LocalizedText;
  precautions: LocalizedList;
  alternatives: LocalizedText;
  summary: LocalizedText;
  effectiveness: LocalizedText;
  requires_veterinarian: boolean;
  reference: string | null;
}

export interface DiseaseContent {
  disease_code: string;
  species: 'FISH' | 'POULTRY' | 'MIXED';
  name: LocalizedText;
  short_name: LocalizedText;
  description: LocalizedText;
  diagnosis: LocalizedText;
  symptoms: LocalizedList;
  contagious: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  notifiable: boolean;
  zoonotic: boolean;
  treatment: TreatmentContent | null;
}

/** Text in the chosen language, falling back to English when Bangla is missing. */
export function pick(text: LocalizedText | undefined, lang: Lang): string {
  if (!text) return '';
  return (lang === 'bn' ? text.bn : text.en) || text.en || '';
}

/** List in the chosen language, falling back to English when Bangla is missing. */
export function pickList(list: LocalizedList | undefined, lang: Lang): string[] {
  if (!list) return [];
  const chosen = lang === 'bn' ? list.bn : list.en;
  return chosen?.length ? chosen : list.en ?? [];
}

let cache: Promise<DiseaseContent[]> | null = null;

export function getDiseaseContent(): Promise<DiseaseContent[]> {
  if (!cache) {
    cache = fetch(`${BASE_URL}/diseases/content`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Could not load disease content (${res.status})`);
        const data: { diseases: DiseaseContent[] } = await res.json();
        return data.diseases;
      })
      .catch((err) => {
        cache = null;
        throw err;
      });
  }
  return cache;
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

/** Find one disease by AI class code or by its English name. */
export async function getDiseaseByCode(code: string): Promise<DiseaseContent | null> {
  if (!code) return null;
  const wanted = normalize(code);
  const diseases = await getDiseaseContent();
  return (
    diseases.find((d) =>
      [d.disease_code, d.name.en, d.short_name.en].some((c) => c && normalize(c) === wanted)
    ) ?? null
  );
}

/** Disease display name in the chosen language, falling back to the code we were given. */
export function diseaseDisplayName(
  diseases: DiseaseContent[],
  code: string | undefined,
  lang: Lang
): string {
  if (!code) return '';
  const wanted = normalize(code);
  const match = diseases.find((d) =>
    [d.disease_code, d.name.en, d.short_name.en].some((c) => c && normalize(c) === wanted)
  );
  return match ? pick(match.short_name, lang) : code;
}
