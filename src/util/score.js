import data from '@/data/resultSummary.json'
import recommendationsAndArticles from '@/data/result.json'
import articles from '@/data/articles.json'

export const normalizeScore = (score) => {
  const sectionPoints = 20
  const sectionTotalPossibleScore = 6

  return (score * sectionPoints) / sectionTotalPossibleScore
}

export const totalScore = (scores) => {
  var totalScore = 0
  //total score calculation
  Object.keys(scores).forEach(function (key) {
    totalScore = totalScore + scores[key].normalizedScore
  })
  return Math.round(totalScore)
}

export const calculateChartScore = (scores) => {
  const maxQuestionScore = 2
  var chartData = []

  Object.keys(scores).forEach(function (key) {
    var currentChartData = chartData.find((x) => x.label === scores[key].section)
    if (currentChartData === undefined) {
      chartData.push({
        label: scores[key].section,
        possibleScore: maxQuestionScore,
        rawScore: scores[key].score,
        score: (scores[key].score / maxQuestionScore) * 100
      })
    } else {
      currentChartData.possibleScore = currentChartData.possibleScore + maxQuestionScore
      currentChartData.rawScore = currentChartData.rawScore + scores[key].score
      currentChartData.score = (currentChartData.rawScore / currentChartData.possibleScore) * 100
    }
  })
  return chartData
}

export const calculateResponseSummary = (scores) => {

  var responseData = { 
    "summary": {},
    "sections": [{"section" : "invest", "score": 0, "recommendations": [], "articles": [], "articlesIncluded": []},
                 {"section" : "borrow", "score": 0, "recommendations": [], "articles": [], "articlesIncluded": []},
                 {"section" : "spend", "score": 0, "recommendations": [], "articles": [], "articlesIncluded": []},
                 {"section" : "manage", "score": 0, "recommendations": [], "articles": [], "articlesIncluded": []},
                 {"section" : "protect", "score": 0, "recommendations": [], "articles": [], "articlesIncluded": []}]
  };

  var totalScore = 0;

  Object.keys(scores).forEach(function (key) {
    var section = responseData.sections.find((x) => x.section === scores[key].section)
    section.score = section.score + scores[key].score 

    //set recommendations and articles
    var resultsByQuestion = recommendationsAndArticles.find((x) => x.questionId === scores[key].questionId).results

    for (let result of resultsByQuestion)
    {
      if (result.score.includes(scores[key].score ))
      {
        if (result.recommendation != "")
         section.recommendations.push(result.recommendation)
        
        if (!section.articlesIncluded.includes(result.articleId))
        { 
          section.articlesIncluded.push(result.articleId)
          var articleDetails = articles.find((x) => x.articleId === result.articleId)
          section.articles.push({
            "type": articleDetails.type,
            "linkText" : articleDetails.linkText,
            "link": articleDetails.link,
            "copy": articleDetails.copy
          }) 
        }
      }
    }
    totalScore = totalScore + scores[key].score;
  })
  
  // set header and body for overall response
  var summary = data.summary.find((x) => totalScore >= x.scoreLow && totalScore <= x.scoreHigh)
  responseData.summary.header = summary.header
  responseData.summary.body = summary.body
  
  // set copy for section responses
  Object.keys(responseData.sections).forEach(function (key) {
    var sections = data.section.find((x) => x.name === responseData.sections[key].section)
    responseData.sections[key].copy = sections.result.find((x) => responseData.sections[key].score >= x.scoreLow && responseData.sections[key].score <= x.scoreHigh).text
  })

  return responseData
   
}
