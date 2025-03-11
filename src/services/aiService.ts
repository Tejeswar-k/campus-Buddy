
interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export const getAIResponse = async (query: string): Promise<AIResponse> => {
  try {
    // For now, we'll use the AWS PartyRock endpoint
    // In a production environment, this should be configured through environment variables
    const response = await fetch('https://partyrock.aws/u/AMARNATH269/T1dMkUA1k/WISE-UP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: query }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI service');
    }

    const data = await response.text();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get AI response',
    };
  }
};
