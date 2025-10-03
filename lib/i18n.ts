
import { Language, Translations } from '../types';

export const translations: Translations = {
  // Header
  appName: {
    [Language.EN]: 'SciGenius',
    [Language.AR]: 'عبقري العلوم',
  },
  // Hero Section
  heroTitle: {
    [Language.EN]: 'Your AI Copilot for Research',
    [Language.AR]: 'مساعدك البحثي الذكي',
  },
  heroSubtitle: {
    [Language.EN]: 'Upload a paper, ask questions, and discover new insights instantly.',
    [Language.AR]: 'ارفع بحثًا، اطرح الأسئلة، واكتشف رؤى جديدة فورًا.',
  },
  // Chat Interface
  uploadCTA: {
    [Language.EN]: 'Upload a research paper to start',
    [Language.AR]: 'ارفع بحثًا للبدء',
  },
  or: {
    [Language.EN]: 'or',
    [Language.AR]: 'أو',
  },
  dropFile: {
    [Language.EN]: 'drop a file here',
    [Language.AR]: 'أسقط ملفًا هنا',
  },
  fileUploaded: {
    [Language.EN]: 'File ready:',
    [Language.AR]: 'الملف جاهز:',
  },
  changeFile: {
    [Language.EN]: 'Change',
    [Language.AR]: 'تغيير',
  },
  askAnything: {
    [Language.EN]: 'Ask anything about the paper...',
    [Language.AR]: 'اسأل أي شيء عن البحث...',
  },
  placeholder: {
    [Language.EN]: 'e.g., What is the main contribution of this paper?',
    [Language.AR]: 'مثال: ما هي المساهمة الرئيسية لهذا البحث؟',
  },
  suggestion1: {
    [Language.EN]: 'Summarize the abstract',
    [Language.AR]: 'لخّص الملخص',
  },
  suggestion2: {
    [Language.EN]: 'What are the key findings?',
    [Language.AR]: 'ما هي النتائج الرئيسية؟',
  },
  suggestion3: {
    [Language.EN]: 'Find related papers',
    [Language.AR]: 'ابحث عن أبحاث ذات صلة',
  },
  thinking: {
    [Language.EN]: 'Thinking...',
    [Language.AR]: 'أفكر...',
  },
  relatedPapers: {
    [Language.EN]: 'Related Papers',
    [Language.AR]: 'الأبحاث ذات الصلة',
  },
  sources: {
    [Language.EN]: 'Sources',
    [Language.AR]: 'المصادر',
  },
  viewSource: {
    [Language.EN]: 'View Source',
    [Language.AR]: 'عرض المصدر',
  },
  // Footer
  footerText: {
    [Language.EN]: `© ${new Date().getFullYear()} SciGenius. All rights reserved.`,
    [Language.AR]: `© ${new Date().getFullYear()} عبقري العلوم. جميع الحقوق محفوظة.`,
  },
};
