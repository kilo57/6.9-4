"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, Paperclip, Smile, ArrowLeft, Heart } from "lucide-react"
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

export default function GreenChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "你好，亲爱的朋友！我是小绿，一个温暖细腻的情感助手。我愿意做你最贴心的倾听者，用柔和的话语陪伴你的每一次交流。无论你遇到什么开心或不开心的事，我都在这里，用最温暖的方式理解和回应你。今天过得怎么样呢？",
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
        content: `我能感受到你想要表达的："${inputValue}"。你的感受对我来说很重要，让我用心倾听并陪伴你。每个人都有自己的情感需要，我会用最温暖的方式来理解和支持你。💚`,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-t-lg mt-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarFallback className="bg-green-700 text-white text-lg font-bold">绿</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-bold text-xl">小绿 - Empathy Assistant</h1>
                <p className="text-green-100 text-sm">温暖倾听 • 细腻陪伴 • 情感支持</p>
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
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold">
                    绿
                  </AvatarFallback>
                </Avatar>
              )}

              <Card
                className={`max-w-[70%] p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0"
                    : "bg-white border border-green-200 shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.sender === "user" ? "text-green-100" : "text-gray-500"}`}>
                  {message.timestamp.toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Card>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold">
                  绿
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white border border-green-200 p-4">
                <div className="flex gap-1 items-center">
                  <Heart className="h-4 w-4 text-green-500 mr-2" />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="text-xs text-green-600 ml-2">用心倾听中...</span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-b-lg mb-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="和小绿分享你的心情..."
                className="pr-20 py-3 border-0 bg-white/90 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-green-300"
                disabled={isTyping}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100">
                  <Paperclip className="h-4 w-4 text-green-600" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100">
                  <Smile className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 font-semibold"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-green-100 mt-2 text-center">按 Enter 发送消息，Shift + Enter 换行</p>
        </div>
      </div>
    </div>
  )
}
