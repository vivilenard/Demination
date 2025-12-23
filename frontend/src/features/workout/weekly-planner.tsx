import { useState } from "react"
import { Plus, Dumbbell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 1. Define Types
interface WorkoutItem {
  id: string
  name: string
  sets: string
  reps: string
}

type WeeklyPlan = Record<string, WorkoutItem[]>

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function WeeklyPlanner() {
  // Initialize state with empty arrays for each day
  const [plan, setPlan] = useState<WeeklyPlan>(
    DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  )
  
  const [activeDay, setActiveDay] = useState("Monday")
  const [newItem, setNewItem] = useState({ name: "", sets: "", reps: "" })

  const addExercise = () => {
    if (!newItem.name) return
    
    const exercise: WorkoutItem = {
      id: crypto.randomUUID(),
      ...newItem
    }

    setPlan(prev => ({
      ...prev,
      [activeDay]: [...prev[activeDay], exercise]
    }))

    setNewItem({ name: "", sets: "", reps: "" })
  }

  const removeExercise = (day: string, id: string) => {
    setPlan(prev => ({
      ...prev,
      [day]: prev[day].filter(item => item.id !== id)
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Weekly Routine</h2>
        <p className="text-muted-foreground">Plan your workouts and stay consistent.</p>
      </div>

      <Tabs defaultValue="Monday" onValueChange={setActiveDay} className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full h-auto gap-1">
          {DAYS.map(day => (
            <TabsTrigger key={day} value={day} className="py-2 text-xs md:text-sm">
              {day.slice(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {DAYS.map(day => (
          <TabsContent key={day} value={day} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{day} Schedule</CardTitle>
                <CardDescription>Add the exercises you want to complete today.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Add Exercise Form */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end border-b pb-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-medium">Exercise Name</label>
                    <Input 
                      placeholder="e.g. Bench Press" 
                      value={newItem.name}
                      onChange={e => setNewItem({...newItem, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Sets x Reps</label>
                    <Input 
                      placeholder="3 x 12" 
                      value={newItem.sets}
                      onChange={e => setNewItem({...newItem, sets: e.target.value})}
                    />
                  </div>
                  <Button onClick={addExercise} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>

                {/* Display Exercises */}
                <div className="space-y-3">
                  {plan[day].length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                      Rest Day? Or time to add a workout!
                    </div>
                  ) : (
                    plan[day].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.sets} {item.reps ? `· ${item.reps}` : ""}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeExercise(day, item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}