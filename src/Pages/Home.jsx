import { useEffect, useState } from "react";
import Card from "../Layout/Cards";
import axios from "axios";
import AllCardData from "../Layout/AllCardData";

const Home = () => {
    const [rawData, setRawData] = useState([]);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("Jenis Masakan");
    const [selectedRating, setSelectedRating] = useState("Rating");
    const [underated, setUnderated] = useState(false);

    const reset = () => {
        setSelectedCategories("Jenis Masakan");
        setSelectedRating("Rating");
    };

    const fetchRestaurants = async () => {
        await axios
            .get("https://restaurant-api.dicoding.dev/list")
            .then((response) => {
                setRawData(response.data.restaurants);
            })
            .then((error) => {
                console.error(error);
            });
    };

    const handleFilterData = async () => {
        if (selectedCategories !== "Jenis Masakan") {
            await axios
                .get(
                    `https://restaurant-api.dicoding.dev/search?q=${selectedCategories}`
                )
                .then((res) => {
                    setData(res.data.restaurants);
                });
        }
    };

    const fetchCategories = async () => {
        try {
            const promiseCategory = rawData.map(async (res) => {
                const response = await axios.get(
                    `https://restaurant-api.dicoding.dev/detail/${res.id}`
                );
                return response.data.restaurant.categories[0];
            });
            const categoryData = await Promise.all(promiseCategory);
            setCategories(categoryData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [rawData]);

    useEffect(() => {
        handleFilterData();
    }, [selectedCategories]);

    const mergingData = categories.reduce((result, obj) => {
        if (!result[obj.name]) {
            result[obj.name] = obj;
        }
        return result;
    }, {});

    const MergedData = Object.values(mergingData);

    const newRating = [...new Set(rawData.map((res) => res.rating))];

    return (
        <div className="px-10 pt-3">
            <div className="px-3">
                <h1 className="text-2xl font-bold mb-1">Indonesian worldwide Food Restaurant</h1>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
                    atque veniam neque est nostrum laudantium aspernatur nam perspiciatis
                    voluptates, ipsum magni?
                </p>
            </div>
            <div className="flex justify-between py-3 px-4">
                <div className="space-x-4">
                    <h1 className="inline">Filter By:</h1>
                    <select
                        name="Price"
                        id=""
                        className="p-2 rounded-sm"
                        onChange={(e) => setSelectedRating(e.target.value)}
                        value={selectedRating}>
                        <option value="Rating">Rating</option>
                        {newRating.map((res, key) => {
                            return (
                                <option key={key} value={res}>
                                    {res}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        name="Categories"
                        className="p-2 rounded-sm"
                        onChange={(e) => setSelectedCategories(e.target.value)}
                        value={selectedCategories}>
                        <option value={"Jenis Masakan"}>Jenis Masakan</option>
                        {MergedData.map((res, key) => {
                            return (
                                <option key={key} value={res.name}>
                                    {res.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="justify-end inline ">
                    <button onClick={reset} className="p-2 mr-28 bg-indigo-950 text-white rounded-sm">Clear All</button>
                </div>
            </div>
            <div className="px-4">
                <h1 className="py-6 text-2xl">All Restaurant</h1>
                {selectedCategories !== "Jenis Masakan" ? (
                    <Card data={data} selectedRating={selectedRating} />
                ) : (
                    <AllCardData rawData={rawData} selectedRating={selectedRating} />
                )}
            </div>
        </div>
    );
};
export default Home;
