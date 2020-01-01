import { useState, ChangeEvent } from "react";

export default (initialValue: string): { value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void } => {
   const [value, setValue] = useState<string>(initialValue);
   return {
      value,
      onChange: (e: ChangeEvent<HTMLInputElement>): void => {
         setValue(e.target.value);
      }
   };
};
