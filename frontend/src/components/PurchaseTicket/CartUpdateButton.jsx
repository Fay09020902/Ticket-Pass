import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addCartItem, removeCartItem } from "../../redux/cart";

export default function CartUpdateButton({ item }) {
	const dispatch = useDispatch()

	const addItem = () => { 
		dispatch(addCartItem(item))
	}
	const removeItem = () => {
		dispatch(removeCartItem(item));
	};

	return (
		<div className="CartUpdate">
			<span onClick={addItem}>
				<FaCaretUp />
			</span>
			<span onClick={removeItem}>
				<FaCaretDown />
			</span>
		</div>
	);
}
