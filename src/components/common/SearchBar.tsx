import "../../components/common/searchBar.css"

function SearchBar () {
    return(
    <div className="search-bar">
        <input 
        type="text"
        placeholder="Para onde você vai"
        
        />
        <button>Buscar</button>
    </div>

    );
}

export default SearchBar;

