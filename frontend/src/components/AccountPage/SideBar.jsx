const SideBar = ({handleTabSelect}) => {
    return (
        <div>
            <button className="tab" onClick={() => handleTabSelect('myTickets')}>
            My Tickets
            </button>
            <button className="tab" onClick={() => handleTabSelect('myEvents')}>
            My Events
            </button>
            <button className="tab" onClick={() => handleTabSelect('myPosts')}>
            My Posts
            </button>
    </div>
    )
}

export default SideBar
