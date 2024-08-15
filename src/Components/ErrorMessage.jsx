export default function ErrorMessage({message}) {
    return (
        <div className="errorMessage text-danger">
           {message}
        </div>
    )
}