import { useState } from "react";
import PropTypes from 'prop-types';


export function TodoForm({ onSubmit }) {
	const [newItem, setNewItem] = useState("");

	// To modfiy existing data we need to pass a function as per the below example (This is then used on the onSubmit below)
	function handleSubmit(e) {
		e.preventDefault();

        if (newItem === "") return

        onSubmit(newItem);

		setNewItem("");
	}    

    return (
		<form onSubmit={handleSubmit} className="new-item-form">
			<div className="form-row">
				<label htmlFor="item">Add New Item</label>
				<input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    id="item"
                />
			</div>
			<button className="btn">Add</button>
		</form>        
    )    
}
TodoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};