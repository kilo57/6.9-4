export const API_CONFIG = {
  baseUrl: 'https://api.siliconflow.com/v1',
  apiKey: process.env.SILICONFLOW_API_KEY || '',
}

export const CHAT_CONFIG = {
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  max_tokens: 2000,
} 