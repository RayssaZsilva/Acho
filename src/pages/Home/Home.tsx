import SearchBar from "../../components/common/SearchBar";
import HotelCard from "../../components/hotel/HotelCard";
import hotel1 from "../../assets/img/hotel1.jpg";
import hotel2 from "../../assets/img/hotel2.jpg";
import "./Home.css";
import "../../components/layout/header.css"


function  Home () {
      const hotels = [
                {
                    id: 1,
                    nome: "Resort",
                    cidade: "SP",
                    avaliacao: 4.8,
                    preco: 1200,
                    imagem: hotel1,
                },

            {
                id: 2,
                nome: "Pousada Cerra",
                cidade: "Monte verde",
                avaliacao: 4.7,
                preco: 1000,
                imagem: hotel2,

            } ,

            {
              id: 3,
                nome: "Pousada",
                cidade: "Monte",
                avaliacao: 4.7,
                preco: 1000,
                imagem: hotel2,
            
            },
        ];

    return(
    <main>
        <section>
        <p>Olá!</p>
        <h1>Encontre sua proxima hospedagem.</h1>

        <p>Compare os preços entre milhares de hotéis. </p>

        <SearchBar/>

        </section>

        <section>
            <h3>Proximos de você:... </h3>


        <div className="hotel-list">
    {hotels.map((hotel)=>(
        <HotelCard
        key={hotel.id}
        nome={hotel.nome}
        cidade={hotel.cidade}
        imagem={hotel.imagem}
        avaliacao={hotel.avaliacao}
        preco={hotel.preco}
        />
        
    ))}  
    </div>   
        </section>

        <section>
            <h3>Mais bem avaliados:..</h3>
            <div>...</div>
        </section>

        <section>
            <h3>Promoções:...</h3>
            <div>...</div>
        </section>
        </main>
    );
}

export default Home;