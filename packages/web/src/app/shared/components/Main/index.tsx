'use client'

import { mainTv } from '@shared/components/Main/MainTV'
import { useUser } from '@shared/hooks/useUser'
import { TRootComponent } from '@shared/types'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { VariantProps } from 'tailwind-variants'

type TMain = TRootComponent & VariantProps<typeof mainTv>

export function Main({ children, overflow }: TMain) {
  const [isClientSide, setClientSide] = useState(false)
  const { push } = useRouter()
  const { sessionCustomer } = useUser()

  useEffect(() => {
    if (!sessionCustomer?.email) return push(APP_ROUTES.public.auth.name)
  }, [push, sessionCustomer?.email])

  useEffect(() => {
    setClientSide(true)
  }, [])

  return (
    <main className={mainTv({ overflow })}>
      <div
        id="overflow-search-helper"
        className="duration-500 fixed inset-0 pointer-events-none z-40"
      />
      {isClientSide && children}
    </main>
  )
}
