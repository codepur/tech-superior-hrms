import '../src/styles/globals.css'
import store from '../src/stores/index'
import "bootstrap/dist/css/bootstrap.min.css"
import { SSRProvider, ThemeProvider } from 'react-bootstrap'
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';


function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider>
      <SSRProvider>
      <Provider store={store} >
        <Component {...pageProps}/>
      </Provider>
      </SSRProvider>
    </ThemeProvider>
  
  )
}
const makeStore = () => store;
const wrapper = createWrapper(makeStore, { debug: false });
export default wrapper.withRedux(MyApp)
