import { Inter } from 'next/font/google'
import './globals.css'
import Layout from './components/Layout'
import Footer from './components/Footer'
import { Metadata } from 'next'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - 图像魔方',
    default: '图像魔方 - 一站式图像处理工具',
  },
  description: '图像魔方是一个免费的在线图像处理工具集合，提供AI文生图、图片压缩、格式转换、大小调整、SVG编辑等功能。所有处理都在浏览器本地完成，保护您的隐私。',
  keywords: 'AI文生图, 图片压缩, 图片格式转换, 图片大小调整, SVG编辑器, 文字卡片生成, Logo设计, 图像处理工具, 在线图片编辑, 免费图片工具',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://randomphonesnumbers.com/',
    siteName: '图像魔方',
    images: [
      {
        url: 'https://randomphonesnumbers.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '图像魔方 - 一站式图像处理工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@imagecube',
    creator: '@imagecube',
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
  verification: {
    google: 'your-google-verification-code',
    baidu: 'your-baidu-verification-code',
  },
  alternates: {
    canonical: 'https://randomphonesnumbers.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://randomphonesnumbers.com/" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L31HPB2JWB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-L31HPB2JWB');
          `}
        </Script>
        {/* 结构化数据 */}
        <Script id="structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Random Phone Numbers Generator",
              "url": "https://randomphonesnumbers.com/",
              "description": "Generate random test phone numbers for software development, QA testing and validation. Support international formats including US (+1), UK (+44), China (+86), and more country codes.",
              "applicationCategory": "DeveloperTool",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5247375025065411"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Layout>{children}</Layout>
        <Footer />
      </body>
    </html>
  )
}
