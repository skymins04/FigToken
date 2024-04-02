import * as React from "react";

import { cn } from "@ui/utils";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export type ComboBoxOption = {
  value: string;
  label: string;
};

export type ComboBoxProps = {
  defaultValue?: string;
  options: ComboBoxOption[];
  messages: {
    empty: string;
    placeholder: string;
  };
  className?: {
    trigger?: string;
    content?: string;
  };
  onSelect?: (value: string) => Promise<void> | void;
};

export function ComboBox({
  defaultValue,
  options,
  messages,
  className,
  onSelect,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ?? "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className?.trigger)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : messages.placeholder}
          <div className="flex flex-col justify-center items-center ml-2 h-4 w-4 shrink-0 opacity-50">
            <FontAwesomeIcon icon={faChevronUp} className="h-2 w-2" />
            <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("p-0", className?.content)}>
        <Command>
          <CommandInput placeholder={messages.placeholder} />
          <CommandEmpty>{messages.empty}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  const newValue = currentValue === value ? "" : currentValue;
                  setValue(newValue);
                  setOpen(false);
                  onSelect && onSelect(newValue);
                }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
