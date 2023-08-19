import './Video.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CityDataService from "../services/cities";
import ReviewsDataService from '../services/reviews';
import favoritesService from '../services/favorites';


function Video({ user }) {
  const params = useParams()
  const { id: cityId } = params;

  const currentUserId = user?.googleId; 
  const currentUsername = user?.name;

  const [city, setCity] = useState(null);
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cityName, setCityName] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const commentTextarea = useRef(null);

  useEffect(() => {
    console.log(currentUserId);
    if (cityId && cityId !== 'undefined') {
      CityDataService.getCityById(cityId)
        .then((response) => {
          setCity(response.data)
          setCityName(response.data.CityName);
        })

        .catch(error => {
          console.error('Error fetching cities:', error);
        });

      ReviewsDataService.getReviews(cityId)
        .then(response => {
          console.log("Received reviews: ", response);
          setCommentsList(response.data);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }

    if (currentUserId) {
      favoritesService.getFavorites(currentUserId)
        .then(favorites => {
          setFavorites(favorites || []);
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    }

  }, [cityId, currentUserId]);

  
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment) {
      alert("Please write the comment to submit");
      return;
    }
    event.preventDefault();

    if (editingReviewId) {
      handleUpdate(editingReviewId, { review: comment });
    } else {
      

      ReviewsDataService.postReview({ review: comment, city_id: cityId, user_id: currentUserId, city_name: cityName, name: currentUsername })
        .then(response => {
          if (response.data.status === "success") {
            console.log("Comment saved successfully", response);
            const newComment = {
              _id: response.data.response.insertedId,
              review: comment,
              name: currentUsername,
              user_id: currentUserId
            };
            const updatedCommentsList = [...commentsList, newComment];
            setCommentsList(updatedCommentsList);
            setEditingReviewId(null);
          } else {
            console.error("Failed to save the comment:", response.data.error);
          }

          setComment('');
        })
        .catch(error => {
          console.error('Error submitting the comment:', error);
        });
    }

  };

  const handleUpdate = (reviewId, updatedData) => {
    ReviewsDataService.updateReview(reviewId, updatedData)
      .then(response => {
        if (response.data.status === "success") {
          const updatedReviews = commentsList.map(review =>
            review._id === reviewId ? { ...review, review: updatedData.review } : review
          );
          setCommentsList(updatedReviews);

          setComment('');
          if (editingReviewId) {
            setEditingReviewId(null);
          }

          console.log("Review updated successfully");
        } else {
          console.error("Failed to update the review:", response.data.error);
        }
      })
      .catch(error => {
        console.error('Error updating the review:', error);
      });
  };

  const handleEditClick = (review) => {
    setComment(review.review);
    setEditingReviewId(review._id);
    setEditingReview(review);

    if (commentTextarea.current) {
      commentTextarea.current.focus();
    }
  };

  const handleDeleteClick = (reviewId) => {
    if (!reviewId) {
      console.error('Review ID is undefined.');
      return;
    }
    ReviewsDataService.deleteReview(reviewId)
      .then(response => {
        setCommentsList(commentsList.filter(r => r._id !== reviewId));
        setEditingReviewId(null);
      })
      .catch(error => {
        console.error("Failed to delete review:", error);
      });
  };

  const handleStarClick = async () => {
    if (!currentUserId) {
      alert("Please login");
      return;
    }
    
    const updatedFavorites = favorites.includes(cityId)
      ? favorites.filter(favId => favId !== cityId)
      : [...favorites, cityId];

    try {
      await favoritesService.updateFavorite(currentUserId, updatedFavorites);
      setFavorites(updatedFavorites);
      console.log("Successfully updated favorites");
    } catch (error) {
      console.error("Failed to update favorites:", error);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="Video">
        {/* <video controls width="100%" height="auto">
          <source src="https://youtu.be/W8_nIQtv5x4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <iframe width="1920" height="960" src={city && city.youtubeLink + "?vq=2160"} title={`Video`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        
      <div
        className={`comment-container ${isHovering ? '' : 'collapsed'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className={`hint ${isHovering ? '' : 'collapsed'}`}>Hover/Click Here to Comment ▼</p>

        {/* Left Comment Box */}
        <div className="comment-left-box">
          <div className={`comment-bar ${isHovering ? '' : 'collapsed'}`}>
            <form onSubmit={handleSubmit}>
              <textarea
                ref={commentTextarea}
                value={comment}
                onChange={handleCommentChange}
                placeholder={
                  editingReview ? 'Edit your comment here' :
                  currentUserId
                    ? 'Write your comment here'
                    : 'Please log in to leave a comment.'
                }
                rows="6"
                cols="90"
                disabled={!currentUserId}
              />
              <br />
              <button type="submit" className={`button-style ${isHovering ? '' : 'collapsed'}`} disabled={!currentUserId}>
              {editingReview ? 'Save Edit' : 'Submit Comment'}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Star Box */}
        <div className="comment-middle-box">
          <div className={`star-icon ${favorites.includes(cityId) ? '' : 'empty'}`} onClick={handleStarClick}>
            {favorites.includes(cityId) ? '★' : '☆'}
          </div>
          <p className ='star-hint'>Save to Your City Collection</p>
        </div>

        {/* Right Comment Box */}
        <div className={`comment-right-box ${isHovering ? '' : 'collapsed'}`}>
          <div className={`comment-bar ${isHovering ? '' : 'collapsed'}`}>
          <div className='commentBox'>
          {commentsList.map((review, index) => (
          <div key={index} className="review-text">
          <div className="comment-content">
            <div className="comment-shape">
              {review.name}: {review.review}
            </div>

            {review.user_id === currentUserId && (
              <div className="action-buttons">
                <div className="edit" onClick={() => handleEditClick(review)}>
                  Edit
                </div>
                <div className="delete" onClick={() => handleDeleteClick(review._id)}>
                  Delete
                </div>
              </div>
            )}
          </div>
          </div>
          ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Video;

