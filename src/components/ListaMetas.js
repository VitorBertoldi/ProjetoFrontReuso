
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ListaMetas = ({ metas, excluirMeta, onRegistrarNovaMeta }) => {
  return (
    <div>
      <h2 className="text-center mt-4">Metas Registradas</h2>
      <Button onClick={onRegistrarNovaMeta} variant="success" className="mb-3">
        Registrar Nova Meta
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipo de Atividade</th>
            <th>Valor da Meta</th>
            <th>Data Inicial</th>
            <th>Data Final</th>
            <th>Status da Meta</th>
            <th>Ações</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListaMetas;
