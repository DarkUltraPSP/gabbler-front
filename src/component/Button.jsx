const Button = ({ onClick, children, ...props }) => {
    return (
      <button
        {...props}
        onClick={onClick}
        className={`text-ash-grey rounded-full bg-english-violet ${props.className} hover:bg-purple-taupe ease-in-out duration-100`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  