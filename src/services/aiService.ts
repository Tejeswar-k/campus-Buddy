
interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export const getAIResponse = async (query: string): Promise<AIResponse> => {
  try {
    console.log("Preparing to send query to PartyRock:", query);
    
    // Using the direct PartyRock app URL with the query as a search parameter
    const appUrl = `https://partyrock.aws/u/AMARNATH269/T1dMkUA1k/WISE-UP?prompt=${encodeURIComponent(query)}`;
    
    // Create a mock response since we can't make a direct API call due to CORS
    // Instead, we'll open the PartyRock app in a new tab with the query
    window.open(appUrl, '_blank');
    
    // Return a helpful message to the user
    return {
      success: true,
      data: "The WISE-UP BTech CS AI Assistant has been opened in a new tab with your query. Please check the new browser tab for your answer.",
    };
  } catch (error) {
    console.error('Error handling AI response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get AI response',
    };
  }
};
