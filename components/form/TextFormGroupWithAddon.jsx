import clsx from 'clsx'

export default function TextFormGroup({
  name,
  defaultValue,
  helperText,
  label = name,
  autoComplete,
  placeholder,
  register,
  errors,
  expand,
  addon,
}) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 sm:dark:border-gray-500">
      <label
        htmlFor={name}
        className="block text-sm font-medium sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <div className="flex max-w-lg rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
            {addon}
          </span>
          <input
            type="text"
            placeholder={placeholder}
            defaultValue={defaultValue}
            name={name}
            id={name}
            autoComplete={autoComplete}
            className={clsx(
              'block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
              !expand && 'sm:max-w-xs'
            )}
          />
        </div>
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
