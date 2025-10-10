// import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import { motion } from "framer-motion";
// import { ArrowUp } from "lucide-react";

// export default function Airesponse() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatRef = useRef(null);

//   // Auto scroll to bottom
//   useEffect(() => {
//     chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages]);

//   const askAI = async () => {
//     if (!input.trim()) return;
//     const userMessage = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input, provider: "openrouter" }),
//       });
//       const data = await res.json();

//       const aiMessage = { sender: "ai", text: data.text || "❌ No response from AI" };

//       // Typewriter effect
//       let currentText = "";
//       for (let i = 0; i < aiMessage.text.length; i++) {
//         await new Promise(r => setTimeout(r, 15));
//         currentText = aiMessage.text.slice(0, i + 1);
//         setMessages(prev => [...prev.slice(0, -1), { sender: "ai", text: currentText }]);
//       }

//       setMessages(prev => [...prev.slice(0, -1), aiMessage]);
//     } catch (err) {
//       setMessages(prev => [...prev, { sender: "ai", text: "❌ Error fetching AI response" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full max-h-[80vh] w-full md:max-w-3xl mx-auto bg-gray-50 dark:bg-gray-900 border rounded-xl relative overflow-hidden">
      
//       {/* Chat Messages */}
//       <div
//         ref={chatRef}
//         className="flex-1 overflow-y-auto px-4 py-4  scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
//       >
//         {messages.map((msg, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[100%] px-2 rounded-xl whitespace-pre-wrap break-words
//                 ${msg.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"}`}
//             >
//               <ReactMarkdown
//                 components={{
//                   h1: ({ node, ...props }) => <h1 className="text-xl font-bold " {...props} />,
//                   h2: ({ node, ...props }) => <h2 className="text-lg font-bold " {...props} />,
//                   p: ({ node, ...props }) => <p className="-mt-6" {...props} />,
//                   li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
//                   strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
//                 }}
//               >
//                 {msg.text}
//               </ReactMarkdown>
//             </div>
//           </motion.div>
//         ))}
//         {loading && <NestedLoader />}
//       </div>

//       {/* Input Box */}
//       <div className="sticky bottom-0 left-0 right-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 px-4 py-3 flex gap-2 items-center">
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), askAI())}
//           placeholder="Type your question..."
//           className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-12 md:h-14"
//         />
//         <button
//           onClick={askAI}
//           disabled={loading}
//           className={`w-12 h-12 flex items-center justify-center rounded-full ${
//             loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
//           } transition-colors`}
//         >
//           <ArrowUp className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // Loader
// function NestedLoader() {
//   return (
//     <div className="absolute inset-0 flex items-center justify-center">
//       <motion.div
//         className="absolute border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
//       />
//       <motion.div
//         className="border-4 border-yellow-400 border-t-transparent rounded-full w-8 h-8"
//         animate={{ rotate: -360 }}
//         transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
//       />
//     </div>
//   );
// }



// import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import { motion } from "framer-motion";
// import { ArrowUp } from "lucide-react";
// import emoji from "emoji-dictionary";

// export default function Airesponse() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "💡 What's your goal today?" },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const chatRef = useRef(null);

//   // Auto scroll
//   useEffect(() => {
//     chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages]);

//   const convertEmojis = (text) =>
//     text.replace(/:([a-zA-Z0-9_+-]+):/g, (match, name) => emoji.getUnicode(name) || match);

//   const askAI = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input, provider: "openrouter" }),
//       });
//       const data = await res.json();

//       const aiMessage = { sender: "ai", text: convertEmojis(data.text || "❌ No response from AI") };

//       // Typewriter effect
//       let currentText = "";
//       for (let i = 0; i < aiMessage.text.length; i++) {
//         await new Promise((r) => setTimeout(r, 15));
//         currentText = aiMessage.text.slice(0, i + 1);
//         setMessages((prev) => [...prev.slice(0, -1), { sender: "ai", text: currentText }]);
//       }

//       setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
//     } catch (err) {
//       setMessages((prev) => [...prev, { sender: "ai", text: "❌ Error fetching AI response" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-3xl mx-auto bg-gray-50 dark:bg-gray-900 border rounded-xl shadow-lg h-[500px]">
//   {/* Chat Messages */}
//  <div
//   ref={chatRef}
//   className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
//   style={{
//     scrollbarWidth: "thin", // for Firefox
//     scrollbarColor: "rgba(100,100,100,0.3) rgba(0,0,0,0)", // thumb color & track color
//   }}
// >
//   {messages.map((msg, idx) => (
//     <motion.div
//       key={idx}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//     >
//       <div
//         className={`max-w-[100%] px-4 py-2 rounded-2xl break-words font-sans text-sm md:text-base
//           ${msg.sender === "user"
//             ? "bg-blue-600 text-white rounded-br-none"
//             : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
//           }`}
//       >
//         <ReactMarkdown
//           components={{
//             p: ({ node, ...props }) => <p className="my-1">{props.children}</p>,
//             li: ({ node, ...props }) => <li className="ml-4 list-disc">{props.children}</li>,
//             strong: ({ node, ...props }) => <strong className="font-bold">{props.children}</strong>,
//           }}
//         >
//           {msg.text}
//         </ReactMarkdown>
//       </div>
//     </motion.div>
//   ))}
//   {loading && (
//     <div className="flex justify-center py-2">
//       <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//     </div>
//   )}
// </div>

// {/* For Webkit browsers (Chrome, Edge, Safari) add custom styles */}
// <style jsx>{`
//   div::-webkit-scrollbar {
//     width: 2px;
//     height:2px /* super thin */
//   }
//   div::-webkit-scrollbar-track {
//     background: transparent; /* invisible track */
//   }
//   div::-webkit-scrollbar-thumb {
//     background-color: rgba(100, 100, 100, 0.3); /* subtle thumb */
//     border-radius: 2px;
//   }
//   div::-webkit-scrollbar-thumb:hover {
//     background-color: rgba(100, 100, 100, 0.5);
//   }
// `}</style>


//   {/* Input Box */}
//   <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 px-4 py-3 flex gap-2 items-center">
//     <textarea
//       value={input}
//       onChange={(e) => setInput(e.target.value)}
//       onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), askAI())}
//       placeholder="Type your message..."
//       className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-12 md:h-14 font-sans"
//     />
//     <button
//       onClick={askAI}
//       disabled={loading}
//       className={`w-12 h-12 flex items-center justify-center rounded-full ${
//         loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
//       } transition-colors`}
//     >
//       <ArrowUp className="text-white" />
//     </button>
//   </div>
// </div>

//   );
// }



import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import emoji from "emoji-dictionary";

export default function Airesponse() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "💡 What's your goal today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [isAborted, setIsAborted] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const convertEmojis = (text) =>
    text.replace(/:([a-zA-Z0-9_+-]+):/g, (match, name) => emoji.getUnicode(name) || match);

  const askAI = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsAborted(false);

    try {
      const res = await fetch("https://aiservice-6r87.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, provider: "openrouter" }),
      });
      const data = await res.json();

      const aiMessage = {
        sender: "ai",
        text: convertEmojis(data.text || "❌ No response from AI"),
      };

      // Typewriter effect with abort
      let currentText = "";
      const step = 5; 
      for (let i = 0; i < aiMessage.text.length; i+=step) {
        if (isAborted) break; // stop if terminated
        await new Promise((r) => setTimeout(r, 5));
        currentText = aiMessage.text.slice(0, i + 1);
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { sender: "ai", text: currentText },
        ]);
      }

      if (!isAborted) {
        setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "❌ AI response terminated" },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Error fetching AI response" },
      ]);
    } finally {
      setLoading(false);
      setIsAborted(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto bg-gray-50 dark:bg-gray-900 border rounded-xl shadow-lg h-[500px] font-inter">
      {/* Chat Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(150,150,150,0.2) rgba(0,0,0,0)",
        }}
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`w-[100%] px-4 py-3 rounded-2xl break-words text-sm md:text-base leading-relaxed
                ${msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none font-medium"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none font-normal"
                }`}
            >
            <ReactMarkdown
  components={{
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold my-3" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-medium my-2" {...props} />,
    p: ({ node, ...props }) => <p className="my-2 py-2 ">{props.children}</p>,
    li: ({ node, ...props }) => <li className="ml-6 py-1 list-disc">{props.children}</li>,
    strong: ({ node, ...props }) => <strong className="font-bold ">{props.children}</strong>,
    code: ({ node, ...props }) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">{props.children}</code>
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-10">
        {props.children}
      </blockquote>
    ),
  }}
>

                {msg.text}
              </ReactMarkdown>
            </div>
          </motion.div>
        ))}
       
      </div>

      {/* Input Box */}
      <div className="bg-gray-50 m dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 px-4 py-3 flex gap-2 items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), askAI())}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-12 md:h-14 font-inter text-sm md:text-base leading-relaxed"
        />
        <button
          onClick={() => (loading ? setIsAborted(true) : askAI())}
          className={`w-12 h-12 flex items-center justify-center rounded-full ${
            loading ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          } transition-colors`}
        >
          {loading ? <X className="text-white" /> : <ArrowUp className="text-white" />}
        </button>
      </div>
    </div>
  );
}
