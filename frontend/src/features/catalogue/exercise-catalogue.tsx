import { useState } from "react";
import { Search, Info, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. Define the Data Structure
interface ExerciseDetail {
  id: string;
  name: string;
  muscle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructions: string;
}

const INITIAL_EXERCISE_DATA: ExerciseDetail[] = [
  {
    id: "1",
    name: "Pushups",
    muscle: "Chest",
    difficulty: "Beginner",
    instructions:
      "Place hands shoulder-width apart, keep your back flat, and lower your body until your chest nearly touches the floor.",
  },
  {
    id: "2",
    name: "Deadlift",
    muscle: "Back/Legs",
    difficulty: "Advanced",
    instructions:
      "Keep the bar close to your shins, back straight, and drive through your heels to lift the weight.",
  },
  {
    id: "3",
    name: "Goblet Squat",
    muscle: "Legs",
    difficulty: "Beginner",
    instructions:
      "Hold a weight at chest height, sit back into your hips, and keep your elbows inside your knees at the bottom.",
  },
];

export function ExerciseCatalogue() {
  const [exercises, setExercises] = useState<ExerciseDetail[]>(
    INITIAL_EXERCISE_DATA
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState<Omit<ExerciseDetail, "id">>({
    name: "",
    muscle: "",
    difficulty: "Beginner",
    instructions: "",
  });

  // 2. Filter logic
  const filteredExercises = exercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.muscle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExercise = () => {
    if (!newExercise.name || !newExercise.muscle || !newExercise.instructions) {
      return;
    }

    const exercise: ExerciseDetail = {
      id: crypto.randomUUID(),
      ...newExercise,
    };

    setExercises((prev) => [...prev, exercise]);
    setNewExercise({
      name: "",
      muscle: "",
      difficulty: "Beginner",
      instructions: "",
    });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Exercise Library
          </h2>
          <p className="text-muted-foreground">
            Master your form with detailed instructions.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises or muscles..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Add New Exercise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Exercise Name</label>
                <Input
                  placeholder="e.g., Bench Press"
                  value={newExercise.name}
                  onChange={(e) =>
                    setNewExercise((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Muscle Group</label>
                <Input
                  placeholder="e.g., Chest, Back, Legs"
                  value={newExercise.muscle}
                  onChange={(e) =>
                    setNewExercise((prev) => ({
                      ...prev,
                      muscle: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select
                  value={newExercise.difficulty}
                  onValueChange={(
                    value: "Beginner" | "Intermediate" | "Advanced"
                  ) =>
                    setNewExercise((prev) => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Instructions</label>
              <Textarea
                placeholder="Enter detailed exercise instructions..."
                value={newExercise.instructions}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
                rows={4}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setNewExercise({
                    name: "",
                    muscle: "",
                    difficulty: "Beginner",
                    instructions: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddExercise}>Add Exercise</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ScrollArea className="h-[600px] rounded-md border p-4">
        <div className="grid gap-4">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((ex) => (
              <Card key={ex.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{ex.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{ex.muscle}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          ex.difficulty === "Advanced"
                            ? "text-orange-500"
                            : "text-green-500"
                        }
                      >
                        {ex.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="instructions" className="border-none">
                      <AccordionTrigger className="py-0 text-sm hover:no-underline">
                        <span className="flex items-center gap-2 text-primary font-medium">
                          <Info className="h-4 w-4" /> View Instructions
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 text-muted-foreground leading-relaxed">
                        {ex.instructions}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No exercises found matching "{searchTerm}"
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
