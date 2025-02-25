// @ts-nocheck
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup"; // for HTML

// Language map for Prism.js
export const LANGUAGE_MAP = {
  javascript: "javascript",
  typescript: "typescript",
  js: "javascript",
  ts: "typescript",
  python: "python",
  py: "python",
  html: "markup",
  css: "css",
  sql: "sql",
  json: "json",
};

// Helper function to highlight code using Prism.js
export const highlightCode = (code, language) => {
  if (!code) return "";

  const prismLanguage = LANGUAGE_MAP[language?.toLowerCase()] || "javascript";

  try {
    return Prism.highlight(code, Prism.languages[prismLanguage], prismLanguage);
  } catch (error) {
    console.error("Error highlighting code:", error);
    return code; // Return original code if highlighting fails
  }
};

// Main formatting function
export const formatCode = (code, language) => {
  try {
    if (!code) return "";
    const lang = language?.toLowerCase();

    switch (lang) {
      case "javascript":
      case "typescript":
      case "js":
      case "ts":
        return formatJavaScript(code);
      case "python":
      case "py":
        return formatPython(code);
      case "html":
        return formatHTML(code);
      case "css":
        return formatCSS(code);
      case "sql":
        return formatSQL(code);
      case "json":
        return formatJSON(code);
      default:
        // Apply basic indentation for unsupported languages
        return applyBasicFormatting(code);
    }
  } catch (error) {
    console.error("Error formatting code:", error);
    return code; // Return original code if formatting fails
  }
};

// Helper formatting functions
export const formatJavaScript = (code) => {
  try {
    if (code.trim().startsWith("{") && code.trim().endsWith("}")) {
      const parsed = JSON.parse(code);
      return JSON.stringify(parsed, null, 2);
    }
  } catch (e) {
    // Not valid JSON, continue with basic formatting
  }
  return applyBasicFormatting(code);
};

export const formatPython = (code) => {
  let lines = code.split("\n").map((line) => line.trimRight());
  let result = "";
  let indentLevel = 0;
  const indentSize = 4;

  for (const line of lines) {
    let trimmedLine = line.trim();
    if (
      trimmedLine.startsWith("}") ||
      trimmedLine.startsWith(")") ||
      trimmedLine.startsWith("]") ||
      trimmedLine.startsWith("else:") ||
      trimmedLine.startsWith("elif ") ||
      trimmedLine.startsWith("except ") ||
      trimmedLine.startsWith("finally:")
    ) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const indent = " ".repeat(indentLevel * indentSize);
    result += indent + trimmedLine + "\n";

    if (
      trimmedLine.endsWith(":") ||
      (trimmedLine.endsWith("{") && !trimmedLine.includes("}")) ||
      (trimmedLine.endsWith("(") && !trimmedLine.includes(")")) ||
      (trimmedLine.endsWith("[") && !trimmedLine.includes("]"))
    ) {
      indentLevel++;
    }
  }

  return result.trim();
};

export const formatHTML = (code) => applyBasicFormatting(code);

export const formatCSS = (code) => {
  let formatted = "";
  const parts = code.split("}");

  for (let part of parts) {
    if (!part.trim()) continue;

    const ruleParts = part.split("{");
    if (ruleParts.length === 2) {
      const selector = ruleParts[0].trim();
      const styles = ruleParts[1].trim();

      formatted += selector + " {\n";

      const styleProps = styles.split(";");
      for (let prop of styleProps) {
        if (prop.trim()) {
          const [name, value] = prop.split(":");
          if (name && value) {
            formatted += `  ${name.trim()}: ${value.trim()};\n`;
          }
        }
      }

      formatted += "}\n\n";
    } else {
      formatted += part + "}\n";
    }
  }

  return formatted.trim();
};

export const formatSQL = (code) => {
  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
    "INSERT INTO",
    "VALUES",
    "UPDATE",
    "SET",
    "DELETE",
    "CREATE",
    "ALTER",
    "DROP",
    "TABLE",
    "INDEX",
    "VIEW",
    "DATABASE",
  ];

  let formatted = code;

  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    formatted = formatted.replace(regex, keyword);
  }

  for (const keyword of [
    "FROM",
    "WHERE",
    "JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
  ]) {
    const regex = new RegExp(`\\b${keyword}\\b`, "g");
    formatted = formatted.replace(regex, `\n${keyword}`);
  }

  return formatted;
};

export const formatJSON = (code) => {
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    console.error("Invalid JSON:", e);
    return code;
  }
};

export const applyBasicFormatting = (code) => {
  let result = "";
  let indentLevel = 0;
  const indentSize = 2;

  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (line.startsWith("}") || line.startsWith(")") || line.startsWith("]")) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const indent = " ".repeat(indentLevel * indentSize);
    result += indent + line + "\n";

    const openCount = (line.match(/{|\(|\[/g) || []).length;
    const closeCount = (line.match(/}|\)|\]/g) || []).length;

    indentLevel += openCount - closeCount;

    if (
      openCount > closeCount &&
      (line.includes("}") || line.includes(")") || line.includes("]"))
    ) {
      indentLevel++;
    }
  }

  return result.trim();
};
