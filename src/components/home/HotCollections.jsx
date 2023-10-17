import React, { useEffect, useState , Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotCollections = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    // Fetch data from the URL
    fetch('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections')
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




  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

        <OwlCarousel className='owl-theme' loop margin={10} nav>
            {data.map((item, index) => (
                <div key={index}>
                <div className="nft_coll">
                <div className="nft_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/${item.authorId}`}>
                    <img className="lazy pp-coll" src={item.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC-{item.code}</span>
                </div>
              </div>
              </div>

            ))}

        </OwlCarousel>


        </div>
      </div>
    </section>
  );
};

export default HotCollections;
