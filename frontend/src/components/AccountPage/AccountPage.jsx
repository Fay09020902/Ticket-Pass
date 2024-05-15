import { useState } from 'react';
import SideBar from './SideBar';
import AccountInfo from './AccountInfo';
import MyTickets from './MyTickets';
import './AccountPage.css';

const AccountPage = () => {
    const [selectedTab, setSelectedTab] = useState('account');

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
    }

    return (
        <div className="account-page-container">
            <div className="sidebar">
                <SideBar handleTabSelect={handleTabSelect}/>
            </div>
            <div className="main-content">
                {selectedTab === 'account' && <div>Account</div>}
                {selectedTab === 'myRestaurants' && <MyTickets />}
            </div>
        </div>
    );
}

export default AccountPage;
