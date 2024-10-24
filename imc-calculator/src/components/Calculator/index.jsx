import React, { useState } from 'react';
import styles from './calculator.module.css';

function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [imc, setImc] = useState(null);
  const [classification, setClassification] = useState('');
  const [recommendations, setRecommendations] = useState({});

  const calculateIMC = (e) => {
    e.preventDefault();
    if (height && weight) {
      const imcValue = (weight / ((height / 100) ** 2)).toFixed(2);
      setImc(imcValue);
      const classificationResult = getIMCClassification(imcValue);
      setClassification(classificationResult.classification);
      setRecommendations(classificationResult.recommendations);
    }
  };

  const getIMCClassification = (imcValue) => {
    if (imcValue < 18.5) {
      return {
        classification: 'Abaixo do peso',
        recommendations: {
          food: 'Aumentar a ingestão de calorias com alimentos ricos em nutrientes, como proteínas magras, carboidratos saudáveis e gorduras boas.',
          exercise: 'Foco em exercícios de resistência para ganho de massa muscular, como musculação.'
        }
      };
    }
    if (imcValue >= 18.5 && imcValue < 24.9) {
      return {
        classification: 'Peso normal',
        recommendations: {
          food: 'Manter uma dieta equilibrada, rica em frutas, vegetais, proteínas e carboidratos integrais.',
          exercise: 'Praticar atividades físicas regulares, como caminhada, corrida ou natação.'
        }
      };
    }
    if (imcValue >= 25 && imcValue < 29.9) {
      return {
        classification: 'Sobrepeso',
        recommendations: {
          food: 'Reduzir o consumo de calorias e evitar alimentos processados e açúcares, optando por proteínas magras e vegetais.',
          exercise: 'Exercícios aeróbicos, como caminhada rápida, e treinos de força para perda de peso.'
        }
      };
    }
    if (imcValue >= 30 && imcValue < 34.9) {
      return {
        classification: 'Obesidade grau 1',
        recommendations: {
          food: 'Adotar uma dieta com déficit calórico e alimentos integrais, evitando alimentos ricos em açúcar e gorduras saturadas.',
          exercise: 'Exercícios moderados a intensos, como ciclismo e musculação, supervisionados por um profissional de saúde.'
        }
      };
    }
    if (imcValue >= 35 && imcValue < 39.9) {
      return {
        classification: 'Obesidade grau 2',
        recommendations: {
          food: 'Consulta com um nutricionista para planejamento de dieta com déficit calórico e opções saudáveis.',
          exercise: 'Exercícios leves a moderados sob supervisão, com foco em atividades que não sobrecarreguem as articulações.'
        }
      };
    }
    return {
      classification: 'Obesidade grau 3',
      recommendations: {
        food: 'Acompanhamento médico e dietético para uma dieta controlada, com redução de calorias e alimentos altamente nutritivos.',
        exercise: 'Atividades físicas supervisionadas e leves, como hidroginástica ou caminhadas curtas.'
      }
    };
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <h1>Calculadora de IMC</h1>
        <form onSubmit={calculateIMC}>
          <div>
            <label>Altura (cm): </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Digite sua altura"
              className={styles.input}
            />
          </div>
          <div>
            <label>Peso (kg): </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Digite seu peso"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Calcular IMC</button>
        </form>

        {imc && (
          <div>
            <h2>Seu IMC: {imc}</h2>
            <h3>Classificação: {classification}</h3>
            <table className={styles.recommendationsTable}>
              <thead>
                <tr>
                  <th>Aspecto</th>
                  <th>Recomendação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alimentação</td>
                  <td>{recommendations.food}</td>
                </tr>
                <tr>
                  <td>Exercícios</td>
                  <td>{recommendations.exercise}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
