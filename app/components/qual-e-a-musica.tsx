"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Music, CheckCircle, XCircle, Eye, RotateCcw, PlayCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function QualEAMusica({ onBack }: { onBack: () => void }) {
  const [musicaSelecionada, setMusicaSelecionada] = useState<Musica | null>(null)
  const [musicasAcertadas, setMusicasAcertadas] = useState<Set<number>>(new Set())
  const [mostrarResposta, setMostrarResposta] = useState(false)
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null)
  const [mostrarLetraCompleta, setMostrarLetraCompleta] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)
  const [audioTocando, setAudioTocando] = useState<number | null>(null)
  const [tocando, setTocando] = useState(false)


  const audioRef = useRef<HTMLAudioElement | null>(null)

  const voltarParaGrid = () => {
    setMusicaSelecionada(null)
    setMostrarLetraCompleta(false)
  }

interface Musica {
  id: number
  nome: string
  musicaURL: string,
  respostaCorreta: number
  inicio: number
  fim: number 
}
const musicas: Musica[] = [
  {
    id: 1,
    musicaURL: "/som/Estacoes.mp4",
    nome: "Estações - DUNAMIS MUSIC",
    respostaCorreta: 0,
    inicio: 16,
    fim: 23, 
  },  
  {
    id: 2,
    nome: "Dança do Canguru - ALINE BARROS",
    musicaURL: "/som/Dança.mp4",
    respostaCorreta: 0,
    inicio: 0,
    fim: 7,
  },
  {
    id: 3,
    nome: "Na Fenda da Rocha - JOSÉ JR",
    musicaURL: "/som/Na_Fenda.mp4",
    respostaCorreta: 0,
    inicio: 151,
    fim: 158,
  },
  {
    id: 4,
    nome: "Exaltamos o Cordeiro - CENTRAL MUSIC",
    musicaURL: "/som/Exaltamos.mp4",
    respostaCorreta: 0,
    inicio: 275,
    fim: 283,
  },
  {
    id: 5,
    nome: "Nós Somos Livres - REVOLUÇÃO MUSIC",
    musicaURL: "/som/Somos_livres.mp4",
    respostaCorreta: 0,
    inicio: 10,
    fim: 17,
  },
  {
    id: 6,
    nome: "Nunca Falhará - CENTRAL MUSIC",
    musicaURL: "/som/Nunca_falhara.mp4",
    respostaCorreta: 0,
    inicio: 1,
    fim: 8,
  },
  {
    id: 7,
    nome: "Cristo - SOM DO REINO",
    musicaURL: "/som/Cristo.mp4",
    respostaCorreta: 0,
    inicio: 62,
    fim: 69,
  },
  {
    id: 8,
    nome: "Nível Raso - RODOLFO ABRANGES",
    musicaURL: "/som/Nivel_raso.mp4",
    respostaCorreta: 0,
    inicio: 220,
    fim: 227,
  },
{
    id: 9,
    nome: "Retorno do Rei - ADLIN RODRIGUES",
    musicaURL: "/som/Retorno.mp4",
    respostaCorreta: 0,
    inicio: 185,
    fim: 192,
  },
  {
    id: 10,
    nome: "Por Ti Quero Viver - CENTRAL DE ADORADORES",
    musicaURL: "/som/Por_ti.mp4",
    respostaCorreta: 0,
    inicio: 252,
    fim: 260,
  },
]

const reproduzirTrecho = () => {
  const audio = audioRef.current
  if (!audio || !musicaSelecionada) return

  audio.src = musicaSelecionada.musicaURL

  const onCanPlay = () => {
    audio.currentTime = musicaSelecionada.inicio
    audio.play()
      .then(() => setTocando(true))
      .catch(err => console.error("Erro ao reproduzir:", err))

    audio.removeEventListener('canplay', onCanPlay)
  }

  audio.addEventListener('canplay', onCanPlay)
  audio.load()
}


const handleTimeUpdate = () => {
  const audio = audioRef.current
  if (audio && musicaSelecionada && audio.currentTime >= musicaSelecionada.fim) {
    audio.pause()
    setTocando(false)
  }
}


 const pausarAudio = () => {
  const audio = audioRef.current
  
  if (audio) {
    audio.pause()
    setTocando(false)
  }
}

useEffect(() => {
  const audio = audioRef.current
  if (!audio || !musicaSelecionada) return

  audio.addEventListener("timeupdate", handleTimeUpdate)

  return () => {
    audio.removeEventListener("timeupdate", handleTimeUpdate)
  }
}, [musicaSelecionada])



  const selecionarMusica = (musica: Musica) => {
    if (musicasAcertadas.has(musica.id)) return
    setMusicaSelecionada(musica)
    setMostrarResposta(false)
    setRespostaSelecionada(null)
    setMostrarLetraCompleta(false)
    setAudioTocando(musica.id)
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

        <Card className="w-full max-w-2xl bg-white border-4 border-white-500 text-center">
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
      </div>
    )
  }


  // Tela de visualização da letra completa
  if (mostrarLetraCompleta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <div className="flex items-center mb-8">
       
          <h1 className="text-3xl font-bold text-red-800">{musicaSelecionada.nome}</h1>
        </div>



        <Card className="w-full max-w-2xl bg-white border-4 border-red-500">
          <CardContent className="p-6 text-center">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200 mb-6">
              <Music className="w-12 h-12 text-red-600 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">{musicaSelecionada.nome}</h2>
          
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela do jogo individual
  return (

    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">

          <div className=" flex items-center mb-8">
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
          <div className="flex flex-col items-center justify-center">
  <div className="flex gap-4 mt-4 justify-center">
    {!tocando ? (
      <Button onClick={reproduzirTrecho} className="bg-red-600 hover:bg-red-700 w-40">
        <PlayCircle className="mr-2 w-5 h-5" />
        Tocar Trecho
      </Button>
    ) : (
      <Button onClick={pausarAudio} className="bg-gray-500 hover:bg-gray-600 w-40">
        <XCircle className="mr-2 w-5 h-5" />
        Pausar
      </Button>
      
    )}
  </div>
  <audio ref={audioRef} preload="auto" />
</div>

<div className="flex justify-center">
  <Button
    onClick={() => setMostrarResposta(true)}
    className="bg-red-600 hover:bg-red-700 mt-4 w-80">
    <span>Mostrar</span>
  </Button>
</div>

              {mostrarResposta && (
                <div className="mt-4">
                  <p className="flex justify-center text-lg text-red-800 font-bold">
                   {musicaSelecionada.nome}
                  </p>
                  <div className="flex justify-center mt-4">
                  </div>
                </div>
              )}
             <audio ref={audioRef} preload="auto" />
        </CardContent> 
      </Card>
    </div>
  )
}

