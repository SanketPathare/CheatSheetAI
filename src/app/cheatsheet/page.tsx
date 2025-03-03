// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";
import topics from "../../../Data/topics";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Save,
  Download,
  Trash,
  ChevronDown,
} from "lucide-react";
import Footer from "../components/Footer";
import { formatCode, highlightCode } from "@/app/components/formatCode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [cheatSheet, setCheatSheet] = useState("");
  const [highlightedCode, setHighlightedCode] = useState("");
  const [savedCheatSheets, setSavedCheatSheets] = useState([]);
  const [error, setError] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  {
    /* Language Selection */
  }
  useEffect(() => {
    if (cheatSheet && selectedLanguage) {
      try {
        const highlighted = highlightCode(cheatSheet, selectedLanguage);
        setHighlightedCode(highlighted);
      } catch (err) {
        console.error("Error highlighting code:", err);
        setHighlightedCode("Error highlighting code. Check console.");
      }
    }
  }, [cheatSheet, selectedLanguage]);

  // generateCheatSheet
  const generateCheatSheet = async () => {
    if (!selectedLanguage || !selectedTopic) {
      setError("Please select both a language and a topic.");
      toast.error("Please select both a language and a topic."); // Using react-toastify
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: selectedLanguage,
          topic: selectedTopic,
          customPrompt: customPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Failed to generate cheat sheet (Status: ${response.status})`
        );
      }

      const data = await response.json();
      const formattedContent = formatCode(data.content, selectedLanguage);
      setCheatSheet(formattedContent);
    } catch (err) {
      console.error("Error generating cheat sheet:", err);
      setError(err.message || "An unexpected error occurred.");
      toast.error(err.message || "An unexpected error occurred."); // Using react-toastify
    } finally {
      setLoading(false);
    }
  };

  {
    /* Copy and Save */
  }
  const saveCheatSheet = () => {
    if (cheatSheet) {
      const newCheatSheet = {
        id: uuidv4(),
        language: selectedLanguage,
        topic: selectedTopic,
        content: cheatSheet,
        timestamp: new Date().toLocaleString(),
      };
      setSavedCheatSheets((prevSheets) => [...prevSheets, newCheatSheet]);
      toast.success(`${selectedLanguage} - ${selectedTopic} has been saved.`); // Using react-toastify
    }
  };

  const deleteCheatSheet = (id) => {
    setSavedCheatSheets((prevSheets) =>
      prevSheets.filter((sheet) => sheet.id !== id)
    );
    toast.success("The cheat sheet has been removed from your saved items."); // Using react-toastify
  };

  /* downloadCheatSheet */
  const downloadCheatSheet = (content, language, topic) => {
    if (content) {
      const fileName = `${language}-${topic}-cheatsheet.txt`;
      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.info(`${fileName} is being downloaded.`); // Using react-toastify
    }
  };

  /*Copy To Clipboard  */

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast.success("The content has been copied to your clipboard."); // Using react-toastify
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy to clipboard. Please try again."); // Using react-toastify
        console.error("Failed to copy: ", err);
      });
  };

  const clearCheatSheet = () => {
    setCheatSheet("");
    setHighlightedCode("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="text-sm"
      />
      <header className="py-4 px-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-indigo-400 mr-2" />

          <Link href="/" className="text-xl font-bold text-white">
            CheatSheetAI
          </Link>
        </div>
        <nav className="hidden lg:block">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-indigo-400">
          AI Cheat Sheet Generator
        </h1>

        {/* Selection Controls */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Select Language
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    setSelectedTopic("");
                  }}
                >
                  <option value="">Choose a language</option>
                  {Object.keys(topics).map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                  <ChevronDown />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Select Topic
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-700 border border-gray-600 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  disabled={!selectedLanguage}
                >
                  <option value="">Choose a topic</option>
                  {selectedLanguage &&
                    topics[selectedLanguage]?.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-300">
              Custom Prompt (Optional)
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 resize-none"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Add extra instructions for the AI......."
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6">
            <button
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={generateCheatSheet}
              disabled={loading}
            >
              {loading ? (
                "Generating..."
              ) : (
                <span className="flex items-center">Generate Cheat Sheet</span>
              )}
            </button>

            {cheatSheet && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
                onClick={clearCheatSheet}
              >
                Clear
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Generated Content */}
        {cheatSheet && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex flex-col mb-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-200">
                  {selectedLanguage} - {selectedTopic}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    onClick={() => copyToClipboard(cheatSheet)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    onClick={saveCheatSheet}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save
                  </button>
                  <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    onClick={() =>
                      downloadCheatSheet(
                        cheatSheet,
                        selectedLanguage,
                        selectedTopic
                      )
                    }
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </button>
                </div>
              </div>
              <div className="prose max-w-none overflow-x-auto rounded-md bg-gray-900 p-4">
                <pre className="text-sm text-gray-200 whitespace-pre-wrap">
                  <code
                    ref={codeRef}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  ></code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Saved Cheat Sheets */}
        {savedCheatSheets.length > 0 && (
          <div className="bg-gray-800 max-w-7xl mx-auto mt-12 p-4 md:p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">
              Saved Cheat Sheets
            </h2>
            <div className="space-y-4">
              {savedCheatSheets.map((sheet) => (
                <div
                  key={sheet.id}
                  className="rounded-lg shadow-lg p-4 md:p-6 bg-gray-700"
                >
                  <div className="flex flex-col mb-4">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-300">
                      {sheet.language} - {sheet.topic}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {sheet.timestamp}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                          onClick={() => copyToClipboard(sheet.content)}
                        >
                          <Copy className="mr-2 h-4 w-4" /> Copy
                        </button>
                        <button
                          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                          onClick={() =>
                            downloadCheatSheet(
                              sheet.content,
                              sheet.language,
                              sheet.topic
                            )
                          }
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                          onClick={() => deleteCheatSheet(sheet.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none overflow-x-auto rounded-md bg-gray-900 p-4">
                    <pre className="text-sm text-gray-200 whitespace-pre-wrap">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: highlightCode(sheet.content, sheet.language),
                        }}
                      ></code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
