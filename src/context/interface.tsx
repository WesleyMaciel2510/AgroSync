export interface SchedulingInfo {
  DataAgendamento: string;
  IDAgendamento: number;
  IDCarga: number;
  NomeProduto: string;
  Observacao: string;
  PesoProduto: string;
  Quantidade: string;
  Status: string;
}

export interface LoadInfo {
  Destino: string;
  ID: number;
  NomeDestino: string;
  NomeMotorista: string;
  NomeOrigem: string;
  NomeProduto: string;
  Origem: string;
  Peso: string;
  PlacaCaminhão: string;
  PrazoEntrega: string;
}
