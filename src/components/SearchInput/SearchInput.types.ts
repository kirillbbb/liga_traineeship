export interface SearchInputProps {
  onChange: (text: string) => void;
  value: string;
  onReset?: () => void;
}
