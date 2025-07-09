"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, CheckCircle, XCircle, Eye, RotateCcw } from "lucide-react"

interface Pessoa {
  id: number
  nome: string
  fragmentoUrl: string
  fotoCompletaUrl: string
  resposta: number
}

const pessoas: Pessoa[] = [
  {
    id: 1,
    nome: "Luisa Melges",
    fragmentoUrl: "/imagens/melges1.jpg",
    fotoCompletaUrl: "/imagens/melges.jpg",
    resposta: 0,
  },
  {
    id: 2,
    nome: "Mateus Abreu",
    fragmentoUrl: "/imagens/abreu1.jpg",
    fotoCompletaUrl: "/imagens/abreu.jpg",
    resposta: 0,
  },
  {
    id: 3,
    nome: "Pedro Chaves",
    fragmentoUrl: "/imagens/pedro1.jpg",
    fotoCompletaUrl: "/imagens/pedro.jpg",
    resposta: 0,
  },
  {
    id: 4,
    nome: "Davi Costa",
    fragmentoUrl: "/imagens/davi1.jpg",
    fotoCompletaUrl: "/imagens/davi.jpg",
    resposta: 0,
  },
  {
    id: 5,
    nome: "Helena Melo",
    fragmentoUrl: "/imagens/helena1.jpg",
    fotoCompletaUrl: "/imagens/helena.jpg",
    resposta: 0,
  },
  {
    id: 6,
    nome: " Adlin Rodrigues",
    fragmentoUrl: "/imagens/adlin1.jpg",
    fotoCompletaUrl: "/imagens/adlin.jpg",
    resposta: 0,
  },
  {
    id: 7,
    nome: "Vitória Gontijo",
    fragmentoUrl: "/imagens/vitoria1.jpg",
    fotoCompletaUrl: "/imagens/vitoria.jpg",
    resposta: 0,
  },
  {
    id: 8,
    nome: "Leo Matos",
    fragmentoUrl: "/imagens/leo1.jpg",
    fotoCompletaUrl: "/imagens/leo.jpg",
    resposta: 0,
  },
  {
    id: 9,
    nome: "david  Teixeira",
    fragmentoUrl: "/imagens/david1.jpg",
    fotoCompletaUrl: "/imagens/david.jpg",
    resposta: 0,
  },
  {
    id: 10,
    nome: "Rodrigo Alvim",
    fragmentoUrl: "/imagens/rodrigo1..jpg",
    fotoCompletaUrl: "/imagens/rodrigo.jpg",
    resposta: 0,
  },
  {
    id: 11,
    nome: "Flávia Magalhães",
    fragmentoUrl: "/imagens/flavia1.jpg",
    fotoCompletaUrl: "/imagens/flavia.jpg",
    resposta: 0,
  },
  {
    id: 12,
    nome: "Cleopatra",
    fragmentoUrl: "/placeholder.svg?height=100&width=100&text=Cleopatra+Eye",
    fotoCompletaUrl: "/placeholder.svg?height=300&width=300&text=Cleopatra",
    resposta: 0,
  },
  {
    id: 13,
    nome: "Shakespeare",
    fragmentoUrl: "/placeholder.svg?height=100&width=100&text=Shakespeare+Collar",
    fotoCompletaUrl: "/placeholder.svg?height=300&width=300&text=William+Shakespeare",
    resposta: 0,
  },
  {
    id: 14,
    nome: "Marie Curie",
    fragmentoUrl: "/placeholder.svg?height=100&width=100&text=Curie+Lab",
    fotoCompletaUrl: "/placeholder.svg?height=300&width=300&text=Marie+Curie",
    resposta: 0,
  },
  {
    id: 15,
    nome: "Bob Marley",
    fragmentoUrl: "/placeholder.svg?height=100&width=100&text=Marley+Dreads",
    fotoCompletaUrl: "/placeholder.svg?height=300&width=300&text=Bob+Marley",
    resposta: 0,
  },
]

export default function QuemEAPessoa({ onBack }: { onBack: () => void }) {
  const [pessoaSelecionada, setPessoaSelecionada] = useState<Pessoa | null>(null)
  const [pessoasAcertadas, setPessoasAcertadas] = useState<Set<number>>(new Set())
  const [mostrarResposta, setMostrarResposta] = useState(false)
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null)
  const [mostrarFotoCompleta, setMostrarFotoCompleta] = useState(false)
  const [pontuacao, setPontuacao] = useState(0)

  const [perguntaSelecionada, setPerguntaSelecionada] = useState<Pessoa | null>(null)
    const [perguntasRespondidas, setPerguntasRespondidas] = useState<Set<number>>(new Set())


  const selecionarPessoa = (pessoa: Pessoa) => {
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

    if (opcaoIndex === pessoaSelecionada!.resposta) {
      setPessoasAcertadas(new Set([...pessoasAcertadas, pessoaSelecionada!.id]))
      setPontuacao(pontuacao + 1)
    }
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
          <h1 className="text-4xl font-bold text-red-800 text-center">QUEM É A PESSOA?</h1>
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
          <h1 className="text-3xl font-bold text-red-800">{pessoaSelecionada.nome}</h1>
        </div>

        <Card className="w-full max-w-md bg-white border-4 border-red-500">
          <CardContent className="p-6 text-center">
            <img
              src={pessoaSelecionada.fotoCompletaUrl || "/placeholder.svg"}
              alt={pessoaSelecionada.nome}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-red-800 mb-4">{pessoaSelecionada.nome}</h2>
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
        <h1 className="text-3xl font-bold text-red-800">Pessoa #{pessoaSelecionada.id}</h1>
      </div>

      <Card className="w-full max-w-2xl bg-white border-4 border-red-500">
        <CardHeader className="text-center">
          <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <CardTitle className="text-2xl text-red-800">Quem é esta pessoa?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fragmento da foto */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={pessoaSelecionada.fragmentoUrl || "/placeholder.svg"}
                alt="Fragmento da pessoa"
                className="w-200 h-200 object-cover rounded-lg border-4 border-red-200"
              />
                  <Button onClick={() => setMostrarFotoCompleta(true)} className="bg-red-600 hover:bg-red-700 mr-4">
                  <Eye className="w-4 h-4" />
                  Mostrar
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
