import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Minha Página com Next.js</title>
        <meta name="description" content="Exemplo em JavaScript puro com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Olá, mundo! 👋
        </h1>
        <p className={styles.description}>
          Esta é uma aplicação Next.js usando JavaScript.
        </p>
         <p className={styles.description}>
         Para acessar as cotações atuais acesse: 
          <Link href="/cotacao">
          Ir para cotacao
        </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <p>Feito em Next.js</p>
      </footer>
    </div>
  )
}
