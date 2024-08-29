export const SubmitButton = ({handleSubmit, text}) => {
    return (
        <button
          className="p-4 bg-primary text-white w-[350px] font-semibold rounded-md"
          onClick={handleSubmit}
        >
          {text}
        </button>
    )
}