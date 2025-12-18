import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { WorkoutPlan } from './components/WorkoutPlan';
import { ExerciseGuide } from './components/ExerciseGuide';
import { ListTodo, Dumbbell, BookOpen, ChevronDown } from 'lucide-react';

type Chapter = 'todo' | 'workout' | 'guide';

const chapters = [
  { id: 'todo' as Chapter, label: 'I. Tasks', icon: ListTodo },
  { id: 'workout' as Chapter, label: 'II. Training', icon: Dumbbell },
  { id: 'guide' as Chapter, label: 'III. Exercise Guide', icon: BookOpen },
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState<Chapter>('todo');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeChapterData = chapters.find(c => c.id === activeChapter);

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-[var(--color-text-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-center mb-8 tracking-widest">
            Demination
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 justify-center flex-wrap">
            {chapters.map(chapter => {
              const Icon = chapter.icon;
              return (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(chapter.id)}
                  className={`flex items-center gap-2 px-6 py-3 transition-all ${
                    activeChapter === chapter.id
                      ? 'bg-white text-black'
                      : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-white border border-[var(--color-border)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{chapter.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-6 py-3 bg-white text-black"
            >
              <div className="flex items-center gap-2">
                {activeChapterData && <activeChapterData.icon className="w-5 h-5" />}
                <span>{activeChapterData?.label}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden">
                {chapters.map(chapter => {
                  const Icon = chapter.icon;
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setActiveChapter(chapter.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-6 py-4 transition-all text-left ${
                        activeChapter === chapter.id
                          ? 'bg-white text-black'
                          : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{chapter.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeChapter === 'todo' && (
          <div>
            <h2 className="text-center mb-8 tracking-wide">
              Things To Accomplish
            </h2>
            <TodoList />
          </div>
        )}

        {activeChapter === 'workout' && (
          <div>
            <h2 className="text-center mb-8 tracking-wide">
              Weekly Training Regiment
            </h2>
            <WorkoutPlan />
          </div>
        )}

        {activeChapter === 'guide' && (
          <div>
            <h2 className="text-center mb-8 tracking-wide">
              Exercise Compendium
            </h2>
            <ExerciseGuide />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-[var(--color-border)] text-center text-[var(--color-text-secondary)]">
        <p className="italic tracking-wider">Excellence is not a destination, but a continuous journey.</p>
      </footer>
    </div>
  );
}