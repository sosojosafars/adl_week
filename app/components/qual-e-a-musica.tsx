"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Music, CheckCircle, XCircle, Eye, RotateCcw, PlayCircle } from "lucide-react"

interface Musica {
  id: number
  nome: string
  opcoes: string[]
  respostaCorreta: number
}

const musicas: Musica[] = [
  {
    id: 1,
    nome: "Imagine - John Lennon",
    opcoes: ["Imagine - John Lennon", "Let It Be - Beatles", "Bohemian Rhapsody - Queen", "Hotel California - Eagles"],
    respostaCorreta: 0,
  },
  {
    id: 2,
    nome: "Bohemian Rhapsody - Queen",
    opcoes: [
      "We Will Rock You - Queen",
      "Another One Bites the Dust - Queen",
      "Bohemian Rhapsody - Queen",
      "Don't Stop Me Now - Queen",
    ],
    respostaCorreta: 2,
  },
  {
    id: 3,
    nome: "Hello - Lionel Richie",
    opcoes: [
      "All Night Long - Lionel Richie",
      "Hello - Lionel Richie",
      "Dancing on the Ceiling - Lionel Richie",
      "Say You Say Me - Lionel Richie",
    ],
    respostaCorreta: 1,
  },
  {
    id: 4,
    nome: "Don't Stop Believin' - Journey",
    opcoes: [
      "Any Way You Want It - Journey",
      "Don't Stop Believin' - Journey",
      "Open Arms - Journey",
      "Separate Ways - Journey",
    ],
    respostaCorreta: 1,
  },
  {
    id: 5,
    nome: "I Will Always Love You - Whitney Houston",
    opcoes: [
      "I Have Nothing - Whitney Houston",
      "Greatest Love of All - Whitney Houston",
      "I Will Always Love You - Whitney Houston",
      "I Wanna Dance with Somebody - Whitney Houston",
    ],
    respostaCorreta: 2,
  },
  {
    id: 6,
    nome: "Hotel California - Eagles",

    opcoes: [
      "Take It Easy - Eagles",
      "Hotel California - Eagles",
      "Desperado - Eagles",
      "Life in the Fast Lane - Eagles",
    ],
    respostaCorreta: 1,
  },
  {
    id: 7,
    nome: "Sweet Child O' Mine - Guns N' Roses",
    opcoes: [
      "Welcome to the Jungle - Guns N' Roses",
      "Sweet Child O' Mine - Guns N' Roses",
      "Paradise City - Guns N' Roses",
      "November Rain - Guns N' Roses",
    ],
    respostaCorreta: 1,
  },
  {
    id: 8,
    nome: "Stairway to Heaven - Led Zeppelin",

    opcoes: [
      "Black Dog - Led Zeppelin",
      "Stairway to Heaven - Led Zeppelin",
      "Whole Lotta Love - Led Zeppelin",
      "Kashmir - Led Zeppelin",
    ],
    respostaCorreta: 1,
  },
  {
    id: 9,
    nome: "Billie Jean - Michael Jackson",

    opcoes: [
      "Beat It - Michael Jackson",
      "Billie Jean - Michael Jackson",
      "Thriller - Michael Jackson",
      "Smooth Criminal - Michael Jackson",
    ],
    respostaCorreta: 1,
  },
  {
    id: 10,
    nome: "Yesterday - The Beatles",
    opcoes: [
      "Yesterday - The Beatles",
      "Hey Jude - The Beatles",
      "Let It Be - The Beatles",
      "Come Together - The Beatles",
    ],
    respostaCorreta: 0,
  },
]

export default function QualEAMusica({ onBack }: { onBack: () => void }) {
  const [musicaSelecionada, setMusicaSelecionada] = useState<Musica | null>(null)
  const [musicasAcertadas, setMusicasAcertadas] = useState<Set<number>>(new Set())
  const [mostrarResposta, setMostrarResposta] = useState(false)
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null)
  const [mostrarLetraCompleta, setMostrarLetraCompleta] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)
  const [audioTocando, setAudioTocando] = useState<number | null>(null)

  const selecionarMusica = (musica: Musica) => {
    if (musicasAcertadas.has(musica.id)) return
    setMusicaSelecionada(musica)
    setMostrarResposta(false)
    setRespostaSelecionada(null)
    setMostrarLetraCompleta(false)
  }

  const handleResposta = (opcaoIndex: number) => {
    if (respostaSelecionada !== null) return

    setRespostaSelecionada(opcaoIndex)
    setMostrarResposta(true)

    if (opcaoIndex === musicaSelecionada!.respostaCorreta) {
      setMusicasAcertadas(new Set([...musicasAcertadas, musicaSelecionada!.id]))
      setPontuacao(pontuacao + 1)
    }
  }

  const voltarParaGrid = () => {
    setMusicaSelecionada(null)
    setMostrarLetraCompleta(false)
  }

  const reiniciarJogo = () => {
    setMusicasAcertadas(new Set())
    setPontuacao(0)
    setMusicaSelecionada(null)
    setMostrarLetraCompleta(false)
  }

  const reproduzirAudio = (musicaId: number) => {
    // Para o áudio atual se estiver tocando
    if (audioTocando !== null) {
      setAudioTocando(null)
    }

    // Simula reprodução de áudio (você pode substituir por áudio real)
    setAudioTocando(musicaId)

    // Para o áudio após 3 segundos (simulação)
    setTimeout(() => {
      setAudioTocando(null)
    }, 3000)
  }

  // Tela principal com grid de números
  if (!musicaSelecionada) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <div className="flex items-center mb-8">
          <Button onClick={onBack} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-4xl font-bold text-red-800 text-center">QUAL É A MÚSICA?</h1>
        </div>

        <div className="text-gray-800 text-center mb-4"></div>

        <Card className="w-full max-w-2xl bg-white border-4 border-red-500">
          <CardContent className="p-8">
            <div className="grid grid-cols-5 gap-4">
              {musicas.map((musica) => (
                <button
                  key={musica.id}
                  onClick={() => selecionarMusica(musica)}
                  className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold transition-all hover:scale-110 ${
                    musicasAcertadas.has(musica.id)
                      ? "bg-green-500 text-white border-green-600 shadow-lg"
                      : "bg-white text-red-800 border-red-400 hover:border-red-600 hover:text-red-600"
                  }`}
                  disabled={musicasAcertadas.has(musica.id)}
                >
                  {musica.id}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {musicasAcertadas.size > 0 && (
          <div className="flex gap-4">
            <Button
              onClick={reiniciarJogo}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar Jogo
            </Button>
          </div>
        )}
      </div>
    )
  }

  // Tela de visualização da letra completa
  if (mostrarLetraCompleta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <div className="flex items-center mb-8">
          <Button onClick={voltarParaGrid} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold text-red-800">{musicaSelecionada.nome}</h1>
        </div>

        <Card className="w-full max-w-2xl bg-white border-4 border-red-500">
          <CardContent className="p-6 text-center">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200 mb-6">
              <Music className="w-12 h-12 text-red-600 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">{musicaSelecionada.nome}</h2>
            <Button onClick={voltarParaGrid} className="bg-red-600 hover:bg-red-700">
              Voltar ao Jogo
            </Button>
          </CardContent>
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
        <h1 className="text-3xl font-bold text-red-800">Música #{musicaSelecionada.id}</h1>
      </div>

      <Card className="w-full max-w-2xl bg-white border-4 border-red-500">
        <CardHeader className="text-center">
          <Music className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <CardTitle className="text-2xl text-red-800">Qual é esta música?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fragmento da letra */}
          <div className="flex justify-center">
            <div className="relative">
      
              </div>
                <PlayCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />           
              </div>
          
          {/* Resultado da resposta */}
          {mostrarResposta && (
            <div
              className={`p-4 rounded-lg text-center border-4 ${
                respostaSelecionada === musicaSelecionada.respostaCorreta
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <p
                className={`text-xl font-bold mb-2 ${
                  respostaSelecionada === musicaSelecionada.respostaCorreta ? "text-green-800" : "text-red-800"
                }`}
              >
                {respostaSelecionada === musicaSelecionada.respostaCorreta ? "Correto!" : "Incorreto!"}
              </p>

            </div>
          )}

        </CardContent>
      </Card>
    </div>
  )
}
