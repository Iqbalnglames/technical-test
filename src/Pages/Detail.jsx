import axios from "axios";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const DetailData = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const handleDetailData = async () => {
        await axios
            .get(`https://restaurant-api.dicoding.dev/detail/${id}`)
            .then((res) => {
                setData(res.data.restaurant);
            });
    };

    useState(() => {
        handleDetailData();
    }, [id]);

    const category = data.categories
        ? data.categories.map((res) => res.name).join(", ")
        : "";
    const foods = data.menus?.foods
        ? data.menus.foods.map((res) => res.name).join(", ")
        : "";
    const drinks = data.menus?.drinks
        ? data.menus.drinks.map((res) => res.name).join(", ")
        : "";

    return (
        <div className="border border-gray-200 mx-10">
            <div className="px-10 py-4">
                <Link to={'/'} className="py-2 px-3 bg-indigo-950 rounded-sm text-white">&#60; Kembali Ke halaman awal</Link>
                <h1 className="text-2xl font-bold mt-3">Detail Restaurant</h1>
                <img
                    className="mt-5"
                    src={`https://restaurant-api.dicoding.dev/images/medium/${data.pictureId}`}
                    width={400}
                    alt="gambar toko"
                />
                <div className="space-y-2 mt-3">
                    <h1 className="font-bold">Toko {data.name}</h1>
                    <p className="font-normal">{data.description}</p>
                    <h1 className="font-bold">
                        Alamat:
                        <p className="font-normal">
                            {data.address}, {data.city}
                        </p>
                    </h1>
                    <h1 className="font-bold">
                        Menu yang disediakan
                        <h1>Makanan: </h1>
                        <p className="font-normal">{foods}</p>
                        <h1>Minuman: </h1>
                        <p className="font-normal">{drinks}</p>
                    </h1>
                    <h1 className="font-bold">Kategori: <p className="font-normal">{category}</p></h1>
                </div>
            </div>
        </div>
    );
};
export default DetailData;
