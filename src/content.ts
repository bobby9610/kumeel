export const heroImage = 'https://ktwugokiznarbnsvohzq.supabase.co/storage/v1/object/public/kumeel-media/site/desert.png'
export type Writing = { id: string; title: string; category: 'تأملات' | 'شعر'; text: string }
export type Media = { id: string; title: string; type: 'صورة' | 'فيديو'; url: string }
export type Content = { bio: string; writings: Writing[]; media: Media[] }
export const initialContent: Content = {
  bio: 'هذه مساحة كميل ال نهاب؛ مكانٌ للحكاية كما تُعاش، وللصور كما تبقى في الذاكرة، وللكلمات حين تجد وقتها. هنا تتجاور السيرة والشعر والتأمل، وتُترك للحياة مساحة كي تكتب فصلها القادم.',
  writings: [
    { id: 'meaning', title: 'عن الأشياء التي تبقى', category: 'تأملات', text: 'ربما لا تُقاس الحياة بعدد الأيام التي مرّت، بل بعدد المرات التي كنّا فيها حاضرين حقًا.\n\nفي حديثٍ لم نستعجل نهايته، في طريقٍ مشيناه دون أن ننظر إلى الساعة، وفي يدٍ امتدت حين ضاقت الكلمات.\n\nلا يبقى من الطريق غباره، بل ما تغيّر فينا ونحن نعبره. وما نمنحه للحياة من انتباه، تعيده إلينا على هيئة معنى.' },
    { id: 'light', title: 'للضوء نافذة أخرى', category: 'شعر', text: 'أتركُ للضوءِ بابًا مواربًا\nلعلّ صباحًا يمرّ\nوأجمعُ من صمتِ هذا الطريق\nكلامًا يليقُ بما لا يُقال\n\nفما كلُّ من سارَ يعرفُ دربًا\nولكنّ في السيرِ بعضَ الوصول.' },
    { id: 'slow', title: 'أن تمضي على مهل', category: 'تأملات', text: 'هناك جمال لا يكشف نفسه للمستعجل. ظل شجرة يتبدّل، ورائحة كتاب قديم، ووجه مألوف نراه كأننا نراه للمرة الأولى.\n\nأن تمضي على مهل، هو أن تمنح الأشياء فرصة لتصل إليك. ليس كل توقف تأخرًا؛ بعض الوقوف عودة إلى النفس.' },
  ],
  media: [
    { id: 'dunes', title: 'بين الرمل والسكينة', type: 'صورة', url: heroImage },
    { id: 'sea', title: 'ما يقوله البحر', type: 'صورة', url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1000&q=85' },
    { id: 'mountain', title: 'حيث يتّسع الأفق', type: 'صورة', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85' },
  ],
}
export function validContent(value: unknown): value is Content {
  if (!value || typeof value !== 'object') return false
  const c = value as Content
  const text = (v: unknown, max: number) => typeof v === 'string' && v.length <= max
  const ids = (items: { id: string }[]) => new Set(items.map(i => i.id)).size === items.length
  return text(c.bio, 10000) && Array.isArray(c.writings) && c.writings.length <= 500 &&
    c.writings.every(w => w && text(w.id, 150) && text(w.title, 150) && text(w.text, 50000) && ['شعر', 'تأملات'].includes(w.category)) && ids(c.writings) &&
    Array.isArray(c.media) && c.media.length <= 500 && c.media.every(m => m && text(m.id, 150) && text(m.title, 150) && ['صورة', 'فيديو'].includes(m.type) && typeof m.url === 'string' && /^(https:\/\/|\/images\/|data:image\/(png|jpeg|webp);base64,)/.test(m.url)) && ids(c.media)
}
