import '@/src/assets/sass/main.scss'
import {SessionProvider, getSession} from 'next-auth/react'

function AppSwitchTheme({children}) {
  return (
    <>{children}</>
  )
}

function App(props) {
  let {
    Component,
    pageProps: { session, ...pageProps },
  } = props
  console.log(session, 'SESSION')
  console.log(props, 'PROPS')
  return (
    <SessionProvider>
      <AppSwitchTheme>
        <Component {...pageProps} />
      </AppSwitchTheme>
    </SessionProvider>
  )
}

App.getInitialProps = async ({Component,ctx}) => {
  let pageProps = Component.getInitialProps ?
    await Component.getInitialProps(ctx) : {}
  return {
    pageProps: {
      session: await getSession(ctx),
      ...pageProps
    }
  }
}

export default App