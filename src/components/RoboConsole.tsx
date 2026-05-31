import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Cpu, Shield, Terminal as TermIcon } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface LogLine {
  text: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'input';
  time: string;
}

export default function RoboConsole() {
  const { language, t } = useLanguage();
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [selectedScript, setSelectedScript] = useState<string>('sensor_test');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize logs on change of language or first boot
  useEffect(() => {
    setLogs([
      { text: t('shell_boot_ok'), type: "success", time: "13:24:52" },
      { text: t('shell_init_core'), type: "info", time: "13:24:53" },
      { text: t('shell_baud'), type: "info", time: "13:24:53" },
      { text: t('shell_all_loaded'), type: "success", time: "13:24:54" }
    ]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error' | 'input' = 'info') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [...prev, { text, type, time: timeStr }]);
  };

  const getSteps = (): { text: string; type: LogLine['type']; delay: number }[] => {
    if (selectedScript === 'sensor_test') {
      if (language === 'uz') {
        return [
          { text: ">> Executing: sensor_read_all.ino", type: "input", delay: 0 },
          { text: "Kod sketchi kompilyatsiya qilinmoqda... Tayyor (Hajmi: 9442 bayt)", type: "info", delay: 600 },
          { text: "USB (COM5) orqali plataga yuklanmoqda...", type: "info", delay: 1200 },
          { text: "Flesh yozish muvaffaqiyatli yakunlandi. Tekshirish: OK.", type: "success", delay: 1800 },
          { text: "[I2C] Qurilmalar qidirilmoqda... LCD topildi (manzil: 0x27)", type: "info", delay: 2300 },
          { text: "[ANALOG] Tuproq namligi ko'rsatkichi: 540 (Oraliq: 0-1023) [38%]", type: "info", delay: 2800 },
          { text: "[RAQAMLI] Masofa o'lchov datchigi: 23.4 sm", type: "info", delay: 3300 },
          { text: "[TIZIM] Harorat darajasi barqaror: Normal (24.2°C)", type: "success", delay: 3800 },
          { text: "Dasturning ishlashi tugadi. MCU energiya tejash rejimiga o'tmoqda.", type: "success", delay: 4200 }
        ];
      } else if (language === 'ru') {
        return [
          { text: ">> Executing: sensor_read_all.ino", type: "input", delay: 0 },
          { text: "Компиляция скетча кода... Готово (Размер: 9442 байт)", type: "info", delay: 600 },
          { text: "Загрузка на плату через USB (COM5)...", type: "info", delay: 1200 },
          { text: "Запись во FLASH завершена. Проверка: OK.", type: "success", delay: 1800 },
          { text: "[I2C] Сканирование шины... Найден дисплей LCD на 0x27", type: "info", delay: 2300 },
          { text: "[ANALOG] Показания влажности почвы: 540 (0-1023) [38%]", type: "info", delay: 2800 },
          { text: "[DIGITAL] Ультразвуковой дальномер: 23.4 см", type: "info", delay: 3300 },
          { text: "[SYSTEM] Порог температуры: В норме (24.2°C)", type: "success", delay: 3800 },
          { text: "Выполнение завершено. MCU переходит в спящий энергосберегающий режим.", type: "success", delay: 4200 }
        ];
      } else {
        return [
          { text: ">> Executing: sensor_read_all.ino", type: "input", delay: 0 },
          { text: "Compiling code sketch... Done (Size: 9442 bytes)", type: "info", delay: 600 },
          { text: "Uploading to board via USB (COM5)...", type: "info", delay: 1200 },
          { text: "Flash written successfully. Verification OK.", type: "success", delay: 1800 },
          { text: "[I2C] Scanning devices... Found LCD display at 0x27", type: "info", delay: 2300 },
          { text: "[ANALOG] Reading Soil Moisture: 540 (Range: 0-1023) [38%]", type: "info", delay: 2800 },
          { text: "[DIGITAL] Ultrasonic distance sensor: 23.4 cm", type: "info", delay: 3300 },
          { text: "[SYSTEM] Ambient Temp: Normal (24.2°C)", type: "success", delay: 3800 },
          { text: "Execution complete. Board entering low-power Sleep mode.", type: "success", delay: 4200 }
        ];
      }
    } else if (selectedScript === 'motor_calibrate') {
      if (language === 'uz') {
        return [
          { text: ">> Executing: motor_pid_calibration.ino", type: "input", delay: 0 },
          { text: "PWM kontrolleri orqali ESP32 platasiga ulanish o'rnatilmoqda...", type: "info", delay: 500 },
          { text: "G'ildirak enkoderlari sanog'i nollashtirildi.", type: "info", delay: 1000 },
          { text: "Kuchlanish berildi: Chap motor tezligi 150/255", type: "warn", delay: 1500 },
          { text: "Kuchlanish berildi: O'ng motor tezligi 150/255", type: "warn", delay: 2000 },
          { text: "Enkoder hisoblagichi: Chap: 1420 | O'ng: 1424 (Farq: 4)", type: "info", delay: 2500 },
          { text: "PID formulasini sozlash (Kd = 1.12)... Tayyor.", type: "success", delay: 3200 },
          { text: "Robotning to'g'ri chiziqdan og'ishi: <0.4%. Kalibrlash muvaffaqiyatli!", type: "success", delay: 3800 }
        ];
      } else if (language === 'ru') {
        return [
          { text: ">> Executing: motor_pid_calibration.ino", type: "input", delay: 0 },
          { text: "Подключение к плате ESP32 через ШИМ-контроллер...", type: "info", delay: 500 },
          { text: "Сброс показаний энкодеров колес в ноль.", type: "info", delay: 1000 },
          { text: "Подача шага напряжения: Левый мотор Скорость 150/255", type: "warn", delay: 1500 },
          { text: "Подача шага напряжения: Правый мотор Скорость 150/255", type: "warn", delay: 2000 },
          { text: "Значение энкодеров: Левый: 1420 | Правый: 1424 (Разница: 4)", type: "info", delay: 2500 },
          { text: "Корректировка постоянной ПИД-дифференциала (Kd = 1.12)... Готово.", type: "success", delay: 3200 },
          { text: "Отклонение прямого пути робота: <0.4%. Калибровка завершена!", type: "success", delay: 3800 }
        ];
      } else {
        return [
          { text: ">> Executing: motor_pid_calibration.ino", type: "input", delay: 0 },
          { text: "Connecting to ESP32 board over PWM controller...", type: "info", delay: 500 },
          { text: "Resetting wheel encoders count to zero.", type: "info", delay: 1000 },
          { text: "Applying high-voltage Step: Left Motor Speed 150/255", type: "warn", delay: 1500 },
          { text: "Applying high-voltage Step: Right Motor Speed 150/255", type: "warn", delay: 2000 },
          { text: "Encoder tick check: Left: 1420 | Right: 1424 (Delta: 4)", type: "info", delay: 2500 },
          { text: "Adjusting PID derivative constant (Kd = 1.12)... Done.", type: "success", delay: 3200 },
          { text: "Robot straight path deviation: <0.4%. Calibrated successfully!", type: "success", delay: 3800 }
        ];
      }
    } else {
      // WiFi IoT setup
      if (language === 'uz') {
        return [
          { text: ">> Executing: esp32_iot_connect.ino", type: "input", delay: 0 },
          { text: "ESP32 Wi-Fi apparat to'plami faollashtirilmoqda...", type: "info", delay: 600 },
          { text: "Qidirilayotgan tarmoq: 'RoboWorkspace_HighSpeed'...", type: "info", delay: 1200 },
          { text: "Tarmoq aniqlandi (Signal quvvati: -64dBm)", type: "info", delay: 1700 },
          { text: "Bog'lanish o'rnatilmoqda va IP manzil olinmoqda...", type: "warn", delay: 2200 },
          { text: "Ulanish bajarildi! Mahalliy IP: 192.168.1.144", type: "success", delay: 2800 },
          { text: "Xavfsiz MQTT serverga ulanish kanali o'rnatilmoqda...", type: "info", delay: 3400 },
          { text: "MQTT brokerga ulandi! Obuna bo'lingan mavzu: robo/commands", type: "success", delay: 4000 }
        ];
      } else if (language === 'ru') {
        return [
          { text: ">> Executing: esp32_iot_connect.ino", type: "input", delay: 0 },
          { text: "Инициализация аппаратного стека Wi-Fi на ESP32...", type: "info", delay: 600 },
          { text: "Поиск сети SSID: 'RoboWorkspace_HighSpeed'...", type: "info", delay: 1200 },
          { text: "Сеть обнаружена (Сигнал RSSI: -64dBm)", type: "info", delay: 1700 },
          { text: "Подключение и получение локального IP-адреса...", type: "warn", delay: 2200 },
          { text: "Подключено! Выделенный локальный IP: 192.168.1.144", type: "success", delay: 2800 },
          { text: "Установление защищенного MQTT-соединения с брокером...", type: "info", delay: 3400 },
          { text: "Брокер MQTT подключен! Подписка на топик: robo/commands", type: "success", delay: 4000 }
        ];
      } else {
        return [
          { text: ">> Executing: esp32_iot_connect.ino", type: "input", delay: 0 },
          { text: "Initializing ESP32 Wi-Fi hardware stack...", type: "info", delay: 600 },
          { text: "Scanning for SSID: 'RoboWorkspace_HighSpeed'...", type: "info", delay: 1200 },
          { text: "SSID detected (RSSI: -64dBm)", type: "info", delay: 1700 },
          { text: "Connecting and obtaining IP address...", type: "warn", delay: 2200 },
          { text: "Connected! Local IP allocated: 192.168.1.144", type: "success", delay: 2800 },
          { text: "Establishing secure MQTT connection to agent...", type: "info", delay: 3400 },
          { text: "MQTT broker connected! Topics subscribed: robo/commands", type: "success", delay: 4000 }
        ];
      }
    }
  };

  const runCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    
    const steps = getSteps();

    steps.forEach(step => {
      setTimeout(() => {
        addLog(step.text, step.type);
        if (steps[steps.length - 1] === step) {
          setIsRunning(false);
        }
      }, step.delay);
    });
  };

  const handleReset = () => {
    setLogs([
      { text: t('shell_reset_requested'), type: "warn", time: "" },
      { text: t('shell_boot_ok'), type: "success", time: "" },
      { text: t('shell_awaiting_command'), type: "info", time: "" }
    ]);
    setIsRunning(false);
  };

  return (
    <div className="w-full bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[340px]">
      {/* Console Header bar */}
      <div className="bg-slate-900/90 border-b border-slate-900 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TermIcon className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-300">{t('shell_header')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/85"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/85"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/85"></span>
        </div>
      </div>

      {/* Control select section */}
      <div className="bg-slate-900/40 p-3 flex flex-wrap gap-2 items-center justify-between border-b border-slate-900">
        <div className="flex gap-2 items-center">
          <Cpu className="w-3.5 h-3.5 text-cyan-500" />
          <select 
            value={selectedScript}
            onChange={(e) => setSelectedScript(e.target.value)}
            disabled={isRunning}
            className="bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 rounded px-2 py-1 outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="sensor_test">sensor_read_all.ino</option>
            <option value="motor_calibrate">motor_pid_calibration.ino</option>
            <option value="esp_wifi">esp32_iot_connect.ino</option>
          </select>
        </div>

        <div className="flex gap-1.5">
          <button 
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800/60 disabled:opacity-50 disabled:hover:bg-cyan-950 font-mono text-[10px] px-2.5 py-1 rounded transition-colors cursor-pointer"
          >
            <Play className={`w-3 h-3 ${isRunning ? 'animate-pulse' : ''}`} />
            {t('skills_sim_run')}
          </button>
          <button 
            onClick={handleReset}
            disabled={isRunning}
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 font-mono text-[10px] px-2.5 py-1 rounded transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            {t('skills_sim_reset')}
          </button>
        </div>
      </div>

      {/* Terminal log window */}
      <div className="flex-1 p-3.5 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1.5 scrollbar-thin scrollbar-thumb-cyan-500" ref={scrollRef}>
        {logs.map((log, index) => {
          let textStyle = "text-slate-300";
          if (log.type === 'success') textStyle = "text-emerald-400";
          if (log.type === 'warn') textStyle = "text-amber-400";
          if (log.type === 'error') textStyle = "text-rose-400";
          if (log.type === 'input') textStyle = "text-cyan-400 font-semibold";

          return (
            <div key={index} className="flex gap-2 items-start opacity-90">
              {log.time && (
                <span className="text-slate-600 select-none font-light">[{log.time}]</span>
              )}
              <span className={textStyle}>{log.text}</span>
            </div>
          );
        })}
        {isRunning && (
          <div className="flex gap-1.5 items-center text-cyan-400 opacity-75 py-0.5">
            <span className="w-1.5 h-3.5 bg-cyan-400 animate-[blink_0.8s_infinite]"></span>
            <span className="text-[10px] animate-pulse italic">{t('skills_sim_busy')}</span>
          </div>
        )}
      </div>

      {/* Console details footer */}
      <div className="bg-slate-950 border-t border-slate-900 px-4 py-1.5 flex justify-between font-mono text-[9px] text-slate-500">
        <span>Hardware: ESP32 / Arduino Nano S</span>
        <span>Temp: 24.2°C</span>
        <span className="flex items-center gap-1">
          <Shield className="w-2.5 h-2.5 text-emerald-500" /> Secure Sandbox Verified
        </span>
      </div>
    </div>
  );
}
