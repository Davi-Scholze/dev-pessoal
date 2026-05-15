# SKILL: expo-scaffold

## Quando invocar
Ao iniciar um projeto mobile React Native com Expo.

## Entrada
Nome do app + bundle ID (ex: com.scholze.meudojo).

## Saída esperada
Projeto Expo configurado com NativeWind, Expo Router, Supabase e TypeScript estrito.

## Setup obrigatório
```bash
# 1. Criar projeto
npx create-expo-app@latest MeuApp --template blank-typescript

# 2. NativeWind
npm install nativewind tailwindcss
npx tailwindcss init

# 3. Expo Router (navegação file-based)
npx expo install expo-router expo-linking expo-constants expo-status-bar

# 4. Supabase
npm install @supabase/supabase-js @react-native-async-storage/async-storage

# 5. React Hook Form + Zod
npm install react-hook-form @hookform/resolvers zod

# 6. Qualidade de vida
npm install react-native-safe-area-context react-native-screens
npx expo install expo-haptics expo-status-bar
```

## Estrutura de pastas
```
app/
  (auth)/         # telas sem tab bar (login, onboarding)
  (tabs)/         # telas com bottom tabs
    index.tsx     # home
    profile.tsx   # perfil
  _layout.tsx     # root layout
components/
  ui/             # componentes primitivos
  [feature]/      # componentes de feature
hooks/            # custom hooks
lib/
  supabase.ts     # cliente Supabase
  utils.ts        # helpers
```

## Configuração app.json obrigatória
```json
{
  "expo": {
    "scheme": "meudojo",
    "ios": { "bundleIdentifier": "com.scholze.meudojo" },
    "android": { "package": "com.scholze.meudojo" }
  }
}
```
