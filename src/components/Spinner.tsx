import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
	return (
		<div className="w-full h-screen flex flex-1 items-center justify-center">
			<FaSpinner
				size={40}
				color={"rgb(59 130 246)"}
				className="animate-spin"
			/>
		</div>
	);
};

export default Spinner;
