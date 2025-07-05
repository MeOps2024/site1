import { useState } from "react";

export default function AIDemo() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simple sentiment analysis using keyword matching
  const analyzeSentiment = (inputText: string) => {
    const positiveWords = [
      'excellent', 'fantastique', 'merveilleux', 'génial', 'super', 'parfait', 
      'formidable', 'magnifique', 'impressionnant', 'remarquable', 'extraordinaire',
      'content', 'heureux', 'satisfait', 'ravi', 'enchanté', 'bon', 'bien',
      'love', 'amazing', 'great', 'good', 'wonderful', 'excellent', 'perfect'
    ];

    const negativeWords = [
      'terrible', 'horrible', 'affreux', 'nul', 'mauvais', 'décevant', 
      'frustrant', 'ennuyeux', 'médiocre', 'catastrophique', 'lamentable',
      'triste', 'mécontent', 'déçu', 'fâché', 'énervé', 'agacé',
      'hate', 'awful', 'bad', 'terrible', 'horrible', 'worst', 'disappointing'
    ];

    const neutralWords = [
      'normal', 'correct', 'moyen', 'standard', 'acceptable', 'convenable',
      'okay', 'fine', 'average', 'neutral'
    ];

    const words = inputText.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    let neutralScore = 0;

    const foundWords = {
      positive: [] as string[],
      negative: [] as string[],
      neutral: [] as string[]
    };

    words.forEach(word => {
      // Remove punctuation
      const cleanWord = word.replace(/[^\w]/g, '');
      
      if (positiveWords.includes(cleanWord)) {
        positiveScore++;
        foundWords.positive.push(cleanWord);
      } else if (negativeWords.includes(cleanWord)) {
        negativeScore++;
        foundWords.negative.push(cleanWord);
      } else if (neutralWords.includes(cleanWord)) {
        neutralScore++;
        foundWords.neutral.push(cleanWord);
      }
    });

    const totalScore = positiveScore + negativeScore + neutralScore;
    
    let sentiment = 'neutre';
    let confidence = 0;
    let color = 'text-gray-600';
    let bgColor = 'bg-gray-100';

    if (totalScore > 0) {
      const positivePercent = (positiveScore / totalScore) * 100;
      const negativePercent = (negativeScore / totalScore) * 100;
      
      confidence = Math.max(positivePercent, negativePercent);

      if (positiveScore > negativeScore) {
        sentiment = 'positif';
        color = 'text-green-600';
        bgColor = 'bg-green-100';
      } else if (negativeScore > positiveScore) {
        sentiment = 'négatif';
        color = 'text-red-600';
        bgColor = 'bg-red-100';
      }
    }

    return {
      sentiment,
      confidence: Math.round(confidence),
      scores: {
        positive: positiveScore,
        negative: negativeScore,
        neutral: neutralScore
      },
      foundWords,
      wordCount: words.length,
      color,
      bgColor
    };
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeSentiment(text);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const getSuggestions = () => {
    if (!analysis) return [];
    
    const suggestions = [];
    
    if (analysis.sentiment === 'négatif') {
      suggestions.push("Considérez reformuler avec des termes plus positifs");
      suggestions.push("Ajoutez des solutions ou des aspects constructifs");
    } else if (analysis.sentiment === 'positif') {
      suggestions.push("Excellent ! Ce message véhicule une émotion positive");
      suggestions.push("Parfait pour du marketing ou de la communication client");
    } else {
      suggestions.push("Message neutre - parfait pour de l'information factuelle");
      suggestions.push("Ajoutez des mots émotionnels pour plus d'impact");
    }
    
    return suggestions;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🤖 Démo IA : Analyse de Sentiments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Démonstration d'une intelligence artificielle simple qui analyse les émotions 
            dans vos textes en français et anglais.
          </p>
          <div className="mt-6 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <i className="fas fa-check-circle"></i>
            <span className="font-medium">Développé par SmartScale WebTech</span>
          </div>
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="space-y-8">
            {/* Input Section */}
            <div>
              <label htmlFor="text-input" className="block text-lg font-semibold text-gray-900 mb-4">
                Entrez votre texte à analyser :
              </label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Écrivez ici votre message, avis client, email, ou tout autre texte à analyser..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {text.length}/500 caractères
                </span>
                <button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <i className="fas fa-spinner animate-spin"></i>
                      <span>Analyse en cours...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-brain"></i>
                      <span>Analyser le sentiment</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            {analysis && (
              <div className="border-t-2 border-gray-100 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Résultats de l'analyse IA :</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Primary Result */}
                  <div className={`${analysis.bgColor} rounded-2xl p-6`}>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${analysis.color} mb-2`}>
                        {analysis.sentiment.toUpperCase()}
                      </div>
                      <div className="text-lg text-gray-600 mb-4">
                        Confiance : {analysis.confidence}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${analysis.sentiment === 'positif' ? 'bg-green-500' : analysis.sentiment === 'négatif' ? 'bg-red-500' : 'bg-gray-500'}`}
                          style={{ width: `${analysis.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Scores */}
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-green-800">Mots positifs</span>
                        <span className="font-bold text-green-600">{analysis.scores.positive}</span>
                      </div>
                      {analysis.foundWords.positive.length > 0 && (
                        <div className="mt-2 text-sm text-green-600">
                          {analysis.foundWords.positive.join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-red-800">Mots négatifs</span>
                        <span className="font-bold text-red-600">{analysis.scores.negative}</span>
                      </div>
                      {analysis.foundWords.negative.length > 0 && (
                        <div className="mt-2 text-sm text-red-600">
                          {analysis.foundWords.negative.join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">Mots neutres</span>
                        <span className="font-bold text-gray-600">{analysis.scores.neutral}</span>
                      </div>
                      {analysis.foundWords.neutral.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          {analysis.foundWords.neutral.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="mt-8 bg-blue-50 rounded-2xl p-6">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                    <i className="fas fa-lightbulb mr-2"></i>
                    Suggestions IA
                  </h4>
                  <ul className="space-y-2">
                    {getSuggestions().map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2 text-blue-800">
                        <i className="fas fa-arrow-right mt-1 text-blue-600"></i>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-gray-900 text-white rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">🔧 Comment ça fonctionne ?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-database text-2xl"></i>
              </div>
              <h4 className="font-bold mb-2">Base de données lexicale</h4>
              <p className="text-gray-300 text-sm">
                Utilise une base de mots pré-classifiés en français et anglais
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cogs text-2xl"></i>
              </div>
              <h4 className="font-bold mb-2">Algorithme de scoring</h4>
              <p className="text-gray-300 text-sm">
                Analyse chaque mot et calcule un score de sentiment global
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <h4 className="font-bold mb-2">Résultats en temps réel</h4>
              <p className="text-gray-300 text-sm">
                Fournit instantanément sentiment, confiance et suggestions
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Impressionné par cette démo ?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Ceci n'est qu'un aperçu de ce que nous pouvons créer pour votre entreprise. 
              Chatbots intelligents, automatisation métier, analyses avancées...
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact?service=Solution IA Complète"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Discuter de mon projet IA
              </a>
              <a 
                href="/"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}