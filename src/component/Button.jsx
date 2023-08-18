 const Button = ({ onClick, children, ...props }) => {
    return (
      <button
        {...props}
        onClick={onClick}
        className={`text-ash-grey rounded-full bg-english-violet ${props.className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  