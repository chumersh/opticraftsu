import { Translations, FaqItem } from './types';

export const TRANSLATIONS: Translations = {
  home: { ru: 'Главная', en: 'Home' },
  downloads: { ru: 'Скачать', en: 'Downloads' },
  info: { ru: 'Информация', en: 'Info' },
  subtitle: { ru: 'Неофициальный порт Minecraft Bedrock Edition на Windows', en: 'Unofficial Minecraft Bedrock Edition port for Windows' },
  warning: { ru: 'Данный порт сделан на основе Minecraft Education Edition и не является оригинальной игрой!', en: 'This port is based on Minecraft Education Edition and is not the original game!' },
  btn_download: { ru: 'СКАЧАТЬ', en: 'DOWNLOAD' },
  btn_download_action: { ru: 'СКАЧИВАНИЕ', en: 'DOWNLOAD' },
  btn_legacy: { ru: 'LEGACY', en: 'LEGACY' },
  btn_telegram: { ru: 'TELEGRAM', en: 'TELEGRAM' },
  community: { ru: 'Сообщество', en: 'Community' },
  search_placeholder: { ru: 'Поиск версии...', en: 'Search version...' },
  no_results: { ru: 'Версии не найдены', en: 'No versions found' },
  faq_title: { ru: 'Часто задаваемые вопросы', en: 'Frequently Asked Questions' },
  footer_rights: { ru: 'Проект не официальный', en: 'The project is not official' },
  footer_disclaimer: { ru: 'Не связано с Mojang AB.', en: 'Not affiliated with Mojang AB.' },
  
  // Download Modal Translations
  redirect_title: { ru: 'Переход на Google Drive', en: 'Redirecting to Google Drive' },
  redirect_desc: { ru: 'Вы собираетесь перейти на внешнюю страницу загрузки. Продолжить?', en: 'You are about to visit an external download page. Proceed?' },
  redirect_wait: { ru: 'Ожидание подтверждения', en: 'Waiting for confirmation' },
  redirect_btn: { ru: 'ПЕРЕЙТИ', en: 'PROCEED' },
  redirect_cancel: { ru: 'ОТМЕНА', en: 'CANCEL' },
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: { ru: 'Это бесплатно?', en: 'Is it free?' },
    answer: {
      ru: 'Да, проект полностью бесплатен и переплачивать нечего не нужно',
      en: 'Yes, the project is completely free and there is no need to overpay.'
    }
  },
  {
    id: '2',
    question: { ru: 'Можно ли играть на стороних серверах?', en: 'Can I play on others servers?' },
    answer: {
      ru: 'Да это возможно (правда в 1.19.52 нет возможности)',
      en: 'Yes, it is possible (though it is not possible in 1.19.52)'
    }
  }
];