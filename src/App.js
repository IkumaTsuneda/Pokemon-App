import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //データロード中の状態変数
  const [loading, setloding] = useState(true);
  //ポケモンの詳細データ
  const [pokemonData, setPokemonData] = useState([]);
  //次ページのポケモンのデータ
  const [nextURL, setNextURL] = useState([]);
  //前ページのポケモンのデータ
  const [prevURL, setPrevURL] = useState([]);

  useEffect(() => {
    /** ポケモンのデータ取得処理 */
    const fetchPolemonData = async () => {
      //ポケモンの基本データを取得
      let res = await getAllPokemon(initialURL);
      //ポケモンの詳細データを取得
      loadPokemon(res.results);
      //次のページのポケモンのデータをセット
      setNextURL(res.next);
      setloding(false);
    };
    fetchPolemonData();
  }, []);

  /** ポケモン詳細データ取得処理 */
  const loadPokemon = async (data) => {
    //1ページ分(20件)のポケモンの詳細を取得する
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        //引数で受け取ったURLに紐づくポケモンのデータを取得する
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  /** 「前へ」ボタン押下時のポケモンデータ取得処理 */
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setloding(true);
    //ポケモンの基本データを取得
    let data = await getAllPokemon(prevURL);
    //ポケモンの詳細データを取得
    await loadPokemon(data.results);
    //ポケモンの詳細データを取得
    await loadPokemon(data.results);
    //前のページのポケモンのデータをセット
    setPrevURL(data.previous);
    //次のページのポケモンのデータをセット
    setNextURL(data.next);
    setloding(false);
  };

  /** 「次へ」ボタン押下時のポケモンデータ取得処理 */
  const handleNextPage = async () => {
    setloding(true);
    //ポケモンの基本データを取得
    let data = await getAllPokemon(nextURL);
    //ポケモンの詳細データを取得
    await loadPokemon(data.results);
    //次のページのポケモンのデータをセット
    setNextURL(data.next);
    //前のページのポケモンのデータをセット
    setPrevURL(data.previous);
    setloding(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Now Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
