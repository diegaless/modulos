"use strict";

(() => {
  // === Selectores del DOM ===
  const inputEl = document.querySelector("textarea");
  const characterCountEl = document.querySelector("#characterCount");
  const wordCountEl = document.querySelector("#wordCount");
  const sentenceCountEl = document.querySelector("#sentenceCount");
  const paragraphCountEl = document.querySelector("#paragraphCount");
  const readingTimeEl = document.querySelector("#readingTime");
  const readabilityEl = document.querySelector("#readability");
  const keywordsDivEl = document.querySelector(".keywords");
  const topKeywordsEl = document.querySelector("#topKeywords");

  // === Constante de Stop Words ===
  const STOP_WORDS = [
    "a", "able", "about", "above", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "added", "adj", "affected", "affecting", "affects", "after", "afterwards", "again", "against", "ah", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "apparently", "approximately", "are", "aren", "arent", "arise", "around", "as", "aside", "ask", "asking", "at", "auth", "available", "away", "awfully", "b", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "between", "beyond", "biol", "both", "brief", "briefly", "but", "by", "c", "ca", "came", "can", "cannot", "can't", "cause", "causes", "certain", "certainly", "co", "com", "come", "comes", "contain", "containing", "contains", "could", "couldnt", "d", "date", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "due", "during", "e", "each", "ed", "edu", "effect", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "especially", "et", "et-al", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "except", "f", "far", "few", "ff", "fifth", "first", "five", "fix", "followed", "following", "follows", "for", "former", "formerly", "forth", "found", "four", "from", "further", "furthermore", "g", "gave", "get", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "gone", "got", "gotten", "h", "had", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "hed", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "hes", "hi", "hid", "him", "himself", "his", "hither", "home", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "i'll", "im", "immediate", "immediately", "importance", "important", "in", "inc", "indeed", "index", "information", "instead", "into", "invention", "inward", "is", "isn't", "it", "itd", "it'll", "its", "itself", "i've", "j", "just", "k", "keep", "keeps", "kept", "kg", "km", "know", "known", "knows", "l", "largely", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likely", "line", "little", "'ll", "look", "looking", "looks", "ltd", "m", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "million", "miss", "ml", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself", "n", "na", "name", "namely", "nay", "nd", "near", "nearly", "necessarily", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "now", "nowhere", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "omitted", "on", "once", "one", "ones", "only", "onto", "or", "ord", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own", "p", "page", "pages", "part", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "poorly", "possible", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "probably", "promptly", "proud", "provides", "put", "q", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re", "readily", "really", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "respectively", "resulted", "resulting", "results", "right", "run", "s", "said", "same", "saw", "say", "saying", "says", "sec", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sent", "seven", "several", "shall", "she", "shed", "she'll", "shes", "should", "shouldn't", "show", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "since", "six", "slightly", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "specifying", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure", "t", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", "therere", "theres", "thereto", "thereupon", "there've", "these", "they", "theyd", "they'll", "theyre", "they've", "think", "this", "those", "thou", "though", "thoughh", "thousand", "throug", "through", "throughout", "thru", "thus", "til", "tip", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "ups", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "v", "value", "various", "'ve", "very", "via", "viz", "vol", "vols", "vs", "w", "want", "wants", "was", "wasn't", "way", "we", "wed", "welcome", "we'll", "went", "were", "weren't", "we've", "what", "whatever", "what'll", "whats", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "while", "whim", "whither", "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "whose", "why", "widely", "willing", "wish", "with", "within", "without", "won't", "words", "world", "would", "wouldn't", "www", "x", "y", "yes", "yet", "you", "youd", "you'll", "your", "youre", "yours", "yourself", "yourselves", "you've", "z", "zero"
  ];

  // === Funciones de Análisis ===

  // Retorna el número de caracteres (incluye espacios y saltos de línea)
  const countCharacters = (text) => text.length;

  // Extrae las "palabras" usando una expresión regular
  const getWordsArray = (text) => {
    const words = text.match(/\b[-?(\w+)?]+\b/gi);
    return words ? words : [];
  };

  // Retorna el número de palabras
  const countWords = (text) => getWordsArray(text).length;

  // Retorna el número de oraciones, filtrando cadenas vacías
  const countSentences = (text) => {
    const sentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    return sentences.length;
  };

  // Retorna el número de párrafos (separados por uno o más saltos de línea)
  const countParagraphs = (text) => {
    if (text.trim() === "") return 0;
    return text.replace(/\n$/gm, "").split(/\n+/).length;
  };

  // Calcula el tiempo de lectura en función de 275 palabras por minuto
  const calculateReadingTime = (wordCount) => {
    const wpm = 275;
    let totalSeconds = Math.floor((wordCount * 60) / wpm);
    if (totalSeconds > 59) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}m ${seconds}s`;
    }
    return `${totalSeconds}s`;
  };

  // Extrae las palabras clave (sin stop words ni números) y retorna las 4 principales
  const extractKeywords = (text) => {
    const wordsArray = getWordsArray(text);
    if (!wordsArray.length) return [];
    const filteredWords = wordsArray.filter((word) => {
      const lower = word.toLowerCase();
      return STOP_WORDS.indexOf(lower) === -1 && isNaN(word);
    });
    const keywordCounts = {};
    filteredWords.forEach((word) => {
      const lower = word.toLowerCase();
      keywordCounts[lower] = (keywordCounts[lower] || 0) + 1;
    });
    const sortedKeywords = Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]);
    return sortedKeywords.slice(0, 4);
  };

  // === Actualización de la Interfaz ===
  const updateStatistics = () => {
    const text = inputEl.value;

    // Actualizamos cada métrica
    characterCountEl.textContent = countCharacters(text);
    const wordsCount = countWords(text);
    wordCountEl.textContent = wordsCount;
    sentenceCountEl.textContent = countSentences(text);
    paragraphCountEl.textContent = countParagraphs(text);
    readingTimeEl.textContent = calculateReadingTime(wordsCount);

    // Actualizamos palabras clave
    const keywords = extractKeywords(text);
    topKeywordsEl.innerHTML = "";
    keywords.forEach(([keyword, count]) => {
      const li = document.createElement("li");
      li.innerHTML = `<b>${keyword}</b>: ${count}`;
      topKeywordsEl.appendChild(li);
    });
    keywordsDivEl.style.display = wordsCount > 0 ? "block" : "none";
  };

  // Actualiza las estadísticas en cada cambio en el textarea
  inputEl.addEventListener("input", updateStatistics);

  // === Función para Convertir el Score de Lectura en un Mensaje Significativo ===
  const readingEase = (num) => {
    if (num <= 30) return "Legibilidad: Nivel de graduado universitario.";
    if (num > 30 && num <= 40) return "Legibilidad: Nivel de FP Superior.";
    if (num > 40 && num <= 50) return "Legibilidad: Nivel de FP Medio.";
    if (num > 50 && num <= 60) return "Legibilidad: Nivel de bachillerato.";
    if (num > 60 && num <= 70) return "Legibilidad: Nivel de ESO.";
    if (num > 70 && num <= 80) return "Legibilidad: Nivel de primaria avanzado.";
    if (num > 80 && num <= 90) return "Legibilidad: Nivel de primaria medio.";
    if (num > 90 && num <= 100) return "Legibilidad: Nivel de primaria básico.";
    return "No disponible.";
  };

  // === Consulta a la API de Readability usando fetch ===
  readabilityEl.addEventListener("click", () => {
    const textValue = inputEl.value.trim();
    if (!textValue) {
      readabilityEl.textContent = "Please enter some text.";
      return;
    }
    readabilityEl.textContent = "Fetching score...";

    const encodedText = encodeURIComponent(textValue);
    const requestUrl = `https://ipeirotis-readability-metrics.p.rapidapi.com/getReadabilityMetrics?text=${encodedText}`;

    fetch(requestUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-key": "b99311ae66msh3e2f5257a9b6d8fp1ca1cejsn3ceb4dc79736", // Reemplaza con tu API key
        "x-rapidapi-host": "ipeirotis-readability-metrics.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        readabilityEl.textContent = readingEase(data.FLESCH_READING);
      })
      .catch((error) => {
        console.error("Error:", error);
        readabilityEl.textContent = "Error fetching readability score.";
      });
  });
})();
