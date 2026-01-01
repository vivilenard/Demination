export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
export interface Messages{
  text: string;
  id: string;
  sender: string;
}
export interface AiConvo {
  id: string;
  messages: Messages[];
}