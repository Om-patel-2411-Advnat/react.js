export default function Places({ 
  title, 
  places, 
  fallbackText, 
  onSelectPlace ,
  isFetching ,
  loadingText
}) {
  console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isFetching && <p className="fallback-text">{ loadingText }</p>}
      {(!isFetching && places.length === 0) && <p className="fallback-text">{fallbackText}</p>}
      {(!isFetching && places.length > 0) && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                {/* we can not do this directly because the backend data will be not available like this for that we have to send request from the server  */}
                {/* <img src={place.image.src} alt={place.image.alt} /> */}
                {/* this is how we can get teh images */}
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
