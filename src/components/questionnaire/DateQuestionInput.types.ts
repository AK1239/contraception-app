export interface DateQuestionInputProps {
  value: Date | undefined;
  onValueChange: (date: Date) => void;
  minDate: Date;
  maxDate: Date;
  placeholder?: string;
}
