import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, SkillCategory } from './types';

export type Language = 'uz' | 'ru' | 'en';

export const TRANSLATIONS = {
  uz: {
    nav_about: 'Men haqimda',
    nav_skills: 'Ko\'nikmalar',
    nav_projects: 'Loyihalar',
    nav_contact: 'Aloqa',
    
    hero_greeting: 'Salom, men',
    hero_cta_projects: 'Loyihalarimni ko\'rish',
    hero_cta_contact: 'Men bilan bog\'lanish',
    hero_stat_experience: 'Yillik Tajriba',
    hero_stat_projects: 'Real Loyihalar',
    hero_stat_specialty: 'Ixtisoslik',

    about_subtitle: '01 // TANIShUV',
    about_title: 'Men Haqimda',
    about_intro_headline: 'Robotlar olamiga kirib kelish va ilk muvaffaqiyatlar',
    about_intro_p2: 'Ilk qadamlarim oddiy LED chiroqlarini o\'chib-yonishini dasturlashdan boshlangan bo\'lsa, hozirda real muammolarni bartaraf etadigan murakkab datchiklar tizimi, IoT avtomatlashtirilgan mexanizmlari va to\'liq avtonom robotlarni yaratyapman. Har bir sim, har bir kod satri amaliy sinovlardan o\'tib, mukammallikka yetkazilgan.',
    about_stat_field_title: 'Ta\'lim yo\'nalishi',
    about_stat_field_desc: 'Robototexnika va Mexatronika loyihalari talabasi',
    about_stat_level_title: 'Amaliy daraja',
    about_stat_level_desc: 'Bir yildan ortiq mustaqil va jamoaviy laboratoriya ishlari',
    about_areas_title: 'ASOSIY Yo\'NALIShLARIM',
    about_area1_title: 'Mikrokontrollerlar tizimi',
    about_area1_desc: 'Arduino, ESP32 platformalarida mikrodasturlar tuzish va apparat qismlarini ishonchli o\'rnatish.',
    about_area2_title: 'Muammolarni tahlil qilish',
    about_area2_desc: 'Sensor ko\'rsatkichlarini filtrlash va harakat mexanizmlari xatoliklarini dasturiy va apparat orqali bartaraf etish.',
    about_area3_title: '3D Prototiplash',
    about_area3_desc: 'Tezkor 3D modellashtirish yordamida robot korpuslari va maxsus mahkamlagichlarni Onshape va Tinkercad dasturlarida tayyorlash.',

    skills_subtitle: '02 // IMKONIYATLAR',
    skills_title: 'Professional Ko\'nikmalar',
    skills_desc: 'Robototexnika tizimlarining dasturiy, apparat va konstruktorlik qismini shakllantirish bo\'yicha to\'plangan texnik bilimlarim.',
    skills_sim_title: 'Interaktiv Sinov Hududi',
    skills_sim_desc: 'Yozgan C++ va ESP32 mikrodasturlarimni simulyatsiya qilib ko\'ring! Quyidagi kontrollerni tanlang va real-time datchik signallarining ishlashini tekshiring.',
    skills_sim_run: 'Sketchni ishga tushirish',
    skills_sim_reset: 'Platani qayta yuklash',
    skills_sim_busy: 'MCU buyruq bajarish bilan band...',

    projects_subtitle: '03 // LOYIHALAR',
    projects_title: 'Amaliy Ishlarim',
    projects_desc: 'Men ishlab chiqqan va hayotga tatbiq etgan ba\'zi qiziqarli robototexnika loyihalari va IoT tizimlari.',
    projects_btn_details: 'Batafsil / Sxema',
    projects_github_title: 'GitHub kodlarini ko\'rish',
    projects_modal_subtitle: 'LOYIHA CHIZMASI & TAFTISHI',
    projects_modal_desc_title: 'Loyiha Haqida To\'liq Tavsif',
    projects_modal_tech_title: 'Ishlatilgan apparatlar va kutubxonalar:',
    projects_modal_close: 'Yopish',
    projects_modal_source: 'GitHub Manba Kodi',

    contact_subtitle: '04 // ALOQA',
    contact_title: 'Bog\'lanish & Muloqot',
    contact_desc: 'Savollaringiz bormi yoki yangi robototexnika loyihasini muhokama qilmoqchimisiz? Menga yozing!',
    contact_info_title: 'Aloqa Ma\'lumotlari',
    contact_info_status: 'Status: Yangi loyihalar uchun ochiq',
    contact_social_title: 'Ijtimoiy Tarmoqlar',
    contact_inbox_title: 'Kelgan Xabarlar',
    contact_inbox_clear: 'Tozalash',
    contact_form_title: 'Xabar qoldirish',
    contact_form_name: 'To\'liq ismingiz',
    contact_form_name_placeholder: 'Masalan: Muhammadaziz Tilavoldiyev',
    contact_form_email: 'Elektron pochta manzilingiz',
    contact_form_email_placeholder: 'Masalan: example@gmail.com',
    contact_form_message: 'Sizning xabaringiz',
    contact_form_message_placeholder: 'Loyiha yoki o\'zaro hamkorlik haqida yozing...',
    contact_status_success: 'Xabar muvaffaqiyatli yuborildi! (U pastdagi xabarlar jurnaliga qo\'shildi)',
    contact_status_error: 'Iltimos barcha maydonlarni to\'g\'ri to\'ldiring!',
    contact_btn_send: 'Xabarni yuborish',

    footer_rights: 'Barcha huquqlar himoyalangan.',
    footer_tag: 'Loyihalashtirildi & Ishlab chiqildi // high-tech robotics specs',

    shell_header: 'ROBO-NAZORATCHI QOBIG\'I',
    shell_reset_requested: 'Arduino yadrosini qayta yuklash so\'raldi.',
    shell_boot_ok: 'Tizim yuklanishi... OK',
    shell_awaiting_command: 'Ish joyi skript buyrug\'i kiritilishi kutilmoqda...',
    shell_busy: 'Tizim yuklanmoqda... OK',
    shell_init_core: '16MHz da ATmega328P yadrosi faollashtirilmoqda...',
    shell_baud: 'Baud tezligi 9600 bps qilib belgilandi',
    shell_all_loaded: 'Barcha datchiklar yuklandi! Tizim statusi: ONLAYN & TAYYOR.',
  },
  ru: {
    nav_about: 'Обо мне',
    nav_skills: 'Навыки',
    nav_projects: 'Проекты',
    nav_contact: 'Контакты',

    hero_greeting: 'Привет, я',
    hero_cta_projects: 'Посмотреть мои проекты',
    hero_cta_contact: 'Связаться со мной',
    hero_stat_experience: 'Год Опыта',
    hero_stat_projects: 'Реальных Проектов',
    hero_stat_specialty: 'Специализация',

    about_subtitle: '01 // ЗНАКОМСТВО',
    about_title: 'Обо мне',
    about_intro_headline: 'Вхождение в мир роботов и первые успехи',
    about_intro_p2: 'Если мои первые шаги начинались с программирования простого мигания светодиодов, то сейчас я создаю сложные сенсорные системы, автоматизированные механизмы IoT и полностью автономных роботов, решающих реальные проблемы. Каждый провод, каждая строчка кода прошли практические испытания и доведены до совершенства.',
    about_stat_field_title: 'Направление обучения',
    about_stat_field_desc: 'Студент направления проектов робототехники и мехатроники',
    about_stat_level_title: 'Практический уровень',
    about_stat_level_desc: 'Более года независимых и командных лабораторных работ',
    about_areas_title: 'МОИ ОСНОВНЫЕ НАПРАВЛЕНИЯ',
    about_area1_title: 'Система микроконтроллеров',
    about_area1_desc: 'Программирование прошивок на платформах Arduino, ESP32 и надежная установка аппаратных компонентов.',
    about_area2_title: 'Анализ проблем',
    about_area2_desc: 'Фильтрация показаний датчиков и устранение ошибок работы механизмов движения программным и аппаратным путем.',
    about_area3_title: '3D Прототипирование',
    about_area3_desc: 'Создание корпусов роботов и специальных креплений с помощью быстрого 3D-моделирования в программах Onshape и Tinkercad.',

    skills_subtitle: '02 // ВОЗМОЖНОСТИ',
    skills_title: 'Профессиональные Навыки',
    skills_desc: 'Мои технические знания, накопленные в области программного, аппаратного и конструкторского проектирования робототехнических систем.',
    skills_sim_title: 'Интерактивная Песочница',
    skills_sim_desc: 'Просимулируйте мои программы на C++ и ESP32! Выберите контроллер ниже и проверьте работу сигналов датчиков в реальном времени.',
    skills_sim_run: 'Запустить скетч',
    skills_sim_reset: 'Сбросить плату',
    skills_sim_busy: 'MCU занят выполнением инструкции...',

    projects_subtitle: '03 // ПРОЕКТЫ',
    projects_title: 'Мои Практические Работы',
    projects_desc: 'Некоторые интересные робототехнические проекты и IoT системы, разработанные и внедренные мной в жизнь.',
    projects_btn_details: 'Подробнее / Схема',
    projects_github_title: 'Посмотреть исходный код на GitHub',
    projects_modal_subtitle: 'СХЕМА И АНАЛИЗ ПРОЕКТА',
    projects_modal_desc_title: 'Полное описание проекта',
    projects_modal_tech_title: 'Использованное оборудование и библиотеки:',
    projects_modal_close: 'Закрыть',
    projects_modal_source: 'Исходный Код на GitHub',

    contact_subtitle: '04 // КОНТАКТЫ',
    contact_title: 'Связь и взаимодействие',
    contact_desc: 'У вас есть вопросы или вы хотите обсудить новый проект по робототехнике? Напишите мне!',
    contact_info_title: 'Контактная Информация',
    contact_info_status: 'Статус: Открыт для новых проектов',
    contact_social_title: 'Социальные сети',
    contact_inbox_title: 'Входящие Сообщения',
    contact_inbox_clear: 'Очистить',
    contact_form_title: 'Оставить сообщение',
    contact_form_name: 'Ваше полное имя',
    contact_form_name_placeholder: 'Например: Мухаммадазиз Тилаволдиев',
    contact_form_email: 'Ваш адрес электронной почты',
    contact_form_email_placeholder: 'Например: example@gmail.com',
    contact_form_message: 'Ваше сообщение',
    contact_form_message_placeholder: 'Напишите о проекте или возможном сотрудничестве...',
    contact_status_success: 'Сообщение успешно отправлено! (Оно добавлено в лог сообщений ниже)',
    contact_status_error: 'Пожалуйста, заполните все поля правильно!',
    contact_btn_send: 'Отправить сообщение',

    footer_rights: 'Все права защищены.',
    footer_tag: 'Спроектировано и разработано // high-tech robotics specs',

    shell_header: 'ОБОЛОЧКА РОБО-КОНТРОЛЛЕРА',
    shell_reset_requested: 'Запрошен сброс ядра Arduino.',
    shell_boot_ok: 'Загрузка системы... OK',
    shell_awaiting_command: 'Ожидание ввода команды скрипта рабочей области...',
    shell_busy: 'Загрузка системы... OK',
    shell_init_core: 'Инициализация ядра ATmega328P на частоте 16 МГц...',
    shell_baud: 'Установлена скорость 9600 бод',
    shell_all_loaded: 'Все датчики загружены! Статус системы: ОНЛАЙН и ГОТОВ.',
  },
  en: {
    nav_about: 'About Me',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_contact: 'Contact',

    hero_greeting: 'Hello, I am',
    hero_cta_projects: 'View My Projects',
    hero_cta_contact: 'Contact Me',
    hero_stat_experience: 'Year of Experience',
    hero_stat_projects: 'Real Projects',
    hero_stat_specialty: 'Specialization',

    about_subtitle: '01 // INTRODUCTION',
    about_title: 'About Me',
    about_intro_headline: 'Entering the World of Robots & First Successes',
    about_intro_p2: 'While my first steps started with programming simple LED blinking, now I create complex sensor systems, automated IoT mechanisms, and fully autonomous robots that solve real-world problems. Every wire, every line of code has undergone practical testing and has been perfected.',
    about_stat_field_title: 'Field of Study',
    about_stat_field_desc: 'Student of Robotics & Mechatronics Projects',
    about_stat_level_title: 'Practical Level',
    about_stat_level_desc: 'Over one year of independent and collaborative lab work',
    about_areas_title: 'MY MAIN AREAS',
    about_area1_title: 'Microcontroller Systems',
    about_area1_desc: 'Programming firmware on Arduino and ESP32 platforms, and reliable physical installation of hardware components.',
    about_area2_title: 'Problem Analysis',
    about_area2_desc: 'Filtering sensor readings and debugging mechanical/drive errors through program and physical actions.',
    about_area3_title: '3D Prototyping',
    about_area3_desc: 'Creating robotic bodies and custom device mounts via rapid 3D modeling in Onshape and Tinkercad.',

    skills_subtitle: '02 // CAPABILITIES',
    skills_title: 'Professional Skills',
    skills_desc: 'My accumulated technical knowledge in formulating the software, hardware, and structural designs for robotic systems.',
    skills_sim_title: 'Interactive Testing Area',
    skills_sim_desc: 'Simulate my C++ and ESP32 code! Select a physical controller script below and check the real-time sensor responses.',
    skills_sim_run: 'Run Sketch',
    skills_sim_reset: 'Reset board',
    skills_sim_busy: 'MCU busy executing instructions...',

    projects_subtitle: '03 // PROJECTS',
    projects_title: 'My Practical Works',
    projects_desc: 'Some of the interesting robotics projects and IoT systems I have built and brought to life.',
    projects_btn_details: 'Details / Circuit',
    projects_github_title: 'View source code on GitHub',
    projects_modal_subtitle: 'PROJECT SCHEMATIC & AUDIT',
    projects_modal_desc_title: 'Full Project Description',
    projects_modal_tech_title: 'Hardware & Libraries Used:',
    projects_modal_close: 'Close',
    projects_modal_source: 'GitHub Source Code',

    contact_subtitle: '04 // CONTACT',
    contact_title: 'Get In Touch',
    contact_desc: 'Do you have questions or want to discuss a new robotics project? Drop me a line!',
    contact_info_title: 'Contact Information',
    contact_info_status: 'Status: Open for new projects',
    contact_social_title: 'Social Networks',
    contact_inbox_title: 'Received Messages',
    contact_inbox_clear: 'Clear',
    contact_form_title: 'Leave a message',
    contact_form_name: 'Your full name',
    contact_form_name_placeholder: 'e.g. Muhammadaziz Tilavoldiyev',
    contact_form_email: 'Your email address',
    contact_form_email_placeholder: 'e.g. example@gmail.com',
    contact_form_message: 'Your message',
    contact_form_message_placeholder: 'Write about your project or potential collaboration...',
    contact_status_success: 'Message sent successfully! (Added to logs below)',
    contact_status_error: 'Please fill in all areas correctly!',
    contact_btn_send: 'Send Message',

    footer_rights: 'All rights reserved.',
    footer_tag: 'Designed & Developed // high-tech robotics specs',

    shell_header: 'ROBO-CONTROLLER SHELL',
    shell_reset_requested: 'Arduino core reset requested.',
    shell_boot_ok: 'System Booting... OK',
    shell_awaiting_command: 'Awaiting workspace script command input...',
    shell_busy: 'System Booting... OK',
    shell_init_core: 'Initializing ATmega328P Core at 16MHz...',
    shell_baud: 'Baud rate set to 9600 bps',
    shell_all_loaded: 'All sensors loaded! System status: ONLINE & READY.',
  }
};

export const TRANSLATED_PROFILE = {
  uz: {
    name: "Muhammadaziz Tilavoldiyev",
    title: "Robototexnika muhandisi & Innovatsion yechimlar yaratuvchisi",
  },
  ru: {
    name: "Мухаммадазиз Тилаволдиев",
    title: "Инженер по робототехнике и создатель инновационных решений",
  },
  en: {
    name: "Muhammadaziz Tilavoldiyev",
    title: "Robotics Engineer & Creator of Innovative Solutions",
  },
};

export const TRANSLATED_SKILLS = {
  uz: [
    {
      title: "Dasturlash (Software)",
      icon: "Code",
      items: [
        { name: "C++", level: 90, details: "Arduino mikrokontrollerlari va apparat darajasida yuqori tezlikda boshqarish." },
        { name: "Python", level: 75, details: "Raspberry Py loyihalari, ma'lumotlarni qayta ishlash va tasvirlarni aniqlash (OpenCV)." },
        { name: "Arduino IDE", level: 95, details: "Datchiklar, motor haydovchilari va murakkab kutubxonalar bilan ishlash." }
      ]
    },
    {
      title: "Apparat ta'minoti (Hardware)",
      icon: "Cpu",
      items: [
        { name: "Arduino (UNO, Nano, Mega)", level: 95, details: "I2C, SPI, UART protokollari bilan interfeyslarni ulash." },
        { name: "ESP32", level: 85, details: "Wi-Fi va Bluetooth yordamida IoT (Internet of Things) tizimlarni yaratish." },
        { name: "Raspberry Pi", level: 70, details: "Yagona platalar kompyuterida Linux muhiti bilan ishlash." },
        { name: "Sensorlar & Motorlar", level: 90, details: "Ultrasonik, infraqizil, enkoderli motorlar, servo va qadamli (stepper) motorlar." },
        { name: "Elektronika asoslari", level: 85, details: "Sxemalarni loyihalash, qarshilik va kuchlanishlarni hisoblash." }
      ]
    },
    {
      title: "Boshqa ko'nikmalar",
      icon: "Wrench",
      items: [
        { name: "3D Modellashtirish (Tinkercad)", level: 85, details: "Tezkor prototiplash va asosiy qismlarni vizual loyihalash." },
        { name: "3D Modellashtirish (Onshape)", level: 75, details: "Murakkab robototexnik qismlar va mexanik korpuslar yaratish." },
        { name: "Kavsharlash (Soldering)", level: 90, details: "Platalarga komponentlarni chiroyli va mustahkam kavsharlash, xatoliklarni aniqlash." }
      ]
    }
  ],
  ru: [
    {
      title: "Программирование (Software)",
      icon: "Code",
      items: [
        { name: "C++", level: 90, details: "Микроконтроллеры Arduino и аппаратное управление на высокой скорости." },
        { name: "Python", level: 75, details: "Проекты Raspberry Pi, обработка данных и распознавание изображений (OpenCV)." },
        { name: "Arduino IDE", level: 95, details: "Работа со всевозможными датчиками, драйверами моторов и сложными библиотеками." }
      ]
    },
    {
      title: "Аппаратное обеспечение (Hardware)",
      icon: "Cpu",
      items: [
        { name: "Arduino (UNO, Nano, Mega)", level: 95, details: "Подключение периферии по протоколам передачи данных I2C, SPI, UART." },
        { name: "ESP32", level: 85, details: "Создание систем Интернета Вещей (IoT) с интеграцией Wi-Fi и Bluetooth." },
        { name: "Raspberry Pi", level: 70, details: "Администрирование и развертывание сред Linux на одноплатных микрокомпьютерах." },
        { name: "Датчики и Моторы", level: 90, details: "Ультразвуковые, инфракрасные сенсоры, моторы с энкодерами, сервоприводы и шаговые двигатели." },
        { name: "Основы Электроники", level: 85, details: "Расчет сопротивлений, фильтрация помех, проектирование и макетирование электрических цепей." }
      ]
    },
    {
      title: "Другие Навыки",
      icon: "Wrench",
      items: [
        { name: "3D Моделирование (Tinkercad)", level: 85, details: "Быстрое макетирование базовых конструктивных узлов." },
        { name: "3D Моделирование (Onshape)", level: 75, details: "Проектирование сложных робототехнических рам и механических корпусодержателей." },
        { name: "Пайка (Soldering)", level: 90, details: "Качественная и прочная сквозная пайка радиокомпонентов, надежное исправление дефектов плат." }
      ]
    }
  ],
  en: [
    {
      title: "Programming (Software)",
      icon: "Code",
      items: [
        { name: "C++", level: 90, details: "Arduino microcontrollers and high-speed control at hardware level." },
        { name: "Python", level: 75, details: "Raspberry Pi applications, digital data processing, and image recognition (OpenCV)." },
        { name: "Arduino IDE", level: 95, details: "Working with sensory modules, motor drivers, and low-level physical libraries." }
      ]
    },
    {
      title: "Hardware Platforms",
      icon: "Cpu",
      items: [
        { name: "Arduino (UNO, Nano, Mega)", level: 95, details: "Interfacing physical components using standard I2C, SPI, and UART protocols." },
        { name: "ESP32", level: 85, details: "Building customized IoT (Internet of Things) devices using Wi-Fi and Bluetooth stacks." },
        { name: "Raspberry Pi", level: 70, details: "Working with tailored Linux environments on single-board computer components." },
        { name: "Sensors & Motors", level: 90, details: "Ultrasonic, infrared, encoder-based gear motors, servo servos, and stepper gears." },
        { name: "Electronics Fundamentals", level: 85, details: "Developing schematics, passive filtering calculation, and computing resistance and voltage specs." }
      ]
    },
    {
      title: "Other Skills",
      icon: "Wrench",
      items: [
        { name: "3D Modeling (Tinkercad)", level: 85, details: "Rapid prototyping models and designing fundamental component casings." },
        { name: "3D Modeling (Onshape)", level: 75, details: "Engineering complex multi-part bodies and custom mechanical assemblies." },
        { name: "Soldering", level: 90, details: "Precision manual soldering on PCBs, diagnostic testing, and physical circuit repair." }
      ]
    }
  ]
};

export const TRANSLATED_PROJECTS: Record<Language, Project[]> = {
  uz: [
    {
      id: "proj-1",
      title: "Line Follower Robot (Chiziq Bo'ylab Harakatlanuvchi Robot)",
      description: "Infraqizil (IR) sensorlar yordamida qora chiziqni aniqlab, PID algoritmi orqali silliq va katta tezlikda harakatlanuvchi robot mexanizmi.",
      imagePlaceholder: "line_follower",
      techTags: ["C++", "Arduino Nano", "IR Sensor", "L298N Motor Driver", "PID Controller"],
      githubUrl: "https://github.com/robotist/line-follower",
      details: "Ushbu robot maxsus o'rnatilgan 5 ta IR sensor massivi yordamida chiziqni juda aniq kuzatadi. Harakat tezligi va burchak muvozanati PID (Proportional-Integral-Derivative) nazorat tizimi yordamida real vaqt rejimida boshqariladi. Bu uning burchaklarda mukammal burilishini ta'minlaydi."
    },
    {
      id: "proj-2",
      title: "Avtomatik Sug'orish Tizimi (Smart Irrigation System)",
      description: "Tuproqdagi namlik darajasini doimiy o'lchab, o'simliklarni avtomatik ravishda ehtiyojga ko'ra sug'oradigan va IoT orqali ma'lumotlarni uzatuvchi aqlli tizim.",
      imagePlaceholder: "irrigation",
      techTags: ["ESP32", "Soil Moisture Sensor", "Water Pump", "Relay Module", "Blynk IoT"],
      githubUrl: "https://github.com/robotist/smart-watering",
      details: "Tizim tuproq namligi ma'lum foizdan pasayganda suv nasosini avtomatik ishga tushiradi va kerakli namlik darajasiga yetganda uni o'chiradi. ESP32 modulining Wi-Fi moduli yordamida u ma'lumotlarni Blynk ilovasiga yuboradi, foydalanuvchi dunyoning istalgan joyidan boshqarishi mumkin."
    },
    {
      id: "proj-3",
      title: "Aqlli Masofa Datchigi (Smart Range Detector)",
      description: "To'siqlar va yaqinlashayotgan ob'ektlarni aniqlab, ularni ovozli va yorug'lik signallari orqali xabar qiluvchi ilg'or datchik stansiyasi.",
      imagePlaceholder: "range_sensor",
      techTags: ["Arduino UNO", "Ultrasonic HC-SR04", "Buzzer", "I2C LCD Display", "RGB LED"],
      githubUrl: "https://github.com/robotist/smart-detector",
      details: "Ob'ektdan datchikkacha bo'lgan masofani ultratovush to'lqinlari yoradamida soniyada 10-marta o'lchaydi. Masofaga qarab signallar chastotasi o'zgaradi (moshina parkovkasi kabi) va masofa real vaqtda I2C LCD ekranda millimetrgacha ko'rsatiladi."
    }
  ],
  ru: [
    {
      id: "proj-1",
      title: "Робот, следующий по линии (Line Follower)",
      description: "Автономный робот, отслеживающий черную линию с помощью ИК-датчиков и плавно перемещающийся на больших скоростях с помощью ПИД-регулятора.",
      imagePlaceholder: "line_follower",
      techTags: ["C++", "Arduino Nano", "IR Sensor", "L298N Motor Driver", "PID Controller"],
      githubUrl: "https://github.com/robotist/line-follower",
      details: "Проект использует плату Arduino Nano и батарею ИК-сенсоров. Благодаря программно интегрированной формуле ПИД, реакция на отклонения от оси контрастной линии происходит за миллисекунды, что обеспечивает высокую динамическую маневренность на извилистых трассах."
    },
    {
      id: "proj-2",
      title: "Автоматический Полив Растений (Smart Irrigation)",
      description: "Интеллектуальная система управления гидроударами и автополива растений с передачей данных о влажности почвы и температуры в мобильный IoT дашборд.",
      imagePlaceholder: "irrigation",
      techTags: ["ESP32", "Soil Moisture Sensor", "Water Pump", "Relay Module", "Blynk IoT"],
      githubUrl: "https://github.com/robotist/smart-watering",
      details: "Разработано на платформе ESP32. Позволяет избежать избыточного замачивания корней. Информация в реальном времени транслируется на веб-сокеты Blynk, что позволяет удаленно регулировать тайминги или активировать ручной пролив из любой точки мира."
    },
    {
      id: "proj-3",
      title: "Умный Дальномер (Smart Range Detector)",
      description: "Станция бесконтактного измерения расстояния с акустической частотной индикацией приближения препятствий (аналог парктроника).",
      imagePlaceholder: "range_sensor",
      techTags: ["Arduino UNO", "Ultrasonic HC-SR04", "Buzzer", "I2C LCD Display", "RGB LED"],
      githubUrl: "https://github.com/robotist/smart-detector",
      details: "Используя ультразвуковой излучатель HC-SR04, плата непрерывно вычисляет скважность эха. Измеренные метрические значения выводятся на ЖК-экран, синхронно модулируя звуковой писк пьезоизлучателя и триггерные цвета RGB-диода."
    }
  ],
  en: [
    {
      id: "proj-1",
      title: "Line Follower Robot",
      description: "An autonomous robot mechanism that detects a dark track line using an array of infrared (IR) reflex sensors and navigates via responsive PID filters.",
      imagePlaceholder: "line_follower",
      techTags: ["C++", "Arduino Nano", "IR Sensor", "L298N Motor Driver", "PID Controller"],
      githubUrl: "https://github.com/robotist/line-follower",
      details: "This build leverages 5 continuous IR sensors. Speed adjustments and precise turn damping parameters are updated in real time through custom PID (Proportional-Integral-Derivative) code, supporting high-speed track navigation and flawless sharp-angle performance."
    },
    {
      id: "proj-2",
      title: "Smart Irrigation System",
      description: "An automated system measuring real-time soil moisture and activating custom electrical water pumps, synchronized securely over Blynk IoT cloud services.",
      imagePlaceholder: "irrigation",
      techTags: ["ESP32", "Soil Moisture Sensor", "Water Pump", "Relay Module", "Blynk IoT"],
      githubUrl: "https://github.com/robotist/smart-watering",
      details: "Built on an ESP32 microchip. The device reads soil hydration values and triggers an isolated high-voltage relay to run a water pump. All data is live-broadcasted to the Blynk platform dashboard, letting growers oversee agricultural systems globally."
    },
    {
      id: "proj-3",
      title: "Smart Range Detector",
      description: "A compact sonar sensor station that measures metric distance and provides escalating alarm frequencies and custom digital status displays.",
      imagePlaceholder: "range_sensor",
      techTags: ["Arduino UNO", "Ultrasonic HC-SR04", "Buzzer", "I2C LCD Display", "RGB LED"],
      githubUrl: "https://github.com/robotist/smart-detector",
      details: "Measures target distances 10 times per second using ultrasonic sound pulses. Integrated code dynamically adjusts warning buzzer frequencies relative to the distance (similar to a vehicle parking sonar) and showcases numerical millimeter stats."
    }
  ]
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['uz']) => string;
  profile: { name: string; title: string; bio: string };
  skills: SkillCategory[];
  projects: Project[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-lang');
      if (saved === 'uz' || saved === 'ru' || saved === 'en') {
        return saved;
      }
    }
    return 'uz'; // Default to Uzbek
  });

  useEffect(() => {
    localStorage.setItem('portfolio-lang', language);
  }, [language]);

  const t = (key: keyof typeof TRANSLATIONS['uz']): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS['uz'][key] || String(key);
  };

  const profile = {
    name: TRANSLATED_PROFILE[language].name,
    title: TRANSLATED_PROFILE[language].title,
    bio: TRANSLATIONS[language].about_intro_p2, // map the primary biography description
  };

  const skills = TRANSLATED_SKILLS[language] as SkillCategory[];
  const projects = TRANSLATED_PROJECTS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, profile, skills, projects }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
