import { NavLink } from 'react-router-dom';


function ConcertList({ concerts }) {
    return (
        <div className="concert-list">
            {Object.values(concerts).map(concert => (

                    <div className="concert-card" key={concert.id}>
                    <NavLink to={`/events/${concert.id}`}  className="image-detail-link">
                        <img src={concert.img_url} alt={concert.name} />
                        </NavLink>
                        <div className="concert-info">
                            <h3 className="concert-name">{concert.name}</h3>
                            <p><strong>Artist:</strong> {concert.artist}</p>
                            <p><strong>Type:</strong> {concert.type}</p>
                            <p><strong>Date:</strong> {concert.date}</p>
                            <p><strong>Time:</strong> {concert.time}</p>
                            <p><strong>Venue:</strong> {concert.address}, {concert.city}</p>
                            <p><strong>Price:</strong> ${concert.price}</p>
                        </div>
                    </div>
            ))}
        </div>
    );
}

export default ConcertList;
