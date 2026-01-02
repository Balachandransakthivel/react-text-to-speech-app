"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Settings2, 
  Trash2, 
  Sparkles,
  Globe,
  Mic2,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TextToVoicePage() {
  const [text, setText] = React.useState("");
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState<string>("");
  const [rate, setRate] = React.useState([1]);
  const [pitch, setPitch] = React.useState([1]);
  const [volume, setVolume] = React.useState([1]);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  React.useEffect(() => {
    const synth = window.speechSynthesis;
    
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    return () => {
      synth.cancel();
    };
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text) return;
    
    const synth = window.speechSynthesis;
    
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    
    if (voice) utterance.voice = voice;
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    utterance.volume = volume[0];

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    if (isSpeaking && !isPaused) {
      synth.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const clearText = () => {
    setText("");
    handleStop();
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-violet-50 to-fuchsia-50 dark:from-slate-950 dark:via-violet-950/50 dark:to-slate-950 transition-colors duration-500" />
        
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-400/30 to-violet-500/30 dark:from-cyan-500/20 dark:to-violet-600/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-fuchsia-400/30 to-orange-400/30 dark:from-fuchsia-600/20 dark:to-orange-500/20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 dark:from-emerald-500/15 dark:to-cyan-500/15 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-end pt-4">
            <motion.button
              onClick={toggleTheme}
              className="relative w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-lg shadow-violet-500/10 dark:shadow-violet-500/5 flex items-center justify-center overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-6 h-6 text-amber-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: 20, opacity: 0, rotate: 90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-6 h-6 text-violet-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <header className="text-center space-y-6 pt-4 md:pt-8">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Badge className="mb-6 px-5 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 border-violet-200/50 dark:border-violet-700/50 text-violet-700 dark:text-violet-300 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Web Speech API
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                  Transform Text
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                  into Speech
                </span>
              </h1>
              
              <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-6 text-lg md:text-xl leading-relaxed">
                Create natural-sounding audio from any text. Perfect for accessibility, 
                learning, and content creation.
              </p>
            </motion.div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="perspective-1000"
          >
            <Card className="border-0 shadow-2xl shadow-violet-500/10 dark:shadow-violet-500/5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
              
              <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/30"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Mic2 className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                        Voice Studio
                      </CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">
                        Compose and customize your speech
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={clearText}
                    className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-300 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="relative p-6 space-y-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-slate-50/50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                    <Textarea
                      placeholder="Type or paste your text here..."
                      className="min-h-[200px] text-lg resize-none border-none focus-visible:ring-0 bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    {text.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-xs font-medium text-violet-600 dark:text-violet-400"
                      >
                        {text.length} characters
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Globe className="w-4 h-4 text-violet-500" />
                        Select Voice
                      </Label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger className="w-full bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50 rounded-xl h-12">
                          <SelectValue placeholder="Choose a voice..." />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((voice) => (
                            <SelectItem key={voice.name} value={voice.name}>
                              {voice.name} ({voice.lang})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <Volume2 className="w-4 h-4 text-cyan-500" />
                          Volume
                        </Label>
                        <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{Math.round(volume[0] * 100)}%</span>
                      </div>
                      <Slider
                        value={volume}
                        min={0}
                        max={1}
                        step={0.1}
                        onValueChange={setVolume}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <Settings2 className="w-4 h-4 text-fuchsia-500" />
                          Speed
                        </Label>
                        <span className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400">{rate[0]}x</span>
                      </div>
                      <Slider
                        value={rate}
                        min={0.5}
                        max={2}
                        step={0.1}
                        onValueChange={setRate}
                        className="cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <Settings2 className="w-4 h-4 text-emerald-500" />
                          Pitch
                        </Label>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{pitch[0]}</span>
                      </div>
                      <Slider
                        value={pitch}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={setPitch}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                  <AnimatePresence mode="wait">
                    {isSpeaking ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <Button 
                          size="lg" 
                          onClick={handlePause}
                          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-2xl px-10 py-7 h-auto text-lg font-semibold shadow-lg"
                        >
                          <Pause className="w-6 h-6 mr-3 fill-current" />
                          Pause
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <Button 
                          size="lg" 
                          onClick={handleSpeak}
                          className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 hover:from-violet-700 hover:via-fuchsia-600 hover:to-violet-700 text-white rounded-2xl px-10 py-7 h-auto text-lg font-semibold shadow-xl shadow-violet-500/30 dark:shadow-violet-500/20 bg-[length:200%_100%] hover:bg-right transition-all duration-500"
                        >
                          <Play className="w-6 h-6 mr-3 fill-current" />
                          {isPaused ? "Resume" : "Play Speech"}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={handleStop}
                    disabled={!isSpeaking && !isPaused}
                    className="rounded-2xl px-10 py-7 h-auto text-lg font-semibold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Square className="w-5 h-5 mr-3 fill-current" />
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <footer className="text-center text-slate-500 dark:text-slate-500 text-sm pb-16">
            <p>© 2025 Voice Converter. Built with Next.js & Web Speech API.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
