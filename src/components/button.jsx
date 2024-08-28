export const SubmitButton = ({handleSubmit, text}) => {
    return (
        <button
          className="p-4 bg-primary text-white w-[300px] font-semibold"
          onClick={handleSubmit}
        >
          {text}
        </button>
    )
}