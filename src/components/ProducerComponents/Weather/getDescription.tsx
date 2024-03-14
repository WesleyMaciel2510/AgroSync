export const getDescription = (code: number): string => {
  let description = '';

  switch (code) {
    case 0:
      description = 'Céu limpo';
      break;
    case 1:
      description = 'Parcialmente limpo';
      break;
    case 2:
      description = 'Parcialmente nublado';
      break;
    case 3:
      description = 'Nublado';
      break;
    case 45:
    case 48:
      description = 'Nevoeiro';
      break;
    case 51:
      description = 'Chuvisco Leve';
      break;
    case 53:
      description = 'Chuvisco Moderado';
      break;
    case 55:
      description = 'Chuvisco Intensidade densa';
      break;
    case 56:
      description = 'Chuvisco congelante Leve';
      break;
    case 57:
      description = 'Chuvisco congelante Intensidade densa';
      break;
    case 61:
      description = 'Chuva Intensidade leve';
      break;
    case 63:
      description = 'Chuva Intensidade moderada';
      break;
    case 65:
      description = 'Chuva Intensidade forte';
      break;
    case 66:
      description = 'Chuva congelante Intensidade leve';
      break;
    case 67:
      description = 'Chuva congelante Intensidade forte';
      break;
    case 71:
      description = 'Queda de neve Intensidade leve';
      break;
    case 73:
      description = 'Queda de neve Intensidade moderada';
      break;
    case 75:
      description = 'Queda de neve Intensidade forte';
      break;
    case 77:
      description = 'Flocos de neve';
      break;
    case 80:
      description = 'Chuvas Leve';
      break;
    case 81:
      description = 'Chuvas Moderado';
      break;
    case 82:
      description = 'Chuvas Violento';
      break;
    case 85:
      description = 'Neve Leve';
      break;
    case 86:
      description = 'Neve Forte';
      break;
    case 95:
      description = 'Trovoada Leve ou moderada';
      break;
    case 96:
      description = 'Trovoada com granizo leve';
      break;
    case 99:
      description = 'Trovoada com granizo pesado';
      break;
    default:
      // Encontrar o código existente mais próximo
      let nearestCode = Object.keys(descriptionMap)
        .map(Number)
        .reduce((prev, curr) =>
          Math.abs(curr - code) < Math.abs(prev - code) ? curr : prev,
        );

      // Definir a descrição com base no código existente mais próximo
      description = descriptionMap[nearestCode];
  }

  return description;
};

const descriptionMap: {[key: number]: string} = {
  0: 'Céu limpo',
  1: 'Parcialmente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Nevoeiro',
  48: 'Nevoeiro',
  51: 'Chuvisco Leve',
  53: 'Chuvisco Moderado',
  55: 'Chuvisco Intensidade densa',
  56: 'Chuvisco congelante Leve',
  57: 'Chuvisco congelante Intensidade densa',
  61: 'Chuva Intensidade leve',
  63: 'Chuva Intensidade moderada',
  65: 'Chuva Intensidade forte',
  66: 'Chuva congelante Intensidade leve',
  67: 'Chuva congelante Intensidade forte',
  71: 'Queda de neve Intensidade leve',
  73: 'Queda de neve Intensidade moderada',
  75: 'Queda de neve Intensidade forte',
  77: 'Flocos de neve',
  80: 'Chuvas Leve',
  81: 'Chuvas Moderado',
  82: 'Chuvas Violento',
  85: 'Neve Leve',
  86: 'Neve Forte',
  95: 'Trovoada Leve ou moderada',
  96: 'Trovoada com granizo leve',
  99: 'Trovoada com granizo pesado',
};
