import { useState } from 'react';
import { Search } from 'lucide-react';

interface Exercise {
  name: string;
  muscle: string;
  description: string;
  instructions: string[];
  tips: string[];
}

const exerciseDatabase: Exercise[] = [
  {
    name: 'Band-resisted squat (deep)',
    muscle: 'Legs / Glutes',
    description: 'A deep squat variation with band resistance that emphasizes strength in the bottom position and teaches proper squat mechanics.',
    instructions: [
      'Place resistance band under both feet',
      'Bring band over shoulders, holding it in position',
      'Descend slowly for 3 seconds into a deep squat',
      'Pause at the bottom for 2 seconds',
      'Drive through heels to return to standing'
    ],
    tips: [
      'Focus on control during the descent',
      'Keep chest up and core engaged',
      'The pause at bottom builds strength in the weakest position'
    ]
  },
  {
    name: 'Cossack squats',
    muscle: 'Legs / Mobility',
    description: 'A lateral squat movement that builds single-leg strength and improves hip and ankle mobility.',
    instructions: [
      'Stand with feet wide apart',
      'Shift weight to one leg and bend that knee',
      'Lower into a deep side squat while keeping the other leg straight',
      'Keep heel of working leg flat on floor',
      'Push back to center and repeat on other side'
    ],
    tips: [
      'Go only as deep as you can control',
      'Keep the straight leg\'s toes pointed up',
      'Sit back into the hip, keep chest forward'
    ]
  },
  {
    name: 'Side lunges',
    muscle: 'Legs / Glutes',
    description: 'A lateral movement pattern that strengthens the legs while improving lateral mobility and stability.',
    instructions: [
      'Stand with feet hip-width apart',
      'Take a wide step to the side',
      'Bend the stepping leg while keeping the other straight',
      'Sit into the hip with chest forward',
      'Push back to starting position'
    ],
    tips: [
      'Keep weight in the heel of the bent leg',
      'Maintain upright torso',
      'Control the movement throughout'
    ]
  },
  {
    name: 'Single-leg calf raises',
    muscle: 'Calves',
    description: 'Isolated calf strengthening exercise that builds balance and unilateral lower leg strength.',
    instructions: [
      'Stand on one leg, other foot off the ground',
      'Rise up onto the ball of your foot',
      'Hold briefly at the top',
      'Lower slowly and with control',
      'Repeat for all reps before switching legs'
    ],
    tips: [
      'Use a wall for balance if needed',
      'Focus on slow, controlled movement',
      'Get full range of motion'
    ]
  },
  {
    name: 'Band-resisted side shuffle',
    muscle: 'Legs / Agility',
    description: 'A dynamic lateral movement drill that builds hip strength and improves lateral speed and agility.',
    instructions: [
      'Place resistance band around ankles or just above knees',
      'Get into athletic stance with knees bent',
      'Stay LOW throughout the movement',
      'Shuffle laterally maintaining constant tension',
      'Keep feet wide and don\'t let knees collapse inward'
    ],
    tips: [
      'Maintain athletic posture throughout',
      'Don\'t stand up while shuffling',
      'Keep tension in the band at all times'
    ]
  },
  {
    name: 'One-legged hops (in place)',
    muscle: 'Legs / Plyometric',
    description: 'Plyometric exercise that develops single-leg power and landing mechanics.',
    instructions: [
      'Stand on one leg',
      'Perform small hops in place',
      'Focus on soft landings with knee bent',
      'Maintain balance between each hop',
      'Complete all reps before switching legs'
    ],
    tips: [
      'Land quietly with control',
      'Keep knee aligned over toes',
      'Use arms for balance'
    ]
  },
  {
    name: 'One-leg hop → stick',
    muscle: 'Legs / Balance',
    description: 'Advanced plyometric drill focusing on explosive power and landing stability.',
    instructions: [
      'Stand on one leg',
      'Perform a single hop forward or in place',
      'Land and hold the position for 2 seconds',
      'Focus on stable, controlled landing',
      'Reset and repeat'
    ],
    tips: [
      'Quality over quantity',
      'Hold landing perfectly still',
      'Keep knee soft and aligned'
    ]
  },
  {
    name: 'Reaction step drill',
    muscle: 'Agility / Speed',
    description: 'Reactive agility drill that improves response time and multi-directional movement.',
    instructions: [
      'Get in athletic stance',
      'React to visual or auditory cues (clap, point, etc.)',
      'Move quickly in the indicated direction',
      'Return to center position',
      'Repeat for duration'
    ],
    tips: [
      'Stay light on your feet',
      'Keep knees bent and ready',
      'React as quickly as possible'
    ]
  },
  {
    name: 'Band single-leg Romanian deadlift',
    muscle: 'Hamstrings / Balance',
    description: 'Single-leg posterior chain exercise that builds hamstring strength and improves balance.',
    instructions: [
      'Place band under one foot and hold ends with both hands',
      'Stand on the banded foot',
      'Hinge at hip while extending free leg back',
      'Keep back straight and core engaged',
      'Return to standing position'
    ],
    tips: [
      'Keep standing knee slightly bent',
      'Maintain straight line from head to raised heel',
      'Control the movement both ways'
    ]
  },
  {
    name: 'Step-down (slow)',
    muscle: 'Legs / Stability',
    description: 'Eccentric single-leg exercise that builds knee stability and control.',
    instructions: [
      'Stand on elevated surface (step, box, or stairs)',
      'Slowly lower one foot toward the ground',
      'Control knee alignment throughout',
      'Lightly tap ground with heel',
      'Return to starting position with control'
    ],
    tips: [
      'Focus on 3-4 second descent',
      'Don\'t let knee cave inward',
      'Keep weight in heel of working leg'
    ]
  },
  {
    name: 'Dead bug',
    muscle: 'Core',
    description: 'Core stabilization exercise that teaches proper bracing while moving limbs independently.',
    instructions: [
      'Lie on back with arms extended toward ceiling',
      'Lift knees to 90 degrees',
      'Slowly extend opposite arm and leg',
      'Keep lower back pressed to floor',
      'Return and repeat on other side'
    ],
    tips: [
      'Move slowly and with control',
      'Don\'t let back arch off the ground',
      'Breathe steadily throughout'
    ]
  },
  {
    name: 'Single-leg balance (eyes closed)',
    muscle: 'Balance / Proprioception',
    description: 'Advanced balance drill that challenges proprioception and ankle stability.',
    instructions: [
      'Stand on one leg',
      'Find your balance with eyes open',
      'Close your eyes',
      'Hold position for prescribed time',
      'Focus on making small adjustments'
    ],
    tips: [
      'Start with eyes open if needed',
      'Use arms for balance',
      'Progress gradually with duration'
    ]
  },
  {
    name: 'Lunge jumps',
    muscle: 'Legs / Plyometric',
    description: 'Explosive plyometric exercise that develops lower body power and coordination.',
    instructions: [
      'Start in lunge position',
      'Jump explosively and switch legs in air',
      'Land softly in opposite lunge position',
      'Keep knee bent on landing',
      'Immediately repeat for next rep'
    ],
    tips: [
      'Land as quietly as possible',
      'Keep torso upright',
      'Focus on soft, controlled landings'
    ]
  },
  {
    name: 'One-legged forward hops',
    muscle: 'Legs / Power',
    description: 'Horizontal plyometric drill that builds single-leg power and landing mechanics.',
    instructions: [
      'Stand on one leg',
      'Hop forward explosively',
      'Focus on stable, controlled landing',
      'Reset position before next hop',
      'Complete all reps before switching legs'
    ],
    tips: [
      'Prioritize landing quality',
      'Keep knee aligned over toes',
      'Don\'t sacrifice form for distance'
    ]
  },
  {
    name: 'Band-assisted split step',
    muscle: 'Agility / Reaction',
    description: 'Dynamic split step drill that improves reactive movement and agility.',
    instructions: [
      'Attach band around waist or have partner hold it',
      'Perform quick split steps (small hops with feet splitting)',
      'React to resistance or cues',
      'Stay light and quick on feet',
      'Maintain athletic posture'
    ],
    tips: [
      'Keep movements small and fast',
      'Stay on balls of feet',
      'Maintain tension throughout'
    ]
  },
  {
    name: 'Deep squat hold',
    muscle: 'Mobility / Legs',
    description: 'Isometric hold that builds mobility, strength, and comfort in the deep squat position.',
    instructions: [
      'Descend into deepest comfortable squat',
      'Keep heels flat on ground',
      'Maintain upright chest',
      'Hold position for prescribed time',
      'Focus on breathing and relaxing into position'
    ],
    tips: [
      'Use support if needed initially',
      'Keep weight in heels',
      'Work on gradually increasing depth and duration'
    ]
  },
  {
    name: 'Band squat → calf raise',
    muscle: 'Legs / Calves',
    description: 'Combination exercise that builds explosive lower body power through complete extension.',
    instructions: [
      'Set up band-resisted squat position',
      'Explode up from squat',
      'At the top, rise onto toes for calf raise',
      'Control descent back to squat',
      'Repeat with smooth transition'
    ],
    tips: [
      'Maintain control throughout',
      'Full extension at top',
      'Smooth transition between movements'
    ]
  },
  {
    name: 'Cossack squat flow',
    muscle: 'Mobility / Legs',
    description: 'Dynamic flowing movement between Cossack squats that builds mobility and strength.',
    instructions: [
      'Start in wide stance',
      'Flow smoothly from side to side',
      'Move continuously without standing fully',
      'Shift weight between legs fluidly',
      'Maintain rhythm throughout set'
    ],
    tips: [
      'Keep movement smooth and controlled',
      'Don\'t rush the transitions',
      'Breathe steadily'
    ]
  },
  {
    name: 'Lateral bounds',
    muscle: 'Legs / Power',
    description: 'Explosive lateral plyometric exercise that develops single-leg power and landing control.',
    instructions: [
      'Stand on one leg',
      'Bound laterally to land on opposite leg',
      'Stick the landing before next rep',
      'Focus on controlled, stable landing',
      'Repeat back and forth'
    ],
    tips: [
      'Hold each landing briefly',
      'Land softly with knee bent',
      'Don\'t rush between reps'
    ]
  },
  {
    name: 'Pallof press (band)',
    muscle: 'Core / Anti-rotation',
    description: 'Anti-rotation core exercise that builds rotational stability and strength.',
    instructions: [
      'Attach band at chest height',
      'Stand perpendicular to anchor point',
      'Hold band at chest with both hands',
      'Press arms straight out, resisting rotation',
      'Return to chest and repeat'
    ],
    tips: [
      'Don\'t let torso rotate',
      'Keep hips and shoulders square',
      'Brace core throughout'
    ]
  }
];

export function ExerciseGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = exerciseDatabase.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercises..."
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] pl-12 pr-4 py-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-white transition-colors clip-corner"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Exercise List */}
        <div className="space-y-3">
          {filteredExercises.map((exercise) => (
            <button
              key={exercise.name}
              onClick={() => setSelectedExercise(exercise)}
              className={`w-full text-left p-5 border transition-all clip-corner ${
                selectedExercise?.name === exercise.name
                  ? 'bg-white text-black border-white'
                  : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-white text-[var(--color-text-primary)]'
              }`}
            >
              <h3 className="mb-1">{exercise.name}</h3>
              <p className={`text-sm ${selectedExercise?.name === exercise.name ? 'text-black/70' : 'text-[var(--color-text-secondary)]'}`}>
                {exercise.muscle}
              </p>
            </button>
          ))}
        </div>

        {/* Exercise Details */}
        <div className="sticky top-24 h-fit">
          {selectedExercise ? (
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 clip-corner">
              <h2 className="mb-2">{selectedExercise.name}</h2>
              <p className="text-[var(--color-text-secondary)] mb-6 uppercase tracking-widest">
                {selectedExercise.muscle}
              </p>

              <p className="mb-8 text-[var(--color-text-primary)]/90 leading-relaxed">
                {selectedExercise.description}
              </p>

              <div className="mb-8">
                <h4 className="mb-4 uppercase tracking-wider text-white">Instructions</h4>
                <ol className="space-y-3">
                  {selectedExercise.instructions.map((instruction, idx) => (
                    <li key={idx} className="flex gap-4 text-[var(--color-text-secondary)]">
                      <span className="text-white min-w-6">{idx + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="mb-4 uppercase tracking-wider text-white">Pro Tips</h4>
                <ul className="space-y-3">
                  {selectedExercise.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-4 text-[var(--color-text-secondary)]">
                      <span className="text-white">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-8 clip-corner text-center text-[var(--color-text-secondary)]">
              <p className="italic">Select an exercise to view detailed instructions</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .clip-corner {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
      `}</style>
    </div>
  );
}