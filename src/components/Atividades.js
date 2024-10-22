
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import RegistrarAtividade from './RegistrarAtividade';

function Atividades() {
  const [atividades, setAtividades] = useState([]);
  const [exibirRegistro, setExibirRegistro] = useState(false); 

  useEffect(() => {
    fetchAtividades();
  }, []);

  const fetchAtividades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/atividades'); 
      setAtividades(response.data);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  const excluirAtividade = async (atividadeId) => {
    try {
      await axios.delete(`http://localhost:3000/api/atividades/${atividadeId}`); 
      setAtividades(atividades.filter((atividade) => atividade._id !== atividadeId)); 
    } catch (error) {
      console.error('Erro ao excluir atividade:', error);
    }
  };

  const irParaRegistrarAtividade = () => {
    setExibirRegistro(true); 
  };

  const voltarParaAtividades = () => {
    setExibirRegistro(false); 
    fetchAtividades(); 
  };

  return (
    <div>
      {!exibirRegistro ? (
        <>
          <h2 className="text-center mt-4">Atividades Registradas</h2>
          <Button onClick={irParaRegistrarAtividade} variant="success" className="mb-3">
            Registrar Nova Atividade
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tipo de Atividade</th>
                <th>Data da Atividade</th>
                <th>Duração (min)</th>
                <th>Distância (km)</th>
                <th>Intensidade</th>
                <th>Calorias Queimadas</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {atividades.map((atividade) => (
                <tr key={atividade._id}>
                  <td>{atividade.tipoAtividade}</td>
                  <td>{new Date(atividade.dataAtividade).toLocaleDateString()}</td>
                  <td>{atividade.duracao}</td>
                  <td>{atividade.distancia}</td>
                  <td>{atividade.intensidade}</td>
                  <td>{atividade.caloriasQueimadas}</td>
                  <td>{atividade.observacoes}</td>
                  <td>
                    <Button variant="danger" onClick={() => excluirAtividade(atividade._id)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <RegistrarAtividade voltarParaAtividades={voltarParaAtividades} />
      )}
    </div>
  );
}

export default Atividades;
