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
  url?: string;
};

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export async function buscarHoteis(
  cidade: string = ""
): Promise<HotelLocal[]> {
  if (!cidade.trim()) {
    return hotels as HotelLocal[];
  }

  const cidadeNormalizada = normalizarTexto(cidade);

  return (hotels as HotelLocal[]).filter((hotel) => {
    const cidadeHotel = normalizarTexto(hotel.cidade);
    const estadoHotel = normalizarTexto(hotel.estado);
    const nomeHotel = normalizarTexto(hotel.nome);

    return (
      cidadeHotel.includes(cidadeNormalizada) ||
      estadoHotel.includes(cidadeNormalizada) ||
      nomeHotel.includes(cidadeNormalizada)
    );
  });
}

export async function buscarHotelPorId(
  id: number
): Promise<HotelLocal | undefined> {
  return (hotels as HotelLocal[]).find(
    (hotel) => hotel.id === id
  );
}

export async function buscarMaisAvaliados(): Promise<
  HotelLocal[]
> {
  return [...(hotels as HotelLocal[])]
    .sort((a, b) => b.avaliacao - a.avaliacao)
    .slice(0, 3);
}

export async function buscarPromocoes(): Promise<
  HotelLocal[]
> {
  return [...(hotels as HotelLocal[])]
    .sort((a, b) => a.preco - b.preco)
    .slice(0, 3);
}