import React, { useEffect, useState , Component } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

import CountdownTimer from './CountdownTimer';

// function CountdownTimer({ initialCountdown }) {
//   const [countdown, setCountdown] = useState(initialCountdown);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown((prevCountdown) => prevCountdown - 1);
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return {countdown};
// }

const NewItems = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    // Fetch data from the URL
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    //     setLoaded(true);
    //console.log(data);
        return response.json();
      })
      .then((data) => {
        // Assuming the response is an array, you can set it to the state
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // this work no countdown
  // const convertTimestampToTime = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const seconds = date.getSeconds();
  //   return `${hours}:${minutes}:${seconds}`;
  // };


  

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* {new Array(4).fill(0).map((_, index) => ( */}
          {data.map((item, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                
                {/* <div className="de_countdown">{  }</div> */}
                <CountdownTimer initialCountdown={item.expiryDate} />

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
