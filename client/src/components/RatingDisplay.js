import React from 'react';

export default function RatingDisplay(props) {
  return !props.value ? (
    <div className="rating">
	  <span>
        <i className="far fa-star"></i>
		<i className="far fa-star"></i>
		<i className="far fa-star"></i>
		<i className="far fa-star"></i>
		<i className="far fa-star"></i>
      </span>
	</div>
	
  ) : (
  
    <div className="rating">
      <span>
        <i
          className={
            props.value >= 1
              ? "fas fa-star"
              : props.value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 2
              ? "fas fa-star"
              : props.value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 3
              ? "fas fa-star"
              : props.value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 4
              ? "fas fa-star"
              : props.value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 5
              ? "fas fa-star"
              : props.value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
    </div>
  );
}

