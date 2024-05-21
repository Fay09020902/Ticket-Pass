import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import {getEventDetails} from '../../store/event'
import './EventDetailPage.css'


export const formatTime = (time) => {
    const splitTime = time.split(":");
    if (Number(splitTime[0]) <= 12) {
      if (Number(splitTime[0]) === 12 && Number(splitTime[1]) === 0)
        return `${time} AM`;
      else if (Number(splitTime[0]) === 12) return `${time} PM`;
      else return `${time} AM`;
    } else {
      const newTime = Number(splitTime[0]) - 12;
      return `${newTime}:00 PM`;
    }
  };

  export const formatDate = (date) => {
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }
    const splitOne = date.split('-')
    const year = splitOne[0]
    const month = splitOne[1]
    let day = splitOne[2]
    day = day.split('T')[0]
    return `${months[month]} ${day}, ${year}`
}

function EventDetailPage() {

    const {eventId} = useParams();
    const dispatch = useDispatch();
    const curEvent = useSelector(state => state.events.currEvent);
    const [error, setError] = useState('')
    const [section, setSection] = useState('EventDetails_event')

    const showSection = (sectionId) => {
        setSection(sectionId)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getEventDetails(eventId));
            } catch (error) {
                setError(error.toString());
            }
        };
        fetchData();
    }, [dispatch, eventId]);



    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='event-detail-container'>
            <div className='title-type'>
                <p>{curEvent.type}</p>
                <h1>{curEvent.name}</h1>
                <p>Artist: {curEvent.artist}</p>
            </div>
            <div className="EventDetails_nav">
                <button onClick={() => showSection('EventDetails_event')} className={`EventDetails__anchor ${section === 'EventDetails_event' ? 'EventDetails__anchor--active' : ''}`}>Event</button>
                <button onClick={() => showSection('EventDetails_about')} className={`EventDetails__anchor ${section === 'EventDetails_about' ? 'EventDetails__anchor--active' : ''}`}>About</button>
                <button onClick={() => showSection('EventDetails_comments')} className={`EventDetails__anchor ${section === 'EventDetails_comments' ? 'EventDetails__anchor--active' : ''}`}>Reviews</button>
            </div>
            {section === 'EventDetails_event' && (
                <div id='EventDetails_event'>
                    <p>Address: {curEvent.address}, {curEvent.city}, {curEvent.country}</p>
                    <p>Date: {formatDate(curEvent.date)}</p>
                    <p>Time: {curEvent.time}</p>
                    <p className="price">Price: ${curEvent.price}</p>
                    {/* <p className="tickets-available">Tickets Available: {curEvent.ticketavailability ? 'Yes' : 'No'}</p> */}
                    <h3 className="hosted-by">Hosted by: {curEvent.User?.firstName} {curEvent.User?.lastName}</h3>
                </div>
                )
            }
            {section === 'EventDetails_about' && (
                <div id='EventDetails_about'>
                    <p>{curEvent.description}</p>
                </div>
                )
            }
            {section === 'EventDetails_comments' && (
                <div id='EventDetails_comments'>
                    <h3>Comments:</h3>
                    {curEvent.Comments?.map(comment => (
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            <small>-- {comment.User?.name}</small>
                        </div>
                    ))}
            </div>)
            }
            <div></div>
            <NavLink to={`/events/${eventId}/seats`} className='ticketLink'>Find Tickets</NavLink>
        </div>
    )
}

export default EventDetailPage;
