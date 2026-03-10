import { useContext, useState } from 'react';
import { AnimatePresence , motion } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);

  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* this mode props will make the other element wait till the upper element complete it's animation here the default is sync so they both happens in a sync */}
        <AnimatePresence mode='wait'>
          {displayedChallenges.length > 0 && (
            <motion.ol
              // the reason behind adding key is that we have two elements into the one AnimatePresence component so we have to add key so framer motion keep them apart not combine them  
              key="list"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ y : -30 , opacity : 0 }}
              className="challenge-items"
            >
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id}
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          {displayedChallenges.length === 0 && 
            <motion.p 
              key="fallback" 
              initial={{ opacity : 0 , y : -20 }} 
              animate={{ opacity : 1 , y : 0 }}
              exit={{ opacity : 0 , y : -20 }}
            >
              No challenges found.
            </motion.p>
          }
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}
