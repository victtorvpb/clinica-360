# 🚀 Quick Setup Guide - Internationalization

## ⚡ Quick Start

Follow these steps to activate internationalization in your Clinic 360 project:

### 1. Install Dependencies

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 2. Verify File Structure

Make sure you have these files created:

```
✅ src/i18n/index.ts
✅ src/i18n/locales/en.json  
✅ src/i18n/locales/pt.json
✅ src/hooks/useLanguage.ts
✅ src/components/LanguageSelector.tsx
```

### 3. Update package.json Dependencies

Your `package.json` should include:

```json
{
  "dependencies": {
    "i18next": "^23.7.6",
    "react-i18next": "^13.5.0", 
    "i18next-browser-languagedetector": "^7.2.0"
  }
}
```

### 4. Initialize i18n in main.tsx

The import in `src/main.tsx` should be:

```tsx
import "./i18n";
```

### 5. Test the Setup

1. Run the development server:
```bash
npm run dev
```

2. Check if:
   - ✅ No console errors
   - ✅ Language selector appears in header
   - ✅ Switching languages works
   - ✅ Language persists on page refresh

## 🔧 Troubleshooting

### Common Issues:

**1. Module not found errors:**
- Run `npm install` to ensure all dependencies are installed
- Restart your development server

**2. Translations not loading:**
- Check that JSON files are properly formatted
- Verify the import path in `src/i18n/index.ts`

**3. Language selector not appearing:**
- Ensure `LanguageSelector` is imported in `Layout.tsx`
- Check that the component is properly rendered

**4. TypeScript errors:**
- The errors will resolve after `npm install`
- Restart your TypeScript language server if needed

## 📱 Usage Examples

### Basic Translation:
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('dashboard.title')}</h1>;
}
```

### Language Switching:
```tsx
import { useLanguage } from '../hooks/useLanguage';

function MyComponent() {
  const { changeLanguage } = useLanguage();
  return (
    <button onClick={() => changeLanguage('pt')}>
      Switch to Portuguese
    </button>
  );
}
```

## 🎯 Next Steps

1. **Install dependencies** with `npm install`
2. **Test the language switcher** in the header
3. **Gradually migrate pages** to use translations
4. **Add new translations** as needed

## 🌍 Ready to Go!

After completing these steps, your clinic management system will support:
- 🇧🇷 Portuguese 
- 🇺🇸 English
- 🔄 Automatic language detection
- 💾 Language preference saving
- 📱 Responsive language selector

**Your international clinic management system is ready! 🎉** 
