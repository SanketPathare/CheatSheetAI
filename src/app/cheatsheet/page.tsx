// @ts-nocheck
"use client";
import { useState } from "react";
import topics from "../../../Data/topics";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { saveAs } from "file-saver";
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

export default function page() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [cheatSheet, setCheatSheet] = useState("");
  const [savedCheatSheets, setSavedCheatSheets] = useState([]);
  const [error, setError] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generateCheatSheet = async () => {
    if (!selectedLanguage || !selectedTopic) {
      setError("Please select both a language and a topic.");
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
      setCheatSheet(data.content);
    } catch (err) {
      console.error("Error generating cheat sheet:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  const deleteCheatSheet = (id) => {
    setSavedCheatSheets((prevSheets) =>
      prevSheets.filter((sheet) => sheet.id !== id)
    );
  };

  const downloadCheatSheet = (content, language, topic) => {
    if (content) {
      const fileName = `${language}-${topic}-cheatsheet.txt`;
      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      saveAs(blob, fileName);
    }
  };

  const clearCheatSheet = () => {
    setCheatSheet("");
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased ">
      <header className="py-4 px-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-indigo-400 mr-2" />

          <Link href="/" className="text-xl font-bold text-white">
            CheatSheetAI
          </Link>
        </div>
        <nav>
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
              placeholder="Add extra instructions for the AI..."
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
                  <CopyToClipboard text={cheatSheet} onCopy={handleCopy}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                      <Copy className="mr-2 h-4 w-4" />{" "}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </CopyToClipboard>
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
              <div className="prose max-w-none overflow-x-auto">
                <SyntaxHighlighter
                  language={selectedLanguage.toLowerCase()}
                  style={dracula}
                  wrapLines={true}
                  className="text-sm"
                  customStyle={{ borderRadius: "0.375rem" }}
                >
                  {cheatSheet}
                </SyntaxHighlighter>
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
                        <CopyToClipboard text={sheet.content}>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                            <Copy className="mr-2 h-4 w-4" /> Copy
                          </button>
                        </CopyToClipboard>
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

                  <div className="prose max-w-none overflow-x-auto">
                    <SyntaxHighlighter
                      language={sheet.language.toLowerCase()}
                      style={dracula}
                      wrapLines={true}
                      className="text-sm"
                      customStyle={{ borderRadius: "0.375rem" }}
                    >
                      {sheet.content}
                    </SyntaxHighlighter>
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
