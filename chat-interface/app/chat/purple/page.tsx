"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, Paperclip, Smile, ArrowLeft, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function PurpleChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "你好！我是小紫，一个专注于逻辑推理和问题解决的AI助手。我拥有庞大的知识储备，可以帮助您分析复杂问题并提供理性的解决方案。有什么挑战需要我帮您解决吗？",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        content: `让我来分析您的问题："${inputValue}"。基于逻辑推理，我建议我们从以下几个角度来思考这个问题...这是一个理性的分析方法。`,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botReply])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-t-lg mt-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarFallback className="bg-purple-700 text-white text-lg font-bold">紫</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-xl">小紫 - Logic Assistant</h1>
                <p className="text-purple-100 text-sm">理性思考 • 逻辑推理 • 问题解决</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回
              </Button>
            </Link>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/70 backdrop-blur-sm">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold">
                    紫
                  </AvatarFallback>
                </Avatar>
              )}

              <Card
                className={`max-w-[70%] p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0"
                    : "bg-white border border-purple-200 shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.sender === "user" ? "text-purple-100" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Card>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold">
                  紫
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white border border-purple-200 p-4">
                <div className="flex gap-1 items-center">
                  <Brain className="h-4 w-4 text-purple-500 mr-2" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="text-xs text-purple-600 ml-2">正在思考...</span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-b-lg mb-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="向小紫提出您的问题..."
                className="pr-20 py-3 border-0 bg-white/90 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-purple-300"
                disabled={isTyping}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-100">
                  <Paperclip className="h-4 w-4 text-purple-600" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-purple-100">
                  <Smile className="h-4 w-4 text-purple-600" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 font-semibold"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-purple-100 mt-2 text-center">按 Enter 发送消息，Shift + Enter 换行</p>
        </div>
      </div>
    </div>
  )
}
