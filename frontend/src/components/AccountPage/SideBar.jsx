const SideBar = ({handleTabSelect}) => {
    return (
        <div className="sidebar">
            <button className="tab" onClick={() => handleTabSelect('account')}>
            Account Info
            </button>
            <button className="tab" onClick={() => handleTabSelect('myRestaurants')}>
            My Restaurants
            </button>
    </div>
    )
}

export default SideBar
