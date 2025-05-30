const axios = require("axios");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const geminiSearch = async (query) => {
  try {
    const response = await axios.post(
      "https://api.gemini.ai/v1/search",
      {
        query,
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
      }
    );
    return response.data.searchTerms; // Adjust based on actual Gemini API response
  } catch (error) {
    console.error("Gemini AI error:", error);
    throw error;
  }
};

module.exports = geminiSearch;
