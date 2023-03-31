import '../App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div>
      <Navbar className='mb-5'>
        <Container>
          <Navbar.Brand href='/' style={{ textAlign: 'center', width: '100%' }} className='mt-5'>
            Election dApp - Onchain Voting
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h1>Bienvenue sur notre plateforme de vote en ligne</h1>
        <p>Connectez-vous avec votre compte Ethereum pour participer aux élections.</p>
        {/* Autres composants pour le contenu de la page */}
      </Container>
    </div>
  );
}

export default App;
