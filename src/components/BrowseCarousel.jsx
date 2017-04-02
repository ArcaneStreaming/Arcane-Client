import React, { Component } from 'react'
import Slider from 'react-slick'
import Tile from './Tile'

const url = "http://localhost:8000/";

const responsiveSettings = [
  {
      breakpoint: 560,
      settings: {
         slidesToShow: 3
      }
   },
  {
      breakpoint: 770,
      settings: {
         slidesToShow: 4
      }
   },
   {
      breakpoint: 1060,
      settings: {
         slidesToShow: 6
      }
   }
]

const settings = {
   dots: false,
   infinite: true,
   arrows: true,
   slidesToShow: 8,
   slidesToScroll: 4,
   centerMode: false,
   autoplay:true,
   autoplaySpeed: 5000,
   speed:2500,
   useCSS:true,
   responsive: responsiveSettings
}

const styles = {
  outerDiv:  {
    marginBottom:20,
    height: 'calc((100vh - 64px) * .33 )',
     minHeight: 'calc((100vh - 64px) * .25 )',
     width: '100%'
  },
  label:{
    margin:0,
    position:'relative',
    top:20,
    left:5,
    color:'white',
    textShadow:'1px 1px 1px black',
    zIndex:1
  },
  sliderItem: {
    paddingLeft:2.5,
    paddingRight:2.5,
    borderRadius:2
  }
}

export default class BrowseCarousel extends Component {
  constructor(props) {
    super(props);
  }
  select = () => {
     console.info("Selected!");
  }
  getProps(type, item) {
    let props = {};
    if (type === "album")
      props = {
        imgURL: item.artwork ? item.artwork : url+'static/images/default-artwork.png',
        title:item.name,
        subtitle: item.artist,
        tracks: item.tracks
      };
    if (type === "artist")
      props = {
        imgURL: item.cover_photo ? item.cover_photo : url+'static/images/default-avatar.png',
        title:item.name,
        subtitle: item.genre,
        albums: item.albums
      }
    if (type === "genre")
      props = {
        imgURL: item.icon ? item.icon : url+'static/images/base_icons/hip_hop.png',
        title:item.name,
        subtitle: null,
        artists: item.artists
      }
    return props;
  }
   renderSliderItems(list) {
     const {type} = this.props;
     let items = list ? list.map((item) => (
       <div
         className="boxTile"
         key={'browse_carousel_item_'+ item.id}
         style={styles.sliderItem}
       >
         <Tile
           {...this.props}
           {...this.getProps(type, item)}
           id={item.id}
           type={type}
         />
       </div>
     )) : [<div key={'browse_carousel_item_empty'} />];
        return items;
   }

   render() {
     const {list, label} = this.props;
     return (
       <div style={styles.outerDiv}>
         <h3 style={styles.label}>{label}</h3>
         <Slider {...settings}
           className="slickSlider"
         >
           {this.renderSliderItems(list.results)}
         </Slider>
       </div>

      );
   }
}
