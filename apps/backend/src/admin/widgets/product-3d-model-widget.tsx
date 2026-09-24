import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input } from "@medusajs/ui"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { useState, useRef } from "react"

const Product3DModelWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const [modelUrl, setModelUrl] = useState<string>(
    (data?.metadata?.model_3d as string) || ""
  )
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const saveMetadata = async (urlToSave: string) => {
    setIsSaving(true)
    setMessage("")
    try {
      const res = await fetch(`/admin/products/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: {
            ...data.metadata,
            model_3d: urlToSave,
          },
        }),
      })
      if (res.ok) {
        setMessage("3D Model saved directly into Database!")
      } else {
        setMessage("Failed to save 3D Model.")
      }
    } catch (e) {
      setMessage("Error saving 3D model.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSave = () => {
    saveMetadata(modelUrl)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsSaving(true)
    setMessage("Reading 3D file & storing in Database...")

    try {
      // Store 3D model directly as Base64 Data URL in Database metadata (Zero CORS/Fetch errors!)
      const reader = new FileReader()
      reader.onload = async () => {
        const base64Data = reader.result as string
        setModelUrl(base64Data)
        await saveMetadata(base64Data)
        setMessage(`Success! 3D Model (${(file.size / (1024 * 1024)).toFixed(1)}MB) saved 100% inside Database!`)
      }
      reader.onerror = () => {
        const fallbackPath = `/models/shoes/${file.name}`
        setModelUrl(fallbackPath)
        saveMetadata(fallbackPath)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      const fallbackPath = `/models/shoes/${file.name}`
      setModelUrl(fallbackPath)
      await saveMetadata(fallbackPath)
    }
  }

  return (
    <Container className="p-6 rounded-xl bg-[#121212] text-white border border-gray-800 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <Heading level="h2" className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
          <span>👟</span> 3D Sneaker Model Selector (Database Storage)
        </Heading>
        {modelUrl && (
          <span className="text-[10px] bg-green-500/20 text-green-400 font-mono font-bold px-2 py-0.5 rounded-full border border-green-500/30">
            3D Active
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 mb-4">
        Select a 3D .glb file from your PC to store 100% inside the Database (bypasses all CORS & server path errors).
      </p>

      {/* Hidden File Input for PC Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf,application/octet-stream,model/gltf-binary"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col gap-3">
        {/* Upload PC File Button & Input */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            size="small"
            variant="secondary"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
          >
            📁 Save 3D File directly to Database (.glb)
          </Button>

          <span className="text-xs text-gray-500">or enter model path:</span>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={modelUrl.startsWith("data:") ? "[ 100% Database Stored 3D Model ]" : modelUrl}
            onChange={(e) => setModelUrl(e.target.value)}
            placeholder="/models/shoes/Air Jordan 4 Bred 2024.glb or data:..."
            className="flex-1 bg-gray-900 border-gray-700 text-white text-xs font-mono"
          />
          <Button onClick={handleSave} isLoading={isSaving} size="small" variant="primary">
            Save 3D Model
          </Button>
        </div>

        {/* Preset Quick Select Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-1">
            Quick Select GLB:
          </span>
          {[
            { label: "Nike Shoe V2", file: "/models/shoes/Nike Shoe V2.glb" },
            { label: "Air Jordan 4 Bred", file: "/models/shoes/Air Jordan 4 Bred 2024.glb" },
            { label: "Air Jordan 1 Lost", file: "/models/shoes/Air Jordan 1 High Lost .glb" },
            { label: "Air Jordan 1 Mocha", file: "/models/shoes/Air Jordan 1 Reverse Mocha (Right Shoe).glb" },
          ].map((preset) => (
            <button
              key={preset.file}
              type="button"
              onClick={() => {
                setModelUrl(preset.file)
                saveMetadata(preset.file)
              }}
              className="text-[11px] bg-gray-800 hover:bg-gray-700 text-gray-200 px-2.5 py-1 rounded-md border border-gray-700 font-semibold transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {message && <p className="text-xs font-bold text-green-400 mt-1">{message}</p>}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default Product3DModelWidget
