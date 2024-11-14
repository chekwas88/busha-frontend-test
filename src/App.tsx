import { AccountProvider } from './context';
import { Account } from './views/AccountView'


function App() {
  return <div>
    <AccountProvider>
      <Account />
    </AccountProvider>
  </div>;
}

export default App;

