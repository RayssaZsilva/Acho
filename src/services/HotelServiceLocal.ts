import hotels from "../data/hotels";

export type HotelLocal = {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  preco: number;
  avaliacao: number;
  imagem: string;
  galeria: string[];
  descricao: string;
  comodidades: string[];
  latitude: number;
  longitude: number;
};

export async function buscarHoteis(
  cidade: string = ""
): Promise<HotelLocal[]> {
  if (!cidade.trim()) {
    return hotels as HotelLocal[];
  }

  return (hotels as HotelLocal[]).filter((hotel) =>
    hotel.cidade
      .toLowerCase()
      .includes(cidade.toLowerCase())
  );
}

export async function buscarHotelPorId(
  id: number
): Promise<HotelLocal | undefined> {
  return (hotels as HotelLocal[]).find(
    (hotel) => hotel.id === id
  );
}

export async function buscarMaisAvaliados(): Promise<HotelLocal[]> {
  return [...(hotels as HotelLocal[])].sort(
    (a, b) => b.avaliacao - a.avaliacao
  );
}

export async function buscarPromocoes(): Promise<HotelLocal[]> {
  return [...(hotels as HotelLocal[])]
    .sort((a, b) => a.preco - b.preco)
    .slice(0, 10);
}