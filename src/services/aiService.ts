
import { supabase } from "@/integrations/supabase/client";

interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

// We no longer need to store API key in localStorage
export const setGeminiApiKey = (apiKey: string) => {
  // This function is kept for backward compatibility
  // but doesn't actually store the API key anymore
  localStorage.setItem('gemini_api_key', 'PLACEHOLDER');
  return 'PLACEHOLDER';
};

export const getGeminiApiKey = () => {
  // We now always return a placeholder since the real API key
  // is stored securely in Supabase
  return localStorage.getItem('gemini_api_key') || 'PLACEHOLDER';
};

export const getAIResponse = async (query: string): Promise<AIResponse> => {
  try {
    console.log("Sending query to Supabase Edge Function:", query);
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('gemini-ai', {
      body: { query },
    });
    
    if (error) {
      throw new Error(`Edge Function error: ${error.message}`);
    }
    
    return data as AIResponse;
  } catch (error) {
    console.error('Error handling AI response:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get AI response',
    };
  }
};
