
interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

// Store API key in memory for this session only
let geminiApiKey = localStorage.getItem('gemini_api_key') || '';

export const setGeminiApiKey = (apiKey: string) => {
  geminiApiKey = apiKey;
  localStorage.setItem('gemini_api_key', apiKey);
  return geminiApiKey;
};

export const getGeminiApiKey = () => {
  return geminiApiKey;
};

export const getAIResponse = async (query: string): Promise<AIResponse> => {
  try {
    console.log("Preparing to send query to Gemini AI:", query);
    
    // Check if we have an API key
    if (!geminiApiKey) {
      return {
        success: false,
        error: "Gemini API key is not set. Please set your API key first.",
      };
    }

    // Configure the Gemini API request
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are WISE-UP, a specialized Computer Science learning assistant for BTech students. 
                Answer the following CS-related question with accurate, educational information: ${query}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const jsonResponse = await response.json();
    const textResponse = jsonResponse.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    
    return {
      success: true,
      data: textResponse,
    };
  } catch (error) {
    console.error('Error handling AI response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get AI response',
    };
  }
};
