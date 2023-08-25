import { Link } from "react-router-dom";

const AllCardData = ({ rawData, selectedRating }) => { 
    return (
      <div className="grid grid-cols-4 grid-rows-2">
        {rawData.map((res, key) => (
          <div className={res.rating < selectedRating || res.rating > selectedRating ? 'hidden' : 'block'} key={key}>
            <div className="p-3 border w-64">
              <img
                src={`https://restaurant-api.dicoding.dev/images/medium/${res.pictureId}`}
                alt="gambar makanan"
                width={300}
              />
              <h1 className="font-bold">{res.name}</h1>
              <p>{res.rating}</p>
              <div className="flex justify-between">
                <p>{res.city} - $$$$</p>
                <p>OPEN NOW</p>
              </div>
              <div className="text-center p-2 bg-indigo-950 text-white mt-4">
                <Link to={`/detail/${res.id}`}>LEARN MORE</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default AllCardData;
