'use client'

import { TBookResponse, TRootComponent } from '@shared/types'
import { myOwnBooksRootTV } from '../MyOwnBooksUtilsTV'
import { useQueryClient } from 'react-query'
import { cacheName } from '@shared/utils/constants/cacheName'

export function MyOwnBooksRoot({ children }: TRootComponent) {
  const queryClient = useQueryClient()

  const books: TBookResponse[] | undefined = queryClient.getQueryData(cacheName.allBooks)

  if (!books?.length) return null

  return (
    <div id="my-own-books-root" className={myOwnBooksRootTV()}>
      {children}
    </div>
  )
}
