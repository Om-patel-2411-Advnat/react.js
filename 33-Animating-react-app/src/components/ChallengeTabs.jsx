import { motion } from 'framer-motion';

import Badge from './Badge.jsx';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect} 
      >
        {children}
        {/* now here we applied the animation to the badge but it's only happening one time so for making it re animate we will do this by adding a key to it */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {/* by just adding this id framer-motion do some magic behind the seen and apply animation automatically */}
      {/* it will detect when ever you are rendering the same element with the same layoutId in a different place of your page and it will automatically play smooth animation */}
      {isSelected && <motion.div layoutId='tab-indicator' className="active-tab-indicator" />}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
