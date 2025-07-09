"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Pyramid, RotateCcw, Trophy } from "lucide-react"

interface Pessoa {
  id: number
  nome: string
  cor: string
}

const pessoas: Pessoa[] = [
  { id: 1, nome: "Ana", cor: "bg-red-400" },
  { id: 2, nome: "Bruno", cor: "bg-blue-400" },
  { id: 3, nome: "Carlos", cor: "bg-green-400" },
  { id: 4, nome: "Diana", cor: "bg-yellow-400" },
  { id: 5, nome: "Eduardo", cor: "bg-red-500" },
  { id: 6, nome: "Fernanda", cor: "bg-blue-500" },
]

const piramideCorreta = [
  [1], // Topo
  [2, 3], // Meio
  [4, 5, 6], // Base
]

export default function PiramideHumana({ onBack }: { onBack: () => void }) {
  const [pessoasDisponiveis, setPessoasDisponiveis] = useState<Pessoa[]>([])
  const [piramide, setPiramide] = useState<(Pessoa | null)[][]>([
    [null], // Topo
    [null, null], // Meio
    [null, null, null], // Base
  ])
  const [jogoIniciado, setJogoIniciado] = useState(false)
  const [jogoCompleto, setJogoCompleto] = useState(false)
  const [tentativas, setTentativas] = useState(0)

  useEffect(() => {
    embaralharPessoas()
  }, [])

  useEffect(() => {
    verificarVitoria()
  }, [piramide])

  const embaralharPessoas = () => {
    const pessoasEmbaralhadas = [...pessoas].sort(() => Math.random() - 0.5)
    setPessoasDisponiveis(pessoasEmbaralhadas)
    setJogoIniciado(true)
    setJogoCompleto(false)
    setTentativas(0)
  }

  const verificarVitoria = () => {
    let correto = true
    for (let nivel = 0; nivel < piramideCorreta.length; nivel++) {
      for (let pos = 0; pos < piramideCorreta[nivel].length; pos++) {
        const pessoaCorreta = pessoas.find((p) => p.id === piramideCorreta[nivel][pos])
        const pessoaAtual = piramide[nivel][pos]
        if (!pessoaAtual || pessoaAtual.id !== pessoaCorreta?.id) {
          correto = false
          break
        }
      }
      if (!correto) break
    }

    if (correto && piramide.every((nivel) => nivel.every((pos) => pos !== null))) {
      setJogoCompleto(true)
    }
  }

  const adicionarPessoa = (pessoa: Pessoa, nivel: number, posicao: number) => {
    if (piramide[nivel][posicao] !== null) return

    const novaPiramide = [...piramide]
    novaPiramide[nivel][posicao] = pessoa
    setPiramide(novaPiramide)

    const novasPessoasDisponiveis = pessoasDisponiveis.filter((p) => p.id !== pessoa.id)
    setPessoasDisponiveis(novasPessoasDisponiveis)
    setTentativas(tentativas + 1)
  }

  const removerPessoa = (nivel: number, posicao: number) => {
    const pessoa = piramide[nivel][posicao]
    if (!pessoa) return

    const novaPiramide = [...piramide]
    novaPiramide[nivel][posicao] = null
    setPiramide(novaPiramide)

    setPessoasDisponiveis([...pessoasDisponiveis, pessoa])
  }

  const reiniciarJogo = () => {
    setPiramide([[null], [null, null], [null, null, null]])
    embaralharPessoas()
  }

  if (jogoCompleto) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <Card className="w-full max-w-2xl bg-white border-4 border-yellow-500">
          <CardHeader className="text-center">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <CardTitle className="text-3xl text-yellow-800">Parabéns!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-2xl text-gray-700">Você montou a pirâmide corretamente!</div>
            <div className="text-lg text-gray-600">Tentativas: {tentativas}</div>
            <p className="text-xl text-gray-700">
              {tentativas <= 6
                ? "Perfeito! Você acertou de primeira!"
                : tentativas <= 10
                  ? "Muito bem! Boa estratégia!"
                  : tentativas <= 15
                    ? "Bom trabalho! Continue praticando!"
                    : "Conseguiu! A prática leva à perfeição!"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={reiniciarJogo} className="bg-yellow-600 hover:bg-yellow-700">
                Jogar Novamente
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 bg-transparent"
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
        <h1 className="text-4xl font-bold text-yellow-800 text-center drop-shadow-lg">🔺 Pirâmide Humana</h1>
      </div>

      <div className="text-gray-800 text-center mb-4">
        <p className="text-lg">Tentativas: {tentativas}</p>
        <p className="text-sm">
          Monte a pirâmide na ordem correta: Ana no topo, Bruno e Carlos no meio, Diana, Eduardo e Fernanda na base
        </p>
      </div>

      <Card className="w-full max-w-4xl bg-white border-4 border-yellow-500">
        <CardHeader className="text-center">
          <Pyramid className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <CardTitle className="text-2xl text-yellow-800">Monte a Pirâmide Humana</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Pirâmide */}
          <div className="flex flex-col items-center space-y-4">
            {/* Topo */}
            <div className="flex justify-center">
              <div
                className={`w-20 h-20 rounded-full border-4 border-dashed border-yellow-300 flex items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors ${
                  piramide[0][0] ? piramide[0][0].cor : "bg-gray-100"
                }`}
                onClick={() => piramide[0][0] && removerPessoa(0, 0)}
              >
                {piramide[0][0] ? (
                  <span className="text-white font-bold text-sm">{piramide[0][0].nome}</span>
                ) : (
                  <span className="text-yellow-400 text-xs">Topo</span>
                )}
              </div>
            </div>

            {/* Meio */}
            <div className="flex justify-center space-x-4">
              {[0, 1].map((pos) => (
                <div
                  key={pos}
                  className={`w-20 h-20 rounded-full border-4 border-dashed border-yellow-300 flex items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors ${
                    piramide[1][pos] ? piramide[1][pos]!.cor : "bg-gray-100"
                  }`}
                  onClick={() => piramide[1][pos] && removerPessoa(1, pos)}
                >
                  {piramide[1][pos] ? (
                    <span className="text-white font-bold text-sm">{piramide[1][pos]!.nome}</span>
                  ) : (
                    <span className="text-yellow-400 text-xs">Meio</span>
                  )}
                </div>
              ))}
            </div>

            {/* Base */}
            <div className="flex justify-center space-x-4">
              {[0, 1, 2].map((pos) => (
                <div
                  key={pos}
                  className={`w-20 h-20 rounded-full border-4 border-dashed border-yellow-300 flex items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors ${
                    piramide[2][pos] ? piramide[2][pos]!.cor : "bg-gray-100"
                  }`}
                  onClick={() => piramide[2][pos] && removerPessoa(2, pos)}
                >
                  {piramide[2][pos] ? (
                    <span className="text-white font-bold text-sm">{piramide[2][pos]!.nome}</span>
                  ) : (
                    <span className="text-yellow-400 text-xs">Base</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pessoas Disponíveis */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4 text-center">Pessoas Disponíveis</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {pessoasDisponiveis.map((pessoa) => (
                <div key={pessoa.id} className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${pessoa.cor} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg`}
                  >
                    <span className="text-white font-bold text-sm">{pessoa.nome}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <Button
                      size="sm"
                      onClick={() => adicionarPessoa(pessoa, 0, 0)}
                      disabled={piramide[0][0] !== null}
                      className="w-full text-xs bg-yellow-500 hover:bg-yellow-600"
                    >
                      Topo
                    </Button>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => adicionarPessoa(pessoa, 1, 0)}
                        disabled={piramide[1][0] !== null}
                        className="text-xs bg-yellow-500 hover:bg-yellow-600"
                      >
                        M1
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => adicionarPessoa(pessoa, 1, 1)}
                        disabled={piramide[1][1] !== null}
                        className="text-xs bg-yellow-500 hover:bg-yellow-600"
                      >
                        M2
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => adicionarPessoa(pessoa, 2, 0)}
                        disabled={piramide[2][0] !== null}
                        className="text-xs bg-yellow-500 hover:bg-yellow-600"
                      >
                        B1
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => adicionarPessoa(pessoa, 2, 1)}
                        disabled={piramide[2][1] !== null}
                        className="text-xs bg-yellow-500 hover:bg-yellow-600"
                      >
                        B2
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => adicionarPessoa(pessoa, 2, 2)}
                        disabled={piramide[2][2] !== null}
                        className="text-xs bg-yellow-500 hover:bg-yellow-600"
                      >
                        B3
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={reiniciarJogo}
              variant="outline"
              className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
