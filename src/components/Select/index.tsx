import { type FC, useMemo } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { ALL_OPTION_VALUE } from '../../helpers/filters';
import './index.scss';

export const Select: FC<{
  options: Array<{ label: string; value: string }>;
  hasAll?: boolean;
  allOptionsLabel?: string;
  selectedValue: string;
  handleChange: (newVal: string) => void;
}> = ({ options, selectedValue, handleChange, allOptionsLabel = 'All', hasAll = false }) => {
  const finalOptions = useMemo(() => {
    return hasAll
      ? [{ label: allOptionsLabel, value: ALL_OPTION_VALUE }, ...options]
      : [...options];
  }, [options, allOptionsLabel]);

  return (
    <div className='select-container'>
      <select
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        {finalOptions.map(({ label, value }) => (
          <option selected={value === selectedValue} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <AiOutlineCaretDown className='icon' />
    </div>
  );
};
