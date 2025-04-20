const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.generateFlashCards = async (req, res) => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyA6M5PBPQuOBSIbUcj5qCu14LSNOmp2hQ0"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (!req.file) {
    return res.json({
      status: "fail",
      message: "No File Uploaded",
    });
  }
  const content = await pdfParse(req.file.buffer);
  const prompt = `The following content is extracted from a pdf
                Content: ${content.text}
                Generate flashcards from this content and include all the major points in the content.
                Your response should be in the following structure:
                {
                  "flashcards":[
                    {
                      "question":"Question 1",
                      "answer":"Answer 1"
                    },{

                      "question":"Question 2",
                      "answer":"Answer 2"
                    }

                  ]
                }
  `;
  const response = await model.generateContent(prompt);
  const json = response.response.candidates[0].content.parts[0].text
  const cleanedString = json.replace(/```/g, "").trim().split("json")[1]
  const flashCards = JSON.parse(cleanedString)

  return res.json({
    status: "success",
    message: "FlashCard Generated",
    data: {
      cards: flashCards.flashcards
    },
  });
};

exports.generateSummary = async (req, res) => {
  console.log("Generating Questions");
  return res.json({
    status: "success",
    message: "Questions Generated",
  });
};
