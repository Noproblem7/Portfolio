import { Project, SkillCategory, SocialLink } from './types';

export const INITIAL_PROFILE = {
  name: "Sardor Ergashev",
  title: "Robototexnika muhandisi & Innovatsion yechimlar yaratuvchisi",
  bio: "Men robototexnika yo'nalishida tahsil olayotgan va ushbu sohada 1 yillik amaliy tajribaga ega talabaman. Mikroprotsessorlar, sensorlar va mexanik tizimlarni birlashtirib, real hayotiy muammolarga aqlli yechimlar topish bilan shug'ullanaman. Bir yillik faoliyatim davomida murakkab mikrosxemalar loyihalash, elektron datchiklar bilan ishlash va avtomatlashtirilgan mexanizmlarni yaratish bo'yicha kuchli amaliy va nazariy ko'nikmalarga ega bo'ldim.",
  yearsOfExperience: 1,
};

export const INITIAL_SKILLS: SkillCategory[] = [
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
];

export const INITIAL_PROJECTS: Project[] = [
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
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Telegram", url: "https://t.me/Tilavoldiyev1", icon: "Send" },
  { platform: "GitHub", url: "https://github.com/robotist", icon: "Github" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/robotist-student", icon: "Linkedin" }
];
