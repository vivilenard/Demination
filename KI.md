Here is the comprehensive documentation for the **AI Agent Implementation** in your project. You can copy this entire block and save it as `AI_IMPLEMENTATION.md` or append it to your `README.md`.

---

# 🤖 AI Agent Implementation: From Chatbot to Action Engine

This document details the transformation of the **AI Prompt Chapter** into an autonomous agent that can programmatically modify the application's state (To-Do List, Workout Plan, and Exercise Catalogue).

## 1. Core Concept: Structured Output

Instead of treating the AI as a text generator, we treat it as an **API Client**. We use **System Instructions** and **Response Schemas** to force the Gemini model to return valid JSON arrays of "Actions" instead of conversational prose.

---

## 2. Integration Steps

### Step 1: Define the Action Schema

We define a TypeScript interface for all possible actions the AI can take.

```typescript
type ActionType = 'ADD_TODO' | 'ADD_WORKOUT' | 'ADD_CATALOGUE' | 'CHAT';

interface AppAction {
  type: ActionType;
  payload: {
    text?: string;        // Used for TODO and CHAT
    day?: string;         // Used for WORKOUT
    exerciseName?: string; // Used for WORKOUT and CATALOGUE
    muscleGroup?: string;  // Used for CATALOGUE
    instructions?: string; // Used for CATALOGUE
    setsReps?: string;    // Used for WORKOUT
  };
}

```

### Step 2: System Instruction

Configure the Gemini model with a strict persona and output requirements.

**System Instruction:**
```markdown
"You are a Fitness Assistant. Analyze user input to perform actions.
Return ONLY a JSON array of objects following the AppAction schema.

- If the user mentions buying or tasks: use ADD_TODO.
- If the user wants to schedule a workout: use ADD_WORKOUT.
- If the user wants to define a new exercise: use ADD_CATALOGUE.
- For all other responses: use CHAT.

Do not include markdown formatting like \`\`\`json. Return only the raw string."

```

### Step 3: Dispatcher Logic

The `handleSend` function in `ai-prompt.tsx` acts as the brain, routing AI decisions to the database.

```tsx
const handleSend = async () => {
  setIsLoading(true);
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT 
    });

    const result = await model.generateContent(input);
    const actions: AppAction[] = JSON.parse(result.response.text());

    for (const action of actions) {
      switch (action.type) {
        case 'ADD_TODO':
          await supabase.from('todos').insert({ task: action.payload.text });
          break;
        case 'ADD_WORKOUT':
          await supabase.from('workout_plans').insert({
            day: action.payload.day,
            exercise: action.payload.exerciseName,
            details: action.payload.setsReps
          });
          break;
        case 'CHAT':
          setMessages(prev => [...prev, { role: 'ai', content: action.payload.text }]);
          break;
      }
    }
    
    // Refresh UI data
    queryClient.invalidateQueries(); 
    
  } catch (e) {
    console.error("Failed to parse AI action", e);
  } finally {
    setIsLoading(false);
  }
};

```

---

## 3. Advanced Features

### Optimistic UI Updates

By using **TanStack Query**, the "Bananas" added by the AI will appear on your To-Do list instantly, even before the Supabase confirmation returns. This prevents the app from feeling "laggy" while waiting for the AI.

### Offline Resilience

When combined with the **PWA Plugin** and **LocalStorage/IndexedDB**, your agent can "queue" these actions. If you tell the AI to "Add Squats for Monday" while in a gym with no service, the app will save that intent and sync it to Supabase the moment you reconnect.

---

## 4. Security & Safety Guards

1. **API Key Safety:** Move the Gemini logic to **Supabase Edge Functions** to prevent your API key from being exposed in the browser.
2. **Schema Validation:** Use a library like `Zod` to validate the AI's JSON before executing database writes.
3. **Confirmation UI:** For high-stakes actions (e.g., "Clear my whole week"), implement a Shadcn `AlertDialog` that requires a user click before the AI action is finalized.

---

Would you like me to focus on the **Supabase Table Setup** next so you have somewhere to save these AI-generated tasks?