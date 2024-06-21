import { useState } from 'react';
import SideBar from './SideBar';
import MyTickets from './MyTickets';
import MyEvents from './MyEvents';
import MyPosts from './MyPosts'
import './AccountPage.css';

const AccountPage = () => {
    const [selectedTab, setSelectedTab] = useState('myTickets');

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
    }

    return (
        <div className="account-page-container">
            <div className="sidebar" >
                <SideBar handleTabSelect={handleTabSelect}/>
            </div>
            <div className="main-content">
                {selectedTab === 'myEvents' && <MyEvents />}
                {selectedTab === 'account' && <div>Feature is coming.</div>}
                {selectedTab === 'myTickets' && <MyTickets />}
                {selectedTab === 'myPosts' && <MyPosts />}
            </div>
        </div>
    );
}

export default AccountPage;
