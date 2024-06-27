# Supermarket Cash Register Uygulaması

Uygulamam mağaza yönetimi, ürün satışı ve raporlama gibi birçok işlemi kapsayan kapsamlı bir çözüm sunmaktadır. Bu uygulama, mağaza çalışanlarının iş süreçlerini kolaylaştırmak ve müşteri memnuniyetini artırmak amacıyla tasarlanmıştır.

## 📑 İçindekiler
1. [Özellikler](#özellikler)
2. [Kurulum](#kurulum)
3. [Kullanım](#kullanım)
4. [Bağımlılıklar](#bağımlılıklar)
5. [Teknolojiler ve Kullanılan Kütüphaneler](#teknolojiler-ve-kullanılan-kütüphaneler)
6. [Özet](#özet)
7. [Create React App Scripts](#create-react-app-scripts)

## ✨ Özellikler

### 🔐 Kullanıcı Girişi ve Durum Takibi
- Mağaza çalışanı API'de kayıtlı bilgileri ile sisteme giriş yapabilir.
- Mağazanın açık/kapalı durumu mağaza saatlerine göre belirlenir.
- Giriş yaptıktan sonra anasayfada sol üstte, giriş yapan mağaza çalışanının bilgileri, IP adresi ve lokasyonu görüntülenir.
- Mağaza çalışma saatleri "settings" alanından değiştirilebilir.
- Mağaza offline olduğunda satış işlemi gerçekleştirilemez.
- Settings alanında dark tema, aydınlık tema, dil seçenekleri (Türkçe/İngilizce) ve yazıcı testi bulunmaktadır.

### 🛒 Ürün Yönetimi
- Satış sayfasında minimum 1000 ürün listelenmektedir.
- Ürünler kategoriler ve alt kategoriler şeklinde düzenlenmiştir. Sepete eklenebilir ve adet bilgileri güncellenebilir.
- Ürünler API'den çekilmektedir ve veri çekme işlemlerinde Axios kütüphanesi kullanılmaktadır.
- Sepete ürün ekleme, sepetten ürünü kaldırma, miktarını artırma veya azaltma, barkod değerine göre ürün arama gibi özellikler mevcuttur.
- İsimden ürün arama, filtreleme ve favorilere ekleme özellikleri mevcuttur.

### 📱 Responsive Tasarım ve Sanal Klavye
- Uygulama, responsive tasarım prensiplerine uygun olarak geliştirilmiştir.
- Çoklu dili destekleyen sanal bir klavye entegre edilmiştir.

### 🎉 Kampanyalar ve İndirimler
- Mağaza ürünlerinde çeşitli kampanyalar (3 al 2 öde, %10 indirim ve etiketin yarısı) uygulanmakta ve bu fiyatlar sepete yansıtılmaktadır.
- Kampanyalar, sepette kampanya seçenekleri ikonuna tıklanarak uygulanabilir.

### 💳 Ödeme ve Fiş Yönetimi
- Çeşitli ödeme yöntemleri desteklenmektedir.
- Fişlerde alınan ürünlerin listesi, alınan para, para üstü, kasiyerin ad-soyad bilgileri yer almaktadır.
- Fişler API'ye JSON formatında post edilmekte, print edilebilir veya doküman şeklinde indirilebilir.
- E-fatura seçilmesi durumunda müşteri mail bilgisi için pop up ekranı gelmektedir.
- Fişlere menüden "receipts" kısmından ulaşılabilir.

### 📊 Raporlama ve İstatistikler
- "Reports" alanında mağaza toplam hasılatı, en çok ve en az satılan ürünler, ürünlerin satış ve ödeme türleri dağılımı gibi pek çok istatistik listelenmektedir.
  
## 🌓 Tema Desteği

Uygulama, kullanıcıların tercihlerine göre dark ve light tema seçenekleri sunmaktadır.

1. **Tema Seçimi:**

   Tema seçimini uygulama içinden yapabilirsiniz. Varsayılan olarak uygulama light tema ile başlar, ancak kullanıcı dark tema seçeneğini tercih edebilir.

2. **Tema Değiştirme:**

   Uygulama içindeki ayarlar bölümünden (settings) tema seçeneklerini değiştirebilirsiniz.

3. **Kullanım:**

   - **Dark Tema:** Göz yormayan ve daha az ışık saçan dark tema seçeneği.
   - **Light Tema:** Standart ve daha parlak görünüm sunan light tema seçeneği.

## 🌐 Çoklu Dil Desteği
Bu proje, çoklu dil desteği için i18next kullanmaktadır. Dil seçenekleri ve çeviriler `src/i18n.js` dosyasında yapılandırılmıştır. Uygulamanın belirli kısımlarını farklı dillere çevirmek için i18next kullanabilirsiniz. Örnek bir i18n yapılandırması aşağıda verilmiştir:

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```
## 🛠️ Kurulum
1. Projeyi klonlayın:
   ```sh
   git clone <repository-url>


## 🚀 Kullanım
1. Öncelikle, verileri API'den almak için JSON Server'ı başlatın. API verileri `http://localhost:3000` adresinden erişilebilir olacak şekilde ayarlanmıştır.
   
   ```bash
   cd api
   json-server --watch db.json
2.Daha sonra, uygulamayı başlatmak için aşağıdaki komutu kullanın:
### `npm start`
Uygulamayı geliştirme modunda çalıştırır.\
Tarayıcınızda http://localhost:3001 adresine gidin.api dosyasının(db.json) içindeki users alanından herhangi bir kullanıcının giriş bilgilerini görebilirsiniz. Kullanıcı bilgileri ile giriş yapın ve uygulamanın tüm özelliklerini kullanın.

## 📦 Bağımlılıklar
Projenizde kullanılan bağımlılıkların listesi `package.json` dosyasındadır. İşte başlıca bağımlılıklar:

- `@emotion/react`
- `@emotion/styled`
- `@mui/icons-material`
- `@mui/material`
- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `axios`
- `i18next`
- `react`
- `react-dom`
- `react-i18next`
- `react-router-dom`
- `react-scripts`
- `styled-components`
- `web-vitals`

## 📚 Teknolojiler ve Kullanılan Kütüphaneler
- **Veri Yönetimi**: Context API
- **Veri Testleri ve Çekme**: JSON Server
- **HTTP İstekleri**: Axios
- **Kullanıcı Arayüzü**: Responsive tasarım, sanal klavye, Material UI
- **Routing**: React Router DOM
- **Çoklu Dil Desteği**: i18next

## 📝 Özet
Daha pek çok özelliği de bulunduran uygulamam, mağaza yönetimini kolaylaştıran, kullanıcı dostu bir çözüm sunmaktadır. Gelişmiş özellikleri ve kullanımı kolay arayüzü ile mağaza operasyonlarını optimize eder ve müşteri memnuniyetini artırır.

## 📜 Create React App Scripts
Proje Create React App kullanılarak başlatıldı. Proje dizininde kullanabileceğiniz temel komutlar şunlardır:

### `npm start`
Uygulamayı geliştirme modunda çalıştırır.\
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak görüntüleyebilirsiniz.

### `npm test`
Test çalıştırıcısını interaktif izleme modunda başlatır.\
Daha fazla bilgi için [running tests](https://facebook.github.io/create-react-app/docs/running-tests) bölümüne bakın.

### `npm run build`
Uygulamayı üretim için `build` klasörüne oluşturur.\
React'ı üretim modunda doğru bir şekilde paketler ve en iyi performans için derlemeyi optimize eder.

### `npm run eject`
**Not: Bu tek yönlü bir işlemdir. Bir kez `eject` işlemi yaptıktan sonra geri dönemezsiniz!**

Eğer oluşturma aracından ve yapılandırma seçeneklerinden memnun değilseniz, `eject` komutunu kullanabilirsiniz. Bu komut, projedeki tüm yapılandırma dosyalarını ve bağımlılıkları kopyalar, böylece onları doğrudan değiştirebilirsiniz. Tüm komutlar hala çalışacaktır, ancak kopyalanan dosyalara işaret edeceklerdir.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
