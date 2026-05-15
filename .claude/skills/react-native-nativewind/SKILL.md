# SKILL: react-native-nativewind

## Quando invocar
Ao estilizar componentes React Native com NativeWind (Tailwind para RN).

## Entrada
Componente a estilizar ou layout a implementar.

## Saída esperada
Componente React Native usando classes NativeWind com tokens compartilhados com web.

## Setup de tokens compartilhados
```js
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--color-bg-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-bg-surface) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-default) / <alpha-value>)',
      }
    }
  },
  plugins: [],
}
```

## Exemplo de componente
```tsx
import { View, Text, Pressable } from 'react-native'

export function PrimaryButton({ label, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-accent active:bg-accent/80 rounded-lg px-6 py-4 items-center"
      style={{ minHeight: 44 }}  // touch target obrigatório
    >
      <Text className="text-white font-semibold text-base">{label}</Text>
    </Pressable>
  )
}
```

## Padrões obrigatórios
- Sempre `style={{ minHeight: 44 }}` em elementos tocáveis
- Use `Pressable` (não `TouchableOpacity`) para controle de estado
- `SafeAreaView` em toda tela — nunca `View` na raiz
- Classes responsivas com NativeWind: `sm:` para tablets
