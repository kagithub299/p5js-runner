import React, { useState, useEffect } from "react";

const App = () => {
  const [code, setCode] = useState("// p5.jsコードを書く");
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/load")
      .then(res => res.json())
      .then(data => setSnippets(data))
      .catch(error => console.error("APIエラー:", error));
  }, []);

  const saveCode = async () => {
    try {
      await fetch("http://127.0.0.1:5000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      window.location.reload();
    } catch (error) {
      console.error("データ送信エラー:", error);
    }
  };

  return (
    <div>
      <h1>p5.js コードエディタ</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={saveCode}>保存</button>

      <h2>コードのプレビュー</h2>
      <iframe
        title="p5js-preview"
        srcDoc={`<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script></head>
        <body><script>${code}</script></body></html>`}
        width="400"
        height="400"
      ></iframe>

      <h2>保存されたコード一覧</h2>
      <ul>
        {snippets.map((snippet, index) => (
          <li key={index}>
            <pre>{snippet.code}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
