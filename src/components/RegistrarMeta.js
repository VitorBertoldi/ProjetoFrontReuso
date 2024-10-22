
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const RegistrarMeta = ({ idUsuarioFixo, onMetaRegistered }) => {
  const [tipoAtividade, setTipoAtividade] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaMeta = {
      id_usuario: idUsuarioFixo,
      tipo_atividade: tipoAtividade,
      valor_meta: valorMeta,
      data_inicial: dataInicial,
      data_final: dataFinal,
    };

    try {
      await axios.post('http://localhost:3000/api/metas', novaMeta); 
      onMetaRegistered(); 
      setTipoAtividade('');
      setValorMeta('');
      setDataInicial('');
      setDataFinal('');
    } catch (error) {
      console.error('Erro ao registrar meta:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center mt-4">Registrar Meta</h2>
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
        <Form.Group controlId="valorMeta">
          <Form.Label>Valor da Meta</Form.Label>
          <Form.Control
            type="number"
            value={valorMeta}
            onChange={(e) => setValorMeta(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dataInicial">
          <Form.Label>Data Inicial</Form.Label>
          <Form.Control
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dataFinal">
          <Form.Label>Data Final</Form.Label>
          <Form.Control
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrar Meta
        </Button>
      </Form>
    </div>
  );
};

export default RegistrarMeta;
