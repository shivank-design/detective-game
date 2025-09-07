import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function DetectiveGame() {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState("");
  const logRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      document.body.style.filter = `contrast(${100 + Math.random() * 20}%) brightness(${90 + Math.random() * 15}%)`;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    let response = "";
    const cmd = input.toLowerCase();

    if (cmd.includes("look")) {
      response = "The neon-lit corridor flickers. Shadows move where they shouldn’t.";
    } else if (cmd.includes("search")) {
      response = "You scan the area. A strange metallic smell lingers in the air...";
    } else if (cmd.includes("clue")) {
      response = "A torn note reads: 'The truth hides in the static.'";
    } else if (cmd.includes("exit")) {
      response = "You can’t leave yet. Something is watching you.";
    } else {
      response = "The system doesn’t recognise that command. Try 'look', 'search', or 'clue'.";
    }

    setLog([...log, { input, response }]);
    setInput("");
  };

  return (
    <div className="h-screen w-screen bg-black text-green-400 flex flex-col items-center justify-center font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.2)_3px)]"></div>
      <div className="absolute inset-0 animate-pulse opacity-5 bg-green-400"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="z-10 w-full max-w-2xl p-4 border border-green-400 rounded-xl shadow-xl bg-black/80"
      >
        <div ref={logRef} className="h-96 overflow-y-auto p-2 border border-green-600 mb-2 bg-black/70">
          {log.map((entry, i) => (
            <div key={i} className="mb-2">
              <div className="text-green-300">{" > "}{entry.input}</div>
              <div className="text-green-500">{entry.response}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="flex">
          <input
            className="flex-grow bg-black text-green-400 border border-green-600 p-2 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
          />
          <button
            type="submit"
            className="ml-2 px-4 bg-green-600 hover:bg-green-500 text-black font-bold"
          >
            Send
          </button>
        </form>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-green-400 opacity-0 pointer-events-none"
        animate={{ opacity: [0, 0.03, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </div>
  );
}
