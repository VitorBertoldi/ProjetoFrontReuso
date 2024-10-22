import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Nav } from 'react-bootstrap';
import Atividades from './components/Atividades';
import Metas from './components/Metas';
import Relatorios from './components/Relatorios';

function App() {
  const [currentPage, setCurrentPage] = useState('atividades');

  const renderPage = () => {
    switch (currentPage) {
      case 'atividades':
        return <Atividades />;
      case 'metas':
        return <Metas />;
      case 'relatorios':
        return <Relatorios />;
      default:
        return <Atividades />;
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Athena - App de Atividades Físicas</h1>
      <Nav className="justify-content-center my-4">
        <Nav.Item>
          <Button onClick={() => setCurrentPage('atividades')} style={{ marginRight: '10px' }}>
            Atividades
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button onClick={() => setCurrentPage('metas')} style={{ marginRight: '10px' }}>
            Metas
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button onClick={() => setCurrentPage('relatorios')}>
            Relatórios
          </Button>
        </Nav.Item>
      </Nav>
      {renderPage()}
    </Container>
  );
}

export default App;
