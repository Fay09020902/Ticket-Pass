import { Link } from 'react-router-dom';

function ConcertList({concerts}) {

    return (
        <div className="concert-list">
            {Object.values(concerts).map(concert => (
                <div key={concert.id} className="concert-card">
                    <img src={concert.img_url} alt={concert.name} />
                    <div className="concert-info">
                        <h3>{concert.name}</h3>
                        <p><strong>Artist:</strong> {concert.artist}</p>
                        <p><strong>Type:</strong> {concert.type}</p>
                        <p><strong>Date:</strong> {concert.date}</p>
                        <p><strong>Time:</strong> {concert.time}</p>
                        <p><strong>Venue:</strong> {concert.address}, {concert.city}</p>
                        <p><strong>Price:</strong> ${concert.price.toFixed(2)}</p>
                        {concert.ticketavailability ? (
                        <Link to={`/concerts/${concert.id}`} className="btn">Buy Tickets</Link>
                        ) : (
                        <p className="sold-out">Sold Out</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ConcertList;