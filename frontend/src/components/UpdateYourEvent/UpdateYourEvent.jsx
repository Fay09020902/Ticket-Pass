import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateYourEvent.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventThunk, getEventDetails } from '../../store/event';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import { useNavigate } from 'react-router-dom';

const UpdateYourEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { eventId } = useParams();
    const curEvent = useSelector(state => state.events.currEvent);


    useEffect(() => {
        dispatch(getEventDetails(eventId));
    }, [dispatch, eventId]);

    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('')
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('')
    const [img_url, setImg_URL] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (Object.keys(curEvent).length > 0) {
            setName(curEvent.name);
            setArtist(curEvent.artist)
            setType(curEvent.type);
            setDescription(curEvent.description);
            setAddress(curEvent.address);
            setCity(curEvent.city);
            setCountry(curEvent.country);
            setDate(curEvent.date),
            setTime(curEvent.time),
            setPrice(curEvent.price),
            setImg_URL(curEvent.img_url)
        }
    }, [curEvent]);


    const updateEvent = async (e) => {
        e.preventDefault();
        // const seatConfig = {rows, seatsPerRow}
        const updatedEvent = {
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
        }


        const response = await dispatch(updateEventThunk(updatedEvent, eventId));
        if (response) {
            navigate(`/events/${eventId}`);
        } else {
            const data = await response.json();
            console.log("error ", data)
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }
    }


    return (
        <div className='adding-event-container'>
            <div className="getstarted">
                <h2>Update Your Event</h2>
                <h4>
                    <span>Already have an account? </span>
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                        />
                </h4>
                <form className="newEventForm" onSubmit={updateEvent}>
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
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        <div className='create_events_errors'>
                        {errors.description && <p>{errors.description}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="EventType">Event Type</label>
                        <input type="text" value={type} onChange={e => setType(e.target.value)} />
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
                        <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
                        <div className='create_events_errors'>
                        {errors.price && <p>{errors.price}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="img_url">Image</label>
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
                    <div className='sbmtbtn'>
                        <button>Submit</button>
                    </div>
                    <div className='create_events_errors'>
                        {errors && (
                            <>
                            <p>{errors?.title}</p>
                            <p>{errors?.message}</p>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateYourEvent
