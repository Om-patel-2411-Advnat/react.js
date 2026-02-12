export default function Button({onSelect , userdata}){
    return (
        <button className="toggle-btn" onClick={() => onSelect('isyearly')}>
            {userdata.isyearly ?
            (<span className="toggle-option active">Yearly</span>) :
            (<span className="toggle-option">Monthly</span>)}
        </button>
    )
}