const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
};

export async function buscarHoteis(
  destId: string,
  destType: string,
  checkin: string,
  checkout: string,
  adultos: number,
  criancas: number,
  quartos: number
) {
 const params = new URLSearchParams({
  adults_number: String(adultos),
  room_number: String(quartos),
  page_number: "0",
  dest_type: destType,
  order_by: "popularity",
  filter_by_currency: "BRL",
  units: "metric",
  checkin_date: checkin,
  checkout_date: checkout,
  dest_id: destId,
  locale: "pt-br",
  include_adjacency: "true",
});

if (criancas > 0) {
  params.append("children_number", String(criancas));
  params.append(
    "children_ages",
    Array(criancas).fill(5).join(",")
  );
}
  const url =
    `https://booking-com.p.rapidapi.com/v2/hotels/search?${params}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("Status:", response.status);
    console.log("Resposta:", await response.text());
    throw new Error("Erro ao buscar hotéis");
  }

  return await response.json();
}

export async function buscarDetalhesHotel(
  hotelId: string,
  checkin: string,
  checkout: string
) {
  const params = new URLSearchParams({
    hotel_id: hotelId,
    checkin_date: checkin,
    checkout_date: checkout,
    currency: "BRL",
    locale: "pt-br",
  });

  const url =
    `https://booking-com.p.rapidapi.com/v2/hotels/details?${params}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("Status:", response.status);
    console.log("Resposta:", await response.text());
    throw new Error("Erro ao buscar detalhes do hotel");
  }

  return await response.json();
}

export async function buscarDescricaoHotel(hotelId: string) {
  const params = new URLSearchParams({
    hotel_id: hotelId,
    locale: "pt-br",
  });

  const url =
    `https://booking-com.p.rapidapi.com/v2/hotels/description?${params}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("Status:", response.status);
    console.log("Resposta:", await response.text());
    throw new Error("Erro ao buscar descrição do hotel");
  }

  return await response.json();
}

export async function buscarFotosHotel(hotelId: string) {
  const params = new URLSearchParams({
    hotel_id: hotelId,
    locale: "pt-br",
  });

  const url =
    `https://booking-com.p.rapidapi.com/v1/hotels/photos?${params}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("Status:", response.status);
    console.log("Resposta:", await response.text());
    throw new Error("Erro ao buscar fotos do hotel");
  }

  return await response.json();
}

export async function buscarLocal(nomeCidade: string) {
  const params = new URLSearchParams({
    name: nomeCidade,
    locale: "pt-br",
  });

  const url =
    `https://booking-com.p.rapidapi.com/v1/hotels/locations?${params}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("Status:", response.status);
    console.log("Resposta:", await response.text());
    throw new Error("Erro ao buscar cidade");
  }

  return await response.json();
}