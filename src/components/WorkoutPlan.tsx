import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

const defaultWorkoutPlan: WorkoutDay[] = [
  {
    day: 'Monday',
    exercises: [
      { name: 'Band-resisted squat (deep)', sets: '3', reps: '10' },
      { name: 'Cossack squats', sets: '3', reps: '6 each side' },
      { name: 'Side lunges', sets: '3', reps: '8 each side' },
      { name: 'Single-leg calf raises', sets: '3', reps: '12 each leg' }
    ]
  },
  {
    day: 'Tuesday',
    exercises: [
      { name: 'Band-resisted side shuffle', sets: '4', reps: '20 sec' },
      { name: 'One-legged hops (in place)', sets: '3', reps: '8 each leg' },
      { name: 'One-leg hop → stick', sets: '3', reps: '5 each leg' },
      { name: 'Reaction step drill', sets: '3', reps: '30 sec' }
    ]
  },
  {
    day: 'Wednesday',
    exercises: [
      { name: 'Band single-leg Romanian deadlift', sets: '3', reps: '8 each leg' },
      { name: 'Step-down (slow)', sets: '3', reps: '6 each leg' },
      { name: 'Side lunges (banded if possible)', sets: '3', reps: '6 each side' },
      { name: 'Dead bug', sets: '3', reps: '10 slow reps' },
      { name: 'Single-leg balance (eyes closed)', sets: '2', reps: '30 sec each leg' }
    ]
  },
  {
    day: 'Thursday',
    exercises: [
      { name: 'Lunge jumps', sets: '3', reps: '6 each side' },
      { name: 'One-legged forward hops', sets: '3', reps: '5 each leg' },
      { name: 'Band-assisted split step', sets: '4', reps: '20 sec' },
      { name: 'Deep squat hold', sets: '2', reps: '45 sec' }
    ]
  },
  {
    day: 'Friday',
    exercises: [
      { name: 'Band squat → calf raise', sets: '3', reps: '10' },
      { name: 'Cossack squat flow', sets: '2', reps: '8 total' },
      { name: 'Lateral bounds', sets: '3', reps: '5 each side' },
      { name: 'Pallof press (band)', sets: '3', reps: '10 each side' }
    ]
  },
  {
    day: 'Saturday',
    exercises: [
      { name: 'Rest Day', sets: '-', reps: '-' }
    ]
  },
  {
    day: 'Sunday',
    exercises: [
      { name: 'Rest Day', sets: '-', reps: '-' }
    ]
  }
];

export function WorkoutPlan() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>(defaultWorkoutPlan);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [editingExercise, setEditingExercise] = useState<{ day: string; index: number } | null>(null);
  const [editForm, setEditForm] = useState({ name: '', sets: '', reps: '' });
  const [addingToDay, setAddingToDay] = useState<string | null>(null);
  const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '' });

  useEffect(() => {
    // Clear old saved data and use new default plan
    localStorage.removeItem('workoutPlan');
    setWorkoutPlan(defaultWorkoutPlan);
  }, []);

  useEffect(() => {
    localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
  }, [workoutPlan]);

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const startEditing = (day: string, index: number, exercise: Exercise) => {
    setEditingExercise({ day, index });
    setEditForm(exercise);
  };

  const saveEdit = () => {
    if (!editingExercise) return;
    
    setWorkoutPlan(prev => prev.map(workout => {
      if (workout.day === editingExercise.day) {
        const newExercises = [...workout.exercises];
        newExercises[editingExercise.index] = editForm;
        return { ...workout, exercises: newExercises };
      }
      return workout;
    }));
    
    setEditingExercise(null);
    setEditForm({ name: '', sets: '', reps: '' });
  };

  const cancelEdit = () => {
    setEditingExercise(null);
    setEditForm({ name: '', sets: '', reps: '' });
  };

  const deleteExercise = (day: string, index: number) => {
    setWorkoutPlan(prev => prev.map(workout => {
      if (workout.day === day) {
        return {
          ...workout,
          exercises: workout.exercises.filter((_, i) => i !== index)
        };
      }
      return workout;
    }));
  };

  const startAdding = (day: string) => {
    setAddingToDay(day);
    setNewExercise({ name: '', sets: '', reps: '' });
  };

  const addExercise = () => {
    if (!addingToDay || !newExercise.name.trim()) return;

    setWorkoutPlan(prev => prev.map(workout => {
      if (workout.day === addingToDay) {
        return {
          ...workout,
          exercises: [...workout.exercises, newExercise]
        };
      }
      return workout;
    }));

    setAddingToDay(null);
    setNewExercise({ name: '', sets: '', reps: '' });
  };

  const cancelAdd = () => {
    setAddingToDay(null);
    setNewExercise({ name: '', sets: '', reps: '' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-3">
        {workoutPlan.map((workout) => (
          <div
            key={workout.day}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden hover:border-white transition-all clip-corner"
          >
            <button
              onClick={() => toggleDay(workout.day)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-bg-tertiary)] border border-white flex items-center justify-center clip-corner-small">
                  <span className="text-white">{workout.day.slice(0, 3)}</span>
                </div>
                <h3 className="text-[var(--color-text-primary)]">{workout.day}</h3>
              </div>
              {expandedDay === workout.day ? (
                <ChevronUp className="w-5 h-5 text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[var(--color-text-secondary)]" />
              )}
            </button>

            {expandedDay === workout.day && (
              <div className="px-6 pb-4 border-t border-[var(--color-border)]">
                <div className="mt-4 space-y-3">
                  {workout.exercises.map((exercise, idx) => (
                    <div key={idx}>
                      {editingExercise?.day === workout.day && editingExercise.index === idx ? (
                        <div className="bg-[var(--color-bg-tertiary)] p-4 space-y-3 clip-corner-small">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            placeholder="Exercise name"
                            className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border)] px-3 py-2 text-white focus:outline-none focus:border-white"
                          />
                          <div className="flex gap-3">
                            <input
                              type="text"
                              value={editForm.sets}
                              onChange={(e) => setEditForm({ ...editForm, sets: e.target.value })}
                              placeholder="Sets"
                              className="flex-1 bg-[var(--color-bg-dark)] border border-[var(--color-border)] px-3 py-2 text-white focus:outline-none focus:border-white"
                            />
                            <input
                              type="text"
                              value={editForm.reps}
                              onChange={(e) => setEditForm({ ...editForm, reps: e.target.value })}
                              placeholder="Reps"
                              className="flex-1 bg-[var(--color-bg-dark)] border border-[var(--color-border)] px-3 py-2 text-white focus:outline-none focus:border-white"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={saveEdit}
                              className="flex-1 bg-white text-black py-2 hover:bg-[var(--color-text-secondary)] transition-colors"
                            >
                              <Check className="w-4 h-4 mx-auto" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex-1 border border-[var(--color-border)] text-white py-2 hover:border-white transition-colors"
                            >
                              <X className="w-4 h-4 mx-auto" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[var(--color-bg-tertiary)] p-4 flex items-center justify-between group clip-corner-small">
                          <div className="flex-1">
                            <h4 className="text-[var(--color-text-primary)] mb-1">{exercise.name}</h4>
                            {exercise.sets !== '-' && (
                              <p className="text-[var(--color-text-secondary)]">
                                {exercise.sets} sets × {exercise.reps} reps
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEditing(workout.day, idx, exercise)}
                              className="opacity-0 group-hover:opacity-100 text-[var(--color-text-secondary)] hover:text-white transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteExercise(workout.day, idx)}
                              className="opacity-0 group-hover:opacity-100 text-[var(--color-text-secondary)] hover:text-white transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="w-2 h-2 bg-white"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {addingToDay === workout.day ? (
                    <div className="bg-[var(--color-bg-tertiary)] p-4 space-y-3 clip-corner-small border border-white">
                      <input
                        type="text"
                        value={newExercise.name}
                        onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                        placeholder="Exercise name"
                        className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border)] px-3 py-2 text-white focus:outline-none focus:border-white"
                      />
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={newExercise.sets}
                          onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                          placeholder="Sets"
                          className="flex-1 bg-[var(--color-bg-dark)] border border-[var(--color-border)] px-3 py-2 text-white focus:outline-none focus:border-white"
                        />
                        <input
                          type="text"
                          value={newExercise.reps}
                          onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                          placeholder="Reps"
                          className="flex-1 bg-[var(--color-bg-dark)] border border-[var(--color-border)] px-3 py-2 text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={addExercise}
                          className="flex-1 bg-white text-black py-2 hover:bg-[var(--color-text-secondary)] transition-colors"
                        >
                          <Check className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          onClick={cancelAdd}
                          className="flex-1 border border-[var(--color-border)] text-white py-2 hover:border-white transition-colors"
                        >
                          <X className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => startAdding(workout.day)}
                      className="w-full border border-dashed border-[var(--color-border)] py-3 text-[var(--color-text-secondary)] hover:border-white hover:text-white transition-all clip-corner-small flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Exercise</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .clip-corner {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .clip-corner-small {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .clip-corner-btn {
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
      `}</style>
    </div>
  );
}