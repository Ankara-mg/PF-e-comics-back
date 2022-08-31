import axios from "axios"

export const getComics = async () => {
    try {
        const comics: (object)[] = []
        let listSeries = `https://comicvine.gamespot.com/api/series_list/?api_key=49e9caca6b1b3b836f076299d5a84df4e9ab60a1&format=json`
        let dataList = await axios.get(listSeries)
        // console.log(dataList)
        dataList.data.results.map((e: any) => {
            return comics.push({
                name: e.name,
                id: e.id,
                image: e.image.original_url,
                description: e.deck,
                release: e.date_added.slice(' '),
                episodes: e.count_of_episodes
            })
        })
        console.log(comics)
        return comics
    } catch (error) {
        console.log(error)
    }
    
}
console.log(getComics())