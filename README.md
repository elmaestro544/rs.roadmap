# عبقري العلوم (SciGenius)

مساعدك البحثي الذكي، مبني باستخدام React و Google Gemini API لمساعدتك على فهم الأبحاث الأكاديمية، العثور على الأوراق البحثية ذات الصلة، وتسريع وتيرة عملك البحثي. يدعم التطبيق اللغتين العربية والإنجليزية.

## ✨ الميزات

-   **رفع المستندات:** قم برفع الأوراق البحثية بصيغ متعددة (PDF, TXT, MD, صور).
-   **طرح الأسئلة:** تفاعل مع المستندات عبر طرح أسئلة مباشرة والحصول على إجابات دقيقة.
-   **التلخيص:** احصل على ملخصات للملخصات البحثية (abstracts) والنتائج الرئيسية.
-   **البحث عن أوراق ذات صلة:** اكتشف أبحاثًا أكاديمية مرتبطة بموضوع بحثك.
-   **واجهة ثنائية اللغة:** تنقل بسهولة بين اللغتين العربية والإنجليزية.
-   **استخدام المصادر:** يستعين بمصادر الويب للإجابة على الأسئل.

## 🛠️ التقنيات المستخدمة

-   **React:** لبناء واجهة المستخدم التفاعلية.
-   **TypeScript:** لإضافة الأنواع الثابتة (static types) وتحسين جودة الكود.
-   **Tailwind CSS:** لتصميم واجهة المستخدم (يتم تحميله عبر CDN).
-   **Google Gemini API (`@google/genai`):** لتوفير القدرات الذكية للمساعد.

## 🚀 الإعداد والتشغيل

تم بناء هذا المشروع ليعمل كصفحات ويب ثابتة (static web pages) ويتطلب خادم ويب محلي للتشغيل.

### المتطلبات

-   متصفح ويب حديث.
-   [Node.js](https://nodejs.org/) و npm (يأتي مع Node.js).
-   مفتاح API الخاص بـ Google Gemini.

### خطوات التشغيل

1.  **نسخ (Clone) المستودع:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2.  **إعداد مفتاح API:**
    يتوقع التطبيق وجود مفتاح Gemini API في متغير بيئة يسمى `API_KEY`. بما أن التطبيق يعمل في المتصفح مباشرة، ستحتاج إلى إنشاء ملف لتوفير هذا المتغير.

    أ. أنشئ ملفًا جديدًا باسم `env.js` في المجلد الرئيسي للمشروع.

    ب. أضف الكود التالي إلى ملف `env.js`، مع استبدال `"YOUR_API_KEY"` بمفتاحك الخاص:
    ```javascript
    // env.js
    window.process = {
      env: {
        API_KEY: "YOUR_API_KEY"
      }
    };
    ```

    ج. تأكد من وجود هذا السطر داخل وسم `<body>` في ملف `index.html`، **قبل** سطر استيراد `index.tsx`:
    ```html
    <script src="/env.js"></script>
    ```

    **مهم:** لا تقم برفع ملف `env.js` إلى مستودع GitHub الخاص بك. قم بإضافة `env.js` إلى ملف `.gitignore` لضمان عدم الكشف عن مفتاحك الخاص.

3.  **تثبيت الأدوات اللازمة:**
    قم بتشغيل الأمر التالي في المجلد الرئيسي للمشروع لتثبيت خادم الويب المحلي:
    ```bash
    npm install
    ```

4.  **تشغيل التطبيق:**
    بعد اكتمال التثبيت، قم بتشغيل الأمر التالي:
    ```bash
    npm start
    ```
    سيقوم هذا الأمر بتشغيل خادم ويب محلي. افتح المتصفح وانتقل إلى العنوان الذي يظهر في الطرفية (عادةً `http://127.0.0.1:8080`).

    **لماذا هذه الخطوات ضرورية؟**
    تستخدم المتصفحات الحديثة سياسات أمان تمنع تحميل بعض أجزاء التطبيق (JavaScript Modules) عند فتح ملف `index.html` مباشرة من جهازك (باستخدام `file:///`). تشغيل خادم محلي يحل هذه المشكلة ويسمح للتطبيق بالعمل بشكل صحيح.

---

# SciGenius

Your AI copilot for research, built with React and the Google Gemini API to help you comprehend academic papers, find related literature, and streamline your research workflow. The application supports both English and Arabic.

## ✨ Features

-   **Document Upload:** Upload research papers in various formats (PDF, TXT, MD, images).
-   **Ask Questions:** Interact with your documents by asking direct questions and getting precise answers.
-   **Summarization:** Get summaries of abstracts and key findings.
-   **Find Related Papers:** Discover academic papers related to your research topic.
-   **Bilingual Interface:** Easily switch between English and Arabic.
-   **Grounded Sources:** Utilizes web sources for grounded answers.

## 🛠️ Tech Stack

-   **React:** For building the interactive user interface.
-   **TypeScript:** For static typing and improved code quality.
-   **Tailwind CSS:** For UI styling (loaded via CDN).
-   **Google Gemini API (`@google/genai`):** Powers the AI assistant.

## 🚀 Setup and Running

This project is set up as a static website and requires a local web server to run.

### Prerequisites

-   A modern web browser.
-   [Node.js](https://nodejs.org/) and npm (which comes with Node.js).
-   A Google Gemini API key.

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2.  **Set up the API Key:**
    The application expects the Gemini API key to be available in an environment variable called `API_KEY`. Since this runs directly in the browser, you'll need to create a file to provide this variable.

    a. Create a new file named `env.js` in the project's root directory.

    b. Add the following code to `env.js`, replacing `"YOUR_API_KEY"` with your actual key:
    ```javascript
    // env.js
    window.process = {
      env: {
        API_KEY: "YOUR_API_KEY"
      }
    };
    ```

    c. Ensure the following script tag is inside the `<body>` of your `index.html` file, **before** the script that imports `index.tsx`:
    ```html
    <script src="/env.js"></script>
    ```

    **Important:** Do not commit the `env.js` file to your public GitHub repository. Add `env.js` to your `.gitignore` file to keep your API key secret.

3.  **Install Dependencies:**
    From the project's root directory, run the following command to install the local web server:
    ```bash
    npm install
    ```

4.  **Launch the App:**
    Once the installation is complete, run the start command:
    ```bash
    npm start
    ```
    This will start a local web server. Open your browser and navigate to the URL shown in your terminal (usually `http://127.0.0.1:8080`).

    **Why is this necessary?**
    Modern browsers have security policies (CORS) that prevent JavaScript modules from loading correctly when you open an `index.html` file directly from your local file system (using the `file:///` protocol). Serving the files from a local server resolves this issue and allows the app to function as intended.