import React, { useState } from "react";
import { Link } from "react-router-dom";
import Showdown from "showdown"; 


function Editor() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  // Fonction pour convertir Markdown en HTML
  const convertToHtml = (md) => {
    const converter = new Showdown.Converter();
    return converter.makeHtml(md);
  };

  // Gérer la saisie dans l'éditeur
  const handleInputChange = (event) => {
    const mdText = event.target.value;
    setMarkdown(mdText);
    setHtml(convertToHtml(mdText));
  };

  // Fonction pour exporter le contenu en tant que fichier Markdown
  const handleExport = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.md"; 
    link.click();
  };

  // Fonction pour lire le fichier Markdown et le charger dans l'éditeur
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/markdown") {
      const reader = new FileReader();
      reader.onload = () => {
        setMarkdown(reader.result); 
        setHtml(convertToHtml(reader.result)); 
      };
      reader.readAsText(file);
    } else {
      alert("Veuillez importer un fichier .md");
    }
  };

  return (
    <div className="editor">
      <h1>Éditeur Markdown</h1>
      
      <div className="editor-container">
        <div className="editor-input">
          <h2>Édition</h2>
          <textarea
            value={markdown}
            onChange={handleInputChange}
            placeholder="Écrivez ici votre Markdown..."
            rows="10"
            cols="50"
          />
        </div>

        <div className="editor-preview">
          <h2>Prévisualisation</h2>
          <div
            className="preview-area"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/* Bouton Importer */}
        <div>
          <input
            type="file"
            id="file-input"
            accept=".md"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button onClick={() => document.getElementById('file-input').click()} className="editor-button">
            Importer un fichier Markdown
          </button>
        </div>

        {/* Bouton Exporter */}
        <div>
          <button onClick={handleExport} className="editor-button">
            Exporter le Markdown
          </button>
        </div>

        {/* Bouton Retour */}
        <div>
          <button className="editor-button">
            <Link to="/">Retour au tableau de bord</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editor;