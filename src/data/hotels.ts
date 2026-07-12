import saoPaulo from "./sao-paulo.json";
import rio from "./rio-de-janeiro.json";
import gramado from "./gramado.json";

const hotels = [
  ...saoPaulo,
  ...rio,
  ...gramado,
];

export default hotels;