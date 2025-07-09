"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Music, CheckCircle, XCircle, Eye, RotateCcw } from "lucide-react"

interface Musica {
  id: number
  nome: string
  fragmentoLetra: string
  letraCompleta: string
  opcoes: string[]
  respostaCorreta: number
}

const musicas: Musica[] = [
  {
    id: 1,
    nome: "Imagine - John Lennon",
    fragmentoLetra: "Imagine all the people...",
    letraCompleta:
      "Imagine all the people living life in peace... You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us, and the world will be as one.",
    opcoes: ["Imagine - John Lennon", "Let It Be - Beatles", "Bohemian Rhapsody - Queen", "Hotel California - Eagles"],
    respostaCorreta: 0,
  },
  {
    id: 2,
    nome: "Bohemian Rhapsody - Queen",
    fragmentoLetra: "Is this the real life?...",
    letraCompleta:
      "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality. Open your eyes, look up to the skies and see...",
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
    fragmentoLetra: "Hello, is it me you're looking for?...",
    letraCompleta:
      "Hello, is it me you're looking for? I can see it in your eyes, I can see it in your smile. You're all I've ever wanted, and my arms are open wide...",
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
    fragmentoLetra: "Don't stop believin'...",
    letraCompleta:
      "Don't stop believin', hold on to that feelin'. Streetlight people, living just to find emotion. Hiding somewhere in the night...",
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
    fragmentoLetra: "I will always love you...",
    letraCompleta:
      "I will always love you... If I should stay, I would only be in your way. So I'll go, but I know I'll think of you every step of the way...",
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
    fragmentoLetra: "Welcome to the Hotel California...",
    letraCompleta:
      "Welcome to the Hotel California, such a lovely place. Plenty of room at the Hotel California, any time of year you can find it here...",
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
    fragmentoLetra: "Sweet child o' mine...",
    letraCompleta:
      "Sweet child o' mine, sweet love of mine. She's got eyes of the bluest skies, as if they thought of rain...",
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
    fragmentoLetra: "There's a lady who's sure...",
    letraCompleta:
      "There's a lady who's sure all that glitters is gold, and she's buying a stairway to heaven. When she gets there she knows, if the stores are all closed...",
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
    fragmentoLetra: "Billie Jean is not my lover...",
    letraCompleta:
      "Billie Jean is not my lover, she's just a girl who claims that I am the one. But the kid is not my son...",
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
    fragmentoLetra: "Yesterday, all my troubles...",
    letraCompleta:
      "Yesterday, all my troubles seemed so far away. Now it looks as though they're here to stay. Oh, I believe in yesterday...",
    opcoes: [
      "Yesterday - The Beatles",
      "Hey Jude - The Beatles",
      "Let It Be - The Beatles",
      "Come Together - The Beatles",
    ],
    respostaCorreta: 0,
  },
  {
    id: 11,
    nome: "Like a Rolling Stone - Bob Dylan",
    fragmentoLetra: "How does it feel...",
    letraCompleta: "How does it feel, to be without a home, like a complete unknown, like a rolling stone?",
    opcoes: [
      "Blowin' in the Wind - Bob Dylan",
      "Like a Rolling Stone - Bob Dylan",
      "The Times They Are a-Changin' - Bob Dylan",
      "Mr. Tambourine Man - Bob Dylan",
    ],
    respostaCorreta: 1,
  },
  {
    id: 12,
    nome: "Smells Like Teen Spirit - Nirvana",
    fragmentoLetra: "Load up on guns...",
    letraCompleta:
      "Load up on guns, bring your friends. It's fun to lose and to pretend. She's over-bored and self-assured...",
    opcoes: [
      "Come As You Are - Nirvana",
      "Smells Like Teen Spirit - Nirvana",
      "Lithium - Nirvana",
      "In Bloom - Nirvana",
    ],
    respostaCorreta: 1,
  },
  {
    id: 13,
    nome: "Purple Haze - Jimi Hendrix",
    fragmentoLetra: "Purple haze all in my brain...",
    letraCompleta:
      "Purple haze all in my brain, lately things they don't seem the same. Actin' funny, but I don't know why...",
    opcoes: [
      "Hey Joe - Jimi Hendrix",
      "Purple Haze - Jimi Hendrix",
      "All Along the Watchtower - Jimi Hendrix",
      "Foxy Lady - Jimi Hendrix",
    ],
    respostaCorreta: 1,
  },
  {
    id: 14,
    nome: "My Way - Frank Sinatra",
    fragmentoLetra: "And now, the end is near...",
    letraCompleta:
      "And now, the end is near, and so I face the final curtain. My friend, I'll say it clear, I'll state my case, of which I'm certain...",
    opcoes: [
      "Fly Me to the Moon - Frank Sinatra",
      "My Way - Frank Sinatra",
      "New York, New York - Frank Sinatra",
      "That's Life - Frank Sinatra",
    ],
    respostaCorreta: 1,
  },
  {
    id: 15,
    nome: "What's Going On - Marvin Gaye",
    fragmentoLetra: "Mother, mother...",
    letraCompleta:
      "Mother, mother, there's too many of you crying. Brother, brother, brother, there's far too many of you dying...",
    opcoes: [
      "Let's Get It On - Marvin Gaye",
      "What's Going On - Marvin Gaye",
      "Sexual Healing - Marvin Gaye",
      "I Heard It Through the Grapevine - Marvin Gaye",
    ],
    respostaCorreta: 1,
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

        {musicasAcertadas.size === 15 && (
          <Card className="w-full max-w-md bg-green-50 border-4 border-green-500">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-green-800 mb-2">🎉 Parabéns!</h2>
              <p className="text-green-700">Você acertou todas as 15 músicas!</p>
            </CardContent>
          </Card>
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
              <p className="text-lg italic text-red-900 leading-relaxed">{musicaSelecionada.letraCompleta}</p>
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
              <div className="bg-red-50 p-8 rounded-lg border-4 border-red-200 w-80">
                <p className="text-xl italic text-red-900 font-medium text-center">
                  {musicaSelecionada.fragmentoLetra}
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">Fragmento</div>
            </div>
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
              <p className="text-gray-700 mb-4">
                A resposta correta é: <strong>{musicaSelecionada.opcoes[musicaSelecionada.respostaCorreta]}</strong>
              </p>

              {respostaSelecionada === musicaSelecionada.respostaCorreta && (
                <Button onClick={() => setMostrarLetraCompleta(true)} className="bg-blue-600 hover:bg-blue-700 mr-4">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Letra Completa
                </Button>
              )}

              <Button
                onClick={voltarParaGrid}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
              >
                Voltar ao Jogo
              </Button>
            </div>
          )}

          {/* Opções de resposta */}
          {!mostrarResposta && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {musicaSelecionada.opcoes.map((opcao, index) => (
                <Button
                  key={index}
                  onClick={() => handleResposta(index)}
                  className="justify-start text-lg font-medium w-full"
                  variant="outline"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{opcao}</span>
                    {mostrarResposta && (
                      <div className="ml-2">
                        {index === musicaSelecionada.respostaCorreta ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : index === respostaSelecionada ? (
                          <XCircle className="w-5 h-5" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
