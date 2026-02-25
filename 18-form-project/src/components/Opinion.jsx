import { use } from "react";
import { OpinionsContext} from '../store/opinions-context.jsx'
import { useActionState , useOptimistic } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {

  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  // this hook is used to update values optimistically and the first argument should be the value that you want to update optimistically 
  // it should be only used with the form Action because the state generated but this hook will be temporary state ,that's only shown on the Ui whilst the form that invokes the optimistic function is being submitted and therefore this state will be thrown away and the actual UI state will be applied  
  // second parameter is a function that will invoked by react at a point of time defined bu us 
  // like every other hook this hook also returns an 
  // first value is optimistic vote state
  // second vaalue is a function that we want to use when evr we want to invoke this function 
  const [optimisticVotes , setVoteOptimistically] = useOptimistic(
    votes ,
    // inhere this second function will get all the parameters that are passed into the function but the first parameter will be fixed prevState and the others are simply the argument that are passed to the function (here the function is "setVoteOptimistically")
    (prevVotes ,mode) =>(mode === 'up' ? prevVotes + 1 :prevVotes - 1 )
  )

  async function Upvote(){
    setVoteOptimistically('up')
    await upvoteOpinion(id);
  }

  const [upvoteFormState, upvoteAction , upvoatePending] = useActionState(Upvote);

  async function Downvote(){
    setVoteOptimistically('down')
    await downvoteOpinion(id);
  }

  const [downvoteFormState , DownvoteAction , DownvotePending] = useActionState(Downvote);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upvoteAction} disabled={upvoatePending || DownvotePending}> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button formAction={DownvoteAction} disabled={upvoatePending || DownvotePending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
