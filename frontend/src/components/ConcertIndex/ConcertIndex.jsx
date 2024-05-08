import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getEvents } from '../../store/event';
import ConcertFilter from './ConcertFilter';
import ConcertList from './ConcertList';
import './ConcertIndex.css';

function ConcertIndex() {
    const dispatch = useDispatch();
    const allConcerts = useSelector(state => state.events.events);
    const [distinctLocations, setDistinctLocations] = useState([]);
    const [filteredConcerts, setFilteredConcerts] = useState(allConcerts);
    // console.log("concertIndex render")
    // console.log("filtered Concerts: ", filteredConcerts)
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    useEffect(() => {
        // Get distinct locations
        setDistinctLocations([...new Set(Object.values(allConcerts).map(c => c.city))]);
    }, [allConcerts]);

    const handleLocationChange = (selectedLocation) => {
        if (selectedLocation === 'all') {
            setFilteredConcerts(allConcerts);
        } else {
            const filtered = Object.values(allConcerts).filter(concert => concert.city === selectedLocation);
            setFilteredConcerts(filtered);
        }
    };

    return (
        <div>
            <div>
                <ConcertFilter onLocationChange={handleLocationChange} locations={distinctLocations} />
            </div>
            <div className="concert-index">
                    {Object.values(filteredConcerts).length > 0 ? (
                        <ConcertList concerts={filteredConcerts} />
                    ) : (
                        <ConcertList concerts={allConcerts} />
                    )}
            </div>
        </div>
    );
}

export default ConcertIndex;
