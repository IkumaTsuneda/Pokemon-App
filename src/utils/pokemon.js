export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        //フェッチできた場合、取得したデータをjson形式で返却する
        fetch(url)
        .then((res) => res.json()
        .then((data) => resolve(data)));
    });
};

export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        //フェッチできた場合、取得したデータをjson形式で返却する
        fetch(url).then((res) => res.json()
        .then((data) => {
            console.log(data);
            resolve(data)}));
    })
}