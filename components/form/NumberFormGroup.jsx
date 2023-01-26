import clsx from 'clsx'

export default function NumberFormGroup({
  name,
  min,
  max,
  defaultValue,
  helperText,
  label = name,
  register,
  errors,
  expand,
  required,
}) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 sm:dark:border-gray-500">
      <label
        htmlFor={name}
        className="block text-sm font-medium sm:mt-px sm:pt-2"
      >
        {label}
        {required && (
          <p className="text-xs text-gray-700/80 dark:text-gray-300/80">
            {' '}
            *Required
          </p>
        )}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <input
          type="number"
          min={min}
          max={max}
          defaultValue={defaultValue}
          name={name}
          id={name}
          className={clsx(
            'block w-full max-w-lg rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            !expand && 'sm:max-w-xs'
          )}
          {...register(name, { required })}
        />
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
