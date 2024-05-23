import { useState } from 'react';
import './AddYourEvent.css';
import { useDispatch } from 'react-redux';
import { addEventThunk } from '../../store/event';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import { useNavigate } from 'react-router-dom';

const AddYourEvent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        artist: '',
        description: '',
        type: '',
        address: '',
        city: '',
        date: '',
        time: '',
        price: '',
        img_url: '',
        country: ''
    });

    const [errors, setErrors] = useState({});
    const eventTypes = ["R&B", "Rock", "Pop", "Blues", "Jazz"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateFormData = () => {
        const { name, date, time } = formData;
        const newErrors = {};

        if (!name) newErrors.name = 'Event name is required';
        else if (name.length > 100) newErrors.name = 'Event name must be less than 100 characters';

        const eventDateTime = new Date(`${date}T${time}`);
        const currentDate = new Date();
        if (eventDateTime < currentDate) newErrors.date = 'Event date and time must be in the future';

        return newErrors;
    };

    const addNewEvent = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        const validationErrors = validateFormData();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const { name, artist, description, type, address, city, date, time, price, img_url, country } = formData;

        if (!name || !artist || !description || !type || !address || !city || !date || !time || !price || !img_url || !country) {
            setErrors({ message: 'Please fill in all fields' });
            return;
        }

        const seatConfig = { rows: 5, seatsPerRow: 5 }; // Default values for seat configuration
        const newEvent = {
            ...formData,
            time,
            date: new Date(date),
            "ticketavailability": true
        };

        console.log('Submitting new event:', newEvent); // Debug log

        try {
            const response = await dispatch(addEventThunk(newEvent, seatConfig));
            if (response && response.id) {
                alert('Event created successfully');
                navigate(`/events/${response.id}`);
            } else {
                throw new Error('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error); // Debug log
            const errorData = error.response?.data || {};
            if (errorData.errors) {
                setErrors(errorData.errors);
            } else {
                setErrors({ message: errorData.message || 'An unknown error occurred' });
            }
        }
    };

    return (
        <div className='adding-event-container'>
            <div className="getstarted">
                <h2>Get started</h2>
                <h4>
                    <span>Already have an account? </span>
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                </h4>
                <form className="newEventForm" onSubmit={addNewEvent}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.name && <p>{errors.name}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="artist">Artist</label>
                        <input type="text" name="artist" value={formData.artist} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.artist && <p>{errors.artist}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.description && <p>{errors.description}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="EventType">Event Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
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
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.address && <p>{errors.address}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.city && <p>{errors.city}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.country && <p>{errors.country}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.1" />
                        <div className='create_events_errors'>
                            {errors.price && <p>{errors.price}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="img_url">Image</label>
                        <input type="text" name="img_url" value={formData.img_url} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.img_url && <p>{errors.img_url}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="time" name="time" value={formData.time} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.time && <p>{errors.time}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        <div className='create_events_errors'>
                            {errors.date && <p>{errors.date}</p>}
                        </div>
                    </div>
                    <div className='sbmtbtn'>
                        <button>Submit</button>
                    </div>
                    <div className='create_events_errors'>
                        {errors.message && <p>{errors.message}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddYourEvent;

