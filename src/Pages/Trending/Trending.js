import axios from "axios";
import { useEffect, useState} from "react";
import Content from "../../components/Content/Content";
import './Trending.css';
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const fetchTrending = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=7329c681935a5359d0e7296b7906f048&page=${page}`);
        setContent(data.results);
        console.log(data.results);
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
          <span className="pageTitle">Trending Today</span>
          <div className="trendingstuff">
            {content &&
              content.map((c) => (
                <Content
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type={c.media_type}
                  vote_average={c.vote_average}
                />
              ))}
          </div>
          <CustomPagination setPage={setPage} />
        </div>
    );

};

export default Trending;