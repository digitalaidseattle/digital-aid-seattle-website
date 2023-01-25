import clsx from 'clsx'

export default function SelectInputGroup({
  name,
  defaultValue,
  helperText,
  label = name,
  autoComplete = false,
  register,
  errors,
  expand,
  options = [],
  multiple,
}) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium  sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <select
          id={name}
          name={name}
          autoComplete={autoComplete}
          className={clsx(
            'block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-gray-900 sm:max-w-xs sm:text-sm',
            !expand && 'sm:max-w-xs'
          )}
          multiple={multiple}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {helperText && (
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {helperText}
          </p>
        )}
        {errors && (
          <span className="mt-2 text-sm text-red-700 dark:text-red-300">
            {errors}
          </span>
        )}
      </div>
    </div>
  )
}
