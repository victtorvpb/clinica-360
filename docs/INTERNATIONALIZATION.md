# 🌍 Internationalization (i18n) - Clinic 360

## 📋 Overview

The Clinic 360 project supports full internationalization with **Portuguese (default)** and **English** using `react-i18next`.

## ⚡ Quick Start

### 1. Dependencies (Already Installed)

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 2. Current Configuration

- 🇧🇷 **Portuguese** as default language
- 🇺🇸 **English** as secondary language
- **Auto-detection** from browser
- **Local storage** persistence
- **Language selector** in header (right side)

---

## 🏗️ File Structure

```
src/
  i18n/
    ├── index.ts              # Main i18n configuration
    └── locales/
        ├── pt.json          # Portuguese translations (default)
        └── en.json          # English translations
  hooks/
    └── useLanguage.ts       # Language management hook
  components/
    ├── Layout.tsx           # Header with selector
    └── LanguageSelector.tsx # Language switcher component
  pages/
    ├── Register.tsx         # Multi-step registration form
    ├── Dashboard.tsx        # Main dashboard
    ├── Patients.tsx         # Patient management
    ├── Appointments.tsx     # Appointment scheduling
    ├── Doctors.tsx          # Doctor management
    └── Consultations.tsx    # Consultation records
```

---

## 🎯 Features

- ✅ **Auto-detection** - Detects browser language with Portuguese priority
- ✅ **Local storage** - Saves user preference
- ✅ **Type safety** - Fully typed with TypeScript
- ✅ **Easy switching** - Language selector in header
- ✅ **Fallback** - Falls back to Portuguese if translation missing
- ✅ **Responsive** - Works on desktop and mobile
- ✅ **Live switching** - No page reload required

---

## 🔧 Usage

### 1. Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.overview')}</p>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### 2. Using the Language Hook

```tsx
import { useLanguage } from '../hooks/useLanguage';

function LanguageInfo() {
  const { 
    currentLanguage, 
    changeLanguage, 
    getLanguageFlag,
    getLanguageName 
  } = useLanguage();
  
  return (
    <div>
      <p>Current: {getLanguageName(currentLanguage)} {getLanguageFlag(currentLanguage)}</p>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

### 3. Language Selector Component

The `LanguageSelector` is already integrated in the `Layout` component:

```tsx
// Already implemented in src/components/Layout.tsx
<LanguageSelector />
```

---

## 📝 Translation Files

### Portuguese (pt.json) - Default

```json
{
  "common": {
    "save": "Salvar",
    "cancel": "Cancelar",
    "edit": "Editar",
    "delete": "Excluir"
  },
  "dashboard": {
    "title": "Dashboard",
    "overview": "Visão geral da clínica"
  }
}
```

### English (en.json)

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel", 
    "edit": "Edit",
    "delete": "Delete"
  },
  "dashboard": {
    "title": "Dashboard",
    "overview": "Clinic overview"
  }
}
```

---

## ⚙️ Configuration Details

### Main Configuration (`src/i18n/index.ts`)

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';

const resources = {
  pt: { translation: ptTranslations }, // Portuguese first (default)
  en: { translation: enTranslations }  // English second
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',           // Portuguese as default
    lng: 'pt',                   // Start with Portuguese
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']    // Save preference
    }
  });

export default i18n;
```

### Language Hook (`src/hooks/useLanguage.ts`)

```typescript
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageFlag = (lng: string) => {
    const flags = { pt: '🇧🇷', en: '🇺🇸' };
    return flags[lng as keyof typeof flags] || '🌐';
  };

  const getLanguageName = (lng: string) => {
    const names = { pt: 'Português', en: 'English' };
    return names[lng as keyof typeof names] || lng;
  };

  const availableLanguages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return {
    currentLanguage,
    changeLanguage,
    getLanguageFlag,
    getLanguageName,
    availableLanguages
  };
};
```

---

## 🎨 UI Implementation

### Language Selector Position

- **Desktop**: Right side of header
- **Mobile**: Right side with responsive design
- **Style**: Dropdown with flags and language names

### Current Layout Integration

```tsx
// src/components/Layout.tsx (already implemented)
<div className="flex items-center gap-4">
  <LanguageSelector /> {/* Right positioned */}
</div>
```

---

## 🚀 Adding New Languages

### 1. Create Translation File

```bash
# Create new language file
touch src/i18n/locales/es.json  # Spanish example
```

### 2. Add to Configuration

```typescript
// src/i18n/index.ts
import esTranslations from './locales/es.json';

const resources = {
  pt: { translation: ptTranslations },
  en: { translation: enTranslations },
  es: { translation: esTranslations }  // Add new language
};
```

### 3. Update Language Hook

```typescript
// src/hooks/useLanguage.ts
const availableLanguages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }  // Add new language
];
```

---

## 🧪 Testing

### Test Language Switching

1. Open the application
2. Click the language selector in the header
3. Switch between Portuguese and English
4. Verify all text changes
5. Refresh page - language should persist

### Test Auto-Detection

1. Change browser language to English
2. Clear localStorage: `localStorage.clear()`
3. Refresh page - should auto-detect browser language
4. Fallback to Portuguese if language not supported

---

## ✅ Current Implementation Status

- ✅ **Configuration** - Complete i18n setup
- ✅ **Components** - All pages translated
- ✅ **UI Elements** - Language selector integrated
- ✅ **Persistence** - LocalStorage working
- ✅ **Auto-detection** - Browser language detection
- ✅ **Default Language** - Portuguese priority
- ✅ **Responsive** - Mobile and desktop support
- ✅ **Type Safety** - Full TypeScript support

---

## 💡 Best Practices

1. **Always use translation keys** instead of hardcoded text
2. **Group related translations** in namespaces
3. **Keep translation keys descriptive** and hierarchical
4. **Test both languages** when adding new features
5. **Use interpolation** for dynamic content
6. **Provide fallbacks** for missing translations

### Example of Good Translation Structure

```json
{
  "pages": {
    "dashboard": {
      "title": "Dashboard",
      "stats": {
        "patients": "Total Patients",
        "appointments": "Today's Appointments"
      }
    },
    "patients": {
      "title": "Patient Management",
      "actions": {
        "add": "Add Patient",
        "edit": "Edit Patient"
      }
    }
  }
}
```

---

**🎉 Your clinic management system is now truly international! 🌍✨**
