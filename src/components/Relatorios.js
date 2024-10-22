import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Relatorios = () => {
  const [atividades, setAtividades] = useState([]);
  const [metas, setMetas] = useState([]);
  const userId = '67166256a7b695a9778513a2'; 

  useEffect(() => {
    const fetchAtividadesEMetas = async () => {
      try {
        const atividadesResponse = await axios.get('http://localhost:3000/api/atividades');
        setAtividades(atividadesResponse.data);

        const metasResponse = await axios.get(`http://localhost:3000/api/metas/user/${userId}`);
        setMetas(metasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar atividades e metas:', error);
      }
    };

    fetchAtividadesEMetas();
  }, []);

  const agruparAtividadesPorTipo = () => {
    return atividades.reduce((acc, atividade) => {
      const { tipoAtividade, distancia } = atividade;
      if (!acc[tipoAtividade]) {
        acc[tipoAtividade] = 0;
      }
      acc[tipoAtividade] += distancia; 
      return acc;
    }, {});
  };

  const calcularProgresso = () => {
    const atividadesAgrupadas = agruparAtividadesPorTipo();
    return metas.map((meta) => {
      const distanciaPercorrida = atividadesAgrupadas[meta.tipo_atividade] || 0; 
      const progresso = {
        tipoAtividade: meta.tipo_atividade,
        valorMeta: meta.valor_meta,
        distanciaPercorrida: distanciaPercorrida,
        distanciaRestante: Math.max(meta.valor_meta - distanciaPercorrida, 0), 
      };
      return progresso;
    });
  };

  const progressoMetas = calcularProgresso();

  return (
    <div>
      <h2 className="text-center mt-4">Progresso das Metas</h2>
      
      {/* Seção de Progresso das Metas */}
      <div>
        {progressoMetas.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tipo de Atividade</th>
                <th>Distância Percorrida</th>
                <th>Distância Restante</th>
                <th>Valor da Meta</th>
              </tr>
            </thead>
            <tbody>
              {progressoMetas.map((progresso, index) => (
                <tr key={index}>
                  <td>{progresso.tipoAtividade}</td>
                  <td>{progresso.distanciaPercorrida} km</td>
                  <td>{progresso.distanciaRestante} km</td>
                  <td>{progresso.valorMeta} km</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Nenhum progresso de meta encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Relatorios;
