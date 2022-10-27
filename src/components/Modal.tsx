import React, { useEffect } from "react";
import MicroModal from "react-micro-modal";
import "react-micro-modal/dist/index.css";
import { FaTimes } from "react-icons/fa";

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
	children: React.ReactNode;
	title: string;
	open: boolean;
	setOpen: StateSetter<boolean>;
	darkMode: boolean;
}

const Modal: React.FC<Props> = ({
	children,
	title,
	open,
	setOpen,
	darkMode,
}): JSX.Element => {
	return (
		<MicroModal
			open={open}
			handleClose={() => setOpen(false)}
			closeOnEscapePress
			closeOnOverlayClick
			overrides={{
				Dialog: {
					style: {
						padding: "15px 0 0 0",
						backgroundColor: `${darkMode ? "#111827" : "#fff"}`,
						maxWidth: "none",
						maxHeight: "60%",
						width: "60%",
						height: "auto",
						overflow: "hidden",
					},
				},
			}}
			// closeOnAnimationEnd
		>
			{close => (
				<>
					<div
						className={`flex ${
							title ? "justify-between" : "justify-end"
						} relative px-5`}
					>
						{title && (
							<div>
								<strong className="text-2xl font-bold text-gray-800 dark:text-gray-100">
									Select a definition
								</strong>
							</div>
						)}
						<div
							className="text-2xl cursor-pointer"
							onClick={close}
						>
							<FaTimes size={25} color="#3b82f6" />
						</div>
					</div>
					<div className="py-3 pb-0">{children}</div>
				</>
			)}
		</MicroModal>
	);
};

export default Modal;
