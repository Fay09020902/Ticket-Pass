import { useEffect, useState } from 'react';

function ConcertFilter({ onLocationChange, locations}) {
    const [location, setLocation] = useState('')

    useEffect(() => {
        if (location) {
            onLocationChange(location);
        }
    }, [location]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    return (
        <section className="concert-filters">
            <div className="location-filter">
                <select id="location-select" onChange={handleLocationChange}>
                    <option value="" disabled>Select location</option>
                    <option value="all">All Locations</option>
                    {locations.map(l => (
                        <option value={l} key={l}>{l}</option>
                    ))}
                </select>
            </div>
        </section>
    );
}

export default ConcertFilter;
