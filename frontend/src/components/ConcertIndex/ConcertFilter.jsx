import { useEffect, useState } from 'react';

function ConcertFilter({ onFilterChange, locations, types }) {
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        onFilterChange(location, type);
    }, [location, type]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    return (
        <section className="concert-filters">
            <div className="filter-container">
                <select id="location-select" value={location} onChange={handleLocationChange} className="filter-select">
                    <option value="">All Locations</option>
                    {locations.map(l => (
                        <option value={l} key={l}>{l}</option>
                    ))}
                </select>
                <select id="type-select" value={type} onChange={handleTypeChange} className="filter-select">
                    <option value="">All Concerts</option>
                    {types.map(t => (
                        <option value={t} key={t}>{t}</option>
                    ))}
                </select>
            </div>
        </section>
    );
}

export default ConcertFilter;
