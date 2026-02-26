export default function Error({title , message}){
    return (
        <div className="error">
            <p>{title}</p>
            <p>{message}</p>
        </div>
    )
}