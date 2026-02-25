// this hook can not be used in the same component as we are using the "useActionState" hook into the component you can use it into the sub-child component that are used into this component here we are going to create new component for that called submit component
// import { useFormStatus } from 'react-dom';


import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";


export function NewOpinion() {

  const { addOpinion } = use(OpinionsContext)

  async function submitAction(prevState, formData) {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const textbody = formData.get('body');

    let error = [];

    if (title.trim().length < 5) {
      error.push("please enter valid Title....");
    }
    if (textbody.trim().length < 10 || textbody.trim().length > 300) {
      error.push("Please enter enough body ...")
    }
    if (!userName.trim()) {
      error.push("Please provide useName...");
    }

    if (error.length > 0) {
      return {
        error, enteredValues: { userName, title, textbody, },
      };
    }

    await addOpinion({userName , title , body : textbody})
    console.log(userName, title, textbody);

    return { error: null }
  }

    const [formState, formAction] = useActionState(submitAction, { error: null })

    return (
      <div id="new-opinion">
        <h2>Share your opinion!</h2>
        <form action={formAction}>
          <div className="control-row">
            <p className="control">
              <label htmlFor="userName">Your Name</label>
              <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
            </p>

            <p className="control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
            </p>
          </div>
          <p className="control">
            <label htmlFor="body">Your Opinion</label>
            <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.textbody}></textarea>
          </p>
           <Submit />
        </form>
        {formState.error &&
          <ul>
            {formState.error.map(error =>
              <li key={error}>
                {error}
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
