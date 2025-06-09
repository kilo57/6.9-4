"use client"

import { useState } from "react"
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ModernLandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cards = [
    {
      id: 1,
      title: "小紫",
      titleEn: "Logic Assistant",
      subtitle: "理性思考的智能助手",
      subtitleEn: "Rational Thinking AI",
      description: "我拥有庞大的知识储备，擅长逻辑推理与问题解决。",
      descriptionEn: "面对复杂挑战，我总能给你清晰、理性的答案。",
      gradient: "from-purple-500 via-purple-600 to-indigo-600",
      solidColor: "bg-purple-500",
      glowColor: "shadow-purple-500/50",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      chatRoute: "/chat/purple",
    },
    {
      id: 2,
      title: "小绿",
      titleEn: "Empathy Assistant",
      subtitle: "温暖细腻的情感助手",
      subtitleEn: "Warm & Empathetic AI",
      description: "我愿做你温暖的倾听者，用细腻的话语陪伴每一次交流。",
      descriptionEn: "无论你遇到什么，我都在，用柔和的方式理解并回应你。",
      gradient: "from-emerald-400 via-green-500 to-teal-500",
      solidColor: "bg-green-500",
      glowColor: "shadow-green-500/50",
      buttonColor: "bg-green-600 hover:bg-green-700",
      chatRoute: "/chat/green",
    },
    {
      id: 3,
      title: "小蓝",
      titleEn: "Fun Assistant",
      subtitle: "活力四溢的欢乐助手",
      subtitleEn: "Energetic & Fun AI",
      description: "嘿嘿，我最喜欢和你聊天啦！每一次对话都要充满乐趣！",
      descriptionEn: "不开心？让我来逗你笑，生活就是要元气满满！",
      gradient: "from-blue-400 via-sky-500 to-cyan-400",
      solidColor: "bg-blue-500",
      glowColor: "shadow-blue-500/50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      chatRoute: "/chat/blue",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100/20 via-transparent to-cyan-100/20"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-200/25 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Choose Your AI Assistant</span>
            <span className="text-sm font-medium text-gray-500">/ 选择您的AI助手</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Find Your Perfect Match
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">寻找您的完美助手</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our AI assistants with unique personalities designed to match your needs
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mt-2">探索我们独特个性的AI助手，满足您的不同需求</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {cards.map((card, index) => {
            return (
              <Card
                key={card.id}
                className={`group relative overflow-hidden border-0 bg-gradient-to-br ${card.gradient} p-1 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                  hoveredCard === index ? `shadow-2xl ${card.glowColor}` : "shadow-lg"
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl`}
                ></div>

                <CardContent className="relative bg-white/95 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col">
                  {/* Large Color Block */}
                  <div
                    className={`w-24 h-24 ${card.solidColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  ></div>

                  {/* Content */}
                  <div className="space-y-3 mb-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                    <h4 className="text-lg font-semibold text-gray-600">{card.titleEn}</h4>
                    <p className="text-sm font-medium text-gray-500">{card.subtitle}</p>
                    <p className="text-sm text-gray-400">{card.subtitleEn}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                    <p className="text-xs text-gray-500">{card.descriptionEn}</p>
                  </div>

                  {/* Chat Button - Bottom Right */}
                  <div className="flex justify-end">
                    <Link href={card.chatRoute}>
                      <Button
                        className={`${card.buttonColor} text-white rounded-xl group-hover:scale-105 transition-all duration-300 flex items-center gap-2`}
                      >
                        <span>Chat</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Chat Button */}
        <div className="text-center">
          <Button className="group relative bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Start AI Chat</span>
              <span className="text-sm opacity-90">/ 开始AI对话</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>

            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
          </Button>

          <p className="text-sm text-gray-500 mt-4">Choose your preferred AI personality</p>
          <p className="text-xs text-gray-400">选择您喜欢的AI个性</p>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
    </div>
  )
}
