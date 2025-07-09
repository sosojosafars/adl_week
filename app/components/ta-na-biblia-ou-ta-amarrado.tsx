"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Quote, CheckCircle, XCircle } from "lucide-react"

interface Frase {
  id: number
  texto: string
  eVerdadeira: boolean
  explicacao: string
}

const frases: Frase[] = [
  {
    id: 1,
    texto: "Diga-me com quem andas e eu te direi quem és",
    eVerdadeira: false,
    explicacao: "TÁ AMARRADO!",
  },
  {
    id: 2,
    texto: "Quem quiser ser o primeiro deverá ser servo",
    eVerdadeira: true,
    explicacao: "Mateus 20:20-27",
  },
  {
    id: 3,
    texto: "Pois o amor ao dinheiro é a raiz de todos os males",
    eVerdadeira: true,
    explicacao: "1 Timóteo ˆ:10",
  },
  {
    id: 4,
    texto: "O cair é do homem, o levantar é de Deus",
    eVerdadeira: false,
    explicacao: "TÁ AMARRADO!",
  },
  {
    id: 5,
    texto: "Quem espera sempre alcança",
    eVerdadeira: false,
    explicacao: "TÁ AMARRADO!",
  },
  {
    id: 6,
    texto: "O tempo cura todas as feridas",
    eVerdadeira: false,
    explicacao: "TÁ AMARRADO!",
  },
  {
    id: 7,
    texto: "Observa a formiga, preguiçoso",
    eVerdadeira: true,
    explicacao: "Provérbios 6:6-8",
  },
  {
    id: 8,
    texto: "A fé remove montanhas, mas a dúvida as reconstrói",
    eVerdadeira: false,
    explicacao: "TÁ AMARRADO!",
  },
    {
    id: 9,
    texto: "Quem trata bem os pobres, empresta ao Senhor",
    eVerdadeira: true,
    explicacao: "Provérbios 19:17",
  },
    {
    id: 10,
    texto: "Lança o teu pão sobre as águas, porque depois de muitos dias o acharás",
    eVerdadeira: true,
    explicacao: "Eclesiastes 11:1",
  },
]

export default function TaNaBibliaOuTaAmarrado({ onBack }: { onBack: () => void }) {
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [pontuacao, setPontuacao] = useState(0)
  const [fraseSelecionada, setFraseSelecionada] = useState<Frase | null>(null)
  const [frasesAcertadas, setFrasesAcertadas] = useState<Set<number>>(new Set())
  const [respostaSelecionada, setRespostaSelecionada] = useState<boolean | null>(null)
  const [mostrarResultado, setMostrarResposta] = useState(false)
  const [jogoTerminado, setJogoTerminado] = useState(false)

const frase = fraseSelecionada!

    const selecionarFrase = (frase: Frase) => {
    if (frasesAcertadas.has(frase.id)) return
    setFraseSelecionada(frase)
    setMostrarResposta(false)
    setRespostaSelecionada(null)
  }

  const handleResposta = (opcaoIndex: boolean) => {
     if (respostaSelecionada !== null) return

    setRespostaSelecionada(opcaoIndex)
    setMostrarResposta(true)

    if (opcaoIndex === fraseSelecionada!.eVerdadeira) {
      setFrasesAcertadas(new Set([...frasesAcertadas, fraseSelecionada!.id]))
      setPontuacao(pontuacao + 1)
    }
  }

  const reiniciarJogo = () => {
    setPerguntaAtual(0)
    setPontuacao(0)
    setRespostaSelecionada(null)
    setMostrarResposta(false)
    setJogoTerminado(false)
  }

  if (!fraseSelecionada) {
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
                {frases.map((frase) => (
                  <button
                    key={frase.id}
                    onClick={() => selecionarFrase(frase)}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold transition-all hover:scale-110 ${
                      frasesAcertadas.has(frase.id)
                        ? "bg-green-500 text-white border-green-600 shadow-lg"
                        : "bg-white text-red-800 border-red-400 hover:border-red-600 hover:text-red-600"
                    }`}
                    disabled={frasesAcertadas.has(frase.id)}
                  >
                    {frase.id}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

  if (jogoTerminado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <Card className="w-full max-w-2xl bg-white border-4 border-blue-500">
          <CardHeader className="text-center">
            <Quote className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-3xl text-blue-800">Jogo Finalizado!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-blue-600">
              {pontuacao}/{frases.length}
            </div>
            <p className="text-xl text-gray-700">
              {pontuacao === frases.length
                ? "Perfeito! Você conhece muito bem a Bíblia!"
                : pontuacao >= frases.length * 0.7
                  ? "Muito bem! Você sabe distinguir bem!"
                  : pontuacao >= frases.length * 0.5
                    ? "Bom trabalho! Continue estudando!"
                    : "Continue lendo a Bíblia para conhecer melhor!"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={reiniciarJogo} className="bg-blue-600 hover:bg-blue-700">
                Jogar Novamente
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Voltar ao Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <div className="flex items-center mb-8">
        <Button onClick={onBack} variant="ghost" className="text-gray-800 hover:bg-gray-100 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-4xl font-bold text-blue-800 text-center drop-shadow-lg">Tá na Bíblia ou Tá Amarrado?</h1>
      </div>

      <Card className="w-full max-w-4xl bg-white border-4 border-blue-500">
        <CardHeader className="text-center">
          <Quote className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-400">
            <p className="text-xl italic text-blue-900 font-medium text-center leading-relaxed">"{frase.texto}"</p>
          </div>

          {mostrarResultado && (
            <div
              className={`p-6 rounded-lg border-4 ${frase.eVerdadeira ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}
            >
              <div className="flex items-center justify-center mb-4">
                {frase.eVerdadeira ? (
                  <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600 mr-2" />
                )}
                <span className={`text-xl font-bold ${frase.eVerdadeira ? "text-green-800" : "text-red-800"}`}>
                  {frase.eVerdadeira ? "TÁ NA BÍBLIA!" : "TÁ AMARRADO!"}
                </span>
              </div>
              <p className={`text-center ${frase.eVerdadeira ? "text-green-700" : "text-red-700"}`}>
                {frase.explicacao}
              </p>
            </div>
          )}

          {!mostrarResultado && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button
                onClick={() => handleResposta(true)}
                className="p-8 text-xl bg-green-600 hover:bg-green-700 h-auto"
              >
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-8 h-8 mb-2" />
                  <span>TÁ NA BÍBLIA</span>
                </div>
              </Button>

              <Button onClick={() => handleResposta(false)} className="p-8 text-xl bg-red-600 hover:bg-red-700 h-auto">
                <div className="flex flex-col items-center">
                  <XCircle className="w-8 h-8 mb-2" />
                  <span>TÁ AMARRADO</span>
                </div>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
