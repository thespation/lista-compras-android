# Lista de Compras — APK com Android Studio

## Como abrir e gerar o APK

### 1. Abrir no Android Studio
- Abra o Android Studio
- Clique em **File → Open**
- Selecione a pasta **`android`** (dentro desta pasta)
- Aguarde o Gradle sincronizar (pode demorar 2-5 min na primeira vez)

### 2. Se aparecer erro de Gradle
Vá em **File → Project Structure → SDK Location** e confirme que o JDK está apontando para o JDK 17.

### 3. Gerar o APK
- Menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- Aguarde o build
- Clique em **"locate"** no popup que aparecer
- O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

### 4. Instalar no celular
- Copie o APK para o celular (cabo USB, WhatsApp, Drive)
- No Android: Configurações → Segurança → Instalar apps desconhecidos → ativar
- Toque no arquivo APK para instalar

## Características do app
- 100% offline — não precisa de internet
- Dados salvos localmente no celular
- Sem barra de endereço — tela cheia como app nativo
