import { useState } from 'react';
import './AddYourEvent.css';
import { useDispatch } from 'react-redux';
import { addEventThunk } from '../../store/event';
import { useNavigate } from 'react-router-dom';

const AddYourEvent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [img_url, setImg_URL] = useState('');
    const [country, setCountry] = useState('');
    const [rows, setRows] = useState(5);
    const [seatsPerRow, setSeatsPerRow] = useState(5);
    const [errors, setErrors] = useState({});

    const eventTypes = ["R&B", "Rock", "Pop", "Blues", "Jazz"];
    const dispatch = useDispatch();

    const addNewEvent = async (e) => {
        e.preventDefault();
        setErrors({});
        const seatConfig = { rows, seatsPerRow };
        const newEvent = {
            name,
            artist,
            description,
            type,
            address,
            city,
            country,
            img_url,
            time,
            date,
            price,
            "ticketavailability": true
        };

        // Validate date and time
        const eventDateTime = new Date(`${date}T${time}`);
        const currentDate = new Date();
        if (eventDateTime < currentDate) {
            setErrors({ date: 'Event date and time must be in the future.' });
            return;
        }

        try {
            const response = await dispatch(addEventThunk(newEvent, seatConfig));
            if (response) {
                alert('Event created successfully');
                navigate(`/events/${response.id}`);
            }
        } catch (res) {
            const data = await res.json();
            // console.log(data)
            if (data && data.errors) {
                setErrors(data.errors);
            } else {
                setErrors({ message: data.title });
            }
        }
    };

    return (
        <div className='adding-event-container'>
            <div className="getstarted">
                <h2>Get started</h2>
                <form className="newEventForm" onSubmit={addNewEvent}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.name && <p>{errors.name}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="artist">Artist</label>
                        <input type="text" value={artist} onChange={e => setArtist(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.artist && <p>{errors.artist}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.description && <p>{errors.description}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="EventType">Event Type</label>
                        <select value={type} onChange={e => setType(e.target.value)}>
                            <option value="">Select Event Type</option>
                            {eventTypes.map((eventType, index) => (
                                <option key={index} value={eventType}>{eventType}</option>
                            ))}
                        </select>
                        <div className='create_events_errors'>
                            {errors.type && <p>{errors.type}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="Address">Address</label>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.address && <p>{errors.address}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="City">City</label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.city && <p>{errors.city}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="Country">Country</label>
                        <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.country && <p>{errors.country}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} step="0.1"/>
                        <div className='create_events_errors'>
                            {errors.price && <p>{errors.price}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="img_url">Image URL</label>
                        <input type="text" value={img_url} onChange={e => setImg_URL(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.img_url && <p>{errors.img_url}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.time && <p>{errors.time}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        <div className='create_events_errors'>
                            {errors.date && <p>{errors.date}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="rows">Number of Rows</label>
                        <input type="number" id="rows" value={rows} onChange={e => setRows(e.target.value)} min="1" max="20" />
                        <div className='create_events_errors'>
                            {errors.rows && <p>{errors.rows}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="seatsPerRow">Seats Per Row</label>
                        <input type="number" id="seatsPerRow" value={seatsPerRow} onChange={e => setSeatsPerRow(e.target.value)} min="1" max="20" />
                        <div className='create_events_errors'>
                            {errors.seatsPerRow && <p>{errors.seatsPerRow}</p>}
                        </div>
                    </div>
                    <div className='sbmtbtn'>
                        <button type="submit">Submit</button>
                    </div>
                    <div className='create_events_errors'>
                        {errors && (
                            <>
                                <p>{errors.message}</p>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddYourEvent;
