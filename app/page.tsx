"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Music, BookPlusIcon, DicesIcon, Brain, Users, Quote, Pyramid } from "lucide-react"

// Importar os componentes dos jogos
import QualEAMusica from "./components/qual-e-a-musica"
import ConhecimentoBiblico from "./components/conhecimento-biblico"
import ConhecimentoGeral from "./components/conhecimento-geral"
import QuemEAPessoa from "./components/quem-e-a-pessoa"
import TaNaBibliaOuTaAmarrado from "./components/ta-na-biblia-ou-ta-amarrado"
import PiramideHumana from "./components/piramide-humana"

type Screen =
  | "home"
  | "tabuleiro-menu"
  | "friends-menu"
  | "qual-musica"
  | "conhecimento-biblico"
  | "conhecimento-geral"
  | "quem-pessoa"
  | "ta-na-biblia"
  | "piramide-humana"

export default function JogosPrincipal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "tabuleiro-menu":
        return <TabuleiroMenu onNavigate={setCurrentScreen} />
      case "friends-menu":
        return <FriendsMenu onNavigate={setCurrentScreen} />
      case "qual-musica":
        return <QualEAMusica onBack={() => setCurrentScreen("tabuleiro-menu")} />
      case "conhecimento-biblico":
        return <ConhecimentoBiblico onBack={() => setCurrentScreen("tabuleiro-menu")} />
      case "conhecimento-geral":
        return <ConhecimentoGeral onBack={() => setCurrentScreen("tabuleiro-menu")} />
      case "quem-pessoa":
        return <QuemEAPessoa onBack={() => setCurrentScreen("friends-menu")} />
      case "ta-na-biblia":
        return <TaNaBibliaOuTaAmarrado onBack={() => setCurrentScreen("friends-menu")} />
      case "piramide-humana":
        return <PiramideHumana onBack={() => setCurrentScreen("friends-menu")} />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="container mx-auto max-w-4xl">{renderScreen()}</div>
    </div>
  )
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="text-6xl font-bold text-gray-800 text-center mb-12 drop-shadow-lg">Central de Jogos </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <Card className="hover:scale-105 transition-transform cursor-pointer bg-white border-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
              <DicesIcon className="w-10 h-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-blue-800">Jogo do Tabuleiro</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => onNavigate("tabuleiro-menu")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            >
              Jogar Tabuleiro
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform cursor-pointer bg-white border-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
              <Users className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Jogo dos Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => onNavigate("friends-menu")}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
            >
              Jogar Friends
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TabuleiroMenu({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="flex items-center mb-8">
        <Button onClick={() => onNavigate("home")} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-5xl font-bold text-center drop-shadow-lg text-black">Jogo do Tabuleiro</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card className="hover:scale-105 transition-transform cursor-pointer border-4">
          <CardHeader className="text-center">
            <Music className="w-12 h-12 mx-auto mb-2 text-black" />
            <CardTitle className="text-xl text-red-800">Qual é a Música?</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate("qual-musica")} className="w-full bg-red-600 hover:bg-red-700">
              Jogar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform cursor-pointer bg-white border-4">
          <CardHeader className="text-center">
            <BookPlusIcon className="w-12 h-12 mx-auto mb-2 text-black" />
            <CardTitle className="text-xl text-yellow-800">Conhecimento Bíblico</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => onNavigate("conhecimento-biblico")}
              className="w-full bg-yellow-600 hover:bg-yellow-700"
            >
              Jogar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform cursor-pointer bg-white border-4">
          <CardHeader className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-2 text-black" />
            <CardTitle className="text-xl text-blue-800">Conhecimento Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate("conhecimento-geral")} className="w-full bg-blue-600 hover:bg-blue-700">
              Jogar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FriendsMenu({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="flex items-center mb-8">
        <Button onClick={() => onNavigate("home")} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-5xl font-bold text-center drop-shadow-lg text-black"> Jogo dos Friends</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card className="hover:scale-105 transition-transform cursor-pointer bg-white border-4">
          <CardHeader className="text-center">
            <Users className="w-12 h-12 mx-auto mb-2 text-black" />
            <CardTitle className="text-xl text-red-800">Quem é a Pessoa?</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate("quem-pessoa")} className="w-full bg-red-600 hover:bg-red-700">
              Jogar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform cursor-pointer bg-white border-4">
          <CardHeader className="text-center">
            <Quote className="w-12 h-12 mx-auto mb-2 text-black" />
            <CardTitle className="text-xl text-blue-800">Tá na Bíblia ou Tá Amarrado?</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate("ta-na-biblia")} className="w-full bg-blue-600 hover:bg-blue-700">
              Jogar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform cursor-pointer border-4">
          <CardHeader className="text-center">
            <Pyramid className="w-12 h-12 mx-auto mb-2 text-black" />
            <CardTitle className="text-xl text-yellow-800">Pirâmide Humana</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate("piramide-humana")} className="w-full bg-yellow-600 hover:bg-yellow-700">
              Jogar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
