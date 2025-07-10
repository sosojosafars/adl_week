"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Pyramid, RotateCcw, Trophy } from "lucide-react"

interface Piramide {
  id: number,
  fotoCompletaUrl: string
}

const pessoas: Piramide[] = [
  { id: 1, fotoCompletaUrl: "/piramides/piramide1.jpg" },
  { id: 2, fotoCompletaUrl: "/piramides/piramide2.jpg" },
  { id: 3, fotoCompletaUrl: "/piramides/piramide3.jpg" },
  { id: 4, fotoCompletaUrl: "/piramides/piramide4.jpg" },
  { id: 5, fotoCompletaUrl: "/piramides/piramide5.jpg" },
]

export default function QuemEAPessoa({ onBack }: { onBack: () => void }) {
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Piramide | null>(null)
  const [pessoasAcertadas, setPessoasAcertadas] = useState<Set<number>>(new Set())
  const [mostrarResposta, setMostrarResposta] = useState(false)
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null)
  const [mostrarFotoCompleta, setMostrarFotoCompleta] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)

  const [perguntaSelecionada, setPerguntaSelecionada] = useState<Piramide | null>(null)
    const [perguntasRespondidas, setPerguntasRespondidas] = useState<Set<number>>(new Set())


  const selecionarPessoa = (pessoa: Piramide) => {
    if (pessoasAcertadas.has(pessoa.id)) return
    setPessoaSelecionada(pessoa)
    setMostrarResposta(false)
    setRespostaSelecionada(null)
    setMostrarFotoCompleta(false)
  }

  const handleResposta = (opcaoIndex: number) => {
    if (respostaSelecionada !== null) return

    setRespostaSelecionada(opcaoIndex)
    setMostrarResposta(true)

  }

  const voltarParaGrid = () => {
    setPessoaSelecionada(null)
    setMostrarFotoCompleta(false)
  }


  // Tela principal com grid de números
  if (!pessoaSelecionada) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-4xl font-bold text-red-800 text-center">PIRÂMIDE HUMANA</h1>
        </div>

        <Card className="w-full max-w-2xl bg-white border-4 border-red-500">
          <CardContent className="p-8">
            <div className="grid grid-cols-5 gap-4">
              {pessoas.map((pessoa) => (
                <button
                  key={pessoa.id}
                  onClick={() => selecionarPessoa(pessoa)}
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold transition-all hover:scale-110 ${
                    pessoasAcertadas.has(pessoa.id)
                      ? "bg-green-500 text-white border-green-600 shadow-lg"
                      : "bg-white text-red-800 border-red-400 hover:border-red-600 hover:text-red-600"
                  }`}
                  disabled={pessoasAcertadas.has(pessoa.id)}
                >
                  {pessoa.id}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela de visualização da foto completa
  if (mostrarFotoCompleta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <div className="flex items-center mb-8">
          <Button onClick={voltarParaGrid} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        <Card className="w-full max-w-md bg-white border-4 border-white-500">
          <CardContent className="p-6 text-center">
            <img
              src={pessoaSelecionada.fotoCompletaUrl || "/placeholder.svg"}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
x          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela do jogo individual
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="flex items-center mb-8">
        <Button onClick={voltarParaGrid} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-bold text-red-800">Pirâmide #{pessoaSelecionada.id}</h1>
      </div>

      <Card >
        <CardHeader className="text-center">
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={pessoaSelecionada.fotoCompletaUrl || "/placeholder.svg?height=200&width=200&text=Fragmento"}
                alt="Fragmento da pessoa"
              />

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

