
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    console.log("Processing query in Edge Function:", query);
    
    if (!query) {
      throw new Error("Query is required");
    }
    
    if (!geminiApiKey) {
      throw new Error("Gemini API key is not configured in Supabase");
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
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const jsonResponse = await response.json();
    console.log("Received response from Gemini API");
    
    if (!jsonResponse.candidates || jsonResponse.candidates.length === 0) {
      console.error("No candidates in response:", jsonResponse);
      throw new Error("No response generated from Gemini API");
    }
    
    const textResponse = jsonResponse.candidates[0]?.content?.parts?.[0]?.text || 'No response generated';
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: textResponse 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in Gemini AI Edge Function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get AI response' 
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
