# Setup

### Install

```
npm create vite@latest my-fitness-app -- --template react-ts
npm install tailwindcss @tailwindcss/vite
```

### Config

The current version of Vite splits TypeScript configuration into three files, two of which need to be edited. Add the baseUrl and paths properties to the compilerOptions section of the tsconfig.json and tsconfig.app.json files:

```
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
Add the following code to the tsconfig.app.json file to resolve paths, for your IDE:

```
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

### Further Install
Add the following code to the vite.config.ts so your app can resolve paths without error:

```npm install -D @types/node```
```
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

#### Run the CLI

```
npx shadcn@latest init
```

#### Add components

```
("NODE_TLS_REJECT_UNAUTHORIZED=0") npx shadcn@latest add button card badge sidebar ( whatever you need ! )
```
The command above will add the Button component to your project. You can then import it like this:
```
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export default App
```

### Lucide Symbols
 It's a icon library.
 Lucide React is a popular, open-source icon library specifically designed for React applications. It is a community-run fork of the famous Feather Icons, updated to include over 1,500 modern icons.

 ```
 npm install lucide-react
 ```

 ### Router
 ```
 npm install react-router-dom
 ```