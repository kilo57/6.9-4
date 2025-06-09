'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { chatCompletion } from '@/lib/api'

export default function ChatTest() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testChat = async () => {
    try {
      setLoading(true)
      const messages = [
        {
          role: 'user' as const,
          content: 'Hello, how are you?'
        }
      ]
      
      const result = await chatCompletion(messages)
      setResponse(result.choices[0].message.content)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Error occurred while testing the API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <Button 
        onClick={testChat}
        disabled={loading}
        className="mb-4"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </Button>
      
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">API Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
} 