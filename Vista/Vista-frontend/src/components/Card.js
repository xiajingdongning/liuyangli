import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

function Card({ favorites, cities }) {
  const currentCards = cities.filter((city) => favorites.includes(city._id))
    .map((city) => ({ ...city, name: city.CityName, url: city.imagePath }))
  console.log("currentCards", currentCards)

  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(()=>{
    setCurrentIndex(currentCards.length > 0 ? currentCards.length - 1 : null)
  },[currentCards.length])

  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(currentCards.length)
        .fill(0)
        .map(() => React.createRef()),
    [currentCards]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  };

  const [canGoBack, setCanGoBack] =useState(false); 
  const [canSwipe, setCanSwipe] =useState(false);

  useEffect(()=>{
    setCanGoBack(currentIndex !== null && currentIndex < currentCards.length - 1);
    setCanSwipe(currentIndex !== null && currentIndex >= 0 );
  }, [currentIndex])

  // const canGoBack = currentIndex < currentCards.length - 1 && currentIndex !== null;
  // const canSwipe = currentIndex >= 0 && currentIndex !== null;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // Check if childRefs[idx].current is not null before accessing restoreCard
    if (childRefs[idx].current && currentIndexRef.current >= idx) {
      childRefs[idx].current.restoreCard();
    }

    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    setCanSwipe(false)
    setCanGoBack(false)
    if (canSwipe && currentIndex < currentCards.length) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    setCanSwipe(false);
    setCanGoBack(false);
    const newIndex = currentIndex + 1
    await childRefs[newIndex].current.restoreCard();
    updateCurrentIndex(newIndex);
  };

  return (
    <div>
      <h1 className='ctitle'>Your City Collection</h1>
      <div className='cardContainer'>
        {currentCards.length === 0 ?(
          <p>No cities available for swiping.</p>
        ) : currentCards.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        {/* <button style={{ background: !canSwipe && '#b387ec' }} onClick={() => swipe('left')}>Swipe left!</button> */}
        <button style={{ background: !canGoBack && '#b387ec' }} onClick={() => goBack()}>Undo swipe!</button>
        {/* <button style={{ background: !canSwipe && '#b387ec' }} onClick={() => swipe('right')}>Swipe right!</button> */}
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card to see all your facorites!
        </h2>
      )}
    </div>
  )
}

export default Card;