import React, { useImperativeHandle, useRef, useState } from "react";

const TextField = React.forwardRef((props, ref) => {
	const [wasTouched, setTouched] = useState(false);
	const [isValid, setValid] = useState(true);
	const textRef = useRef("");
	const [text, setText] = useState("");
	var isInvalid = !isValid && wasTouched;

	const validityCheck = (value) => {
		if (props.validityFunc(value)) setValid(true);
		else setValid(false);
	};

	const onChange = () => {
		setText(textRef.current.value);
	};
	const onKeyUp = () => {
		validityCheck(text);
	};
	const externalTouch = () => {
		setTouched(true);
		validityCheck(text);
	};

	useImperativeHandle(ref, () => {
		return {
			touch: externalTouch,
			isValid: !isInvalid,
			value: text,
		};
	});

	return (
		<div
			className={`flex flex-col gap-3 transition-all group ease-out duration-300 overflow-hidden ${
				isInvalid ? "h-[90px]" : "h-[55px]"
			}`}
		>
			<input
				onFocus={() => setTouched(true)}
				value={text}
				onChange={onChange}
				onKeyUp={onKeyUp}
				ref={textRef}
				type={props.type}
				placeholder={props.placeholder}
				className={`${props.className} border-2 border-solid border-gray-700 bg-gray-700 text-gray-300 p-3 rounded-lg text-lx outline-none focus:border-sky-600 transition-all ease-in-out duration-200 group-hover:bg-gray-600 group-hover:border-gray-600`}
			/>
			<div className="text-rose-500 text-sm">{props.error}</div>
		</div>
	);
});

export default TextField;
