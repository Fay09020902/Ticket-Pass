import { useEffect, useState } from 'react';

function ConcertFilter({ onFilterChange, locations, types}) {
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')
    // console.log("cuurent location ", location)
    // console.log("current type ", type)

    useEffect(() => {
        // console.log("on filter change runs")
        onFilterChange(location, type);
    }, [location, type]);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value)
    };

    return (
        <section className="concert-filters">
            <div className="location-filter">
                <select id="location-select" onChange={handleLocationChange}>
                    <option value="">All Locations</option>
                    {locations.map(l => (
                        <option value={l} key={l}>{l}</option>
                    ))}
                </select>
            </div>
            <div className="type-filter">
                <select id="type-select" onChange={handleTypeChange}>
                    <option value="">All Concerts</option>
                    {types.map(l => (
                        <option value={l} key={l}>{l}</option>
                    ))}
                </select>
            </div>
        </section>
    );
}

export default ConcertFilter;
