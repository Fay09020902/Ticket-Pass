import { useSelector } from 'react-redux';

const AccountInfo = () => {
    const user = useSelector(state => state.session.user);
    return (
        <div className="accountInfo-container">
            <div className="accountInfo-header">Basic Info</div>
            <div className="accountInfo-section">
                <div className="accountInfo-label">Username</div>
                <div className="accountInfo-value">{user.username}</div>
            </div>
            <div className="accountInfo-section">
                <div className="accountInfo-label">Email</div>
                <div className="accountInfo-value">{user.email}</div>
            </div>
        </div>
    );
}

export default AccountInfo;
