import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookItem = ({ id, title, excerpt, book }) => {
  const [data, setData] = useState({
    imgUrl: "",
    author: "",
    isLoaded: false,
  });

  useEffect(() => {
    const { featured_media, author } = book;
    const getImageUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`);
    const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`);

    Promise.all([getImageUrl, getAuthor])
      .then((res) => {
        setData({
          imgUrl: res[0].data.media_details.sizes.full.source_url,
          author: res[1].data.name,
          isLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  if (data.isLoaded) {
    return (
      <>
        <h3>{title}</h3>
        <small>
          Review by <strong>{data.author}</strong>
        </small>
        <img style={{ width: "100%" }} src={data.imgUrl} alt={title.rendered} />
        <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
        <Link to={`/book/${id}`}>Book Reviewed</Link>
        <hr />
      </>
    );
  }

  return null;
};

export default BookItem;
