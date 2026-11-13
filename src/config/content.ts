/**
 * All the words of the site live here, so they can be edited without
 * touching any component. `ar` strings are rendered RTL, `fr` strings LTR.
 */

export const scenes = [
  { id: 'intro', label: 'Salut', ar: 'البداية' },
  { id: 'letter', label: 'La lettre', ar: 'الرسالة' },
  { id: 'little-things', label: 'Petites choses', ar: 'حوايج صغار' },
  { id: 'photos', label: 'L’album', ar: 'الصور' },
  { id: 'mchat', label: 'Mchat', ar: 'مشات' },
  { id: 'finale', label: 'Merci', ar: 'شكراً' },
] as const

export type SceneId = (typeof scenes)[number]['id']

export const intro = {
  hello: 'Salut Nabila !',
  line1: 'شي حاجة صغيرة ليك...',
  line2: 'حيت كاينين ناس كيستاهلو نوقفو شوية ونقولو ليهم: راكم عزيزين علينا.',
  fr: 'Une petite surprise, juste pour toi.',
  cta: 'يلا نكتاشفو؟',
}

export const letter = {
  title: 'واحد الرسالة ليك...',
  greeting: 'Chère Nabila,',
  paragraphs: [
    'بغيت غير نخصص ليك هاد المساحة الصغيرة باش نقول ليك واحد الحاجة اللي يمكن نتي عارفاها، ولكن زوين الواحد يعاود يقولها من حين لآخر.',
    'بصراحة، أنا فرحان حيث تعرفت عليك، وكنعتز بزاف بصداقتنا. نتي إنسانة ظريفة، لطيفة وحنينة، وعندك واحد الطريقة زوينة فالهضرة كتخلي التواصل معاك مريح.',
    'كيعجبني فيك حتى أنك ملي كنحتاجك كنلقاك... واخا بعض المرات ههه.',
    'وزيد عليها، راه تعلمت منك حوايج مهمة بزاف، بحال كيفاش نلعب Partisi، وواحد الكلمة اللي مستحيل ننساها: مشات.',
    'المهم، بغيتك تعرفي أنني كنفتاخر بصداقتنا، وكنقدّر وجودك فحياتي. ماشي ضروري تكون شي مناسبة باش نقولو للناس اللي عزيزين علينا أنهم فعلاً عندهم قيمة.',
  ],
  signoff: 'Merci d’être toi, Nabila.',
}

export type CardMotif = 'smile' | 'leaf' | 'voice' | 'lamp' | 'rings' | 'dice'

export const littleThings = {
  title: 'حوايج صغار ولكن عندهم قيمة كبيرة',
  kicker: 'Six petites choses',
  hint: 'كليكي على كل بطاقة',
  cards: [
    { fr: 'Ton sourire', ar: 'حيت عندك واحد الروح ظريفة وكتعرفي كيفاش تلطفي الجو.', motif: 'smile' },
    { fr: 'Ta gentillesse', ar: 'الحنية واللطف ديالك من الحوايج اللي كنقدّر فيك.', motif: 'leaf' },
    { fr: 'Ta façon de parler', ar: 'كلامك زوين والهضرة معاك عندها goût خاص.', motif: 'voice' },
    { fr: 'Toujours là', ar: 'ملي كنحتاجك كنلقاك... غالباً ههه.', motif: 'lamp' },
    { fr: 'Notre amitié', ar: 'كنفتاخر أنني نقدر نقول عليك صديقتي.', motif: 'rings' },
    { fr: 'Les petites leçons', ar: 'Partisi و«مشات»... هادو خاصهم يبقاو فالتاريخ!', motif: 'dice' },
  ] as { fr: string; ar: string; motif: CardMotif }[],
}

export const photosCopy = {
  kicker: 'Un petit album',
  title: 'شوية ديال الصور',
  cinematicLine: 'Certaines images n’ont pas besoin de légende.',
  polaroidTitle: 'Sur la table',
  polaroidHint: 'كليكي على شي صورة',
  scrapbookTitle: 'Le carnet',
  scrapbookNotes: ['une page pour toi', 'à garder', 'نبيلة ✿', 'appuie pour voir ▸'],
  carouselTitle: 'L’album',
}

export const mchat = {
  title: 'واحد الحاجة مستحيل ننساها...',
  button: 'واش بغيتي تعرفي؟',
  word: 'مشات',
  line1: 'كاينين كلمات كتدوز وكتنساها... وكاينين كلمات كيبقاو محفورين فالتاريخ 😂',
  line2: 'شكراً على دروس Partisi حتى هي!',
}

export const finale = {
  line1: 'بعض الصداقات ما محتاجاش كلام بزاف...',
  line2: 'غير خاصنا نعرفو قيمتها.',
  ar: 'كنفتاخر بصداقتنا، نبيلة.',
  fr: 'Merci pour cette belle amitié.',
  replay: 'Revoir depuis le début',
}
