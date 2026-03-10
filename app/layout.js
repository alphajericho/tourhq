export const metadata = {
  title: 'UDO — Silverback Touring',
  description: 'Tour budgeting, research and planning platform',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0f0f13' }}>{children}</body>
    </html>
  )
}
