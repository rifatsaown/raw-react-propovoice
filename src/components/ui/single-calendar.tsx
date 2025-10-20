import type { ComponentProps } from 'react';
import * as React from 'react';
import { Calendar as ShadcnCalendar } from './calendar';

type SingleModeProps = Omit<
  ComponentProps<typeof ShadcnCalendar>,
  'mode' | 'selected' | 'onSelect'
> & {
  mode?: 'single';
  selected?: Date;
  onSelect?: (date?: Date) => void;
};

function SingleCalendar({
  className,
  showOutsideDays = true,
  selected,
  ...props
}: SingleModeProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(
    selected instanceof Date ? selected : undefined
  );

  return (
    <ShadcnCalendar
      mode="single"
      selected={selected}
      showOutsideDays={showOutsideDays}
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      className={className}
      {...props}
    />
  );
}
SingleCalendar.displayName = 'Calendar';

export { SingleCalendar };
