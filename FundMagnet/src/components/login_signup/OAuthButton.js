const OAuthButton = (props) => {
	return (
		<button
			onClick={props.onClick}
			className={`${props.className} border-2 text-gray-200 border-zinc-700 p-3 bg-zinc-700 text-lg rounded-lg hover:bg-zinc-600 hover:border-zinc-600 transition-all ease-in-out duration-200`}
		>
			<span className="flex flex-row gap-10 align-middle mx-auto justify-center">
				<img src={props.image} width={30} alt="oauth" />
				<div className="mt-1">{props.text}</div>
			</span>
		</button>
	);
};

export default OAuthButton;
