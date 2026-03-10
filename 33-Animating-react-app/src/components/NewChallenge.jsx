import { useContext, useRef, useState } from 'react';
// for applying animation imperative way instead of declarative for that we need this animation hook 
import { motion , useAnimate , stagger } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  // this hook returns two values scope and animate 
  // 1] first element is ref which you can add to elements 
  // 2] second element will be a function you can use in your code to imperatively trigger a certain animation 
  const [scope , animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      // here we wan to set out animate function if anu input field is wrong 
      // inside this animate you have to pass a string where you use a CSS selector too target the element for animation like given below
      // the second argument you can pass an object where you describe the animation that should be played 
      // as a third argument you can pass a configuration object to animate that allows you to configure how the animation will be played 
      animate('input , textarea' , { x:[-5 , -10 , 0 , 10 , 0] } , {type : 'spring' , duration : 1 , delay : stagger(0.09) });
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      {/* here we pass the scope ref so this form's input fields and textarea will be affected by the animation only */}
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul 
          initial="hidden"
          animate="visible"
          // stagger : that means display the elements of the list one by one in a order not together we can fo this in framer-motion
          variants={{
            // here the provided time will be the delay between the child items 
            visible : { transition : { staggerChildren : 0.05 } }
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            <motion.li
              // here this animation will be active when ever the parent component animation is active 
              variants={{
                hidden : { opacity : 0, scale : 0.5 },
                // if you use array for the values it will work as a keyframe ad go through the every value 
                visible : { opacity : 1 , scale : [0.8 , 1.3 , 1] },
              }}
              // here you should not use the variant name like his instead use the values directly
              // exit="visible"

              exit={{opacity : 1 , scale : 1}}
              transition={{type : 'spring'}}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
