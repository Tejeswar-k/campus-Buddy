
interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export const getAIResponse = async (query: string): Promise<AIResponse> => {
  try {
    // Configure the PartyRock endpoint correctly
    const response = await fetch('https://api.partyrock.aws/v1/run-app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appId: 'T1dMkUA1k',
        input: { prompt: query }
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get response from AI service: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return {
      success: true,
      data: jsonResponse.output || jsonResponse.response || jsonResponse.result || JSON.stringify(jsonResponse),
    };
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get AI response',
    };
  }
};
