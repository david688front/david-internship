import React, { useEffect, useState , Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import AOS from "aos";

const HotCollections = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);

  useEffect(() => {
    // Fetch data from the URL
    setIsLoading(true);
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
        setIsLoading(false);
        AOS.init();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
    

  const options = {
    loop: true ,
    margin: 10, 
    items: 4 ,
    dots: false, 
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 4,
      },
    },
  }


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

        <OwlCarousel className='owl-theme' {...options}>
            {isLoading ? data.map((item) => (
               <div key={item.id}>
               <div className="nft_coll">
               <div className="nft_wrap">
               <Link to={`/item-details/${item.nftId}`} data-aos="fade-in">
                   <img src={item.nftImage} className="lazy img-fluid" alt="" />
                 </Link>
               </div>
               <div className="nft_coll_pp">
                 <Link to={`/author/${item.authorId}`}>
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
            ))
                  : data.map((item) => (

                <div key={item.id}>
                <div className="nft_coll">
                <div className="nft_wrap">
                <Skeleton
                        width="100%"
                        height="200px"
                        borderRadius="8px"
                      />

                </div>
                <div className="nft_coll_pp">
                        <Skeleton
                          width="40px"
                          height="40px"
                          borderRadius="50%"
                        />
                  <i className="fa fa-check"></i>

                </div>
                <div className="nft_coll_info">
                <Skeleton
                          width="70%"
                          height="24px"
                          borderRadius="4px"
                        />
                        <Skeleton
                          width="40%"
                          height="18px"
                          borderRadius="4px"
                        />
                  

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
