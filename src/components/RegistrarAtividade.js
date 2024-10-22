
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function RegistrarAtividade({ voltarParaAtividades }) {
  const [tipoAtividade, setTipoAtividade] = useState('');
  const [dataAtividade, setDataAtividade] = useState('');
  const [duracao, setDuracao] = useState('');
  const [distancia, setDistancia] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [caloriasQueimadas, setCaloriasQueimadas] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaAtividade = {
      tipoAtividade,
      dataAtividade,
      duracao,
      distancia,
      intensidade,
      caloriasQueimadas,
      observacoes,
    };

    try {
      await axios.post('http://localhost:3000/api/atividades', novaAtividade); 
      voltarParaAtividades(); 
    } catch (error) {
      console.error('Erro ao registrar atividade:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center mt-4">Registrar Nova Atividade</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="tipoAtividade">
          <Form.Label>Tipo de Atividade</Form.Label>
          <Form.Control
            type="text"
            value={tipoAtividade}
            onChange={(e) => setTipoAtividade(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dataAtividade">
          <Form.Label>Data da Atividade</Form.Label>
          <Form.Control
            type="date"
            value={dataAtividade}
            onChange={(e) => setDataAtividade(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="duracao">
          <Form.Label>Duração (minutos)</Form.Label>
          <Form.Control
            type="number"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="distancia">
          <Form.Label>Distância (km)</Form.Label>
          <Form.Control
            type="number"
            value={distancia}
            onChange={(e) => setDistancia(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="intensidade">
          <Form.Label>Intensidade</Form.Label>
          <Form.Control
            type="text"
            value={intensidade}
            onChange={(e) => setIntensidade(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="caloriasQueimadas">
          <Form.Label>Calorias Queimadas</Form.Label>
          <Form.Control
            type="number"
            value={caloriasQueimadas}
            onChange={(e) => setCaloriasQueimadas(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="observacoes">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrar Atividade
        </Button>
        <Button variant="secondary" onClick={voltarParaAtividades} className="ml-2">
          Voltar
        </Button>
      </Form>
    </div>
  );
}

export default RegistrarAtividade;
