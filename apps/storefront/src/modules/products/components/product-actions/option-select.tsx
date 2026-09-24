import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
          Select {title}
        </span>
        {title.toLowerCase() === "size" && (
          <button className="text-xs font-semibold underline underline-offset-4 hover:text-gray-500 transition-colors">
            Size Guide
          </button>
        )}
      </div>
      <div
        className="flex flex-wrap gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "min-w-[60px] h-12 flex items-center justify-center rounded-md border text-sm font-semibold transition-all duration-200",
                {
                  "border-black bg-black text-white": isSelected,
                  "border-gray-200 bg-white text-black hover:border-black": !isSelected,
                  "opacity-50 cursor-not-allowed": disabled && !isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
