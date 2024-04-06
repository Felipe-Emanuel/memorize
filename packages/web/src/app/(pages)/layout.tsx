import type { Metadata } from 'next'
import { Providers } from 'src/app/providers'
import '@global/globals.css'
import { Main } from '@shared/components/Main'
import { Toast } from '@shared/components'

export const metadata: Metadata = {
  title: 'Painel do Escritor | Novos',
  description: 'Memorize personagens',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className="m-0 p-0 ">
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        ></link>
        <Providers>
          <Main overflow="hidden">
            {children}
            <Toast />
          </Main>
        </Providers>
      </body>
    </html>
  )
}
