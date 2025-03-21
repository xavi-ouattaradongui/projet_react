import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Dashboard() {
  const [quote, setQuote] = useState("Chargement...");
  const [joke, setJoke] = useState("Chargement...");
  const [event, setEvent] = useState("Chargement...");
  const [mocktail, setMocktail] = useState("Chargement...");
  const [recipe, setRecipe] = useState("Chargement...");
  const [documents, setDocuments] = useState([]); 
  const [newDocumentName, setNewDocumentName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.adviceslip.com/advice")
      .then(response => setQuote(response.data.slip.advice))
      .catch(error => console.error("Erreur API citation :", error));
  }, []);

  useEffect(() => {
    axios.get("https://official-joke-api.appspot.com/random_joke")
      .then(response => setJoke(`${response.data.setup} - ${response.data.punchline}`))
      .catch(error => console.error("Erreur API blague :", error));
  }, []);

  useEffect(() => {
    axios.get("http://history.muffinlabs.com/date")
      .then(response => {
        const events = response.data.data.Events;
        if (events.length > 0) {
          setEvent(`${events[0].year} - ${events[0].text}`);
        }
      })
      .catch(error => console.error("Erreur API événements :", error));
  }, []);

  useEffect(() => {
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
      .then(response => {
        if (response.data.drinks && response.data.drinks.length > 0) {
          setMocktail(response.data.drinks[0].strDrink);
        }
      })
      .catch(error => console.error("Erreur API mocktail :", error));
  }, []);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(response => {
        if (response.data.meals && response.data.meals.length > 0) {
          setRecipe(response.data.meals[0].strMeal);
        }
      })
      .catch(error => console.error("Erreur API recette :", error));
  }, []);

  useEffect(() => {
    setDocuments([
      { id: 1, name: "document1.md" },
      { id: 2, name: "document2.md" },
      { id: 3, name: "document3.md" },
    ]);
  }, []);

  const handleCreateNewDocument = () => {
    if (newDocumentName.trim()) {
      navigate(`/editor?new=true&name=${newDocumentName}`);
    } else {
      alert("Veuillez entrer un nom pour le nouveau document.");
    }
  };

  const handleSelectDocument = (documentName) => {
    navigate(`/editor?name=${documentName}`);
  };

  return (
    <div className="dashboard">
      <h1>Tableau de bord </h1>
      <div className="widget">Date et heure : {new Date().toLocaleString()}</div>
      <div className="widget">Citation du jour : {quote}</div>
      <div className="widget">Blague du jour : {joke}</div>
      <div className="widget">Événement historique : {event}</div>
      <div className="widget">Mocktail du jour : {mocktail}</div>
      <div className="widget">Recette du jour : {recipe}</div>

      {/* Liste des documents Markdown */}
      <div className="widget">
        <h2>Documents Markdown</h2>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <button onClick={() => handleSelectDocument(doc.name)}>
                {doc.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Zone pour créer un nouveau document */}
      <div className="widget">
        <h2>Créer un nouveau document</h2>
        <input
          type="text"
          value={newDocumentName}
          onChange={(e) => setNewDocumentName(e.target.value)}
          placeholder="Nom du document"
        />
        <button onClick={handleCreateNewDocument}>Créer</button>
      </div>

      <button className="editor-button">
        <Link to="/editor">Aller à l'éditeur Markdown</Link>
      </button>
    </div>
  );
}

export default Dashboard;