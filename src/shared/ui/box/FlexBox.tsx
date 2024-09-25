import { FC, memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  cls?: string
  gap?: string
}

export const FlexBox: FC<Props> = memo(({ children, cls, gap }) => {
  return (
    <div
      className={`flex ${gap ? `gap-${gap}` : 'gap-5'} ${
        cls?.includes('flex-col')
          ? cls
          : cls?.includes('items-start')
          ? cls
          : `items-center ${cls}`
      }`}
    >
      {children}
    </div>
  )
})

