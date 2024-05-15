import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { loadCurTicketsThunk } from "../../store/ticket";

const MyTickets = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const allCurTickets = useSelector(state => state.tickets);
    useEffect(() => {
        dispatch(loadCurTicketsThunk(user.id));
    }, [dispatch]);


    // const handleRemoveRestaurant = (restaurantId) => {
    //     dispatch(deleteRestaurantThunk(restaurantId))
    //   }



    if (!allCurTickets.length) return <div>No Session Tickets</div>;

    return (
        <div className="myRestaurants">
            {Object.values(allCurTickets)
                        .map(ticket => (
                            {ticket}
                        ))
                    }
        </div>
    )
}

export default MyTickets
