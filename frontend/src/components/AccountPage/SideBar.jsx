const SideBar = ({handleTabSelect}) => {
    return (
        <div>
            <button className="tab" onClick={() => handleTabSelect('account')}>
            Account Info
            </button>
            <button className="tab" onClick={() => handleTabSelect('myTickets')}>
            My Tickets
            </button>
            <button className="tab" onClick={() => handleTabSelect('myEvents')}>
            My Events
            </button>
    </div>
    )
}

export default SideBar
