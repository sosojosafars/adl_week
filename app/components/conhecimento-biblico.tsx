"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Book } from "lucide-react"

interface PerguntaBiblica {
  id: number
  pergunta: string
  resposta: string
}

const perguntasBiblicas: PerguntaBiblica[] = [
  {
    id: 1,
    pergunta: "Qual profeta se casou com uma prostituta?",
    resposta: "Oséias",
  },
  {
    id: 2,
    pergunta: "Qual nome do homem que levou a cruz?",
    resposta: "Simão de Cirene",
  },
  {
    id: 3,
    pergunta: "Qual profeta viu vale de ossos secos?",
    resposta: "Ezequiel",
  },
  {
    id: 4,
    pergunta: "Quem escreveu Hebreus?",
    resposta: "Paulo",
  },
  {
    id: 5,
    pergunta: "Qual sacerdote interrogou Jesus antes da cruz?",
    resposta: "Caifás",
  },
]

export default function ConhecimentoBiblico({ onBack }: { onBack: () => void }) {
  const [perguntaSelecionada, setPerguntaSelecionada] = useState<PerguntaBiblica | null>(null)
  const [perguntasRespondidas, setPerguntasRespondidas] = useState<Set<number>>(new Set())
  const [mostrarResposta, setMostrarResposta] = useState(false)

  const selecionarPergunta = (pergunta: PerguntaBiblica) => {
    if (perguntasRespondidas.has(pergunta.id)) return
    setPerguntaSelecionada(pergunta)
    setMostrarResposta(false)
  }

  const mostrarRespostaCerta = () => {
    setMostrarResposta(true)
    if (!perguntasRespondidas.has(perguntaSelecionada!.id)) {
      setPerguntasRespondidas(new Set([...perguntasRespondidas, perguntaSelecionada!.id]))
    }
  }

  const voltarParaGrid = () => {
    setPerguntaSelecionada(null)
    setMostrarResposta(false)
  }

  // Tela principal com grid de números
  if (!perguntaSelecionada) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-4xl font-bold text-yellow-800 text-center">CONHECIMENTO BÍBLICO</h1>
        </div>    
  
        <div className="text-gray-800 text-center mb-4"></div>

        <Card className="w-full max-w-2xl bg-white border-4 border-white-500">
          <CardContent className="p-8">
            <div className="grid grid-cols-5 gap-4">
              {perguntasBiblicas.map((pergunta) => (
                <button
                  key={pergunta.id}
                  onClick={() => selecionarPergunta(pergunta)}
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold transition-all hover:scale-110 ${
                    perguntasRespondidas.has(pergunta.id)
                      ? "bg-green-500 text-white border-green-600 shadow-lg"
                      : "bg-white text-yellow-800 border-yellow-400 hover:border-yellow-600 hover:text-yellow-600"
                  }`}
                  disabled={perguntasRespondidas.has(pergunta.id)}
                >
                  {pergunta.id}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
    )
  }


  // Tela da pergunta individual
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="flex items-center mb-8">
        <Button onClick={voltarParaGrid} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-bold text-yellow-800">Pergunta #{perguntaSelecionada.id}</h1>
      </div>

      <Card className="w-full max-w-2xl bg-white border-4 border-yellow-500">
        <CardHeader className="text-center">
          <Book className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <CardTitle className="text-2xl text-yellow-800">Conhecimento Bíblico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pergunta */}
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
            <p className="text-xl text-yellow-900 font-medium text-center">{perguntaSelecionada.pergunta}</p>
          </div>

          {/* Botão Ver Resposta ou Resposta */}
          {!mostrarResposta ? (
            <div className="text-center">
              <Button onClick={mostrarRespostaCerta} className="bg-yellow-600 hover:bg-yellow-700 text-lg px-8 py-4">
                Ver Resposta
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 p-6 rounded-lg border-4 border-green-500 mb-4">
                <p className="text-xl font-bold text-green-800 mb-2">Resposta Correta:</p>
                <p className="text-lg text-green-700">{perguntaSelecionada.resposta}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}