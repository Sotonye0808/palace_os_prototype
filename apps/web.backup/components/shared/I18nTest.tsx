import { useTranslation } from 'react-i18next';

export const I18nTest = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      <p>{t('common.welcome')}</p>
      <p>{t('currency.symbol')} {t('currency.code')}</p>
      <p>{t('phone.placeholder')}</p>
      <button>{t('actions.save')}</button>
    </div>
  );
};