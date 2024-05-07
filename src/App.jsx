import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const App = () => {
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});

	const [cursorVariant, setCursorVariant] = useState("default");

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);
	const variants = {
		default: {
			x: mousePosition.x - 16,
			y: mousePosition.y - 16,
			scale: 1,
			transition: { duration: 0.1 },
		},
		text: {
			x: mousePosition.x - 75,
			y: mousePosition.y - 75,
			backgroundColor: "white",
			mixBlendMode: "difference",
			scale: 4,
			transition: { duration: 0.2 },
		},
	};

	const textEnter = () => setCursorVariant("text");
	const textLeave = () => setCursorVariant("default");

	return (
		<div className="flex items-center justify-center h-screen bg-white">
			<h1
				onMouseEnter={textEnter}
				onMouseLeave={textLeave}
				className="font-extrabold text-8xl"
			>
				Hello World!
			</h1>

			<motion.div
				variants={variants}
				animate={cursorVariant}
				transition={{ duration: 0.2 }}
				className="bg-[#000] h-10 w-10 rounded-full fixed top-0 left-0 pointer-events-none"
			/>
		</div>
	);
};

export default App;
