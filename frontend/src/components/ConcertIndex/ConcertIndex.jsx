import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getEvents } from '../../store/event';
import ConcertFilter from './ConcertFilter';
import ConcertList from './ConcertList';
import './ConcertIndex.css';

function ConcertIndex() {
    const dispatch = useDispatch();
    const allConcerts = useSelector(state => state.events.events);
    const [distinctLocations, setDistinctLocations] = useState([]);
    const [distinctTypes, setDistinctTypes] = useState([])
    // const [filteredConcerts, setFilteredConcerts] = useState(allConcerts);
    const [filterSettings, setFilterSettings] = useState({
        location: '',
        type: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(getEvents()).then(() => {
        setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
        if (!loading) {
          setDistinctLocations([...new Set(Object.values(allConcerts).map(c => c.city))]);
          setDistinctTypes([...new Set(Object.values(allConcerts).map(c => c.type))]);
        }
      }, [allConcerts, loading]);

    const handleFilterChange = (selectedLocation, selectedType) => {
        // console.log("handleFilterChange runs")
        setFilterSettings({"location":selectedLocation, "type": selectedType})
    };

    const filteredConcerts = useMemo(() => {
        // console.log("current filterSettings: ", filterSettings)
        const rsl =  Object.values(allConcerts).filter(concert =>
            (filterSettings.location ? concert.city === filterSettings.location : true) &&
            (filterSettings.type ? concert.type === filterSettings.type : true)
        );
        return rsl
    }, [filterSettings, allConcerts]);

    if (loading) {
        return <div className="loading">Loading...</div>;
      }

    return (
        <div>
            <div>
                <ConcertFilter onFilterChange={handleFilterChange} locations={distinctLocations} types={distinctTypes}/>
            </div>
            <div className="concert-index">
                <ConcertList concerts={filteredConcerts} />
            </div>
        </div>
    );
}

export default ConcertIndex;
