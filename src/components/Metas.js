
import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Metas = () => {
  const [metas, setMetas] = useState([]);
  const [tipoAtividade, setTipoAtividade] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const idUsuarioFixo = '67166256a7b695a9778513a2'; 
  const statusMetaFixo = 'ativo'; 

  useEffect(() => {
    fetchMetas();
  }, []);

  const fetchMetas = async () => {
    try {
      const userId = '67166256a7b695a9778513a2'; 
      const response = await axios.get(`http://localhost:3000/api/metas/user/${userId}`); 
      setMetas(response.data);
    } catch (error) {
      console.error('Erro ao buscar metas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaMeta = {
      id_usuario: idUsuarioFixo,
      tipo_atividade: tipoAtividade,
      valor_meta: valorMeta,
      data_inicial: dataInicial,
      data_final: dataFinal,
      status_meta: statusMetaFixo,
    };

    try {
      await axios.post('http://localhost:3000/api/metas', novaMeta); 
      fetchMetas(); 
      setTipoAtividade('');
      setValorMeta('');
      setDataInicial('');
      setDataFinal('');
    } catch (error) {
      console.error('Erro ao registrar meta:', error);
    }
  };

  const excluirMeta = async (metaId) => {
    try {
      await axios.delete(`http://localhost:3000/api/metas/${metaId}`); 
      setMetas(metas.filter((meta) => meta._id !== metaId)); 
    } catch (error) {
      console.error('Erro ao excluir meta:', error);
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

      <h2 className="text-center mt-4">Metas Registradas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipo de Atividade</th>
            <th>Valor da Meta</th>
            <th>Data Inicial</th>
            <th>Data Final</th>
            <th>Status da Meta</th>
            <th>Ações</th> {/* Nova coluna para ações */}
          </tr>
        </thead>
        <tbody>
          {metas.map((meta) => (
            <tr key={meta._id}>
              <td>{meta.tipo_atividade}</td>
              <td>{meta.valor_meta}</td>
              <td>{new Date(meta.data_inicial).toLocaleDateString()}</td>
              <td>{new Date(meta.data_final).toLocaleDateString()}</td>
              <td>{meta.status_meta}</td>
              <td>
                <Button variant="danger" onClick={() => excluirMeta(meta._id)}>
                  Excluir
                </Button>
              </td> {/* Botão de excluir */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Metas;
