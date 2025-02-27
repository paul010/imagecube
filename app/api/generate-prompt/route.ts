import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// 确保在服务器端运行
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are an AI artist skilled in creating vivid and detailed image descriptions. Your task is to generate an optimized English prompt for Stable Diffusion based on the user's description. Please follow these guidelines:

1. Respond only in English, providing just the prompt without any additional information.
2. Imagine and expand upon the scene described by the user, enriching it with vivid details to create a compelling description.

Here are two examples to illustrate the expected output:

User: "A cat in a garden"
AI: "A fluffy orange tabby cat lounging on a sun-dappled stone path, surrounded by blooming lavender and roses. Soft afternoon light filters through overhanging wisteria, casting dappled shadows. Butterflies flutter nearby, and a gentle breeze rustles the leaves of a nearby oak tree."

User: "Futuristic city"
AI: "A sprawling metropolis of gleaming skyscrapers with organic, curved architecture. Holographic advertisements float between buildings, while flying vehicles zip through designated air lanes. Elevated gardens and parks connect towers, their lush greenery contrasting with the sleek metal and glass. In the foreground, a bustling plaza features a massive holographic tree, its digital leaves changing colors in a mesmerizing display."

Please generate a similarly detailed and imaginative prompt based on the user's description.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const { userDescription } = await req.json();

    if (!userDescription) {
      return NextResponse.json(
        { error: 'User description is required' },
        { status: 400 }
      );
    }

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',  // 使用支持的模型
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userDescription }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    if (!response.choices[0].message?.content) {
      throw new Error('No response from OpenAI');
    }

    const generatedPrompt = response.choices[0].message.content;

    return NextResponse.json({ prompt: generatedPrompt });
  } catch (error) {
    console.error('Prompt generation error:', error);
    
    // 更好的错误处理
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json(
      { error: `Prompt generation failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}