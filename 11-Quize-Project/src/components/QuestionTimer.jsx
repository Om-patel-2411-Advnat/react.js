import { useEffect , useState } from "react"


export default function QuestionTimer({ onConfirm , TIMER , mode}){

    const [remainingTime , setRemainingTime] = useState(0)

    useEffect(() => {
        const interval = setInterval(()=>{
            setRemainingTime(prevTime => prevTime + 100);
        },100)

        return () => {
            clearInterval(interval)
        }
    } ,[])

    useEffect(() => {
        let timer = setTimeout(() => {
            onConfirm();
        }, TIMER)

        return () => {
            clearTimeout(timer);
        }
    }, [onConfirm])

    return (
        <progress id="question-time" value={remainingTime} max={TIMER} className={mode} />
    )
}