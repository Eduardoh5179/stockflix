import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export default function Layout() {
  toast("Message", {
    description: "Description text",
    descriptionClassName: "!text-sky-500", // Forces the text color change
  })

  return (
    <div className="p-8 flex flex-col gap-4 items-center justify-center min-h-screen">

      {/* Botão para disparar o teste manual */}
      <button
        onClick={() => toast.success("Produto criado com sucesso!", {
          description: `O produto nome foi salvo no sistema.`,
        })}
        className="px-4 py-2 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800"
      >
        Disparar Toast de Teste
      </button>

      {/* O container que renderiza os Toasts na tela */}
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            // Estilo geral do card de sucesso
            success: 'bg-white border-green-200',
            // Cor do título do sucesso
            title: 'text-slate-950 font-semibold',
            // Mudar a cor da descrição aqui (ex: cinza azulado mais suave)
            description: '!text-slate-500 font-normal',
            // Mudar a cor do ícone de check para o verde do Tailwind (green-600)
            icon: 'text-green-600',
          },
        }}
      />
    </div>
  )
}